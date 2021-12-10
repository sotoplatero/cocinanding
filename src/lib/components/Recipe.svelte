<script>
	export let recipe
	const slug = recipe.url.replace(/https?:\/\//,'')
</script>
<a sveltekit:prefetch href="/receta/{slug}" class="" >
	<div class="aspect-w-4 aspect-h-3">
		<img 
			src="{recipe.image}" 
			alt="{recipe.title}" 
			class="rounded-2xl object-cover" 
			loading="lazy"
		>	
	</div>
	<h2 class="text-md font-semibold mt-2 text-center text-gray-800">
		{recipe.title}
	</h2>
</a>