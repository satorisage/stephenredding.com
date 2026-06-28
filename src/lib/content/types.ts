// Typed content model for stephenredding.com.
// Content is authored as typed data (fleet convention) — no markdown/mdsvex.

/** The four certification groupings, in display order. */
export const CERT_CATEGORIES = [
	'Life Transformation Coaching',
	'Practitioner of NLP',
	'Master Practitioner of NLP',
	'Mental Health Coaching'
] as const;

export type CertCategory = (typeof CERT_CATEGORIES)[number];

export interface Certification {
	/** URL slug + stable id. */
	slug: string;
	title: string;
	category: CertCategory;
	/** Organization that issued the credential. */
	issuer: string;
	/** Trainer / training body. */
	trainer: string;
	/** Credential image, served from /static — e.g. /images/certifications/mhc.png */
	image: string;
	/** ISO date the credential was earned. */
	date: string;
	/** Short label (from the original og_description). */
	description: string;
	/** Order within the category (lower = first). */
	weight: number;
}

export type ServiceIcon = 'handshake' | 'team' | 'identity';

/** A structured block within a service's long-form description. */
export interface ServiceSection {
	heading?: string;
	/** Body paragraphs. */
	body?: string[];
	/** Bullet list items. */
	bullets?: string[];
	/** A pull-quote. */
	quote?: string;
}

export interface Service {
	slug: string;
	title: string;
	/** Short positioning line (original `description`). */
	tagline: string;
	icon: ServiceIcon;
	/** One-sentence summary (original og_description). */
	summary: string;
	/** Lead paragraphs before any sections. */
	intro: string[];
	sections: ServiceSection[];
	/** Optional footer note (e.g. confidentiality / logistics). */
	note?: string;
	cta: { text: string; href: string };
	/** Whether the service is currently published. */
	enabled: boolean;
	weight: number;
}

export interface Testimonial {
	person: string;
	/** ISO date. */
	date: string;
	quote: string;
}

export interface SocialLink {
	name: string;
	/** Accessible label. */
	label: string;
	url: string;
	/** Inner SVG markup (viewBox + paths), rendered via a small icon component. */
	svg: string;
}
