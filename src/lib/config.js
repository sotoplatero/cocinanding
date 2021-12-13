export const randomText = () => {
	const q = ['pollo', 'cerdo', 'atun', 'carne', 'pescado']
	return q[Math.floor(Math.random() * q.length)]
}

// export const SITES = [
// 	'recetasgratis',
// 	'recetasdeescandalo',
// 	// 'recetasderechupete',
// ]

export const SITES = {
	cuba: ['cocina-cubana','glotoncubano','decubanos'],
	mexico: [],
	peru: [],
	colombia: ['mycolombianrecipes'],
	venezuela: [],
	'*': [ 'recetasgratis',	'recetasdeescandalo'],
}