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
	const q = $page.url.searchParams.get('q') || Q.random()
	let promiseRecipes = getRecipes()

	async function getRecipes() {
		const recipes = await Promise.all(sites.map(async site => {
			const res = await fetch(`/recipes/${ site }.json?q=${q}`);
			return res.ok ? await res.json() : []
		}))

		return recipes.flat().slice(0,32)
	}
	
</script>

{#await promiseRecipes }
	loading
{:then recipes}
	<Recipes {recipes} {sites} />
{/await}
