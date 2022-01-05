import {getCache,setCache} from '$lib/upstash'
export async function handle({ request, resolve }) {

	const url = request.url.searchParams.get('url') || ''

	const isRecipePath =/show\.json$/.test(request.url.pathname)

	if ( isRecipePath ) {
		// let { data: recipe } = await getCache(url)
		let recipe
		if (!!recipe) {
			return {
				body: recipe
			}
		}
	}

	const response = await resolve(request);

	if (isRecipePath && response.status === 200) {
		setCache(url, response.body)
	}

	return {	
		...response,
		headers: {
			// 'Set-Cookie': `q=${q}; Path=/`,
			...response.headers,
		}
	};
}