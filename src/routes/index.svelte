<script context="module">
	import {Q,SITES} from '$lib/config'
	import '$lib/random'

	export async function load({ fetch }) {
		const site = SITES['*'].random()

		const res = await fetch(`/recipes/${site}.json?q=${Q.random()}`);

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
	$: console.log(recipes);
</script>

<Recipes {recipes} {sites} />
