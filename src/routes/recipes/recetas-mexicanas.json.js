import cheerio from 'cheerio'

export async function get({ query }) {
	const q = query.get('q') || ''

	const url = `https://recetas-mexicanas.com.mx/?s=${q}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipes =  $('article a').map((i, el) => {
		return {
			title: $(el).find('p').text(),
			url: $(el).attr('href'),
			image: $(el).find('.article-image').attr('style').match(/https.+\.jpg/)[0],
		}
	}).toArray()	
	
	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes
	}
}