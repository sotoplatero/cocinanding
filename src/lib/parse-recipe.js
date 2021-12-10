import cheerio from 'cheerio'
// import {fetch} from 'sveltekit'

export const parseRecipe = async (url) => {

    const response = await fetch( url )
    
    const html = await response.text()
	const $ = cheerio.load(html)	

	if ( /recetasgratis/.test(url) ) {
		return {
			url: response.url,
			title: $('.titulo.titulo--articulo').text(),
			image: $('.imagen.lupa img').attr('src'),
			ingredients: $('.ingredientes ul li').map((i,el) => $(el).text().trim() ).toArray(),
			instructions: $('div.apartado[id^="anchor_"] p').map((i,el) => $(el).text().trim() ).toArray(),
			commensals: parseInt( $('.property.comensales').text() || '0' ),
			time: $('.property.duracion').text().trim(),
		}
	}

	if ( /recetasdeescandalo/.test(url) ) {
		return {
			url: response.url,
			title: $('article h1').text(),
			image: $('img.wp-post-image').attr('data-src'),
			ingredients: $('article .receta ul li').map( (i,el) => $(el).text().trim() ).toArray(),
			instructions: $('article .receta ol li').map( (i,el) => $(el).text().trim() ).toArray(),
			commensals: '',
			time: '',
		}
	}

	return {}

}
