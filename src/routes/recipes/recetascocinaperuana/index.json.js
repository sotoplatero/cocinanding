import cheerio from 'cheerio'

export async function get({ url: { searchParams } }) {
	const q = searchParams.get('q') || ''

	const url = `https://recetascocinaperuana.com/?s=${q}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipes =  $('article:not(.type-page)').map((i, el) => {
		return {
			title: $(el).find('h2.entry-title').text(),
			url: $(el).find('h2.entry-title a').attr('href'),
			image: $(el).find('img.wp-post-image').attr('data-src'),
		}
	}).toArray()	

	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes.filter( el => !/recetas\-/.test(el.url) )
	}
}