<script>
	import { page } from '$app/stores';	
    import { dev } from '$app/env';	

	export let title = 'Cocinanding - Todas las Recetas de Cocina Gratis'
	export let description = 'Buscador de recetas de cocina en varios sitios web.'
	export let url = `https://cocinanding.net${ $page.path }`
	export let author = ''
	export let avatar = ''
	export let image = ''

	$: fullTitle = `Cocinanding - ${title}`

</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta property="description" content="{description}">
	<meta property="og:title" content="{fullTitle}">
	<meta property="og:description" content="{description}">
	<meta property="og:image" content="{image}">

	<meta name="twitter:title" content="{fullTitle}">
	<meta name="twitter:description" content="{description}">
	<meta name="twitter:image" content="{image}">
	<meta property="og:url" content="{url}">

	<link rel="canonical" href="{url}" />
	<!-- <link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet"> -->
	{#if !dev }
		<script async defer data-website-id="0acc61ba-4bd0-4658-9ee3-b2af32e4ad0a" src="https://umami.dsoto.dev/umami.js"></script>		
	{/if}
</svelte:head>