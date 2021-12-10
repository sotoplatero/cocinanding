<script>
	import Header from '$lib/Header.svelte'
	import Footer from '$lib/Footer.svelte'
	import "../app.postcss";
</script>

<div class="min-h-screen">
	<Header/>
	<main >
		<slot/>
	</main>
	<Footer/>
</div>
