<script lang="ts">
	import { profile, publishedServices, certifications, certificationsByCategory } from '$lib/content';
	import ServiceIcon from '$lib/components/ServiceIcon.svelte';

	const services = publishedServices();
	const certCount = certifications.length;
	const categories = certificationsByCategory().map((g) => g.category);
</script>

<svelte:head>
	<title>Stĕphen Redding — Self-Awareness Coach</title>
	<meta
		name="description"
		content="Self-awareness coaching to help you reconnect with the truth of who you are — beyond fear, shame, and the old beliefs that have clouded your identity."
	/>
</svelte:head>

<section class="hero">
	<div class="hero-glow" aria-hidden="true"></div>
	<div class="container hero-inner">
		<div class="hero-text">
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
		<div class="hero-portrait">
			<img src={profile.photo} alt="Stĕphen Redding" width="440" height="440" />
		</div>
	</div>
</section>

<section class="section container">
	<header class="section-head">
		<p class="eyebrow">How we work together</p>
		<h2>Coaching that uncovers what's already there.</h2>
		<p class="prose lede-muted">
			Real transformation isn't about becoming something new — it's about remembering who
			you've always been. Each session is tailored in the moment.
		</p>
	</header>

	<ul class="service-grid">
		{#each services as service (service.slug)}
			<li>
				<a class="service-card" href="/services/{service.slug}">
					<span class="icon"><ServiceIcon icon={service.icon} /></span>
					<h3>{service.title}</h3>
					<p class="tagline">{service.tagline}</p>
					<p class="summary">{service.summary}</p>
					<span class="more">Learn more →</span>
				</a>
			</li>
		{/each}
	</ul>
</section>

<section class="section container">
	<div class="credibility">
		<p class="eyebrow">Trained &amp; certified</p>
		<h2>{certCount} certifications across four disciplines.</h2>
		<p class="prose lede-muted">
			Years of training in {categories.slice(0, -1).join(', ')}, and {categories.at(-1)} —
			tools and frameworks to hold a safe, supportive space for your journey.
		</p>
		<a class="btn btn-ghost" href="/certifications">See the certifications</a>
	</div>
</section>

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
	}
	.hero-inner {
		position: relative;
		display: grid;
		gap: var(--space-xl);
		align-items: center;
	}
	@media (min-width: 52rem) {
		.hero-inner {
			grid-template-columns: 1.3fr 1fr;
		}
	}
	.hero-portrait {
		justify-self: center;
		order: -1;
	}
	@media (min-width: 52rem) {
		.hero-portrait {
			order: 0;
		}
	}
	.hero-portrait img {
		width: clamp(12rem, 34vw, 22rem);
		aspect-ratio: 1;
		object-fit: cover;
		border-radius: var(--radius-l);
		border: 1px solid var(--border);
		box-shadow: var(--shadow-lift);
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
		margin-top: var(--space-xl);
	}

	.section {
		padding-block: var(--space-xl);
	}
	.section-head {
		max-width: var(--measure);
		margin-bottom: var(--space-l);
	}
	.lede-muted {
		color: var(--text-muted);
		font-size: var(--step-1);
	}

	.service-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr));
		gap: var(--space-m);
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.service-card {
		display: flex;
		flex-direction: column;
		gap: var(--space-2xs);
		height: 100%;
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
	.service-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lift);
		border-color: color-mix(in oklch, var(--accent-ink), transparent 50%);
	}
	.icon {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border-radius: var(--radius);
		color: var(--accent-ink);
		background: color-mix(in oklch, var(--accent), transparent 82%);
		margin-bottom: var(--space-2xs);
	}
	.service-card h3 {
		font-size: var(--step-1);
		margin: 0;
	}
	.tagline {
		color: var(--accent-ink);
		font-size: var(--step--1);
		text-transform: uppercase;
		letter-spacing: 0.08em;
		margin: 0;
	}
	.summary {
		color: var(--text-muted);
		margin: var(--space-2xs) 0 0;
	}
	.more {
		margin-top: auto;
		padding-top: var(--space-s);
		color: var(--accent-ink);
		font-weight: 600;
		font-size: var(--step-0);
	}

	.credibility {
		padding: var(--space-xl);
		border-radius: var(--radius-l);
		background:
			var(--glow),
			var(--surface);
		border: 1px solid var(--border);
		max-width: var(--measure);
	}
	.credibility h2 {
		font-size: var(--step-2);
	}
</style>
