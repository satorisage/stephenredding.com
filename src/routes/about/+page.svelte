<script lang="ts">
	import { profile } from '$lib/content';
</script>

<svelte:head>
	<title>About — {profile.name}</title>
	<meta
		name="description"
		content="Stĕphen Redding is a self-awareness coach helping people remember who they've always been."
	/>
</svelte:head>

<article class="section container">
	<header class="head">
		<p class="eyebrow">{profile.role}</p>
		<h1>{profile.greeting}</h1>
	</header>

	<div class="prose body">
		{#each profile.about as para, i (i)}
			<p class:emphasis={para.startsWith('We’re not broken')}>{para}</p>
		{/each}
	</div>

	<div class="cta">
		<a class="btn btn-primary" href="/contact">Book a Discovery Call</a>
	</div>
</article>

<style>
	.section {
		padding-block: var(--space-xl);
	}
	.head {
		margin-bottom: var(--space-l);
	}
	.body {
		font-size: var(--step-1);
	}
	.body :global(p) {
		margin-bottom: var(--space-m);
	}
	.emphasis {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--step-2);
		color: var(--accent-ink);
		line-height: 1.2;
	}
	.cta {
		margin-top: var(--space-l);
	}
</style>
