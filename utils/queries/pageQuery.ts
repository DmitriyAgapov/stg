import { ImagePart, ImagesPart, PostPart, SectionPart, SeriesPartNoSeo } from "@/utils/queries/fragments";

export const pageQuery = `query Page($locale:  I18NLocaleCode, $id: ID) {
  page(locale: $locale, id: $id) {
    data {
      id
      attributes {
        BaseFields {
          id
          Title
          shortText
          Text
        }
      }
    }
  }
}`
export const queryCatalogPage = ` ${ImagePart}${ImagesPart}  ${SectionPart} query Catalog($locale:I18NLocaleCode){catalog(locale:$locale){data{__typename id attributes{__typename title description         sections { ...SectionPart } series{data{...SeriePartNoSeo}}seo{...SeoPart}}}}}`
export const queryMainPage = ` ${ImagePart}  ${SeriesPartNoSeo}  query MainPage($locale:I18NLocaleCode){glavnaya(locale:$locale){__typename data{__typename id attributes{__typename title sections{__typename data{id attributes{__typename nextLink media{data{attributes{name mime url}}}title background{__typename data{id __typename attributes{__typename url width height}}}type cards{__typename id text link description image{__typename data{__typename id attributes{url width height}}}}Links{__typename id text url}shortText series{__typename data{...SeriePartNoSeo}}}}}seo{...SeoPart}}}}}`
// export const queryCatalogPage = ` ${SeriesPartNoSeo}  query CatalogPage($locale:I18NLocaleCode){glavnaya(locale:$locale){__typename data{__typename id attributes{__typename title sections{__typename data{id attributes{__typename nextLink media{data{attributes{name mime url}}}title background{__typename data{id __typename attributes{__typename url width height}}}type cards{__typename id text link description image{__typename data{__typename id attributes{url width height}}}}Links{__typename id text url}shortText series{__typename data{...SeriePartNoSeo}}}}}seo{...SeoPart}}}}}`
