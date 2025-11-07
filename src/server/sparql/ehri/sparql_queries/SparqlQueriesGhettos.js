export const ghettosProperties = `
  {
    ?id skos:prefLabel ?prefLabel__id ;
    BIND(?prefLabel__id AS ?prefLabel__prefLabel)
    BIND(?id as ?uri__id)
    BIND(?id as ?uri__dataProviderUrl)
    BIND(?id as ?uri__prefLabel)
    BIND(CONCAT("/ghettos/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
    BIND(CONCAT("https://portal.ehri-project.eu/keywords/ehri_ghettos-", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__prefLabel)
    BIND(CONCAT("https://portal.ehri-project.eu/keywords/ehri_ghettos-", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__dataProviderUrl)
    FILTER(LANG(?prefLabel__id) = 'en')
  }
  UNION
  {
    ?id skos:prefLabel ?otherLabels .
    FILTER(LANG(?otherLabels) != 'en')
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

export const ghettosLocationsQuery = `
  SELECT ?id ?lat ?long
  (COUNT(DISTINCT ?ghetto) as ?instanceCount)
  WHERE {
    <FILTER>
    ?ghetto skos:inScheme <http://lod.ehri-project-test.eu/vocabularies/ehri-ghettos> ;
      geo:lat ?lat ;
      geo:long ?long .
    BIND(?ghetto AS ?id)
  }
  GROUP BY ?id ?lat ?long
`

export const ghettosPropertiesInfoWindow = `
  ?id skos:prefLabel ?prefLabel__id .
  FILTER(LANG(?prefLabel__id) = 'en')
  BIND(?prefLabel__id AS ?prefLabel__prefLabel)
  BIND(CONCAT("/ghettos/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
`