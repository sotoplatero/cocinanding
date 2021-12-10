import cheerio from 'cheerio'
import { parseRecipe } from '$lib/parse-recipe'
import { getCache, setCache } from '$lib/upstash'


export async function get({ query }) {
	const url = query.get('url')

	try {
		let { data: recipe } = await getCache(url)
		// let recipe

		if (!recipe) {
			recipe = await parseRecipe(`http://${url}`)
			const res = await setCache(url, JSON.stringify(recipe) )
		}

	    return {
			header: {
				'Cache-Control': 'max-age=0, s-maxage=86400'
			},	    	
	    	body: recipe
	    }

	} catch (err) {
		console.log(err)
	}
}