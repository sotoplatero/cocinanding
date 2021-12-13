import cheerio from 'cheerio'

export async function get({ query }) {
	const url = query.get('url')

	if ( !url ) return null

	const res = await fetch(`http://${url}`)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipe = {
			url: res.url,
			title: $('.entry-title').text(),
			image: $('.wp-block-image img').attr('data-lazy-src'),
			ingredients: $('.wprm-recipe-ingredient').map((i,el) => $(el).text().trim() ).toArray(),
			instructions: $('.wprm-recipe-instruction').map((i,el) => $(el).text().trim() ).toArray(),
			commensals: parseInt( $('.property.comensales').text() || '0' ),
			time: $('.property.duracion').text().trim(),
	}

	return {
		header: {
			'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		},
		body: recipe
	}
}