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
