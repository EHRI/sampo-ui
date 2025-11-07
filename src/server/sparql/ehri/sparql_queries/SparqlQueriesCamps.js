export const campsProperties = `
  {
    ?id skos:prefLabel ?prefLabel__id ;
    BIND(?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?id as ?uri__prefLabel)
    BIND(CONCAT("/camps/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
    BIND(CONCAT("https://portal.ehri-project.eu/keywords/ehri_camps-", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__prefLabel)
    BIND(CONCAT("https://portal.ehri-project.eu/keywords/ehri_camps-", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__dataProviderUrl)
  }
  UNION
  {
    ?id skos:altLabel ?altLabels .
  }
  UNION
  {
    ?id rdfs:seeAlso ?wikidataURI .
    FILTER(STRSTARTS(STR(?wikidataURI), "http://www.wikidata.org/"))
    BIND(?wikidataURI as ?wikidataURI__dataProviderUrl)
    BIND(?wikidataURI as ?wikidataURI__prefLabel)
  }
  UNION
  {
    SELECT ?id (COUNT(?description) AS ?numberOfConnectedDescriptions) WHERE {
      ?id ^rico:hasOrHadSubject ?description .
    } GROUP BY ?id
  }
`

export const campsLocationsQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?camp) as ?instanceCount)
  WHERE {
    <FILTER>
    ?camp skos:inScheme <http://lod.ehri-project-test.eu/vocabularies/ehri-camps> ;
      geo:lat ?lat ;
      geo:long ?long .
    BIND(?camp AS ?id)
  }
  GROUP BY ?id ?lat ?long
`

export const campsPropertiesInfoWindow = `
  ?id skos:prefLabel ?prefLabel__id .
  FILTER(LANG(?prefLabel__id) = 'en')
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(CONCAT("/camps/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`