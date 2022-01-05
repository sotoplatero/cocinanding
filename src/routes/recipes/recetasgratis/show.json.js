import cheerio from 'cheerio'

export async function get({ url: { searchParams } }) {
	const url = searchParams.get('url')

	if ( !url ) return null

	const res = await fetch(`http://${url}`)
	const html = await res.text()

	const $ = cheerio.load(html)

	const recipe = {
			url: res.url,
			title: $('.titulo.titulo--articulo').text(),
			image: $('.imagen.lupa img').attr('src'),
			ingredients: $('.ingrediente').map((i,el) => $(el).text().trim() ).toArray(),
			instructions: $('div.apartado[id^="anchor_"] p').map((i,el) => $(el).text().trim() ).toArray(),
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