import cheerio from 'cheerio'
import {Q} from '$lib/config'
import '$lib/random'

export async function get({ url: { searchParams } }) {
	const q = searchParams.get('q') || Q.random()

	const res = await fetch(`https://recetacubana.com/?s=${q}`)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipes =  $('article.type-post').map((i, el) => {
		return {
			title: $(el).find('h2').text().trim().replace(/\.+$/,''),
			url: $(el).find('h2 a').attr('href'),
			image: $(el).find('img.post-image').attr('data-src'),
		}
	})
	.toArray()	
	.filter(el=>!!el.image)

	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes
	}
}