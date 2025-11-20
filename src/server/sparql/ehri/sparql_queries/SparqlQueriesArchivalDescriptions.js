export const archivalDescriptionProperties = `
    {
      ?id rico:title ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
      BIND(CONCAT("/archivalDescriptions/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(CONCAT("https://portal.ehri-project.eu/units/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__prefLabel)
      BIND(CONCAT("https://portal.ehri-project.eu/units/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__dataProviderUrl)
    }
    UNION
    {
      ?id rico:hasOrHadHolder ?institution .
      ?institution rico:name ?institution__prefLabel .
      BIND(CONCAT("/institutions/page/", REPLACE(STR(?institution), "^.*\\\\/(.+)", "$1")) AS ?institution__dataProviderUrl)
      BIND(?institution as ?institution__id)
    }
    UNION
    {
      ?id rico:identifier ?identifier .
    }
    UNION
    {
      ?id rico:hasOrHadSomeMembersWithLanguage/rico:name ?language .
    }
    UNION
    {
      ?id rico:hasOrHadScript/rico:name ?script .
    }
    UNION
    {
      ?id rico:date ?date .
    }
    UNION
    {
      ?id rico:hasBeginningDate/rico:normalizedDateValue ?beginningDate .
    }
    UNION
    {
      ?id rico:hasEndDate/rico:normalizedDateValue ?endDate .
    }
    UNION
    {
      ?id rico:scopeAndContent ?scopeAndContent .
    }
    UNION
    {
      ?id rico:hasRecordSetType ?recordSetTypeURI .
      BIND(REPLACE(STR(?recordSetTypeURI), "^.*#(.+)", "$1") AS ?archivalLevel)
    }
    UNION
    {
      ?id rico:hasOrHadSubject ?ehriTerms .
      ?ehriTerms skos:prefLabel ?ehriTerms__prefLabel .
      FILTER(STRSTARTS(STR(?ehriTerms), 'http://lod.ehri-project-test.eu/vocabularies/ehri-terms/'))  
      FILTER(LANG(?ehriTerms__prefLabel) = 'en')
      BIND(CONCAT("/terms/page/", REPLACE(STR(?ehriTerms), "^.*\\\\/(.+)", "$1")) AS ?ehriTerms__dataProviderUrl)
      BIND(?ehriTerms as ?ehriTerms__id)
    }
    UNION
    {
      ?id rico:hasOrHadSubject ?ehriCamps .
      ?ehriCamps skos:prefLabel ?ehriCamps__prefLabel .
      FILTER(STRSTARTS(STR(?ehriCamps), 'http://lod.ehri-project-test.eu/vocabularies/ehri-camps/'))  
      FILTER(LANG(?ehriCamps__prefLabel) = 'en')
      BIND(CONCAT("/camps/page/", REPLACE(STR(?ehriCamps), "^.*\\\\/(.+)", "$1")) AS ?ehriCamps__dataProviderUrl)
      BIND(?ehriCamps as ?ehriCamps__id)
    }
    UNION
    {
      ?id rico:hasOrHadSubject ?ehriGhettos .
      ?ehriGhettos skos:prefLabel ?ehriGhettos__prefLabel .
      FILTER(STRSTARTS(STR(?ehriGhettos), 'http://lod.ehri-project-test.eu/vocabularies/ehri-ghettos'))  
      FILTER(LANG(?ehriGhettos__prefLabel) = 'en')
      BIND(CONCAT("/ghettos/page/", REPLACE(STR(?ehriGhettos), "^.*\\\\/(.+)", "$1")) AS ?ehriGhettos__dataProviderUrl)
      BIND(?ehriGhettos as ?ehriGhettos__id)
    }
    UNION
    {
      ?id rico:hasOrHadSubject ?concept .
      ?concept a ehri:CorporateBody ;
        rico:name ?ehriCBs .
    }
    UNION
    {
      ?id rico:hasOrHadSubject ?concept .
      ?concept a ehri:Person ;
        rico:name ?ehriPersons .
    }
    UNION
    {
      ?id rico:hasCreator ?concept .
      ?concept a ?creatorType ;
        rico:name ?creators .
      VALUES ?creatorType { ehri:Person ehri:CorporateBody } 
    }
    UNION
    {
      ?id rico:includesOrIncluded ?childDescriptions .
      ?childDescriptions rico:title ?childDescriptions__prefLabel .
      BIND(CONCAT("/archivalDescriptions/page/", REPLACE(STR(?childDescriptions), "^.*\\\\/(.+)", "$1")) AS ?childDescriptions__dataProviderUrl)
      BIND(?childDescriptions as ?childDescriptions__id)
      
    }
    UNION
    {
      ?id rdfs:seeAlso ?webpage__id .
      BIND(?webpage__id as ?webpage__prefLabel)
      BIND(?webpage__id AS ?webpage__dataProviderUrl)
    }
    UNION
    {
      ?id rico:hasOrHadTitle/rico:name ?parallelTitles .
    }
    UNION
    {
      ?id rico:recordResourceExtent ?extentAndMedium .
    }
    UNION
    {
      ?id rico:recordResourceStructure ?structure .
    }
    UNION
    {
      ?id rico:isOrWasIncludedIn ?parent .
      ?parent rico:title ?parent__prefLabel .
      BIND(CONCAT("/archivalDescriptions/page/", REPLACE(STR(?parent), "^.*\\\\/(.+)", "$1")) AS ?parent__dataProviderUrl)
    }
    UNION
    {
      ?id rico:history ?history .
    }
    UNION
    {
      ?id ehri:appraisal ?appraisal .
    }
    UNION
    {
      ?id rico:accruals ?accruals .
    }
    UNION
    {
      ?id rico:conditionsOfAccess ?conditionsOfAccess .
    }
    UNION
    {
      ?id rico:conditionsOfUse ?conditionsOfUse .
    }
    UNION
    {
      ?id ehri:physicalCharacterisiticsAndTechnicalRequirements ?physicalCharacteristics .
    }
    UNION
    {
      ?id ehri:otherFindingAids ?otherFindingAids .
    }
    UNION
    {
      ?id ehri:locationOfOriginals ?locationOfOriginals .
    }
    UNION
    {
      ?id ehri:locationOfCopies ?locationOfCopies .
    }
    UNION
    {
      {
        ?id ehri:hasCopy ?hasCopy .
        ?hasCopy a ehri:RecordSet ;
          rico:title ?hasCopy__prefLabel .
        BIND(CONCAT("/archivalDescriptions/page/", REPLACE(STR(?hasCopy), "^.*\\\\/(.+)", "$1")) AS ?hasCopy__dataProviderUrl)
      }
      UNION
      {
        ?id ehri:hasCopy ?hasCopy .
        ?hasCopy a ehri:Institution ;
          rico:name ?hasCopy__prefLabel .
        BIND(CONCAT("/institutions/page/", REPLACE(STR(?hasCopy), "^.*\\\\/(.+)", "$1")) AS ?hasCopy__dataProviderUrl)
      }
    }
    UNION
    {
      {
        ?id ehri:isCopyOf ?isCopyOf .
        ?isCopyOf a ehri:RecordSet ;
          rico:title ?isCopyOf__prefLabel .
        BIND(CONCAT("/archivalDescriptions/page/", REPLACE(STR(?isCopyOf), "^.*\\\\/(.+)", "$1")) AS ?isCopyOf__dataProviderUrl)
      }
      UNION
      {
        ?id ehri:isCopyOf ?isCopyOf .
        ?isCopyOf a ehri:Institution ;
          rico:name ?isCopyOf__prefLabel .
        BIND(CONCAT("/institutions/page/", REPLACE(STR(?isCopyOf), "^.*\\\\/(.+)", "$1")) AS ?isCopyOf__dataProviderUrl)
      }
    }
    UNION
    {
      ?id ehri:publicationnote ?publicationNote .
    }
    UNION
    {
      ?id ehri:sources ?sources .
    }
    UNION
    {
      ?id ehri:notes ?notes .
    }
    UNION
    {
      ?id ehri:archivistNote ?archivistNote .
    }
    UNION
    {
      ?id ehri:relatedMaterial ?relatedMaterial .
    }
    UNION
    {
      ?id ehri:separatedMaterial ?separatedMaterial .
    }
    UNION
    {
      ?id rico:hasOrHadIdentifier/rico:textualValue ?otherIdentifiers .
    }
`

