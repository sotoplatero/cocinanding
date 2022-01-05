import cheerio from 'cheerio'

export async function get({ query }) {
	const url = query.get('url')

	if ( !url ) return null

	const res = await fetch(`http://${url}`)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipe = {
			url: res.url,
			title: $('.contentRecipe h1').text(),
			image: $('amp-img').attr('src'),
			ingredients: $('.ingredient').map( (i,el) => $(el).text().trim() ).toArray(),
			instructions: $('.itemCompleteBottomPreparation ol li').map( (i,el) => $(el).text().trim() ).toArray(),
			country: 'venezuela'
	}

	return {
		header: {
			'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		},
		body: recipe
	}
}