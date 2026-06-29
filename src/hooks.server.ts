import type { Handle } from '@sveltejs/kit';

// Security headers on every SSR response (/contact). Prerendered pages get the
// same set via the root `_headers` file. CSP is emitted by kit.csp (header on
// SSR, <meta> on prerendered).
export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	const h = response.headers;
	h.set('X-Content-Type-Options', 'nosniff');
	h.set('X-Frame-Options', 'DENY');
	h.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	h.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=()');
	h.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	h.set('Cross-Origin-Opener-Policy', 'same-origin');
	return response;
};
