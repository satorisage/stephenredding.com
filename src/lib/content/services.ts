import type { Service } from './types';

/** Intro copy for the Services page (from the original Hugo _index). */
export const servicesIntro =
	'I provide personalized coaching designed to support your growth and help you cultivate inner peace. Each session is tailored in the moment, focusing on empowering you to navigate life with clarity and confidence. Together, we’ll work to align your actions with your values and foster a deeper connection to yourself.';

export const services: Service[] = [
	{
		slug: '1-1',
		title: '1:1 Coaching',
		tagline: 'Individual Support',
		icon: 'handshake',
		summary:
			'Personalized one-on-one coaching that holds space for you to uncover the clarity and truth already within you.',
		intro: [
			"My personal coaching services are about holding space for you to explore what you truly need and already know deep within yourself. The process isn't about guiding you toward a predetermined outcome or belief; rather, it's about creating a supportive environment where you can safely uncover your own clarity and truth.",
			"Through meaningful conversations and thoughtful self-reflection, we'll gently explore emotional blocks, limiting beliefs, and subconscious patterns that might be preventing you from fully stepping into your potential. The answers you seek are uniquely yours, and my role is to guide and support you in discovering them.",
			"Coaching isn't about adding something new—it's about creating space to recognize what's already there, empowering you to trust your inner wisdom. The results are yours to define, emerging naturally as you reconnect with your clarity, confidence, and self-empowerment. The path is yours to shape; I'm here to support and facilitate your journey.",
			"A typical session begins with what's present for you in the moment. Whether addressing a specific challenge or exploring recurring patterns, we approach each topic with curiosity and compassion. Together, we'll examine your thoughts and feelings, helping you identify and release beliefs that no longer serve you. The goal is to hold a safe, supportive space where you can gain insight and take aligned, meaningful steps forward.",
			'In my own journey, learning to trust myself and recognizing my ability to navigate life clearly and confidently has been transformative. My hope is to help you discover that same empowering clarity within yourself—not by giving you answers, but by supporting you as you uncover your own.'
		],
		sections: [],
		cta: { text: 'Book a Discovery Call', href: '/contact' },
		enabled: true,
		weight: 10
	},
	{
		slug: 'communication-support',
		title: 'Communicate with Confidence',
		tagline: 'Couples and Groups',
		icon: 'team',
		summary:
			'Structured group sessions to help you express yourself clearly, navigate difficult conversations, and build deeper connections.',
		intro: [
			'Structured group sessions designed to help individuals and teams overcome communication barriers. Learn practical tools to express yourself clearly, navigate difficult conversations, and build deeper connections—whether in relationships, workplaces, or social settings.'
		],
		sections: [
			{
				heading: "Who It's For",
				bullets: [
					'Couples wanting to break negative communication cycles',
					'Professionals struggling with workplace dynamics',
					'Individuals who feel "stuck" expressing their needs'
				]
			},
			{
				heading: 'Outcomes',
				bullets: [
					'Frameworks to articulate thoughts without confrontation',
					'Active listening skills to reduce misunderstandings',
					'Confidence to set boundaries and ask for what you need'
				]
			},
			{
				quote: 'Words build bridges where silence makes walls.'
			}
		],
		note: 'All sessions are confidential and held via Zoom. Groups limited to 6 participants for personalized attention.',
		cta: { text: 'Book a Discovery Call', href: '/contact' },
		enabled: true,
		weight: 20
	},
	{
		slug: 'identity-reset',
		title: 'Identity Reset: 7-Day Journey',
		tagline: 'Remember Who You Are',
		icon: 'identity',
		summary: 'Reconnect with your true self and release false beliefs in just 7 days.',
		intro: [
			'**Break free from confusion, guilt, and limiting beliefs — and reconnect with the truth of who you really are in just 7 days.**'
		],
		sections: [
			{
				heading: 'What This Journey Is About',
				body: [
					'The 7-Day Identity Reset is a focused, transformative experience designed to help you shift out of false self-concepts and align with your Spirit-led identity.',
					'Each day offers a guided focus to uncover, release, and reset the mental patterns that have kept you stuck — helping you awaken the peace, clarity, and empowerment already within you.',
					'This is not about adding anything new to you. It’s about clearing away what was never true.'
				]
			},
			{
				heading: "What You'll Experience",
				bullets: [
					'Discover the hidden beliefs that have shaped your identity.',
					'Reclaim your inner authority and spiritual clarity.',
					'Learn to recognize and dissolve false programming.',
					'Restore connection with your true self beyond fear and shame.',
					'Begin living from a place of peace, power, and purpose.'
				]
			},
			{
				heading: 'How It Works',
				bullets: [
					'Daily Focus: A short, clear practice or reflection each day.',
					'Self-Paced: Move through it in your own rhythm — no pressure.',
					'No Overwhelm: Practical, powerful steps designed to fit into real life.',
					'Lifetime Access: Return to the material whenever you need a reset.'
				]
			},
			{
				heading: 'Is This For You?',
				body: ['This journey is for you if you’re ready to:'],
				bullets: [
					'Let go of old stories and guilt that no longer serve you.',
					'Stop striving for worthiness and remember your true wholeness.',
					'Reconnect with God, Spirit, and your authentic self — without dogma or fear.',
					'Step forward into life with confidence and clarity.'
				]
			}
		],
		cta: { text: 'Start Your Journey', href: '/contact' },
		// Preserved from the Hugo source (enable: false) — not currently published.
		enabled: false,
		weight: 30
	}
];

/** Published services only, in display order. */
export function publishedServices(): Service[] {
	return services.filter((s) => s.enabled).sort((a, b) => a.weight - b.weight);
}
