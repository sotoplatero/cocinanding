<!-- <script context="module">

	export async function load({ fetch }) {

		const res = await fetch(`/recipes.json`);

		if (!res.ok) {
			return {
				error: new Error(`Could not load`)
			};
		}
		const { sites, recipes } = await res.json()

		return {
			props: { sites, recipes	}
		};

	}	
</script> -->

<script>
	import {page} from '$app/stores'
	// import {onMount} from 'svelte'
	import {SITES, Q} from '$lib/config'
	import Recipes from '$lib/components/Recipes.svelte'
	import '$lib/random'

	// let recipes = []
	let sites = SITES['*']
	const q = $page.query.get('q') || Q.random()
	let promiseRecipes = getRecipes()

	async function getRecipes() {
		const res = await fetch(`/recipes/${ sites.random() }.json?q=${q}`);
		return res.ok ? await res.json() : []
	}
	
</script>

{#await promiseRecipes then recipes}
	<Recipes {recipes} {sites} />
{/await}
