import { profile } from '$lib/content';
import type { Deliver, Enquiry } from './contact';

/**
 * Discovery Call delivery via Resend (HTTP email API) — a plain `fetch` from
 * the Pages function, so it works on Cloudflare Pages (the `send_email` binding
 * is Workers-only). Same shape as the fleet's Graph-over-HTTP call.
 *
 * Config (Cloudflare Pages env):
 *   RESEND_API_KEY (secret), EMAIL_FROM (a Resend-verified sender on the
 *   domain), EMAIL_TO (where enquiries land; defaults to profile.email).
 *
 * Graceful degradation: no API key (local/dev) → log + skip so the form is
 * testable before Resend is set up. A real send failure throws so the route
 * can tell the visitor (there is no durable fallback store on this site).
 */
export interface EmailEnv {
	RESEND_API_KEY?: string;
	EMAIL_FROM?: string;
	EMAIL_TO?: string;
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

export function emailDeliver(env: EmailEnv | undefined): Deliver {
	return async (enquiry: Enquiry) => {
		const key = env?.RESEND_API_KEY;
		if (!key) {
			console.warn('[contact] RESEND_API_KEY missing — enquiry not emailed', {
				enquiry: { name: enquiry.name, email: enquiry.email }
			});
			return;
		}

		const from = env?.EMAIL_FROM || 'Stĕphen Redding <hello@stephenredding.com>';
		const to = env?.EMAIL_TO || profile.email;

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: { authorization: `Bearer ${key}`, 'content-type': 'application/json' },
			body: JSON.stringify({
				from,
				to: [to],
				reply_to: `${enquiry.name} <${enquiry.email}>`,
				subject: `Discovery Call request from ${enquiry.name}`,
				html: renderHtml(enquiry)
			})
		});
		if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
	};
}
