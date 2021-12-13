import cheerio from 'cheerio'

export async function get({ query }) {
	const url = query.get('url')

	if ( !url ) return null

	const url = `http://${url}`
	const res = await fetch(url)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipe = {
			url: response.url,
			title: $('h1').text(),
			image: $('amp-img').attr('src'),
			ingredients: $('.ingredient').map( (i,el) => $(el).text().trim() ).toArray(),
			instructions: $('.itemCompleteBottomPreparation ol li').map( (i,el) => $(el).text().trim() ).toArray(),
			country: 'cuba'
	}

	return {
		header: {
			'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		},
		body: recipe
	}
}