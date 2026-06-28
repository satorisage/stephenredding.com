<script lang="ts">
	import '$lib/styles/app.css';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';

	let { children } = $props();
</script>

<a class="skip-link" href="#main">Skip to content</a>
<Nav />
<div id="main">
	{@render children()}
</div>
<Footer />

<style>
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
