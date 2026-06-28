<script lang="ts">
	// Cloudflare Web Analytics beacon — privacy-preserving, cookieless.
	// The token is public by design (PUBLIC_ var, set at deploy). When unset
	// (local/dev), the beacon is omitted. External script; allowed by CSP
	// script-src (static.cloudflareinsights.com).
	import { env } from '$env/dynamic/public';

	const token = env.PUBLIC_CF_ANALYTICS_TOKEN;
	const beacon = $derived(
		token
			? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token":"${token}"}'><\/script>`
			: ''
	);
</script>

<svelte:head>
	{#if token}{@html beacon}{/if}
</svelte:head>
