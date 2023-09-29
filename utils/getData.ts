export const urlApi = process.env.GRAPHQL_API;

export const getData = async (query = "", locale = 'ru', variables: any | undefined) => {

	const response = await fetch(urlApi as string,{
		method: 'POST',
		headers: {
			"Authorization" : `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			query:  query,
			"variables": {
				locale: locale,
				...variables
			}
		})
	})
	const { data } = await response.json();

	return data
}
