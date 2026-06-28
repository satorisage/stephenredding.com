/** Site owner + core site copy (from the Hugo About + Contact pages). */
export const profile = {
	name: 'Stĕphen Redding',
	role: 'Self-Awareness Coach',
	greeting: 'Hi, I go by Stĕphen.',
	email: 'stephen.redding31@gmail.com',
	/** About-page body paragraphs. */
	about: [
		'I help people reconnect with the truth of who they are — beyond fear, shame, and the old beliefs that have clouded their identity.',
		'Through my own journey of questioning, unlearning, and deep inner work, I discovered that real transformation isn’t about becoming something new — it’s about remembering who you’ve always been.',
		'We’re not broken — we’ve been programmed by false ideas.',
		'My role is to help you clear the noise, reclaim your agency, and live from the clarity, peace, and freedom already within you.'
	],
	/** Contact-page invitation copy. */
	contact: {
		heading: 'Get In Touch',
		body: 'If you are interested in working with me, send me an email with the subject "Discovery Call" and we will plan a day and time to connect. I look forward to hearing from you!',
		/** Prefilled subject for the Discovery Call mailto/lead form. */
		subject: 'Discovery Call'
	}
} as const;
