import cheerio from 'cheerio'

export async function get({ url: { searchParams } }) {
	const url = searchParams.get('url')

	if ( !url ) return null

	const res = await fetch(`http://${url}`)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipe = {
			url: res.url,
			title: $('h1.entry-title').text(),
			image: $('article img[data-lazy-src]').attr('data-lazy-src'),
			ingredients: $('.wprm-recipe-ingredient').map( (i,el) => $(el).text().trim() ).toArray(),
			instructions: $('.wprm-recipe-instruction').map( (i,el) => $(el).text().trim() ).toArray(),
			country: 'mexico'
	}

	return {
		header: {
			'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		},
		body: recipe
	}
}