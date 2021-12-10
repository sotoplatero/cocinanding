<script>
	import '$lib/random'
    export let recipe

    async function getRelatedRecipes() {

        const health = recipe.healthLabels.map(el => `health=${el}`).join('&')
        const diet = recipe.dietLabels.map(el => `diet=${el}`).join('&')
        const cuisineType = recipe.cuisineType ? recipe.cuisineType[0] : ''
        const mealType = recipe.mealType ? recipe.mealType[0] : ''
        const dishType = recipe.dishType ? recipe.dishType[0] : ''
        // console.log(recipe.mealType)
        const url = `https://api.edamam.com/api/recipes/v2?q=*&cuisineType=${cuisineType}&dishType=${dishType}&type=public&app_id=8af2623e&app_key=e66ad7ba6533d24ebeae5ead426adaed&`

        const response = await fetch(url);

        if (response.ok) {
            const result = await response.json();
            return result.hits.shuffle().slice(0,4)
        }
        return []
    }	

    let promiseRecipes = getRelatedRecipes() 

</script>

{#await promiseRecipes}
	loading
{:then recipes}

	{#if recipes.length}
	    <div class="mt-16">
	        <h2 class="text-2xl sm:text-4xl font-semibold mb-6 mt-8">
	            Other Recipes You May Like
	        </h2>
	        <div class="grid grid-cols-2 gap-12">
	            {#each recipes as {recipe}, index}
	                <a href="/recipe/{recipe.uri.split('_')[1]}" class="">
	                    <div class="aspect-w-4 aspect-h-3">
	                        <img
                                src="{recipe.image}"
                                alt="{recipe.label}"
                                class="rounded-xl w-full"
                                loading="lazy"
	                        >
	                    </div>
	                    <h2 class="text-2xl font-semibold mt-2 text-center text-gray-800">
	                        {recipe.label}
	                    </h2>
	                </a>
	            {/each}
	        </div>
	    </div>
	{/if}
	
{/await}