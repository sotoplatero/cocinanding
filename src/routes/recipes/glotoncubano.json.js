import cheerio from 'cheerio'

export async function get({ query }) {
	const q = query.get('q') || ''

	const url = `https://glotoncubano.com/?s=${q}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipes =  $('.td_module_wrap').map((i, el) => {
		return {
			title: $(el).find('.entry-title').text().trim(),
			url: $(el).find('.entry-title a').attr('href'),
			image: $(el).find('img.entry-thumb').attr('data-img-url'),
		}
	}).toArray()	

	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes
	}
}