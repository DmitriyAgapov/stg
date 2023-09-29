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
