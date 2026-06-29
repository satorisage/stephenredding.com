<script lang="ts">
	import { certificationsIntro, certificationsByCategory, certifications } from '$lib/content';
	import { reveal } from '$lib/actions/reveal';
	import Seo from '$lib/components/Seo.svelte';

	const groups = certificationsByCategory();
	const total = certifications.length;
</script>

<Seo
	title="Certifications — Stĕphen Redding"
	description="{total} coaching certifications across Life Transformation, NLP, and Mental Health disciplines."
/>

<section class="section container">
	<header class="head" use:reveal>
		<p class="eyebrow">Certifications</p>
		<h1><span class="gradient-text">{total} certifications</span>, four disciplines.</h1>
		<p class="prose intro">{certificationsIntro}</p>
	</header>

	{#each groups as group (group.category)}
		<section class="group" use:reveal>
			<h2>{group.category}</h2>
			<ul class="grid">
				{#each group.items as cert (cert.slug)}
					<li class="card">
						<div class="badge">
							<img src={cert.image} alt="{cert.title} certificate" loading="lazy" />
						</div>
						<div class="info">
							<h3>{cert.title}</h3>
							<p class="issuer">{cert.issuer}</p>
							<p class="trainer">Trainer: {cert.trainer}</p>
						</div>
					</li>
				{/each}
			</ul>
		</section>
	{/each}
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
	.group {
		margin-bottom: var(--space-xl);
	}
	.group h2 {
		font-size: var(--step-2);
		margin-bottom: var(--space-m);
		padding-bottom: var(--space-2xs);
		border-bottom: 1px solid var(--border);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
		gap: var(--space-m);
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.card {
		display: flex;
		flex-direction: column;
		gap: var(--space-s);
		padding: var(--space-m);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		box-shadow: var(--shadow-soft);
		transition:
			transform 0.2s var(--ease),
			box-shadow 0.2s var(--ease);
	}
	.card:hover {
		transform: translateY(-3px);
		box-shadow: var(--shadow-lift);
	}
	.badge {
		aspect-ratio: 4 / 3;
		display: grid;
		place-items: center;
		background: var(--surface-2);
		border-radius: var(--radius-s);
		padding: var(--space-s);
	}
	.badge img {
		max-height: 100%;
		width: auto;
		object-fit: contain;
	}
	.info h3 {
		font-size: var(--step-0);
		font-family: var(--font-sans);
		font-weight: 600;
		margin: 0 0 var(--space-3xs);
		line-height: 1.3;
	}
	.issuer {
		color: var(--text);
		font-size: var(--step--1);
		margin: 0;
	}
	.trainer {
		color: var(--text-muted);
		font-size: var(--step--1);
		margin: var(--space-3xs) 0 0;
	}
</style>
