import cheerio from 'cheerio'

export async function get({ url: { searchParams } }) {
	const q = searchParams.get('q') || ''

	const url = `https://www.recetas-venezolanas.com/buscar/${q}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipes =  $('.itemsAll .itemPublic a').map((i, el) => {
		return {
			title: $(el).find('h2').text(),
			url: $(el).attr('href'),
			image: $(el).find('amp-img').attr('src'),
		}
	}).toArray()	
	
	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes
	}
}