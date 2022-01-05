import cheerio from 'cheerio'

export async function get({ url: { searchParams } }) {
	const url = searchParams.get('url')

	if ( !url ) return null

	const res = await fetch(`http://${url}`)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipe = {
        url: res.url,
        title: $('article h1').text(),
        image: $('img.wp-post-image').attr('data-src'),
        ingredients: $('article .receta ul li').map( (i,el) => $(el).text().trim() ).toArray(),
        instructions: $('article .receta ol li').map( (i,el) => $(el).text().trim() ).toArray(),
        commensals: '',
        time: '',
	}

	return {
		header: {
			'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		},
		body: recipe
	}
}