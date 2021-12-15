<script context="module">
	import {Q, SITES } from '$lib/config'
	import '$lib/random'

	export async function load({ page, fetch }) {
		const country = page.params.country
		const sites = SITES[country]
		if (!sites) return null
		const site = sites.random()
		const res = await fetch(`/recipes/${site}.json?q=pollo`);
		
		console.log(page);
		if (!res.ok) {
			return {
				error: new Error(`Could not load`)
			};
		}

		const recipes = await res.json()

		return {
			props: { recipes },
			noFurtherUpdates: true
		};

	}	
</script>

<script>
	import { page } from '$app/stores';
    import Meta from '$lib/components/Meta.svelte'	
	import Recipes from '$lib/components/Recipes.svelte'

	export let recipes = []
	export let sites = []

</script>

<Meta 
	title="Recetas de {$page.params.country}"
	image={recipes[1].image}
/>

<Recipes bind:recipes {sites} />