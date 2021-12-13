import { parse } from 'tldts';
import { getCache, setCache } from '$lib/upstash'


export async function get({ query }) {
	const url = query.get('url')
	const site = parse(url).domainWithoutSuffix

	try {
		// let { data: recipe } = await getCache(url)
		let recipe

		if (!recipe) {
            const res = await fetch(`/recipes/${site}/show.json?url=${url}`);
            recipe = await res.json();

			if (!recipe) return null

			if (recipe) {
				await setCache(url, JSON.stringify(recipe) )
			}
		}

	    return {
			header: {
				'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
			},	    	
	    	body: recipe
	    }

	} catch (err) {
		console.log(err)
	}
}