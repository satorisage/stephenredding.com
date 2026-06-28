<script lang="ts">
	import { enhance } from '$app/forms';
	import { env } from '$env/dynamic/public';
	import { profile } from '$lib/content';

	let { form } = $props();

	const { email, contact } = profile;
	const mailto = `mailto:${email}?subject=${encodeURIComponent(contact.subject)}`;
	const sitekey = env.PUBLIC_TURNSTILE_SITEKEY;

	let submitting = $state(false);
	const values = $derived(
		(form?.values ?? { name: '', email: '', message: '' }) as Record<string, string>
	);
	const errors = $derived((form?.errors ?? {}) as Record<string, string>);
</script>

<svelte:head>
	<title>Get In Touch — Stĕphen Redding</title>
	<meta name="description" content="Reach out to book a Discovery Call with Stĕphen Redding." />
	{#if sitekey}
		{@html '<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer><\/script>'}
	{/if}
</svelte:head>

<section class="section container">
	<div class="hero-glow" aria-hidden="true"></div>
	<div class="inner">
		<p class="eyebrow">{contact.heading}</p>
		<h1>Let's begin with a conversation.</h1>
		<p class="prose lede">{contact.body}</p>

		{#if form?.success}
			<div class="card success" role="status">
				<h2>Thank you — your message is on its way.</h2>
				<p>I'll be in touch soon to find a time for your Discovery Call.</p>
			</div>
		{:else}
			<form
				method="POST"
				class="card form"
				use:enhance={() => {
					submitting = true;
					return async ({ update }) => {
						await update();
						submitting = false;
					};
				}}
			>
				{#if errors.form}
					<p class="form-error" role="alert">{errors.form}</p>
				{/if}

				<label>
					<span>Your name</span>
					<input name="name" type="text" required autocomplete="name" value={values.name} />
					{#if errors.name}<small class="err">{errors.name}</small>{/if}
				</label>

				<label>
					<span>Email</span>
					<input name="email" type="email" required autocomplete="email" value={values.email} />
					{#if errors.email}<small class="err">{errors.email}</small>{/if}
				</label>

				<label>
					<span>What's prompting you to reach out?</span>
					<textarea name="message" rows="5" required>{values.message}</textarea>
					{#if errors.message}<small class="err">{errors.message}</small>{/if}
				</label>

				<!-- Honeypot: hidden from humans; bots that fill it are dropped. -->
				<div class="hp" aria-hidden="true">
					<label>Website<input name="website" tabindex="-1" autocomplete="off" /></label>
				</div>

				{#if sitekey}
					<div class="cf-turnstile" data-sitekey={sitekey} data-theme="auto"></div>
				{/if}

				<button class="btn btn-primary" type="submit" disabled={submitting}>
					{submitting ? 'Sending…' : 'Request a Discovery Call'}
				</button>
			</form>
		{/if}

		<p class="direct">
			Prefer email? Write to <a href={mailto}>{email}</a> with the subject
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
		height: 60%;
		background: var(--glow);
		filter: blur(8px);
		pointer-events: none;
	}
	.inner {
		position: relative;
		max-width: 40rem;
	}
	.lede {
		font-size: var(--step-1);
		color: var(--text-muted);
		margin-block: var(--space-m) var(--space-l);
	}
	.card {
		padding: var(--space-l);
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius-l);
		box-shadow: var(--shadow-soft);
	}
	.form {
		display: grid;
		gap: var(--space-m);
	}
	label {
		display: grid;
		gap: var(--space-2xs);
	}
	label > span {
		font-weight: 600;
		font-size: var(--step-0);
	}
	input,
	textarea {
		font: inherit;
		color: var(--text);
		background: var(--bg);
		border: 1px solid var(--border);
		border-radius: var(--radius-s);
		padding: 0.7em 0.9em;
		width: 100%;
		resize: vertical;
	}
	input:focus,
	textarea:focus {
		outline: 2px solid var(--accent-ink);
		outline-offset: 1px;
		border-color: var(--accent-ink);
	}
	.err {
		color: oklch(58% 0.17 25);
		font-size: var(--step--1);
	}
	.form-error {
		color: oklch(58% 0.17 25);
		margin: 0;
	}
	.hp {
		position: absolute;
		left: -9999px;
		width: 1px;
		height: 1px;
		overflow: hidden;
	}
	button[type='submit'] {
		justify-self: start;
		border: none;
	}
	.success h2 {
		font-size: var(--step-2);
		color: var(--accent-ink);
	}
	.direct {
		margin-top: var(--space-l);
		color: var(--text-muted);
	}
</style>
