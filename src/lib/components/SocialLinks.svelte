<script lang="ts">
	import { socialLinks } from '$lib/content';
</script>

<ul class="social">
	{#each socialLinks as link (link.name)}
		<li>
			<a href={link.url} target="_blank" rel="me noopener noreferrer" aria-label={link.label}>
				<!-- eslint-disable-next-line svelte/no-at-html-tags -- trusted, static, in-repo SVG -->
				{@html link.svg}
			</a>
		</li>
	{/each}
</ul>

<style>
	.social {
		display: flex;
		gap: var(--space-s);
		list-style: none;
		margin: 0;
		padding: 0;
	}
	a {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--radius-pill);
		color: var(--text-muted);
		border: 1px solid var(--border);
		transition:
			color 0.2s var(--ease),
			border-color 0.2s var(--ease),
			transform 0.2s var(--ease);
	}
	a:hover {
		color: var(--accent-ink);
		border-color: var(--accent-ink);
		transform: translateY(-2px);
	}
	a :global(svg) {
		width: 1.15rem;
		height: 1.15rem;
	}
</style>
