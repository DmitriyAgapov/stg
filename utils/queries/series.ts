import { ProductPart, SeoPart, SeriePart, SeriePartLocale } from "@/utils/queries/fragments";

export const querySeries = `query Series{series{data{attributes{slug}}}}`
export const querySerie = `
${SeoPart}
${SeriePart}
query Serie($slug: String!) {
  findSlug(modelName: "serie", slug: $slug) {
    ... on SerieEntityResponse {      
      data {
        id
        ...SeriePart
        
      }
    }
  }
}`
export const querySerieLocale = `
${SeoPart} 
${ProductPart}
${SeriePartLocale}

query SerieLocale($locale: I18NLocaleCode, $slug: String!) {
  series(locale: $locale, filters: { slug: { eq: $slug } }) {
    data {
      ...SeriePartLocale
    }
  }
}`

export const querySeriesLocale = `
${SeriePartLocale}
query SeriesLocale($locale: I18NLocaleCode) {
  series(locale: $locale) {
    data {
      ...SeriePartLocale
    }
  }
}
`

