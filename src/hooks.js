import {getCache,setCache} from '$lib/upstash'
export async function handle({ request, resolve }) {
	// request.locals.user = await getUserInformation(request.headers.cookie);
	// const q = request.query.get('q')
	const url = request.query.get('url') || ''

	const isRecipePath =/show\.json$/.test(request.path)

	if ( isRecipePath ) {
		let { data: recipe } = await getCache(url)
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