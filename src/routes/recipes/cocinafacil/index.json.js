import cheerio from 'cheerio'

export async function get({ query }) {
	const q = query.get('q') || ''

	const url = `https://www.cocinafacil.com.mx/search/${encodeURIComponent(q)}`
	const res = await fetch(url)
	const html = await res.text()
	const $ = cheerio.load(html)

	const recipes =  $('article')
        .filter( (i,el) => /recetas/gi.test( $(el).find('span.cat').text() ) )
        .map((i, el) => ({
                title: $(el).find('h2.grid-title').text().trim(),
                url: $(el).find('h2.grid-title a').attr('href'),
                image: $(el).find('.thumbnail a')?.attr('style')?.match(/\('(.+)'\)/)[1],
        })).toArray()	

	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes.filter( el => !/recetas\-/.test(el.url) )
	}
}