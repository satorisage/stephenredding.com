import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	// `cloudflare:email` is a workerd runtime module — leave it unbundled.
	ssr: { external: ['cloudflare:email'] },
	build: { rollupOptions: { external: ['cloudflare:email'] } }
});
