import { profile, publishedServices, certifications } from '$lib/content';
import { SITE_URL } from '$lib/seo';
import type { RequestHandler } from './$types';

export const prerender = true;
export const trailingSlash = 'ignore';

/**
 * llms.txt — a plain-markdown brief that helps AI crawlers (ChatGPT,
 * Perplexity, Copilot, etc.) understand and accurately cite the site.
 * Emerging convention from llmstxt.org. Every value traces back to the typed
 * content modules so it can never drift from the live site.
 */
export const GET: RequestHandler = () => {
	const u = (path: string) => `${SITE_URL}${path}`;

	const serviceList = publishedServices()
		.map((s) => `- **${s.title}** (${s.tagline}) — ${s.summary}`)
		.join('\n');

	const certCount = certifications.length;

	const body = `# ${profile.name}

> ${profile.role}

${profile.about[0]} ${profile.about[3]}

## Contact

- Email: ${profile.email} (subject "${profile.contact.subject}")
- Web: ${SITE_URL}/

## Services

${serviceList}

## Pages

- [Home](${u('/')}): overview and how the coaching works.
- [About](${u('/about')}): who ${profile.name} is and the approach.
- [Services](${u('/services')}): self-awareness coaching offerings.
- [Certifications](${u('/certifications')}): ${certCount} coaching certifications across Life Transformation, NLP, and Mental Health disciplines.
- [Contact](${u('/contact')}): request a Discovery Call.

## Approach

Coaching is not about adding anything or fixing anything — it is about clearing
what clouds the clarity and peace already within you. Sessions are tailored in
the moment, holding a safe, confidential space to release limiting beliefs and
reconnect with your own truth.
`;

	return new Response(body, {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' }
	});
};
