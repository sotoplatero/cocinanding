<script>
	import {navigating} from '$app/stores'
	import Header from '$lib/Header.svelte'
	import Navigator from '$lib/components/Navigator.svelte'
	import Footer from '$lib/Footer.svelte'
	import "../app.postcss";
</script>
{#if $navigating }
    <Navigator/>
{/if}
<div class="min-h-screen">
	<Header/>
	<main class="container max-w-screen-lg mx-auto px-2 md:px-0">
		<slot/>
	</main>
	<Footer/>
</div>
