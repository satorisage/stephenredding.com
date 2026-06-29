<script lang="ts">
	import '$lib/styles/app.css';
	import { page } from '$app/state';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import Analytics from '$lib/components/Analytics.svelte';
	import Aurora from '$lib/components/Aurora.svelte';
	import { canonical, siteJsonLd } from '$lib/seo';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="canonical" href={canonical(page.url.pathname)} />
</svelte:head>
<JsonLd schema={siteJsonLd()} />
<Analytics />

<!-- Ambient warm aurora behind every page (fixed, low-key). -->
<Aurora fixed />

<a class="skip-link" href="#main">Skip to content</a>
<Nav />
<div id="main">
	{@render children()}
</div>
<Footer />

<style>
	/* Content sits above the ambient aurora (z-index 0) and lets it glow through. */
	#main {
		position: relative;
		z-index: 1;
	}
	.skip-link {
		position: absolute;
		left: var(--space-s);
		top: var(--space-s);
		transform: translateY(-200%);
		background: var(--surface);
		color: var(--text);
		padding: 0.6em 1em;
		border-radius: var(--radius-s);
		border: 1px solid var(--border);
		z-index: 100;
		transition: transform 0.2s var(--ease);
	}
	.skip-link:focus {
		transform: translateY(0);
	}
</style>
