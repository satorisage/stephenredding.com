<script lang="ts">
	import { profile } from '$lib/content';
</script>

<svelte:head>
	<title>Stĕphen Redding — Self-Awareness Coach</title>
	<meta
		name="description"
		content="Self-awareness coaching to help you reconnect with the truth of who you are — beyond fear, shame, and old beliefs."
	/>
</svelte:head>

<main>
	<section class="hero">
		<div class="hero-glow" aria-hidden="true"></div>
		<div class="container hero-inner">
			<p class="eyebrow">{profile.role}</p>
			<h1>Reconnect with the<br /><em>truth</em> of who you are.</h1>
			<p class="lede prose">
				I help people move beyond fear, shame, and the old beliefs that have clouded their
				identity — back to the clarity, peace, and freedom already within them.
			</p>
			<div class="cta-row">
				<a class="btn btn-primary" href="/contact">Book a Discovery Call</a>
				<a class="btn btn-ghost" href="/services">Explore the work</a>
			</div>
			<p class="signature">— {profile.greeting}</p>
		</div>
	</section>
</main>

<style>
	.hero {
		position: relative;
		overflow: hidden;
		padding-block: clamp(var(--space-xl), 12vh, var(--space-2xl));
	}

	.hero-glow {
		position: absolute;
		inset: -20% 0 auto 0;
		height: 70%;
		background: var(--glow);
		filter: blur(8px);
		pointer-events: none;
		z-index: 0;
	}

	.hero-inner {
		position: relative;
		z-index: 1;
	}

	h1 {
		max-width: 18ch;
	}
	h1 em {
		font-style: italic;
		color: var(--accent-ink);
	}

	.lede {
		font-size: var(--step-1);
		color: var(--text-muted);
		margin-block: var(--space-m) var(--space-l);
	}

	.cta-row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-s);
	}

	.signature {
		font-family: var(--font-display);
		font-style: italic;
		font-size: var(--step-1);
		color: var(--text);
		margin-top: var(--space-xl);
	}
</style>
