<script lang="ts">
	import { profile } from '$lib/content';
	import SocialLinks from './SocialLinks.svelte';

	const year = 2026;
</script>

<footer class="site-footer">
	<div class="container inner">
		<div class="cta">
			<p class="eyebrow">Ready when you are</p>
			<p class="invite">Let's have a conversation about what you're ready to release.</p>
			<a class="btn btn-primary" href="/contact">Book a Discovery Call</a>
		</div>
		<div class="meta">
			<SocialLinks />
			<p class="copy">
				<span class="brand">{profile.name}</span>
				<span class="dot">·</span>
				{profile.role}
				<span class="dot">·</span>
				© {year}
			</p>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		position: relative;
		margin-top: var(--space-2xl);
		border-top: 1px solid var(--border);
		background:
			radial-gradient(80% 120% at 50% 0%, var(--aurora-1), transparent 60%),
			var(--surface);
		padding-block: var(--space-xl);
	}
	.inner {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: var(--space-xl);
		align-items: end;
	}
	.invite {
		font-family: var(--font-display);
		font-size: var(--step-2);
		max-width: 22ch;
		margin: 0 0 var(--space-m);
	}
	.meta {
		display: flex;
		flex-direction: column;
		gap: var(--space-m);
		align-items: flex-start;
	}
	.copy {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5ch;
		color: var(--text-muted);
		font-size: var(--step--1);
		margin: 0;
	}
	.copy .brand {
		font-family: var(--font-display);
		font-size: var(--step-0);
		color: var(--text);
	}
	.copy .dot {
		color: var(--accent-ink);
	}
</style>
