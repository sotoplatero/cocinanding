<script context="module">
    export async function load({page, fetch, session, context}) {
        const res = await fetch(`/recipe/${page.params.id}.json`);

        if (!res.ok) {
            return {
                status: res.status,
                error: new Error(`Could not load recipe`)
            };
        }

        const recipe = await res.json();
        return {
            props: { recipe }
        };

    }
</script>

<script>
    import RelatedRecipes from '$lib/components/RelatedRecipes.svelte'
    export let recipe = {};

</script>

<svelte:head>
    <title>Cocinanding - {recipe.label}</title>
</svelte:head>

<div class="max-w-screen-sm w-full mx-auto">
    <div class="h-80 overflow-hidden ">
        <img
                src="{recipe.image}"
                alt="{recipe.label}"
                class="rounded-2xl object-cover bg-center w-full h-full object-cover"
                loading="lazy"
        >
    </div>
    <h1 class="text-3xl sm:text-5xl font-semibold my-8">
        {recipe.label}
        <a href={recipe.url} class="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
            <svg class="w-6 h-6 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
        </a>
    </h1>
    <div class="mb-6 flex justify-items-center">
<!--		<div><strong>Recipe Data:</strong> {recipe}</div>-->
        <!-- <div><strong>Source:</strong> {recipe.source}</div> -->
        <div>
            <div class="">{recipe.yield}</div>
            <div class="">Commensal</div>
        </div>
        {#if recipe.totalTime > 0}
            <div>
                <div class="">{recipe.totalTime}</div>
                <div class="">Minutes</div>
            </div>
        {/if}
        <div>
            <div class="">{parseInt(recipe.calories)}</div>
            <div class="">KCAL</div>
        </div>
    </div>
    <h2 class="">
        Ingredients
    </h2>
    <ul class="text-lg text-gray-700 space-y-2">
        {#each recipe.ingredients as ingredient, index}
            <li class="flex items-center py-2 font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg"
                     class="h-6 w-6 text-green-300 mr-4 flex-shrink-0" fill="none" viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {ingredient.text}
            </li>
        {/each}
    </ul>

    {#if typeof recipe.intructions === 'object' && recipe.intructions.length }

        <h2 class="flex items-center text-2xl sm:text-4xl font-semibold mb-6 mt-8">
            How to Make It
        </h2>

        <ul class="space-y-2 text-lg text-gray-700">
            {#each recipe.intructions as intructions, index}
                <li class="flex items-center py-2">
                    {intructions}
                </li>
            {/each}
        </ul>
    {:else}
        <h2 class="">
            How to Make It
        </h2>
        <a href={recipe.url} class="text-blue-500 hover:text-blue-600" target="_blank" rel="noopener noreferrer">
            See full instructions <svg class="w-6 h-6 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
            </svg>
        </a>
    {/if}

</div>

<RelatedRecipes {recipe}/>

<style>
    h2{ @apply text-2xl sm:text-4xl font-semibold mb-6; }
</style>