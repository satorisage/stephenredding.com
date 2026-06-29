import type { Action } from 'svelte/action';

/**
 * Scroll-reveal: fade + rise + un-blur an element when it scrolls into view.
 * Honors prefers-reduced-motion (shows immediately, no transition).
 *
 * Usage: <div use:reveal>           or    <div use:reveal={{ delay: 120 }}>
 * Pair with the `.reveal` base styles in app.css.
 */
export const reveal: Action<HTMLElement, { delay?: number } | undefined> = (node, params) => {
	const reduce =
		typeof matchMedia !== 'undefined' &&
		matchMedia('(prefers-reduced-motion: reduce)').matches;

	if (reduce) {
		node.classList.add('is-visible');
		return;
	}

	node.classList.add('reveal');
	if (params?.delay) node.style.setProperty('--reveal-delay', `${params.delay}ms`);

	// Already in view on mount (above the fold) → reveal immediately, no flash.
	const rect = node.getBoundingClientRect();
	if (rect.top < innerHeight * 0.92 && rect.bottom > 0) {
		node.classList.add('is-visible');
		return;
	}

	const io = new IntersectionObserver(
		(entries, obs) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.classList.add('is-visible');
					obs.unobserve(node);
				}
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
	);
	io.observe(node);

	return { destroy: () => io.disconnect() };
};
