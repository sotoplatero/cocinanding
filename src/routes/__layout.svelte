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
	<main >
		<slot/>
	</main>
	<Footer/>
</div>
