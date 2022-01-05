import cheerio from 'cheerio'

export async function get({ url: { searchParams } }) {
	const url = searchParams.get('url')

	if ( !url ) return null

	const res = await fetch(`http://${url}`)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipe = {
			url: res.url,
			title: $('h1.post-title').text(),
			image: $('.entry-content picture img').attr('src'),
			ingredients: $('.post-entry ul li').map( (i,el) => $(el).text().trim() ).toArray(),
			instructions: $('.post-entry ol li').map( (i,el) => $(el).text().trim() ).toArray(),
	}

	return {
		header: {
			'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		},
		body: recipe
	}
}