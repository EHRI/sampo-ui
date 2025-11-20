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

export const countryPlusLinkProperties = countryProperties + `
  BIND(CONCAT("/sampo/en/archivalDescriptions/faceted-search/table?page=0&constraints=%5B%7B%22facetClass%22%3A+%22archivalDescriptions%22%2C+%22facetId%22%3A%22country%22%2C%22filterType%22%3A%22uriFilter%22%2C%22value%22%3A%7B%22node%22%3A%7B%22id%22%3A%22",  STR(?id), "%22%2C%22prefLabel%22%3A%22", STR(?prefLabel__id), "%22%7D%7D%7D%5D") AS ?archivalDescriptionsLink)
  BIND(?archivalDescriptionsLink AS ?archivalDescriptionsLink__dataProviderUrl)
  BIND("Use this country as filter in the archival descriptions perspective" AS ?archivalDescriptionsLink__prefLabel)

  BIND(CONCAT("/sampo/en/institutions/faceted-search/table?page=0&constraints=%5B%7B%22facetClass%22%3A+%22institutions%22%2C+%22facetId%22%3A%22country%22%2C%22filterType%22%3A%22uriFilter%22%2C%22value%22%3A%7B%22node%22%3A%7B%22id%22%3A%22",  STR(?id), "%22%2C%22prefLabel%22%3A%22", STR(?prefLabel__id), "%22%7D%7D%7D%5D") AS ?institutionsLink)
  BIND(?institutionsLink AS ?institutionsLink__dataProviderUrl)
  BIND("Use this country as filter in the institutions perspective" AS ?institutionsLink__prefLabel)

`
