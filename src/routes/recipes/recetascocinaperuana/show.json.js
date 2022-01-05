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
			image: $('.featured-image img').attr('data-src'),
			ingredients: $('.entry-content ul li').map( (i,el) => $(el).text().trim() ).toArray().filter(el=>!!el),
			instructions: $('.entry-content ol li').map( (i,el) => $(el).text().trim() ).toArray(),
			country: 'peru'
	}

	return {
		header: {
			'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		},
		body: recipe
	}
}