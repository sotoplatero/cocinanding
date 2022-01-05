import cheerio from 'cheerio'
import {Q} from '$lib/config'
import '$lib/random'

export async function get({ url: { searchParams } }) {
	const q = searchParams.get('q') || Q.random()

	const url = `https://www.cocina-cubana.com/buscar/${q.replace(/\s+/,'-')}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)


	const recipes =  $('.itemPublic a')
		.map((i, el) => {
			return {
				title: $(el).find('h2').text(),
				url: $(el).attr('href'),
				image: $(el).find('.itemPublicImage amp-img').attr('src'),
			}
		}).toArray()	

	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes
	}
}