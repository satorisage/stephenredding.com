import { z } from 'zod';

/**
 * Discovery Call enquiry: validation + bot-drop, transport-agnostic.
 * Delivery is an injected seam so this stays unit-testable and the route
 * wires the actual email transport (see email.ts).
 */
export const enquirySchema = z.object({
	name: z.string().trim().min(2, 'Please share your name.').max(80),
	email: z.email('That email looks off — mind double-checking?').max(120),
	message: z
		.string()
		.trim()
		.min(10, 'A sentence or two about what’s prompting you helps me prepare.')
		.max(2000),
	/** Honeypot — humans leave this empty; bots that fill it are dropped. */
	website: z.string().optional()
});

export type Enquiry = z.infer<typeof enquirySchema>;

export type EnquiryResult =
	| { ok: true }
	| { ok: false; errors: Record<string, string>; values: Record<string, string> };

function fieldErrors(error: z.ZodError): Record<string, string> {
	const out: Record<string, string> = {};
	for (const issue of error.issues) {
		const key = String(issue.path[0] ?? 'form');
		out[key] ??= issue.message;
	}
	return out;
}

/** How a validated enquiry leaves the system (email.ts supplies the real one). */
export type Deliver = (enquiry: Enquiry) => Promise<void>;

const logOnly: Deliver = async (enquiry) => {
	console.log('[contact] new enquiry', { name: enquiry.name, email: enquiry.email });
};

/** Validate, drop bots (honeypot), then deliver. Never delivers invalid input. */
export async function handleEnquiry(
	raw: Record<string, unknown>,
	deliver: Deliver = logOnly
): Promise<EnquiryResult> {
	const parsed = enquirySchema.safeParse(raw);

	if (!parsed.success) {
		const values: Record<string, string> = {};
		for (const [k, v] of Object.entries(raw)) values[k] = typeof v === 'string' ? v : '';
		return { ok: false, errors: fieldErrors(parsed.error), values };
	}

	// Honeypot tripped — pretend success, drop silently.
	if (parsed.data.website) return { ok: true };

	await deliver(parsed.data);
	return { ok: true };
}
