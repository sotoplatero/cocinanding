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
			image: $('.wp-block-image img').attr('src'),
			ingredients: (()=>{
				let ingredients = $('.body-content ul li').map( (i,el) => $(el).text().trim() ).toArray()
				if (ingredients.length) return ingredients
				ingredients = $('.body-content p:first-of-type').text().replace('Ingredientes','')
				return	ingredients
			})(),
			instructions: $('.body-content ul ~ p').map( (i,el) => $(el).text().trim() ).toArray(),
			country: 'cuba'
	}

	return {
		header: {
			'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		},
		body: recipe
	}
}