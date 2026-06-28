<script lang="ts">
	import { testimonials } from '$lib/content';
</script>

<svelte:head>
	<title>Praise — Stĕphen Redding</title>
	<meta name="description" content="Words from people Stĕphen Redding has worked with." />
	{#if testimonials.length === 0}
		<meta name="robots" content="noindex" />
	{/if}
</svelte:head>

<section class="section container">
	<header class="head">
		<p class="eyebrow">Praise</p>
		<h1>Words from the journey.</h1>
	</header>

	{#if testimonials.length > 0}
		<ul class="grid">
			{#each testimonials as t, i (i)}
				<li class="card">
					<blockquote>{t.quote}</blockquote>
					<p class="who">— {t.person}</p>
				</li>
			{/each}
		</ul>
	{:else}
		<div class="empty prose">
			<p>
				This space is for the people I work with to share what shifted for them. As new
				journeys complete, their words will live here.
			</p>
			<p>
				If we've worked together and you'd like to share your experience, I'd be honored to
				hear it.
			</p>
			<a class="btn btn-primary" href="/contact">Get in touch</a>
		</div>
	{/if}
</section>

<style>
	.section {
		padding-block: var(--space-xl);
		min-height: 40vh;
	}
	.head {
		margin-bottom: var(--space-l);
	}
	.empty {
		font-size: var(--step-1);
		color: var(--text-muted);
	}
	.empty .btn {
		margin-top: var(--space-m);
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 20rem), 1fr));
		gap: var(--space-m);
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.card {
		padding: var(--space-l);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-l);
		box-shadow: var(--shadow-soft);
	}
	blockquote {
		margin: 0 0 var(--space-m);
		font-family: var(--font-display);
		font-size: var(--step-1);
		font-style: italic;
	}
	.who {
		color: var(--accent-ink);
		font-weight: 600;
		margin: 0;
	}
</style>
