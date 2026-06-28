// See https://svelte.dev/docs/kit/types#app.d.ts
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		interface Platform {
			// Cloudflare bindings/vars/secrets declared in wrangler.jsonc (and
			// dashboard secrets) are injected here at request time, reached via
			// event.platform?.env.<NAME>.
			env?: {
				/** Resend API key (lead-form email; secret). */
				RESEND_API_KEY?: string;
				/** Turnstile secret (siteverify). */
				TURNSTILE_SECRET_KEY?: string;
				/** Lead-form from/to addresses. */
				EMAIL_FROM?: string;
				EMAIL_TO?: string;
				/** Public runtime vars. */
				PUBLIC_TURNSTILE_SITEKEY?: string;
				PUBLIC_CF_ANALYTICS_TOKEN?: string;
			};
		}
	}
}

export {};
