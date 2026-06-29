<script lang="ts">
	import { servicesIntro, publishedServices } from '$lib/content';
	import ServiceIcon from '$lib/components/ServiceIcon.svelte';
	import { reveal } from '$lib/actions/reveal';

	const services = publishedServices();
</script>

<svelte:head>
	<title>Services — Stĕphen Redding</title>
	<meta
		name="description"
		content="Personalized coaching to help you reconnect with the peace already within you, live from your values, and meet life with clarity and confidence."
	/>
</svelte:head>

<section class="section container">
	<header class="head" use:reveal>
		<p class="eyebrow">Services</p>
		<h1><span class="gradient-text">Coaching</span>, tailored in the moment.</h1>
		<p class="prose intro">{servicesIntro}</p>
	</header>

	<ul class="grid" use:reveal={{ delay: 100 }}>
		{#each services as service (service.slug)}
			<li>
				<a class="card" href="/services/{service.slug}">
					<span class="icon"><ServiceIcon icon={service.icon} /></span>
					<div>
						<p class="tagline">{service.tagline}</p>
						<h2>{service.title}</h2>
						<p class="summary">{service.summary}</p>
						<span class="more">Learn more →</span>
					</div>
				</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	.section {
		padding-block: var(--space-xl);
	}
	.head {
		max-width: var(--measure);
		margin-bottom: var(--space-xl);
	}
	.intro {
		font-size: var(--step-1);
		color: var(--text-muted);
	}
	.grid {
		display: grid;
		gap: var(--space-m);
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.card {
		display: flex;
		gap: var(--space-m);
		padding: var(--space-l);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-l);
		text-decoration: none;
		color: var(--text);
		box-shadow: var(--shadow-soft);
		transition:
			transform 0.25s var(--ease),
			box-shadow 0.25s var(--ease),
			border-color 0.25s var(--ease);
	}
	.card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-lift);
		border-color: color-mix(in oklch, var(--accent-ink), transparent 50%);
	}
	.icon {
		flex: none;
		display: grid;
		place-items: center;
		width: 3.25rem;
		height: 3.25rem;
		border-radius: var(--radius);
		color: var(--accent-ink);
		background: color-mix(in oklch, var(--accent), transparent 82%);
	}
	.tagline {
		color: var(--accent-ink);
		font-size: var(--step--1);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin: 0 0 var(--space-3xs);
	}
	.card h2 {
		font-size: var(--step-1);
		margin: 0 0 var(--space-2xs);
	}
	.summary {
		color: var(--text-muted);
		margin: 0;
	}
	.more {
		display: inline-block;
		margin-top: var(--space-s);
		color: var(--accent-ink);
		font-weight: 600;
	}
</style>
