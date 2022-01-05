import cheerio from 'cheerio'

export async function get({ url: { searchParams } }) {
	const q = searchParams.get('q') || ''

	const url = `https://www.divinacocina.es/?s=${q}`
	const res = await fetch(url)
	const html = await res.text()
	const $ = cheerio.load(html)

	const recipes =  $('article')
        .filter( (i,el) => /recetas/gi.test( $(el).find('span.cat').text() ) )
        .map((i, el) => ({
                title: $(el).find('.entry-title a').text().trim(),
                url: $(el).find('.entry-title a').attr('href'),
                image: $(el).find('a.penci-image-holder').attr('style').match(/\('(.+)'\)/)[1],
        })).toArray()	

	return {
		header: {
			'Cache-Control': 'max-age=0, s-maxage=86400'
		},
		body: recipes
	}
}