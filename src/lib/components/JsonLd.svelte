<script lang="ts">
	// Renders one or more schema.org objects as a JSON-LD script in <head>.
	// type="application/ld+json" is a data block, exempt from CSP script-src.
	let { schema }: { schema: unknown } = $props();

	const json = $derived(
		JSON.stringify(schema).replace(/</g, '\\u003c')
	);
</script>

<svelte:head>
	{@html `<script type="application/ld+json">${json}</script>`}
</svelte:head>
