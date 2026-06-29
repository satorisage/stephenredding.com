import { CERT_CATEGORIES, type CertCategory, type Certification } from './types';

/** Intro copy for the Certifications page (from the original Hugo _index). */
export const certificationsIntro =
	'Each of these certifications represents a step in my own journey toward deeply understanding how personal transformation unfolds. They’ve given me valuable tools and frameworks to support others as they reconnect with the clarity and peace already within them.';

export const certifications: Certification[] = [
	// — Life Transformation Coaching —
	{
		slug: 'ltpc',
		title: 'Life Transformation Power Coach',
		category: 'Life Transformation Coaching',
		issuer: '5th Element Behavior Consultancy',
		trainer: 'Anil Dagia',
		image: '/images/certifications/ltpc.png',
		date: '2025-03-20',
		description: 'Certified Life Transformation Power Coach',
		weight: 1
	},
	{
		slug: 'ltc',
		title: 'Life Transformation Coach',
		category: 'Life Transformation Coaching',
		issuer: '5th Element Behavior Consultancy',
		trainer: 'Anil Dagia',
		image: '/images/certifications/ltc.png',
		date: '2024-12-23',
		description: 'Certified Life Transformation Coach',
		weight: 2
	},

	// — Practitioner of NLP —
	{
		slug: 'pnlp',
		title: 'Practitioner of NLP',
		category: 'Practitioner of NLP',
		issuer: '5th Element Behavior Consultancy',
		trainer: 'Anil Dagia',
		image: '/images/certifications/pnlp.png',
		date: '2024-12-23',
		description: 'Certified Practitioner of NLP',
		weight: 2
	},
	{
		slug: 'pnlp-rmc',
		title: 'Results Mastery Coach',
		category: 'Practitioner of NLP',
		issuer: '5th Element Behavior Consultancy',
		trainer: 'Anil Dagia',
		image: '/images/certifications/pnlp-rmc.png',
		date: '2024-12-23',
		description: 'Certified Results Mastery Coach',
		weight: 3
	},
	{
		slug: 'pnlp-emc',
		title: 'Emotions Mastery Coach',
		category: 'Practitioner of NLP',
		issuer: '5th Element Behavior Consultancy',
		trainer: 'Anil Dagia',
		image: '/images/certifications/pnlp-emc.png',
		date: '2024-12-23',
		description: 'Certified Emotions Mastery Coach',
		weight: 4
	},

	// — Master Practitioner of NLP —
	{
		slug: 'mpnlp',
		title: 'Master Practitioner of NLP',
		category: 'Master Practitioner of NLP',
		issuer: '5th Element Behavior Consultancy',
		trainer: 'Anil Dagia',
		image: '/images/certifications/mpnlp.png',
		date: '2024-03-20',
		description: 'Certified Master Practitioner of NLP',
		weight: 1
	},
	{
		slug: 'mpnlp-hfm',
		title: 'Health & Fitness Mindset Coach',
		category: 'Master Practitioner of NLP',
		issuer: '5th Element Behavior Consultancy',
		trainer: 'Anil Dagia',
		image: '/images/certifications/mpnlp-hfm.png',
		date: '2024-03-20',
		description: 'Certified Health & Fitness Mindset Coach',
		weight: 2
	},
	{
		slug: 'mpnlp-fm',
		title: 'Financial Mindset Coach',
		category: 'Master Practitioner of NLP',
		issuer: '5th Element Behavior Consultancy',
		trainer: 'Anil Dagia',
		image: '/images/certifications/mpnlp-fm.png',
		date: '2024-03-20',
		description: 'Certified Financial Mindset Coach',
		weight: 3
	},
	{
		slug: 'mpnlp-r',
		title: 'Relationship Coach',
		category: 'Master Practitioner of NLP',
		issuer: '5th Element Behavior Consultancy',
		trainer: 'Anil Dagia',
		image: '/images/certifications/mpnlp-r.png',
		date: '2024-03-20',
		description: 'Certified Relationship Coach',
		weight: 4
	},
	{
		slug: 'mpnlp-hpt',
		title: 'High Performance Team Coach',
		category: 'Master Practitioner of NLP',
		issuer: '5th Element Behavior Consultancy',
		trainer: 'Anil Dagia',
		image: '/images/certifications/mpnlp-hpt.png',
		date: '2024-03-20',
		description: 'Certified High Performance Team Coach',
		weight: 5
	},
	{
		slug: 'mpnlp-tm',
		title: 'Thinking Mastery Coach',
		category: 'Master Practitioner of NLP',
		issuer: '5th Element Behavior Consultancy',
		trainer: 'Anil Dagia',
		image: '/images/certifications/mpnlp-tm.png',
		date: '2024-03-20',
		description: 'Certified Thinking Mastery Coach',
		weight: 6
	},

	// — Mental Health Coaching —
	{
		slug: 'mhc',
		title: 'Mental Health Coach',
		category: 'Mental Health Coaching',
		issuer: 'Hope and Healing Center & Institute',
		trainer: 'Gateway to Hope University',
		image: '/images/certifications/mhc.png',
		date: '2025-05-17',
		description: 'Certified Mental Health Coach',
		weight: 1
	},
	{
		slug: 'mhc-t',
		title: 'Mental Health Coach: Trauma',
		category: 'Mental Health Coaching',
		issuer: 'Hope and Healing Center & Institute',
		trainer: 'Gateway to Hope University',
		image: '/images/certifications/mhc-t.png',
		date: '2025-05-22',
		description: 'Certified Mental Health Coach for Trauma',
		weight: 2
	},
	{
		slug: 'mhc-aabhd',
		title: 'Mental Health Coach: Addiction & Behavioral Health Disorders',
		category: 'Mental Health Coaching',
		issuer: 'Hope and Healing Center & Institute',
		trainer: 'Gateway to Hope University',
		image: '/images/certifications/mhc-aabhd.png',
		date: '2025-05-22',
		description: 'Certified Mental Health Coach for Addiction & Behavioral Health Disorders',
		weight: 3
	}
];

/** Certifications grouped by category, each in display order, categories in canonical order. */
export function certificationsByCategory(): { category: CertCategory; items: Certification[] }[] {
	return CERT_CATEGORIES.map((category) => ({
		category,
		items: certifications
			.filter((c) => c.category === category)
			.sort((a, b) => a.weight - b.weight)
	})).filter((group) => group.items.length > 0);
}
