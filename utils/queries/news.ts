export const queryLastNews = `query LastNews($locale: I18NLocaleCode) { posts(pagination: { limit: 10 }, locale: $locale) { __typename data { __typename id attributes { title shortText slug publishedAt post_category { data { attributes { title slug } } } image { data { id __typename attributes { width height url __typename caption } } } } } } }
`
export const queryAllCategories = `query AllCategories($locale: I18NLocaleCode) { postCategories(locale: $locale) { __typename data { __typename id attributes { __typename title slug } } } }`
