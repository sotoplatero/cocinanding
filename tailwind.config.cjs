const { tailwindExtractor } = require("tailwindcss/lib/lib/purgeUnusedStyles");

module.exports = {
	mode: "jit",
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/aspect-ratio'),	
	],
};
