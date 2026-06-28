<script lang="ts">
	import { Handshake, Users, Fingerprint } from '@lucide/svelte';
	import type { ServiceIcon } from '$lib/content';

	let { icon, size = 28 }: { icon: ServiceIcon; size?: number } = $props();

	const map = { handshake: Handshake, team: Users, identity: Fingerprint };
	const Cmp = $derived(map[icon]);
</script>

<Cmp {size} strokeWidth={1.6} aria-hidden="true" />
