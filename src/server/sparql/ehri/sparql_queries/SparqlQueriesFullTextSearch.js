export const fullTextSearchProperties = `
  {
    VALUES ?type__id {
      ehri:Country
      ehri:Institution
      ehri:RecordSet
      ehri:CorporateBody
      ehri:Person
      skos:Concept
    }
    ?id a ?type__id .
    OPTIONAL {
      ?id skos:inScheme ?scheme .
    }
    BIND (
      COALESCE(
        IF(?type__id = ehri:Country, "Country", 1/0),
        IF(?type__id = ehri:Institution, "Institution", 1/0),
        IF(?type__id = ehri:RecordSet, "Archival Description", 1/0),
        IF(?scheme = <http://lod.ehri-project-test.eu/vocabularies/ehri-terms>, "Term", 1/0),
        IF(?scheme = <http://lod.ehri-project-test.eu/vocabularies/ehri-camps>, "Camp", 1/0),
        IF(?scheme = <http://lod.ehri-project-test.eu/vocabularies/ehri-ghettos>, "Ghetto", 1/0),
        IF(?type__id = ehri:CorporateBody, "Corporate Body", 1/0),
        IF(?type__id = ehri:Person, "Person", 1/0),
        ""
      ) AS ?type__prefLabel
    )
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
  UNION
  {
    ?id skos:inScheme <http://lod.ehri-project-test.eu/vocabularies/ehri-terms> .
    ?id skos:prefLabel ?prefLabel__id .
    FILTER(LANG(?prefLabel__id) = 'en')
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/terms/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id skos:inScheme <http://lod.ehri-project-test.eu/vocabularies/ehri-camps> .
    ?id skos:prefLabel ?prefLabel__id .
    FILTER(LANG(?prefLabel__id) = 'en')
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/camps/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id skos:inScheme <http://lod.ehri-project-test.eu/vocabularies/ehri-ghettos> .
    ?id skos:prefLabel ?prefLabel__id .
    FILTER(LANG(?prefLabel__id) = 'en')
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/ghettos/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id a ehri:CorporateBody .
    ?id rico:name ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/corporateBodies/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  UNION
  {
    ?id a ehri:Person .
    ?id rico:name ?prefLabel__id .
    BIND(?prefLabel__id as ?prefLabel__prefLabel)
    BIND(CONCAT("/persons/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  }
  `
