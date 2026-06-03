export const corporateBodiesProperties = `
  {
    ?id rico:name ?prefLabel__id ;
    BIND(?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?id as ?uri__prefLabel)
    BIND(CONCAT("/corporateBodies/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
    BIND(CONCAT("https://portal.ehri-project.eu/authorities/ehri_cb-", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__prefLabel)
    BIND(CONCAT("https://portal.ehri-project.eu/authorities/ehri_cb-", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__dataProviderUrl)
  }
  UNION
  {
    ?id rico:hasOrHadAgentName/rico:name ?otherLabels .
  }
  UNION
  {
    ?id rdfs:seeAlso ?seeAlso__id .
    BIND(?seeAlso__id as ?seeAlso__dataProviderUrl)
    BIND(?seeAlso__id as ?seeAlso__prefLabel)
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
    ?id rico:generalDescription ?generalDescription .
  }
  UNION
  {
    ?id rico:history ?history .
  }
  UNION
  {
    ?id rico:performsOrPerformed [
      rico:hasActivityType ehri:FunctionType ;
      rico:generalDescription ?function 
    ] .
  }
  UNION
  {
    ?id rico:performsOrPerformed [
      rico:hasActivityType rico:OccupationType ;
      rico:generalDescription ?occupation 
    ] .
  }
  UNION
  {
    ?id rico:hasOrHadLegalStatus/rico:generalDescription ?legalStatus .
  }
  UNION
  {
    ?id rico:authorizedBy/rico:generalDescription ?mandate .
  }
  UNION
  {
    ?id ehri:structureOrGenealogy ?structure .
  }
  UNION
  {
    ?id ehri:sources ?sources .
  }
  UNION
  {
    SELECT ?id (COUNT(?description) AS ?numberOfConnectedDescriptions) WHERE {
      ?id ^rico:hasOrHadSubject ?description .
    } GROUP BY ?id
  }
`

export const corporateBodiesPlusLinkedDescriptionsProperties = corporateBodiesProperties + `
  BIND(CONCAT("/sampo/en/archivalDescriptions/faceted-search/table?page=0&constraints=%5B%7B%22facetClass%22%3A+%22archivalDescriptions%22%2C+%22facetId%22%3A%22ehriCBs%22%2C%22filterType%22%3A%22uriFilter%22%2C%22value%22%3A%7B%22node%22%3A%7B%22id%22%3A%22",  STR(?id), "%22%2C%22prefLabel%22%3A%22", STR(?prefLabel__id), "%22%7D%7D%7D%5D") AS ?archivalDescriptionsLink)
  BIND(?archivalDescriptionsLink AS ?archivalDescriptionsLink__dataProviderUrl)
  BIND("Use this corporate body as filter in the archival descriptions perspective" AS ?archivalDescriptionsLink__prefLabel)
`
