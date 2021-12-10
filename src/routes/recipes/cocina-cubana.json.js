import cheerio from 'cheerio'

export async function get({ query }) {
	const q = query.get('q') || ''

	const url = `https://www.cocina-cubana.com/buscar/${q.replace(/\s+/,'-')}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)


	const recipes =  $('.itemPublic a').map((i, el) => {
		return {
			title: $(el).find('h2').text(),
			url: $(el).attr('href'),
			image: $(el).find('.itemPublicImage img').attr('src'),
		}
	}).toArray()	

	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes
	}
}