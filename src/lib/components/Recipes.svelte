<script>
	import Recipe from '$lib/components/Recipe.svelte'

	export let recipes = []
	export let sites = []
	let q = ''
	let loading = false
	let count = 12
	let from = 0

	// $: from && search()
	// $: $locale && search()
	// $: console.log(recipes)
	async function search() {
		loading = true
		recipes = []
		Promise.all( sites.map( async site => {
			const url = `/recipes/${site}.json?q=${q}`
			const res = await fetch(url);
			const data = (res.ok) ? await res.json() : []	
			recipes = [ ...recipes, ...data]
		}))
		.then(()=>loading = false)
	}

</script>

<form action="" on:submit|preventDefault="{search}"  class="my-6 relative">
	<input 
		type="text" 
		bind:value={q} 
		class="bg-gray-100 w-full p-4 rounded-xl focus:outline-none focus:border-yellow-700 border-2 border-transparent pr-12" 
		placeholder="Buscar recetas"
	>
	{#if loading}
		<div class="absolute top-0 right-6 h-full">
			<div class="flex items-center content-center h-full w-full">
				<svg class="animate-spin h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
		          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
		          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		        </svg>		
				
			</div>
		</div>
	{/if}		
</form>


<div class="relative">
	<div class="grid grid-col-2 sm:grid-cols-4 gap-6 gap-y-12">
		{#each recipes as recipe (recipe.url)}
			<Recipe {recipe}/>
		{/each}
	</div>
</div>