export const termsProperties = `
  {
    ?id skos:prefLabel ?prefLabel__id ;
    BIND(?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?id as ?uri__prefLabel)
    BIND(CONCAT("/terms/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
    BIND(CONCAT("https://portal.ehri-project.eu/keywords/ehri_terms-", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__prefLabel)
    BIND(CONCAT("https://portal.ehri-project.eu/keywords/ehri_terms-", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__dataProviderUrl)
    FILTER(LANG(?prefLabel__id) = 'en')
  }
  UNION
  {
    ?id skos:prefLabel ?otherLabels .
    FILTER(LANG(?otherLabels) != 'en')
  }
  UNION
  {
    ?id skos:broader ?broader .
    ?broader skos:prefLabel ?broader__prefLabel .
    BIND(?broader as ?broader__id)
    BIND(CONCAT("/terms/page/", REPLACE(STR(?broader), "^.*\\\\/(.+)", "$1")) AS ?broader__dataProviderUrl)
    FILTER(LANG(?broader__prefLabel) = 'en')
  }
  UNION
  {
    ?id skos:narrower ?narrower .
    ?narrower skos:prefLabel ?narrower__prefLabel .
    BIND(?narrower as ?narrower__id)
    BIND(CONCAT("/terms/page/", REPLACE(STR(?narrower), "^.*\\\\/(.+)", "$1")) AS ?narrower__dataProviderUrl)
    FILTER(LANG(?narrower__prefLabel) = 'en')
  }
  UNION
  {
    SELECT ?id (COUNT(?description) AS ?numberOfConnectedDescriptions) WHERE {
      ?id ^rico:hasOrHadSubject ?description .
    } GROUP BY ?id
  }
`

export const termsPlusLinkedDescriptionsProperties = termsProperties + `
  BIND(CONCAT("/sampo/en/archivalDescriptions/faceted-search/table?page=0&constraints=%5B%7B%22facetClass%22%3A+%22archivalDescriptions%22%2C+%22facetId%22%3A%22ehriTerms%22%2C%22filterType%22%3A%22uriFilter%22%2C%22value%22%3A%7B%22node%22%3A%7B%22id%22%3A%22",  STR(?id), "%22%2C%22prefLabel%22%3A%22", STR(?prefLabel__id), "%22%7D%7D%7D%5D") AS ?archivalDescriptionsLink)
  BIND(?archivalDescriptionsLink AS ?archivalDescriptionsLink__dataProviderUrl)
  BIND("Use this term as filter in the archival descriptions perspective" AS ?archivalDescriptionsLink__prefLabel)
`

export const termNetworkNarrowerLinksQuery = `
  SELECT DISTINCT (?id as ?source) ?target (1 as ?weight) ?typeOfRelation
  WHERE {
    VALUES ?id { <ID> }
    ?id skos:narrower ?target .
    BIND("narrower" as ?typeOfRelation)
  }   
`

export const termNetworkBroaderLinksQuery = `
  SELECT DISTINCT (?id as ?source) ?target (1 as ?weight) ?typeOfRelation
  WHERE {
    VALUES ?id { <ID> }
    ?id skos:broader ?target .
    BIND("broader" as ?typeOfRelation)
  }   
`

export const termNetworkNodeQuery = `
  SELECT DISTINCT ?id ?prefLabel ?class ?href
  WHERE {
    VALUES ?id { <ID_SET> }
    ?id skos:inScheme <http://lod.ehri-project-test.eu/vocabularies/ehri-terms> ;
      a ?class ;
      skos:prefLabel ?prefLabel .
    BIND(CONCAT("/terms/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?href)
    FILTER(LANG(?prefLabel) = 'en')
  }
`
