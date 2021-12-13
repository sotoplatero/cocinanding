export async function handle({ request, resolve }) {
	// request.locals.user = await getUserInformation(request.headers.cookie);
	const q = request.query.get('q')
	const response = await resolve(request);

	return {	
		...response,
		headers: {
			'Set-Cookie': `q=${q}; Path=/`,
			...response.headers,
		}
	};
}