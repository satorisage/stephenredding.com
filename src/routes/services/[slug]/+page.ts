import { error } from '@sveltejs/kit';
import { services, publishedServices } from '$lib/content';
import type { EntryGenerator } from './$types';

export const load = ({ params }) => {
	const service = services.find((s) => s.slug === params.slug && s.enabled);
	if (!service) error(404, 'Service not found');
	return { service };
};

// Prerender one page per published service.
export const entries: EntryGenerator = () =>
	publishedServices().map((s) => ({ slug: s.slug }));
