<script context="module">
	export function load({ error, status }) {
		return {
			props: {
				status,
				title: error.message,
			}
		};
	}
</script>

<script>
	import { page } from '$app/stores';	
	export let status
	export let title;
</script>

<div class="py-40">
	<h1 class="text-center text-2xl font-semibold">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-28 w-28 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
		  </svg>
		<span class="text-8xl font-bold block">{status}</span>
		{#if status === 404}
			No se ecuentra la página
		{:else}
			Tenemos un problema
		{/if}
	</h1>
</div>