<script>
	import Recipe from '$lib/components/Recipe.svelte'
	import { Q, SITES } from '$lib/config'
	import '$lib/random'

    export let recipe

    async function getRelatedRecipes() {
		let recipes = []
		const site = recipe.country ? SITES[recipe.country].random() : SITES['*'].random()

		const response = await fetch(`/recipes/${site}.json?q=${encodeURIComponent(recipe.title)}`);

        if (response.ok) {
			const result = await response.json();
            recipes = result.slice(0,6)
        }
        return recipes
    }	

    let promiseRecipes = getRelatedRecipes() 

</script>

{#await promiseRecipes}
	loading
{:then recipes}

	{#if recipes.length}
	    <div class="mt-16">
	        <h2 class="text-2xl sm:text-4xl font-semibold mb-6 mt-8">
	            Otras Recetas que te pueden interesar
	        </h2>
	        <div class="grid grid-cols-3 gap-12">
	            {#each recipes as recipe, index}
					<Recipe {recipe}/>
	            {/each}
	        </div>
	    </div>
	{/if}
	
{/await}