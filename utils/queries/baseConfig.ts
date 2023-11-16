export const baseConfig = `query Contacts($locale: I18NLocaleCode) { baseConfig(locale: $locale) { data { attributes { CompanyName address email { value id } phone { id value } } } } } `
export const queryMenuHeader = `query Menu($id:ID){menusMenu(id:$id){__typename data{attributes{items{__typename data{__typename id attributes{title_en url parent{__typename data{id}}title}}}}}}}`
