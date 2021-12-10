import cheerio from 'cheerio'

export async function get({ query }) {
	const q = query.get('q') || ''

	const url = `https://recetascuba.com/?s=${q}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipes =  $('article').map((i, el) => {
		return {
			title: $(el).find('.post-box-title').text().trim().replace(/\.+$/,''),
			url: $(el).find('.post-box-title a').attr('href'),
			image: $(el).find('.post-thumbnail img').attr('src'),
		}
	}).toArray()	

	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes
	}
}