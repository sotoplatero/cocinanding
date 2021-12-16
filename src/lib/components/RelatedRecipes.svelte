<script>
	import Recipe from '$lib/components/Recipe.svelte'
	import { Q, SITES } from '$lib/config'
	import '$lib/random'

    export let recipe

    async function getRelatedRecipes() {
		let recipes = []
		const site = recipe.country ? SITES[recipe.country].random() : SITES['*'].random()
		console.log(site)
		const response = await fetch(`/recipes/${site}.json?q=${encodeURIComponent(recipe.title)}`);

        if (response.ok) {
			const result = await response.json();
            recipes = result.slice(0,3)
        }
        return recipes
    }	

    let promiseRecipes = getRelatedRecipes() 

</script>

<div class="mt-16 print:hidden">
	{#await promiseRecipes then recipes}
		{#if recipes.length}
	        <h2 class="text-2xl sm:text-4xl font-semibold mb-8 mt-10 text-center">
	            También te pueden interesar
	        </h2>
	        <div class="grid grid-cols-1 sm:grid-cols-3 gap-12 justify-center">
	            {#each recipes as recipe, index}
					<Recipe {recipe}/>
	            {/each}
	        </div>
		{/if}
			
	{/await}
</div>