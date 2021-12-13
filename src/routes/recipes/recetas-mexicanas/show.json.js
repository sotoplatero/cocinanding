import cheerio from 'cheerio'

export async function get({ query }) {
	const url = query.get('url')

	if ( !url ) return null

	const res = await fetch(`http://${url}`)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipe = {
			url: res.url,
			title: $('.article-full h1').text(),
			image: $('.post-thumbnail img').attr('src'),
			ingredients: $('.article-full ul li').map( (i,el) => $(el).text().trim() ).toArray(),
			instructions: $('.article-full h2 ~ p').map( (i,el) => $(el).text().trim() ).toArray(),
			country: 'mexico'
	}

	return {
		header: {
			'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		},
		body: recipe
	}
}