import cheerio from 'cheerio'

export async function get({ url: { searchParams } }) {
	const url = searchParams.get('url')

	if ( !url ) return null

	const res = await fetch(`http://${url}`, { redirect: "error" })
	console.log(res);
	if (!res.ok) return null
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipe = {
			url: res.url,
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