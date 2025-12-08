export const institutionProperties = `
    {
      ?id rico:name ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
      BIND(CONCAT("/institutions/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(CONCAT("https://portal.ehri-project.eu/institutions/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__prefLabel)
      BIND(CONCAT("https://portal.ehri-project.eu/institutions/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__dataProviderUrl)
      # FILTER(LANG(?prefLabel__id) = 'en') # This is commented due to some descriptions not being in English
    }
    UNION
    {
      ?country rico:isOrWasLocationOfAgent ?id .
      ?country a ehri:Country .
      ?country rico:name ?country__prefLabel .
      BIND(CONCAT("/countries/page/", REPLACE(STR(?country), "^.*\\\\/(.+)", "$1")) AS ?country__dataProviderUrl)
      BIND(?country as ?country__id)
      FILTER(LANG(?country__prefLabel) = 'en')
    }
    UNION
    {
      ?id rico:generalDescription ?generalDescription .
    }
    UNION
    {
      ?id rico:history ?history .
    }
    UNION
    {
      ?id ehri:conditionsOfAccess ?conditionsOfAccess .
    }
    UNION
    {
      ?id rdfs:seeAlso ?webpage__prefLabel .
      BIND(?webpage__prefLabel AS ?webpage__dataProviderUrl)
    }
    UNION
    { 
      SELECT ?id (COUNT(?description) AS ?numberOfDescriptions) WHERE {
        ?id rico:isOrWasHolderOf ?description .
      } GROUP BY ?id
    }
    UNION 
    {
      ?id schema:openingHours ?openingHours .
    }
    UNION 
    {
      ?id ehri:reproductionServices ?reproductionServices .
    }
    UNION 
    {
      ?id ehri:generalContext ?generalContext .
    }
    UNION 
    {
      ?id ehri:administrativeStructure ?administrativeStructure .
    }
    UNION 
    {
      ?id ehri:recordsManagementAndCollectingPolicies ?recordsManagementAndCollectingPolicies .
    }
    UNION 
    {
      ?id ehri:buildings ?buildings .
    }
    UNION 
    {
      ?id ehri:accessibility ?accessibility .
    }
    UNION 
    {
      ?id ehri:researchServices ?researchServices .
    }
    UNION 
    {
      ?id ehri:publicAreas ?publicAreas .
    }
    UNION 
    {
      ?id ehri:findingAids ?findingAids .
    }
    UNION 
    {
      ?id ehri:sources ?sources .
    }
    UNION 
    {
      ?id rico:agentHasOrHadLocation/rico:hasOrHadPhysicalLocation/schema:email ?email .
    }
    UNION 
    {
      ?id rico:agentHasOrHadLocation/rico:hasOrHadPhysicalLocation/schema:telephone ?telephone .
    }
    UNION 
    {
      ?id rico:authorizedBy/rico:generalDescription ?mandate .
    }
    UNION 
    {
      ?id rico:hasOrHadAgentName/rico:name ?parallelNames .
    }
    UNION 
    {
      ?id rico:agentHasOrHadLocation ?location .
      ?location rico:hasOrHadPhysicalLocation ?physicalLocation .
      ?physicalLocation rico:name ?address .
      ?physicalLocation schema:postalCode ?postalCode .
      ?location rico:isOrWasContainedBy* [ a ehri:City ; rico:name ?city] .
      ?location rico:isOrWasContainedBy* [ a ehri:Region ; rico:name ?region] .
      ?location rico:isOrWasContainedBy* [ a ehri:Country ; rico:name ?countryName] .
      BIND(CONCAT(?address, " ", ?city, " ", ?region, " ", STR(?postalCode), " ", ?countryName) AS ?fullAddress)
    }
`

export const institutionPlusLinkedDescriptionsProperties = institutionProperties + `
  BIND(CONCAT("/sampo/en/archivalDescriptions/faceted-search/table?page=0&constraints=%5B%7B%22facetClass%22%3A+%22archivalDescriptions%22%2C+%22facetId%22%3A%22institution%22%2C%22filterType%22%3A%22uriFilter%22%2C%22value%22%3A%7B%22node%22%3A%7B%22id%22%3A%22",  STR(?id), "%22%2C%22prefLabel%22%3A%22", STR(?prefLabel__id), "%22%7D%7D%7D%5D") AS ?archivalDescriptionsLink)
  BIND(?archivalDescriptionsLink AS ?archivalDescriptionsLink__dataProviderUrl)
  BIND("Use this institution as filter in the archival descriptions perspective" AS ?archivalDescriptionsLink__prefLabel)
`

export const institutionsPerCountryQuery = `
  SELECT (?country AS ?category) ?prefLabel (COUNT(DISTINCT ?institution) as ?instanceCount)
  WHERE {
    {
      ?institution a ehri:Institution .
      ?country rico:isOrWasLocationOfAgent ?institution .
      ?country a ehri:Country .
      ?country rico:name ?prefLabel .
      FILTER(LANG(?prefLabel) = 'en')
      <FILTER>
    }
  }
  GROUP BY ?country ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const institutionsPerRegionQuery = `
  SELECT (?region AS ?category) ?prefLabel (COUNT(DISTINCT ?institution) as ?instanceCount)
  WHERE {
    {
      ?institution a ehri:Institution ;
        rico:agentHasOrHadLocation ?location .
      ?location rico:isOrWasContainedBy ?region .
      ?region a ehri:Region .
      ?region rico:name ?prefLabel .
      <FILTER>
    }
  }
  GROUP BY ?region ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const institutionsPerCityQuery = `
  SELECT (?city AS ?category) ?prefLabel (COUNT(DISTINCT ?institution) as ?instanceCount)
  WHERE {
    {
      ?institution a ehri:Institution ;
        rico:agentHasOrHadLocation ?location .
      ?location rico:isOrWasContainedBy ?city .
      ?city a ehri:City .
      ?city rico:name ?prefLabel .
      <FILTER>
    }
  }
  GROUP BY ?city ?prefLabel
  ORDER BY DESC(?instanceCount)
`

export const institutionsLocationsQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?institution) as ?instanceCount)
  WHERE {
    <FILTER>
    ?institution rico:agentHasOrHadLocation ?location .
    ?location rico:hasOrHadPhysicalLocation ?physicalLocation .
    ?physicalLocation rico:hasOrHadCoordinates ?id .
    ?id rico:latitude ?lat ;
        rico:longitude ?long .
  }
  GROUP BY ?id ?lat ?long
`

export const institutionsPropertiesInfoWindow = `
  ?institution rico:agentHasOrHadLocation ?location .
  ?location rico:hasOrHadPhysicalLocation ?physicalLocation .
  ?physicalLocation rico:hasOrHadCoordinates ?id .
  ?institution rico:name ?prefLabel__id .
    BIND(?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(CONCAT("/institutions/page/", REPLACE(STR(?institution), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`

export const knowledgeGraphMetadataQuery = `
  SELECT * 
  WHERE {
    ?id a sd:Dataset ;
        dct:title ?title ;
        dct:publisher ?publisher ;
        dct:rightsHolder ?rightsHolder ;
        dct:modified ?modified ;
        dct:source ?databaseDump__id .
    ?databaseDump__id skos:prefLabel ?databaseDump__prefLabel ;
                      mmm-schema:data_provider_url ?databaseDump__dataProviderUrl ;
                      dct:modified ?databaseDump__modified .
  }
`
