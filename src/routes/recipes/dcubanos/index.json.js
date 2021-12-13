import cheerio from 'cheerio'
import {Q} from '$lib/config'
import '$lib/random'

export async function get({ query }) {
	const q = query.get('q') || Q.random()

	const url = `https://www.dcubanos.com/rinconcuba/?s=${q}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipes =  $('article').map((i, el) => {
		return {
			title: $(el).find('h2').text().trim().replace(/\.+$/,''),
			url: $(el).find('h2 a').attr('href'),
			image: $(el).find('.blog-post-image img').attr('src'),
		}
	}).toArray()	

	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes
	}
}