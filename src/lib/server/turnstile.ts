/**
 * Cloudflare Turnstile server-side verification (the "siteverify" step).
 *
 * The browser widget produces a single-use token; this confirms it with
 * Cloudflare before we accept the enquiry. Defense-in-depth with the honeypot.
 *
 * Graceful degradation (matches the Graph email pattern): with no secret
 * configured (local dev / before the widget is set up) verification is skipped
 * so the form still works — the honeypot stays active. On a transient network
 * error we fail OPEN (don't lose a real enquiry); an explicit success:false
 * (missing/forged/used token) fails CLOSED.
 */
const SITEVERIFY = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(
	token: string | undefined,
	secret: string | undefined,
	ip?: string
): Promise<boolean> {
	if (!secret) return true; // not configured yet — honeypot still guards
	if (!token) return false; // configured but no token → reject

	const body = new URLSearchParams({ secret, response: token });
	if (ip) body.set('remoteip', ip);

	try {
		const res = await fetch(SITEVERIFY, {
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			body
		});
		const data = (await res.json()) as { success?: boolean };
		return Boolean(data.success);
	} catch {
		// Cloudflare unreachable — don't punish a real visitor for our outage.
		return true;
	}
}
