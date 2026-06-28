<script lang="ts">
	import { page } from '$app/state';
	import { profile } from '$lib/content';

	const links = [
		{ href: '/about', label: 'About' },
		{ href: '/services', label: 'Services' },
		{ href: '/certifications', label: 'Certifications' },
		{ href: '/contact', label: 'Contact' }
	];

	const isActive = (href: string) =>
		page.url.pathname === href || page.url.pathname.startsWith(href + '/');
</script>

<header class="site-header">
	<div class="container bar">
		<a class="brand" href="/" aria-label="{profile.name} — home">{profile.name}</a>
		<nav aria-label="Primary">
			<ul>
				{#each links as link (link.href)}
					<li>
						<a href={link.href} aria-current={isActive(link.href) ? 'page' : undefined}>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	.site-header {
		position: sticky;
		top: 0;
		z-index: 10;
		background: color-mix(in oklch, var(--bg), transparent 12%);
		backdrop-filter: blur(10px);
		border-bottom: 1px solid var(--border);
	}
	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-m);
		min-height: 4rem;
	}
	.brand {
		font-family: var(--font-display);
		font-weight: 560;
		font-size: var(--step-1);
		color: var(--text);
		text-decoration: none;
		letter-spacing: -0.01em;
	}
	nav ul {
		display: flex;
		gap: clamp(var(--space-s), 2.5vw, var(--space-l));
		list-style: none;
		margin: 0;
		padding: 0;
	}
	nav a {
		color: var(--text-muted);
		text-decoration: none;
		font-size: var(--step-0);
		padding-block: 0.4rem;
		position: relative;
	}
	nav a:hover {
		color: var(--text);
	}
	nav a[aria-current='page'] {
		color: var(--accent-ink);
	}
	nav a[aria-current='page']::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 2px;
		background: var(--accent);
		border-radius: 2px;
	}

	@media (max-width: 30rem) {
		.bar {
			flex-direction: column;
			align-items: flex-start;
			gap: var(--space-2xs);
			padding-block: var(--space-2xs);
		}
		nav ul {
			gap: var(--space-m);
		}
	}
</style>
