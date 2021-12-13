import cheerio from 'cheerio'

export async function get({ query }) {
	const q = query.get('q') || ''

	const url = `https://recetatipica.com/?s=${q}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)


	const recipes =  $('article').map((i, el) => {
		return {
			title: $(el).find('.titulo.titulo--resultado').text(),
			url: $(el).find('.titulo.titulo--resultado').attr('href'),
			image: $(el).find('.imagen').attr('src'),
		}
	}).toArray()	

	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes
	}
}