export const descriptionsLocationsQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?description) as ?instanceCount)
  WHERE {
    <FILTER>
    ?description rico:hasOrHadHolder ?institution .
    ?institution rico:agentHasOrHadLocation ?location .
    ?location rico:hasOrHadPhysicalLocation ?physicalLocation .
    ?physicalLocation rico:hasOrHadCoordinates ?id .
    ?id rico:latitude ?lat ;
        rico:longitude ?long .
  }
  GROUP BY ?id ?lat ?long
`

export const descriptionsPropertiesInfoWindow = `
  ?description rico:hasOrHadHolder ?institution .
  ?institution rico:agentHasOrHadLocation ?location .
  ?location rico:hasOrHadPhysicalLocation ?physicalLocation .
  ?physicalLocation rico:hasOrHadCoordinates ?id .
  ?institution rico:name ?prefLabel__id .
    BIND(?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(CONCAT("/institutions/page/", REPLACE(STR(?institution), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`

export const descriptionCopyLinksNetworkQuery = `
  SELECT DISTINCT (?id as ?source) ?target (1 as ?weight) ?typeOfRelation
  WHERE {
    VALUES ?id { <ID> }
    {
      ?id ehri:hasCopy ?target .
      BIND("has copy" AS ?typeOfRelation)
    }
    UNION
    { 
      ?id ehri:isCopyOf ?target .
      BIND("is copy of" AS ?typeOfRelation)
    }
  }
`

export const descriptionCopyLinksNetworkNodeQuery = `
  SELECT DISTINCT ?id ?prefLabel ?class ?href
  WHERE {
    VALUES ?id { <ID_SET> }
    {
      VALUES ?class { ehri:RecordSet }
      ?id a ?class ;
        rico:identifier ?identifier ;
        rico:hasOrHadHolder ?institution .
      ?institution rico:name ?institutionName .
      BIND(CONCAT(?institutionName, " (", ?identifier, ")") AS ?prefLabel)
      BIND(CONCAT("/archivalDescriptions/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?href)
    }
    UNION
    {
      VALUES ?class { ehri:Institution }
      ?id a ?class ;
        rico:name ?prefLabel .
      BIND(CONCAT("/institutions/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?href)
    }
  }
`

export const archivalDescriptionsPerCountryQuery = `
  SELECT (?country AS ?category) ?prefLabel (COUNT(DISTINCT ?archivalDescription) as ?instanceCount)
  WHERE {
    {
      ?archivalDescription rico:hasOrHadHolder ?institution .
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

export const archivalDescriptionsPerRegionQuery = `
  SELECT (?region AS ?category) ?prefLabel (COUNT(DISTINCT ?archivalDescription) as ?instanceCount)
  WHERE {
    {
      ?archivalDescription rico:hasOrHadHolder ?institution .
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

export const archivalDescriptionsPerCityQuery = `
  SELECT (?city AS ?category) ?prefLabel (COUNT(DISTINCT ?archivalDescription) as ?instanceCount)
  WHERE {
    {
      ?archivalDescription rico:hasOrHadHolder ?institution .
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