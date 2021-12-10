import cheerio from 'cheerio'
import { randomText } from '$lib/config'

export async function get({ query }) {
	const q = query.get('q') || randomText()

	const url = `https://www.recetasdeescandalo.com/?s=${q}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipes =  $('article').map((i, el) => {
		return {
			title: $(el).find('h2').text(),
			url: $(el).find('h2 a').attr('href'),
			image: $(el).find('.entry-featured.wp-post-image ').attr('data-src'),
		}
	}).toArray()

	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes
	}
}