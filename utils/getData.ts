import { simplifyResponse } from "@/utils/gql";

export const urlApi = (typeof window === "undefined") ? process.env.GRAPHQL_API : process.env.NEXT_PUBLIC_GRAPHQL_API || 'http://127.0.0.1:1337/graphql';

export const getData = async (query = "",  variables: {}) => {

	const response = await fetch(urlApi as string,{
		method: 'POST',
		headers: {
			"Authorization" : `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
			"Content-Type": "application/json"
		},
		body: JSON.stringify({
			query:  query,
			variables: {
				...variables
			}
		})
	})
	const { data } = await response.json();

	return {
		data: simplifyResponse(await data)
	}
}
