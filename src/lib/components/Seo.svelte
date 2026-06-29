<script lang="ts">
	import { page } from '$app/state';
	import { profile } from '$lib/content';
	import { SITE_URL, SITE_DESCRIPTION, canonical } from '$lib/seo';

	interface Props {
		title: string;
		description?: string;
		/** OG/Twitter share image (absolute or root-relative). Defaults to the portrait. */
		image?: string;
		type?: 'website' | 'article';
	}

	let {
		title,
		description = SITE_DESCRIPTION,
		image = profile.photo,
		type = 'website'
	}: Props = $props();

	const url = $derived(canonical(page.url.pathname));
	const imageUrl = $derived(image.startsWith('http') ? image : `${SITE_URL}${image}`);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />

	<meta property="og:type" content={type} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />
	<meta property="og:site_name" content={profile.name} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
