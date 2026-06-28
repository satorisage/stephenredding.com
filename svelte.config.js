import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	compilerOptions: { runes: true },
	kit: {
		adapter: adapter(),
		// Strict, hashed CSP — no unsafe-inline. SvelteKit hashes its own inline
		// script/style; external surfaces are allowlisted by origin.
		// (challenges.cloudflare.com = Turnstile [T6]; cloudflareinsights = Web
		// Analytics [T7].)
		csp: {
			mode: 'hash',
			directives: {
				'default-src': ['self'],
				'script-src': [
					'self',
					'https://static.cloudflareinsights.com',
					'https://challenges.cloudflare.com'
				],
				'style-src': ['self'],
				'img-src': ['self', 'data:'],
				'font-src': ['self'],
				'connect-src': ['self', 'https://static.cloudflareinsights.com'],
				'frame-src': ['https://challenges.cloudflare.com'],
				'base-uri': ['self'],
				'form-action': ['self'],
				'object-src': ['none']
			}
		}
	}
};

export default config;
