<script context="module">
    import { parse } from 'tldts';

    export async function load({page, fetch}) {
        
        const site = parse(page.params.url).domainWithoutSuffix
        console.log(site);
        const res = await fetch(`/recipes/${site}/show.json?url=${page.params.url}`);

        if (!res.ok) {
            return {
                status: res.status,
                error: new Error(`Could not load recipe`)
            };
        }
        const recipe = await res.json();
        if (!recipe) {
            return null
        }
        
        return {
            props: { recipe }
        };
        
    }
</script>

<script>
    import { browser } from '$app/env'
    import RelatedRecipes from '$lib/components/RelatedRecipes.svelte'
    import Meta from '$lib/components/Meta.svelte'
    export let recipe;

	function print() {
		if (browser) window.print()
	}   

</script>

<Meta
    title={recipe.title}
    image={recipe.image}
/>

<div class="overflow-hidden print:hidden ">
    <figure class="aspect-w-16 aspect-h-9">
        <img
                src="{recipe.image}"
                alt="{recipe.title}"
                class="rounded-2xl object-cover w-full h-full"
                loading="lazy"
        >
        
    </figure>
</div>

<div class="max-w-screen-sm w-full mx-auto">
    <h1 class="text-3xl sm:text-5xl font-semibold my-8 text-center">
        {recipe.title}
    </h1>
    <div class="space-x-2 text-right mb-4 print:hidden">
        <a href={recipe.url} target="_blank" rel="noopener noreferrer">Receta Original</a>
        <button on:click={print}>Imprimir</button>
    </div>

    {#if recipe.time || recipe.commensals || recipe.calories}
        <div class="mb-6 flex justify-items-center">
            {#if recipe.commensals > 0}
                <div>
                    <div class="">{recipe.commensals}</div>
                    <div class="">Comensales</div>
                </div>
            {/if}
            {#if recipe.time > 0}
                <div>
                    <div class="">{recipe.time}</div>
                    <div class="">Duración</div>
                </div>
            {/if}
            {#if recipe.calories}
                <div>
                    <div class="">{recipe.calories}</div>
                    <div class="">KCAL</div>
                </div>
            {/if}
        </div>
    {/if}
    <h2 class="">
        Ingredientes
    </h2>
    <ul class="text-lg text-gray-700 space-y-2 print:space-y-0">
        {#each recipe.ingredients as ingredient, index}
            <li class="flex items-center font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg"
                     class="h-6 w-6 text-gray-400 mr-4 flex-shrink-0 " fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {ingredient}
            </li>
        {/each}
    </ul>


    <h2 class="flex items-center text-2xl sm:text-4xl font-semibold mb-6 mt-8">
        Preparación
    </h2>

    <div class="space-y-6 text-lg text-gray-700">
        {#each recipe.instructions as intruction, index}
            <p>
                <span class="text-xl font-bold">
                    {index+1} &rarr; 
                </span>
                {intruction}
            </p>
        {/each}
    </div>


</div>

<RelatedRecipes {recipe}/>

<style>
    h2{ @apply text-2xl sm:text-4xl font-semibold mb-6; }
</style>