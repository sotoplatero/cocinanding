import HTMLParser from 'fast-html-parser'
import { auth, set as setCache, get as getCache } from '@upstash/redis';

const UPSTASH_REDIS_REST_URL =  import.meta.env.VITE_UPSTASH_REDIS_REST_URL
const UPSTASH_REDIS_REST_TOKEN = import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN

import getSelectors from '$lib/selectors'
import { notify } from '$lib/bot'

async function getDetails({ source, url }) {
	try {
		const selectors = getSelectors( source )
		if ( JSON.stringify(selectors) !== JSON.stringify({}) ) {
		    const res = await fetch( url )
		    if (res.ok) {
			    const html = await res.text()
			    var doc = HTMLParser.parse(html);
			    return {
			    	description: !!selectors.selDescription ? doc.querySelector( selectors.selInstructions ).text : '',
			    	intructions: doc
				    	.querySelectorAll( selectors.selInstructions )
				    	.map( el => el.text.trim() )
				    	.filter( el => !!el ) ?? [],
			    }
		    }
		} else {
			notify(`source: ${source}, url: ${url}`)
		}
	} catch (e) {
		return {}
	}	

}

export async function get({ params, query }) {
	auth(UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN);
	const id = params.id.split('-').pop()

	try {
		let { data: recipe } = await getCache(id)

		if (recipe) {
			recipe = JSON.parse(recipe)
		} else {
		    let url = `https://api.edamam.com/api/recipes/v2/${id}?app_id=8af2623e&app_key=e66ad7ba6533d24ebeae5ead426adaed&type=public`
		    const response = await fetch(url)
		    let { recipe } = await response.json()
			details = await getDetails(recipe)
			recipe = { ...recipe, ...details }

			const res = await setCache(id, JSON.stringify(recipe) )
		}

	    return {
	    	body: recipe
	    }
	} catch (err) {console.log(err)}
}