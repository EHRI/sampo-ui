export const fullTextSearchProperties = `
  {
    VALUES ?type__id {
      ehri:Country
      ehri:Institution
      ehri:RecordSet
    }
    ?id a ?type__id .
    BIND(REPLACE(REPLACE(STR(?type__id), "http://lod.ehri-project-test.eu/ontology#", ""), "RecordSet", "Archival Description") AS ?type__prefLabel)
    
  }
  UNION
  {
    ?id a ehri:Country .
    ?id rico:name ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/countries/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id a ehri:Institution .
    ?id rico:name ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/institutions/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id a ehri:RecordSet .
    ?id rico:title ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/archivalDescriptions/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  `
