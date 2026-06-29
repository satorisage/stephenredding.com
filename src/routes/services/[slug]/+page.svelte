<script lang="ts">
	import { page } from '$app/state';
	import ServiceIcon from '$lib/components/ServiceIcon.svelte';
	import JsonLd from '$lib/components/JsonLd.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { serviceJsonLd } from '$lib/seo';
	import { reveal } from '$lib/actions/reveal';

	let { data } = $props();
	const service = $derived(data.service);
</script>

<Seo title="{service.title} — Stĕphen Redding" description={service.summary} />
<JsonLd
	schema={serviceJsonLd({
		name: service.title,
		description: service.summary,
		pathname: page.url.pathname
	})}
/>

<article class="section container">
	<a class="back" href="/services">← All services</a>

	<header class="head" use:reveal>
		<span class="icon"><ServiceIcon icon={service.icon} size={32} /></span>
		<p class="eyebrow">{service.tagline}</p>
		<h1 class="gradient-text">{service.title}</h1>
	</header>

	<div class="prose body" use:reveal={{ delay: 80 }}>
		{#each service.intro as para, i (i)}
			{#if para.startsWith('**') && para.endsWith('**')}
				<p class="strong">{para.slice(2, -2)}</p>
			{:else}
				<p>{para}</p>
			{/if}
		{/each}

		{#each service.sections as section, i (i)}
			<section class="block">
				{#if section.heading}<h2>{section.heading}</h2>{/if}
				{#if section.body}
					{#each section.body as p, j (j)}<p>{p}</p>{/each}
				{/if}
				{#if section.bullets}
					<ul>
						{#each section.bullets as item, j (j)}<li>{item}</li>{/each}
					</ul>
				{/if}
				{#if section.quote}
					<blockquote>{section.quote}</blockquote>
				{/if}
			</section>
		{/each}

		{#if service.note}
			<p class="note">{service.note}</p>
		{/if}
	</div>

	<div class="cta">
		<a class="btn btn-primary" href={service.cta.href}>{service.cta.text}</a>
	</div>
</article>

<style>
	.section {
		padding-block: var(--space-l) var(--space-xl);
	}
	.back {
		display: inline-block;
		margin-bottom: var(--space-l);
		color: var(--text-muted);
		text-decoration: none;
		font-size: var(--step-0);
	}
	.back:hover {
		color: var(--accent-ink);
	}
	.head {
		max-width: var(--measure);
		margin-bottom: var(--space-l);
	}
	.icon {
		display: grid;
		place-items: center;
		width: 3.5rem;
		height: 3.5rem;
		border-radius: var(--radius);
		color: var(--accent-ink);
		background: color-mix(in oklch, var(--accent), transparent 82%);
		margin-bottom: var(--space-m);
	}
	.head .eyebrow {
		color: var(--accent-ink);
	}
	.body {
		font-size: var(--step-0);
	}
	.body :global(p) {
		margin-bottom: var(--space-m);
		color: var(--text);
	}
	.strong {
		font-family: var(--font-display);
		font-size: var(--step-1);
		font-style: italic;
		color: var(--accent-ink);
	}
	.block {
		margin-top: var(--space-l);
	}
	.block h2 {
		font-size: var(--step-2);
		margin-bottom: var(--space-s);
	}
	.block ul {
		padding-left: 1.2em;
		display: grid;
		gap: var(--space-2xs);
	}
	.block li::marker {
		color: var(--accent-ink);
	}
	blockquote {
		margin: var(--space-m) 0;
		padding: var(--space-m) var(--space-l);
		border-left: 3px solid var(--accent);
		background: var(--surface);
		border-radius: 0 var(--radius) var(--radius) 0;
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--step-1);
		color: var(--text);
	}
	.note {
		margin-top: var(--space-l);
		padding-top: var(--space-m);
		border-top: 1px solid var(--border);
		color: var(--text-muted);
		font-size: var(--step--1);
		font-style: italic;
	}
	.cta {
		margin-top: var(--space-xl);
	}
</style>
