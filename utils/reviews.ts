import { SeoPart } from "@/utils/queries/fragments";

export const queryReviews = `query Reviews($locale: I18NLocaleCode) { reviews(locale: $locale) { meta { pagination { total } } __typename data { __typename id attributes { person text __typename createdAt } } } }`
export const queryReviewPage = `${SeoPart}query ReviewsPage($locale: I18NLocaleCode) { reviewPage(locale: $locale) { __typename data { __typename id attributes { title seo { ...SeoPart } description shortText } } } }`
