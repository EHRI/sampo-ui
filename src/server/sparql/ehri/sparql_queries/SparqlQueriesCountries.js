export const countryProperties = `
    {
      ?id rico:name ?prefLabel__id .
      BIND(?prefLabel__id AS ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
      BIND(CONCAT("/countries/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(CONCAT("https://portal.ehri-project.eu/countries/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__prefLabel)
      BIND(CONCAT("https://portal.ehri-project.eu/countries/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?portalURI__dataProviderUrl)
      FILTER(LANG(?prefLabel__id) = 'en')
    }
    UNION
    {
      ?id ehri:archivalHistory ?archivalHistory .
    }
    UNION
    {
      ?id ehri:archivalSituation ?archivalSituation .
    }
    UNION
    {
      ?id ehri:researchExtensive ?researchExtensive .
    }
    UNION
    {
      ?id ehri:researchSummary ?researchSummary .
    }
    UNION
    {
      ?id owl:sameAs ?flag__id .
      SERVICE <https://dbpedia.org/sparql/> {
        ?flag__id dbo:thumbnail ?flag__url .
      }
    }
    UNION
    {
      SELECT ?id (COUNT(?institution) AS ?numberOfInstitutions) WHERE {
        ?id rico:isOrWasLocationOfAgent ?institution .
      } GROUP BY ?id
    }
    UNION
    {
      SELECT ?id (COUNT(?description) AS ?numberOfDescriptions) WHERE {
        ?id rico:isOrWasLocationOfAgent/rico:isOrWasHolderOf ?description .
      } GROUP BY ?id
    }
`
