import cheerio from 'cheerio'
import { randomText } from '$lib/config'

export async function get({ query }) {
	const q = query.get('q') || randomText()

	const url = `https://www.recetasderechupete.com/?s=${q}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipes =  $('article section .pure-g div a').map((i, el) => {
		return {
			title: $(el).text(),
			url: $(el).attr('href'),
			image: $(el).find('img').attr('src'),
		}
	}).toArray()

	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes
	}
}