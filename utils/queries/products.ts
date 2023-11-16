import { ProductPart, SeoPart, SeriesPartNoSeo } from "@/utils/queries/fragments";
export const queryProducts = `${ProductPart}${SeoPart} query Products($slug: String, $locale: I18NLocaleCode) { products(locale: $locale, filters: { series: { slug: { eq: $slug } } }) { meta { __typename pagination { page total pageCount pageSize } } data { ...ProductPart attributes { seo { ...SeoPart } } } } }`
