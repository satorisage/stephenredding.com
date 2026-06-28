import { fail } from '@sveltejs/kit';
import { handleEnquiry } from '$lib/server/contact';
import { emailDeliver, type GraphEnv } from '$lib/server/email';
import { verifyTurnstile } from '$lib/server/turnstile';
import type { Actions } from './$types';

// Has a form action + Turnstile + Graph send — runs on the Worker, not prerendered.
export const prerender = false;

const keep = (raw: Record<string, unknown>) => ({
	name: typeof raw.name === 'string' ? raw.name : '',
	email: typeof raw.email === 'string' ? raw.email : '',
	message: typeof raw.message === 'string' ? raw.message : ''
});

export const actions: Actions = {
	default: async ({ request, platform, getClientAddress }) => {
		const env = platform?.env as (GraphEnv & { TURNSTILE_SECRET_KEY?: string }) | undefined;
		const form = await request.formData();
		const raw = Object.fromEntries(form) as Record<string, unknown>;

		const token = typeof raw['cf-turnstile-response'] === 'string'
			? raw['cf-turnstile-response']
			: undefined;
		const verified = await verifyTurnstile(token, env?.TURNSTILE_SECRET_KEY, getClientAddress());
		if (!verified) {
			return fail(400, {
				errors: { form: 'Verification failed — please try again.' },
				values: keep(raw)
			});
		}

		try {
			const result = await handleEnquiry(raw, emailDeliver(env));
			if (!result.ok) return fail(400, { errors: result.errors, values: result.values });
			return { success: true };
		} catch (err) {
			console.error('[contact] delivery failed', String(err));
			return fail(502, {
				errors: { form: "Something went wrong sending your message. Please email me directly." },
				values: keep(raw)
			});
		}
	}
};
