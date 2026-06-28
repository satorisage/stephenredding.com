import { profile, socialLinks } from './content';

/** Canonical production origin (no trailing slash). */
export const SITE_URL = 'https://stephenredding.com';

export const SITE_DESCRIPTION =
	'Self-awareness coaching with Stĕphen Redding — reconnect with the truth of who you are, beyond fear, shame, and the old beliefs that have clouded your identity.';

export const canonical = (pathname: string): string =>
	SITE_URL + (pathname === '/' ? '' : pathname.replace(/\/$/, ''));

/** Person + WebSite structured data, shown site-wide. */
export function siteJsonLd() {
	return [
		{
			'@context': 'https://schema.org',
			'@type': 'Person',
			name: profile.name,
			jobTitle: profile.role,
			url: SITE_URL,
			email: profile.email,
			description: SITE_DESCRIPTION,
			sameAs: socialLinks.map((s) => s.url)
		},
		{
			'@context': 'https://schema.org',
			'@type': 'WebSite',
			name: profile.name,
			url: SITE_URL,
			description: SITE_DESCRIPTION
		}
	];
}

/** Service structured data for a service detail page. */
export function serviceJsonLd(opts: {
	name: string;
	description: string;
	pathname: string;
}) {
	return {
		'@context': 'https://schema.org',
		'@type': 'Service',
		name: opts.name,
		description: opts.description,
		serviceType: 'Coaching',
		url: canonical(opts.pathname),
		provider: { '@type': 'Person', name: profile.name, jobTitle: profile.role }
	};
}
