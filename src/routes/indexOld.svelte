<script context="module">
	export async function load({ page, fetch, query }) {
		const res = await fetch(`/recipes.json`);

		if (res.ok) {
			const {recipes} = await res.json()
			return {
				props: { recipes	}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load`)
		};
	}	
</script>

<script>
	import { t, locale } from "$lib/i18n";
	import Recipe from '$lib/components/Recipe.svelte'

	export let recipes = {}
	let q = ''
	let loading = false
	let count = 12
	let from = 0

	// $: from && search()
	// $: $locale && search()
	// $: console.log(recipes)
	async function search() {
		loading = true
		const url = `/recipes.json?q=${q}&from=${from}&size=${count}`
		const res = await fetch(url);
		if (res.ok) {
			recipes = await res.json()
		}		
		loading = false
	}

</script>

<form action="" on:submit|preventDefault="{search}"  class="my-6 relative">
	<input 
		type="text" 
		bind:value={q} 
		class="bg-gray-100 w-full p-4 rounded-xl focus:outline-none focus:border-yellow-700 border-2 border-transparent pr-12" 
		placeholder="{ $t('placeholder-search') }"
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
		{#each recipes as recipe, index (recipe.url)}
			<Recipe {recipe}/>
		{/each}
	</div>

<!-- 	<div class="flex justify-between my-10">
		{#if recipes.from > 0}
			<button 
				on:click|preventDefault={()=>from = from - count}
				class="flex items-center font-semibold text-gray-600"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
				</svg>			
				Previuos
			</button>
		{/if}

		{#if recipes.more }
			<button 
				on:click|preventDefault={()=>from = from + count}
				class="flex items-center font-semibold text-gray-600"
			>
				Next
				<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
				</svg>	 			
			</button>
		{/if}
	</div> -->


</div>
