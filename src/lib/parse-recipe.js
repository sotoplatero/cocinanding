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

	if ( /mycolombianrecipes/.test(url) ) {
		return {
			url: response.url,
			title: $('.wprm-recipe-name').text(),
			image: $('.wprm-recipe-image img').attr('data-lazy-src'),
			ingredients: $('li.wprm-recipe-ingredient').map( (i,el) => $(el).text().trim() ).toArray(),
			instructions: $('li.wprm-recipe-instruction').map( (i,el) => $(el).text().trim() ).toArray(),
			country: 'colombia'
		}
	}
	if ( /cocina-cubana/.test(url) ) {
		return {
			url: response.url,
			title: $('h1').text(),
			image: $('amp-img').attr('src'),
			ingredients: $('.ingredient').map( (i,el) => $(el).text().trim() ).toArray(),
			instructions: $('.itemCompleteBottomPreparation ol li').map( (i,el) => $(el).text().trim() ).toArray(),
			country: 'cuba'
		}
	}
	if ( /glotoncubano/.test(url) ) {
		return {
			url: response.url,
			title: $('h1.entry-title').text(),
			image: $('amp-img').attr('src'),
			ingredients: $('.ingredient').map( (i,el) => $(el).text().trim() ).toArray(),
			instructions: $('.itemCompleteBottomPreparation ol li').map( (i,el) => $(el).text().trim() ).toArray(),
			country: 'cuba'
		}
	}
	


	return null

}
