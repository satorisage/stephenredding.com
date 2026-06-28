<svelte:head>
	<title>Stĕphen Redding — Self-Awareness Coach</title>
	<meta
		name="description"
		content="Self-awareness coaching to help you reconnect with the truth of who you are."
	/>
</svelte:head>

<main>
	<section class="hero">
		<p class="eyebrow">Self-Awareness Coach</p>
		<h1>Hi, I go by Stĕphen.</h1>
		<p class="lede">
			I help people reconnect with the truth of who they are — beyond fear, shame, and the
			old beliefs that have clouded their identity.
		</p>
		<p class="scaffold-note">
			SvelteKit scaffold running. Pages and the full design land in the next migration tasks.
		</p>
	</section>
</main>

<style>
	main {
		max-width: var(--measure);
		margin-inline: auto;
		padding: var(--space-l) var(--space-m);
	}

	.eyebrow {
		text-transform: uppercase;
		letter-spacing: 0.15em;
		font-size: 0.8rem;
		color: var(--accent);
		margin: 0 0 var(--space-s);
	}

	h1 {
		font-size: var(--step-3);
		margin: 0 0 var(--space-m);
	}

	.lede {
		font-size: var(--step-1);
		color: var(--text);
		margin: 0 0 var(--space-l);
	}

	.scaffold-note {
		font-size: 0.9rem;
		color: var(--text-muted);
		border-top: 1px solid var(--border);
		padding-top: var(--space-m);
	}
</style>
