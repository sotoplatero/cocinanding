import cheerio from 'cheerio'

export async function get({ query }) {
	const url = query.get('url')

	if ( !url ) return null

	const res = await fetch(`http://${url}`)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipe = {
			url: res.url,
			title: $('h1.entry-title').text(),
			image: $('img.recipe-image').attr('data-src'),
			ingredients: $('ul.ing-list li').map( (i,el) => $(el).text().trim() ).toArray(),
			instructions: $('.recipe-instruction').map( (i,el) => $(el).text().trim() ).toArray(),
			country: 'cuba'
	}

	return {
		header: {
			'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		},
		body: recipe
	}
}