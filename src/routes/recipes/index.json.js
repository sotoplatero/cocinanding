// const got = require('got')

export async function get({ params, query, headers }) {

    let q = query.get('q')
    const l = query.get('l') || 'es'

    if (!q) {
        const meats = { 
            en: ['chicken', 'pork', 'tuna', 'meat', 'fish'],
            es: ['pollo', 'puerco', 'atun', 'carne', 'pescado'],
        }[l];
        q = meats[Math.floor(Math.random() * meats.length)];
        query.set('q',q)
    }

    if (query.has('size')) {
        const from = query.get('from') || '0'
        const size = query.get('size') || '12'
        query.append( 'to', parseInt(from) + parseInt(size) )
    }

    if (query.has('l')) query.delete('l')
    if (query.has('size')) query.delete('size')

    let url = `https://api.edamam.com/api/recipes/v2?${query.toString()}&type=public&app_id=8af2623e&app_key=e66ad7ba6533d24ebeae5ead426adaed`

    const response = await fetch(url)
    const {hits: recipes, _links: { next}} = await response.json()
    
    // result.hits = !!result.hits  ? result.hits.map( el => {
    //     const id = el.recipe.label.replace(/[\W\s]/g,'-') + '-' + el.recipe.uri.split('_')[1]
    //     return {...el.recipe, id: id}
    // }) : []

    return {
        body: {
            recipes: recipes.map(el=>el.recipe),
            next: next?.href
        }
    }

}