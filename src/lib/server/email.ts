import { createMimeMessage } from 'mimetext';
import { profile } from '$lib/content';
import type { Deliver, Enquiry } from './contact';

/**
 * Discovery Call delivery via Cloudflare Email Routing (the Workers
 * `send_email` binding). Sends to a verified Email Routing destination (the
 * owner's inbox) — ideal for a one-recipient contact form. No app secret: the
 * binding + a verified destination address is the whole contract.
 *
 * Runtime config (wrangler.jsonc):
 *   send_email binding `SEB`; vars EMAIL_FROM (on-zone, e.g.
 *   hello@stephenredding.com) and EMAIL_TO (verified destination; defaults to
 *   profile.email).
 *
 * Graceful degradation: with no binding (local `vite dev`), logs and skips so
 * the form is testable before Email Routing is set up.
 */
export interface SendEmailBinding {
	send(message: unknown): Promise<void>;
}

export interface EmailEnv {
	SEB?: SendEmailBinding;
	/** From address on the zone (must be a domain you control). */
	EMAIL_FROM?: string;
	/** Verified Email Routing destination; defaults to profile.email. */
	EMAIL_TO?: string;
}

export function emailDeliver(env: EmailEnv | undefined): Deliver {
	return async (enquiry: Enquiry) => {
		const binding = env?.SEB;
		if (!binding) {
			console.warn('[contact] send_email binding (SEB) missing — enquiry not emailed', {
				enquiry: { name: enquiry.name, email: enquiry.email }
			});
			return;
		}

		const from = env?.EMAIL_FROM || 'hello@stephenredding.com';
		const to = env?.EMAIL_TO || profile.email;

		const mime = createMimeMessage();
		mime.setSender({ name: 'stephenredding.com', addr: from });
		mime.setRecipient(to);
		mime.setSubject(`Discovery Call request from ${enquiry.name}`);
		// Reply-To the visitor so a reply reaches them directly.
		mime.setHeader('Reply-To', `${enquiry.name} <${enquiry.email}>`);
		mime.addMessage({
			contentType: 'text/plain',
			data: `New Discovery Call request\n\nName:  ${enquiry.name}\nEmail: ${enquiry.email}\n\n${enquiry.message}\n`
		});

		// `cloudflare:email` is a workerd-only module — imported lazily so local
		// node SSR (which never has the binding) doesn't try to resolve it.
		const { EmailMessage } = await import('cloudflare:email');
		await binding.send(new EmailMessage(from, to, mime.asRaw()));
	};
}
