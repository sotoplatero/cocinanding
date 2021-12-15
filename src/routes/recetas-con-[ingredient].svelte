<script context="module">
	import { SITES } from '$lib/config'
	import '$lib/random'

	export async function load({ page,fetch }) {
		const { ingredient } = page.params
		const sites = SITES['*']
		const site = sites.random()
		console.log(site);
		const res = await fetch(`/recipes/${site}.json?q=${ingredient}`);
		if (!res.ok) {
			return {
				error: new Error(`Could not load`)
			};
		}

		const recipes = await res.json()

		return {
			props: { sites,	recipes, ingredient }
		};

	}	
</script>

<script>
	import { page } from '$app/stores';
    import Meta from '$lib/components/Meta.svelte'	
	import Recipes from '$lib/components/Recipes.svelte'

	export let recipes = []
	export let sites = []
	export let ingredient = ''

</script>

<Meta 
	title="Recetas con {$page.params.ingredient}"
	image={recipes[1].image}
/>

<Recipes {recipes} {sites} scope={ingredient}/>
