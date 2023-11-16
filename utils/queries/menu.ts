export const queryNavItemPart = `fragment NavigationItemFragment on NavigationItem { title menuAttached id title id path }`
export const queryMenu = `${queryNavItemPart} query Menus($locale: I18NLocaleCode, $navslug: String!) {  renderNavigation(locale: $locale, navigationIdOrSlug: $navslug, type: TREE) { __typename id title path items { ...NavigationItemFragment items { ...NavigationItemFragment } } } }`
export const queryHeaderFooterMenu = `${queryNavItemPart} query Menus($locale: I18NLocaleCode) { header: renderNavigation(locale: $locale, navigationIdOrSlug: "header", type: TREE) { __typename id title path items { ...NavigationItemFragment items { ...NavigationItemFragment } } } footer:  renderNavigation(locale: $locale, navigationIdOrSlug: "footer", type: TREE) { __typename id title path items { ...NavigationItemFragment items { ...NavigationItemFragment } } } }`
