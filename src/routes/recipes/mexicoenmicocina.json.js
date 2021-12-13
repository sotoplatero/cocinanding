import cheerio from 'cheerio'

export async function get({ query }) {
	const q = query.get('q') || ''

	const url = `https://www.mexicoenmicocina.com/?s=${q}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipes =  $('article').map((i, el) => {
		return {
			title: $(el).find('h2').text().trim(),
			url: $(el).find('h2 a').attr('href'),
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