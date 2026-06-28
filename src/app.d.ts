// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			// Cloudflare bindings/secrets declared in wrangler.jsonc are injected
			// here at request time. Reached via event.platform?.env.<NAME>.
			// Typed loosely until the lead form (T6) and deploy (T8) wire real bindings.
			env?: Record<string, string | undefined>;
		}
	}
}

export {};
