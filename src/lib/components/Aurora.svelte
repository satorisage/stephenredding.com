<script lang="ts">
	// Soft, slow, warm aurora — three blurred blobs drifting behind content.
	// Calm by design: long durations, low motion, amber/rose/gold. Disabled
	// under prefers-reduced-motion (see styles).
	let { fixed = false }: { fixed?: boolean } = $props();
</script>

<div class="aurora" class:fixed aria-hidden="true">
	<span class="blob a"></span>
	<span class="blob b"></span>
	<span class="blob c"></span>
</div>

<style>
	.aurora {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}
	.aurora.fixed {
		position: fixed;
	}
	.blob {
		position: absolute;
		border-radius: 50%;
		filter: blur(70px);
		opacity: 0.5;
		mix-blend-mode: var(--aurora-blend, normal);
		will-change: transform;
	}
	.a {
		width: 44vmax;
		height: 44vmax;
		top: -14vmax;
		left: -6vmax;
		background: radial-gradient(circle, var(--aurora-1), transparent 65%);
		animation: drift-a 26s ease-in-out infinite alternate;
	}
	.b {
		width: 38vmax;
		height: 38vmax;
		top: -10vmax;
		right: -8vmax;
		background: radial-gradient(circle, var(--aurora-2), transparent 65%);
		animation: drift-b 30s ease-in-out infinite alternate;
	}
	.c {
		width: 34vmax;
		height: 34vmax;
		bottom: -16vmax;
		left: 30%;
		background: radial-gradient(circle, var(--aurora-3), transparent 62%);
		opacity: 0.4;
		animation: drift-c 34s ease-in-out infinite alternate;
	}

	@keyframes drift-a {
		to {
			transform: translate3d(6vmax, 4vmax, 0) scale(1.12);
		}
	}
	@keyframes drift-b {
		to {
			transform: translate3d(-5vmax, 6vmax, 0) scale(1.08);
		}
	}
	@keyframes drift-c {
		to {
			transform: translate3d(4vmax, -5vmax, 0) scale(1.15);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.blob {
			animation: none;
		}
	}
</style>
