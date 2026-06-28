import { publishedServices } from '$lib/content';
import { SITE_URL } from '$lib/seo';

export const prerender = true;

// Public, indexable pages. /praise is excluded while it has no testimonials
// (it ships noindex); the disabled service is excluded via publishedServices().
export function GET() {
	const paths = [
		'/',
		'/about',
		'/services',
		'/certifications',
		'/contact',
		...publishedServices().map((s) => `/services/${s.slug}`)
	];

	const urls = paths
		.map((p) => `\t<url>\n\t\t<loc>${SITE_URL}${p === '/' ? '' : p}</loc>\n\t</url>`)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;

	return new Response(body, {
		headers: { 'Content-Type': 'application/xml' }
	});
}
