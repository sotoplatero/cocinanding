export const randomText = () => {
	const q = ['pollo', 'puerco', 'atun', 'carne', 'pescado']
	return q[Math.floor(Math.random() * q.length)]
}

export const SITES = [
	'recetasgratis',
	'recetasdeescandalo',
	// 'recetasderechupete',
]