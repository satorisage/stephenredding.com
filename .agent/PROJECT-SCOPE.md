# Project Scope: stephenredding.com

## Overview
Personal self-awareness coaching site for Stephen Redding, re-platformed from
Hugo onto the fleet's SvelteKit + Svelte 5 + TypeScript + Cloudflare stack. It
presents the coaching practice (About, Services, Certifications, Praise) and
converts the right visitor into a booked "Discovery Call." Success = a fast,
fleet-consistent, sentinel-conformant site that preserves all existing content
and turns prospects into Discovery-Call leads.

## Pairings (optional)

- sveltekit — the app framework: routing, load, form actions, prerendering, adapters.
- svelte — Svelte 5 runes component-authoring model.
- typescript — strict TS; the content model is typed data, not markdown.
- css — custom CSS + OKLCH design tokens + `light-dark()` theming (the chosen styling axis).
- ui-ux — designed marketing surface: structure, hierarchy, components, accessibility.
- jobs-to-be-done — designs from the prospect's job (assess trust → book a call); the conversion lens.
- microsoft-graph — the lead form sends email via Microsoft Graph.
- cloudflare-pages-workers — edge hosting/runtime: Pages, Workers isolates, wrangler, bindings, CF Web Analytics, Turnstile.
- local-trade-marketing — trust-dependent service marketing: every claim a credibility claim, judged by leads.
- copy-truth — keeps the 16 certification claims and in-product copy verifiable.
- prose-craft — readability of the reflective About/Services prose.

## Principles, in priority order

1. **Fleet consistency.** Match the established SvelteKit/Cloudflare fleet
   conventions (risentech/cops/peoriait/font11a). New structure follows the
   fleet pattern; diverge only by naming why first. (Sharpens #8.)
2. **Truthful credibility claims.** Every certification, credential, and
   capability claim is real and verifiable. A false or unverifiable claim is a
   bug, not copy. (local-trade-marketing + copy-truth; sharpens #9/#13.)
3. **Conformance by construction.** The sentinel inbound surface — robots.txt,
   sitemap, canonical, JSON-LD, strict CSP, Lighthouse health — ships as a
   default of every page, not a later retrofit.
4. **Workers-runtime-first.** No Node-only assumptions; durable state lives in
   bindings, never isolate memory or local files. (cloudflare-pages-workers; sharpens #7.)
5. Canonical `PERSONAL-PRINCIPLES.md` apply by default for everything else.

## Hard constraints

- Cloudflare Workers runtime — no Node-only APIs unless `nodejs_compat` is declared in `wrangler.jsonc`.
- Strict Content-Security-Policy, no `unsafe-inline`; allowlist `static.cloudflareinsights.com` and `challenges.cloudflare.com`.
- Secrets never committed — Turnstile secret key, Microsoft Graph credentials, and CI tokens go through `wrangler secret` / CI secret store. Only `PUBLIC_`-prefixed values may be committed as `vars`.
- TypeScript `strict`; content modeled as typed `src/lib/content/*.ts`, not markdown.
- All existing content preserved: About, 3 services (1:1 Coaching, Identity Reset, Communication Support), 16 certifications, praise, contact.
- Site must pass the sentinel probe surface (HTTPS, robots, sitemap, canonical, JSON-LD, headers, Lighthouse).
- Single deploy model: direct-upload `wrangler pages deploy` via GitHub Actions (no git-integration builds).

## Capabilities currently in scope

### Content & pages
- About / home, Services (index + 3 detail pages), Certifications (index + 16 detail entries), Praise/testimonials, Contact.

### Conversion
- Lead form (SvelteKit form action) with Turnstile verification, sending email via Microsoft Graph; "Discovery Call" intent.

### Platform & ops
- Cloudflare Pages deploy via GitHub Actions; Cloudflare Web Analytics; strict CSP; JSON-LD structured data; robots/sitemap.

### Planned but not yet specified (preserve, do not extend)
- **New personal sentinel instance.** Stand up a separate sentinel (own `sites.ts`, CF Access policy) to audit this site — downstream work, not in this repo.

## Out of scope

- Blog / articles — no content/article system or post collection this version. Add later via a routes + typed-content model + RSS.
- Online booking / calendar scheduling — the Discovery Call stays email/form-initiated. Add later via a calendar integration + Worker endpoint.

## Removal review

Anything in the codebase that does not map to a capability in "Capabilities
currently in scope" is a **review trigger, not a delete warrant** (Principle
18). Default for unmapped surface is stop-and-surface — re-check against the
decision register and raise it; removing anything a decision cites requires
citing the superseding decision.

## Criticality rubric

**Critical** (hard-stop, do not touch related work):
- Content factual/credibility changes (certification claims, credentials, bio statements).
- Domain / DNS / Cloudflare Pages deploy configuration.
- Secrets handling (Turnstile, Graph, CI tokens).
- Scope changes (anything from "Out of scope", or new capabilities).

**Material** (continue parallel work, avoid downstream):
- Stack / project-structure refactors, new routes, design-system / token changes.

**Minor** (continue freely):
- Copy polish, styling tweaks, additive components and tests.

## Default check-in mode
Hybrid, per the operating manual.

## Active milestone

**Milestone:** M1 — Hugo → SvelteKit/Cloudflare migration
**Definition of done:**
1. All existing content (About, 3 services, 16 certifications, praise, contact) renders on SvelteKit with the new CSS-token theme.
2. Lead form verifies Turnstile and sends a real email via Microsoft Graph.
3. Deployed to Cloudflare Pages on the live `stephenredding.com` domain via GitHub Actions.
4. Passes Lighthouse health and ships the sentinel probe surface (robots, sitemap, canonical, JSON-LD, strict CSP).
5. Hugo, Go templates, and Tailwind v3 removed from the repo.
**Active blockers:** none.

## Project-specific glossary

- **Discovery Call** — the free intro call a prospect requests; the site's conversion goal (email/form-initiated).
- **Sentinel** — the conformance register that probes this site's public surface; a new personal instance will audit it.
- **Binding** — a Cloudflare-declared resource (D1, KV, R2, secret) injected at runtime via `platform.env`; the only sanctioned place for durable state.
