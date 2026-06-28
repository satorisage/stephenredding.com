import { profile } from '$lib/content';
import type { Deliver, Enquiry } from './contact';

/**
 * Discovery Call delivery via Microsoft 365 (Microsoft Graph `sendMail`,
 * client-credentials flow). Sends from a real M365 mailbox so SPF/DKIM/DMARC
 * pass natively — no extra DNS.
 *
 * Secrets live in the platform env (Cloudflare Pages secrets / `.dev.vars`),
 * never in the repo:
 *   GRAPH_TENANT_ID, GRAPH_CLIENT_ID, GRAPH_CLIENT_SECRET, GRAPH_SENDER
 *   GRAPH_TO (optional; defaults to profile.email)
 */
export interface GraphEnv {
	GRAPH_TENANT_ID?: string;
	GRAPH_CLIENT_ID?: string;
	GRAPH_CLIENT_SECRET?: string;
	/** Mailbox to send AS (UPN). */
	GRAPH_SENDER?: string;
	/** Where enquiries land; defaults to profile.email. */
	GRAPH_TO?: string;
}

type GraphConfig = Required<Omit<GraphEnv, 'GRAPH_TO'>> & { to: string };

function configFrom(env: GraphEnv | undefined): GraphConfig | undefined {
	if (
		!env?.GRAPH_TENANT_ID ||
		!env.GRAPH_CLIENT_ID ||
		!env.GRAPH_CLIENT_SECRET ||
		!env.GRAPH_SENDER
	)
		return undefined;
	return {
		GRAPH_TENANT_ID: env.GRAPH_TENANT_ID,
		GRAPH_CLIENT_ID: env.GRAPH_CLIENT_ID,
		GRAPH_CLIENT_SECRET: env.GRAPH_CLIENT_SECRET,
		GRAPH_SENDER: env.GRAPH_SENDER,
		to: env.GRAPH_TO || profile.email
	};
}

async function getToken(c: GraphConfig): Promise<string> {
	const res = await fetch(
		`https://login.microsoftonline.com/${c.GRAPH_TENANT_ID}/oauth2/v2.0/token`,
		{
			method: 'POST',
			headers: { 'content-type': 'application/x-www-form-urlencoded' },
			body: new URLSearchParams({
				client_id: c.GRAPH_CLIENT_ID,
				client_secret: c.GRAPH_CLIENT_SECRET,
				scope: 'https://graph.microsoft.com/.default',
				grant_type: 'client_credentials'
			})
		}
	);
	if (!res.ok) throw new Error(`Graph token ${res.status}: ${await res.text()}`);
	const data = (await res.json()) as { access_token?: string };
	if (!data.access_token) throw new Error('Graph token: no access_token in response');
	return data.access_token;
}

function escapeHtml(s: string): string {
	return s.replace(
		/[&<>"']/g,
		(c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!
	);
}

function renderHtml(e: Enquiry): string {
	return `<div style="font-family:system-ui,sans-serif;color:#26201f">
  <h2 style="margin:0 0 12px">New Discovery Call request</h2>
  <table style="border-collapse:collapse;font-size:14px">
    <tr><td style="padding:4px 12px 4px 0;color:#8a7d79">Name</td><td style="padding:4px 0">${escapeHtml(e.name)}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#8a7d79">Email</td><td style="padding:4px 0">${escapeHtml(e.email)}</td></tr>
  </table>
  <p style="margin:16px 0 4px;color:#8a7d79">Message</p>
  <p style="white-space:pre-wrap;margin:0">${escapeHtml(e.message)}</p>
  <hr style="border:none;border-top:1px solid #e4dad4;margin:20px 0" />
  <p style="font-size:12px;color:#8a7d79">Reply to this email to reach ${escapeHtml(e.name)} directly.</p>
</div>`;
}

async function sendViaGraph(c: GraphConfig, token: string, e: Enquiry): Promise<void> {
	const res = await fetch(
		`https://graph.microsoft.com/v1.0/users/${encodeURIComponent(c.GRAPH_SENDER)}/sendMail`,
		{
			method: 'POST',
			headers: { authorization: `Bearer ${token}`, 'content-type': 'application/json' },
			body: JSON.stringify({
				message: {
					subject: `Discovery Call request from ${e.name}`,
					body: { contentType: 'HTML', content: renderHtml(e) },
					toRecipients: [{ emailAddress: { address: c.to } }],
					replyTo: [{ emailAddress: { address: e.email, name: e.name } }]
				},
				saveToSentItems: false
			})
		}
	);
	// Graph sendMail returns 202 Accepted with an empty body on success.
	if (!res.ok) throw new Error(`Graph sendMail ${res.status}: ${await res.text()}`);
}

/**
 * Build the email delivery seam. Throws on a real send failure (so the route
 * can tell the visitor it didn't go through — there's no durable fallback
 * store on this site). With no Graph creds (local/dev), logs and returns
 * without throwing so the form is testable end-to-end before M365 is wired.
 */
export function emailDeliver(env: GraphEnv | undefined): Deliver {
	const c = configFrom(env);
	return async (enquiry) => {
		if (!c) {
			console.warn('[contact] Graph creds missing (GRAPH_*) — enquiry not emailed', {
				present: graphPresence(env),
				enquiry: { name: enquiry.name, email: enquiry.email }
			});
			return;
		}
		const token = await getToken(c);
		await sendViaGraph(c, token, enquiry);
	};
}

/** Which GRAPH_* secrets are present (booleans only — never the values). */
export function graphPresence(env: GraphEnv | undefined) {
	return {
		GRAPH_TENANT_ID: Boolean(env?.GRAPH_TENANT_ID),
		GRAPH_CLIENT_ID: Boolean(env?.GRAPH_CLIENT_ID),
		GRAPH_CLIENT_SECRET: Boolean(env?.GRAPH_CLIENT_SECRET),
		GRAPH_SENDER: Boolean(env?.GRAPH_SENDER),
		GRAPH_TO: Boolean(env?.GRAPH_TO)
	};
}
