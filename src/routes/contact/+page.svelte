<script lang="ts">
	import { profile } from '$lib/content';

	const { email, contact } = profile;
	const mailto = `mailto:${email}?subject=${encodeURIComponent(contact.subject)}`;
</script>

<svelte:head>
	<title>Get In Touch — Stĕphen Redding</title>
	<meta name="description" content="Reach out to book a Discovery Call with Stĕphen Redding." />
</svelte:head>

<section class="section container">
	<div class="hero-glow" aria-hidden="true"></div>
	<div class="inner">
		<p class="eyebrow">{contact.heading}</p>
		<h1>Let's begin with a conversation.</h1>
		<p class="prose lede">{contact.body}</p>

		<!-- T6 replaces this mailto with a Turnstile-protected form posting to a
		     SvelteKit action that sends via Microsoft Graph. -->
		<div class="cta-row">
			<a class="btn btn-primary" href={mailto}>Email a Discovery Call request</a>
		</div>
		<p class="direct">
			Or write to <a href={mailto}>{email}</a> with the subject
			<strong>"{contact.subject}"</strong>.
		</p>
	</div>
</section>

<style>
	.section {
		position: relative;
		overflow: hidden;
		padding-block: var(--space-2xl);
	}
	.hero-glow {
		position: absolute;
		inset: -30% 0 auto 0;
		height: 80%;
		background: var(--glow);
		filter: blur(8px);
		pointer-events: none;
	}
	.inner {
		position: relative;
		max-width: var(--measure);
	}
	.lede {
		font-size: var(--step-1);
		color: var(--text-muted);
		margin-block: var(--space-m) var(--space-l);
	}
	.direct {
		margin-top: var(--space-m);
		color: var(--text-muted);
	}
</style>
