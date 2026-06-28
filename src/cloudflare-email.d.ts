// Ambient declaration for the workerd-only `cloudflare:email` module, so
// `svelte-check` resolves it without pulling all of @cloudflare/workers-types.
// (Pure-ambient .d.ts — no import/export — to stay globally visible.)
declare module 'cloudflare:email' {
	export class EmailMessage {
		constructor(from: string, to: string, raw: string);
	}
}
