<script lang="ts">
	import { profile } from '$lib/content';
	import { reveal } from '$lib/actions/reveal';
</script>

<svelte:head>
	<title>About — {profile.name}</title>
	<meta
		name="description"
		content="Stĕphen Redding is a self-awareness coach helping people remember who they've always been."
	/>
</svelte:head>

<article class="section container">
	<header class="head" use:reveal>
		<figure class="portrait">
			<img src={profile.photo} alt="Stĕphen Redding" width="320" height="320" />
		</figure>
		<div class="intro">
			<p class="eyebrow">{profile.role}</p>
			<h1 class="gradient-text">{profile.greeting}</h1>
		</div>
	</header>

	<div class="prose body" use:reveal={{ delay: 80 }}>
		{#each profile.about as para, i (i)}
			<p class:emphasis={para.startsWith('We’re not broken')}>{para}</p>
		{/each}
	</div>

	<div class="cta" use:reveal>
		<a class="btn btn-primary" href="/contact">Book a Discovery Call</a>
	</div>
</article>

<style>
	.section {
		padding-block: var(--space-xl);
	}
	.head {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-l);
		margin-bottom: var(--space-l);
	}
	.portrait {
		flex: none;
		margin: 0;
	}
	.portrait img {
		width: clamp(8rem, 28vw, 14rem);
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: var(--radius-l);
		border: 1px solid var(--border);
		box-shadow: var(--shadow-lift);
	}
	.intro {
		flex: 1 1 16rem;
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
