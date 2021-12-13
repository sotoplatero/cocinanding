<script context="module">
	import {SITES} from '$lib/config'

	export async function load({ fetch }) {
		const site = SITES['*'][Math.floor(Math.random() * SITES.length)]

		const res = await fetch(`/recipes/${site}.json`);

		if (!res.ok) {
			return {
				error: new Error(`Could not load`)
			};
		}

		return {
			props: { 
				sites: SITES,
				recipes: await res.json()
			}
		};

	}	
</script>

<script>
	import Recipes from '$lib/components/Recipes.svelte'
	export let recipes
	export let sites
</script>

<Recipes {recipes} {sites} />
