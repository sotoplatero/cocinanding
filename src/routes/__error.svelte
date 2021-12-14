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
	export let status
	export let title;
</script>

<div class="flex items-center h-screen">
	<h1 class="text-center text-3xl font-semibold">
		<span class="text-5xl font-bold block">{status}</span>
		{title}
	</h1>
</div>