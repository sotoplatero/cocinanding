export async function handle({ request, resolve }) {
	// request.locals.user = await getUserInformation(request.headers.cookie);
	console.log(request.query)
	const response = await resolve(request);

	return {	
		...response,
		headers: {
			...response.headers,
		}
	};
}