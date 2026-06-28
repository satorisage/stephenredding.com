# Project Brief — stephenredding.com

> Captured context from the Phase 0 vision interview (2026-06-27). Locked by
> the user. This is the input to Phase 1 (pairings) and Phase 2 (scope) — they
> read this instead of re-asking.

## Vision

Re-platform **stephenredding.com** from its current Hugo static site onto the
same stack as the rest of Stephen's fleet (risentech.net, copsincorporated.com,
peoriait.com, font11a.io): **SvelteKit 2.63 + Svelte 5 (runes) + TypeScript
strict, on Cloudflare Pages.** The site keeps its purpose — a personal
**self-awareness coaching** site (About, Services, Certifications, Praise,
Contact) — but gains an elegant, type-safe, fleet-consistent implementation,
Cloudflare Web Analytics, and conformance to a **sentinel** register Stephen
will deploy into his Cloudflare.

**Success looks like:** a fast, fleet-consistent SvelteKit site that (a) passes
its sentinel instance's probe criteria, (b) preserves all existing coaching
content, and (c) converts the right visitor into a booked "Discovery Call."

This is a **full migration**, not an incremental change: Hugo, the Go
templates, and Tailwind v3 are dropped.

## Platforms & stack

- **Framework:** SvelteKit 2.63.0, Svelte 5.56.1 (runes enabled), TypeScript
  6.x strict.
- **Adapter / host:** `@sveltejs/adapter-cloudflare`, **Cloudflare Pages**
  (direct-upload via `wrangler.jsonc`, `nodejs_compat`).
- **Deploy:** GitHub Actions — type-check → build → `wrangler pages deploy`
  (replacing the current Hugo→GitHub Pages workflow). Custom domain
  `stephenredding.com`.
- **Icons / fonts:** `@lucide/svelte`, `@fontsource-variable`.
- **Dropped:** Hugo (extended 0.128.0), Go templates/shortcodes/partials,
  Tailwind v3, GitHub Pages deploy.

## User-facing surface

Graphical marketing site, public pages only. No app, no auth-gated surface.
Single owner-author (Stephen); audience is prospective coaching clients.

## Personas / roles & domain-term glossary

**Personas**
- **Prospective client** — reads About / Services / Praise / Certifications to
  assess fit and trust, then books a Discovery Call. The conversion target.
- **Operator (Stephen)** — authors content, ships the site, keeps it
  fleet-consistent and sentinel-conformant. Wears both author and operator
  hats; no conflict — single-person project.

**Domain-term glossary** — no overloaded terms. "Discovery Call" = the
free intro call a prospect requests (today via email subject line; becoming a
lead-form submission).

## Methodology

Fleet conventions are the law:

- File-based routing; `src/lib/{components,content,seo,actions}` structure.
- **Content as typed TS data** (`src/lib/content/*.ts`) — no markdown/mdsvex.
  (Locked fork: fleet convention over Hugo's markdown front-matter authoring.)
- **Styling: custom CSS + OKLCH design tokens** (`tokens.css`, `light-dark()`
  theming) — the risentech.net / font11a.io pattern. (Locked fork: not
  Tailwind.)
- **Contact: SvelteKit form action with Turnstile + Microsoft Graph email**,
  the cops/peoriait lead-form pattern, replacing the current mailto. (Locked
  fork.)
- JSON-LD structured data in `src/lib/seo`.
- **Cloudflare Web Analytics** via `PUBLIC_CF_ANALYTICS_TOKEN`.
- **dotagent governance** (`.agent/` with PROJECT-SCOPE, DECISIONS, etc.;
  auto-generated CLAUDE.md).
- **Sentinel conformance is inbound-only:** ship robots.txt, sitemap.xml,
  canonical links, JSON-LD, CSP (no `unsafe-inline`), good Lighthouse; the site
  pushes no code back to sentinel.

**Not committed to:** Tailwind, markdown content authoring, mailto-only contact,
any Node-only runtime dependency.

## Constraints

- **Cloudflare Workers runtime** — no Node-only APIs.
- **CSP without `unsafe-inline`** (SvelteKit hashed CSP); allowlist
  `static.cloudflareinsights.com`, `challenges.cloudflare.com`.
- Must **pass the sentinel instance's probe criteria** (HTTPS, robots, sitemap,
  canonical, JSON-LD, headers, Lighthouse).
- **Preserve all existing content:** 16 certifications, 3 services (1:1
  Coaching, Identity Reset, Communication Support), praise/testimonials, About
  copy, contact intent.
- Backend secrets needed for the lead form: `GRAPH_*` (Microsoft Graph email),
  `TURNSTILE_SECRET_KEY`; CI secrets `CLOUDFLARE_API_TOKEN`,
  `CLOUDFLARE_ACCOUNT_ID`.

## Expertise needed

- SvelteKit 5 / Svelte runes; TypeScript strict.
- Cloudflare Pages/Workers, `wrangler.jsonc`, adapter-cloudflare.
- The fleet's custom-CSS design-token + component patterns.
- Web performance, SEO, and structured-data (JSON-LD) for sentinel conformance.
- Server form actions, Turnstile, Microsoft Graph email integration.

## Gaps / unknowns

- **New personal sentinel instance** (locked direction) is not yet built — its
  `sites.ts` register, Cloudflare Access policy, and Pages project are
  downstream work, separate from this repo.
- Design direction for the custom-CSS theme (palette, type scale, motion) — to
  be derived from the coaching brand, not yet specified.
- Whether the lead form fully replaces the email path or runs alongside a
  fallback mailto.
- Exact mapping of the 16 certifications into the typed content model
  (grouping, display) — a migration detail to settle during build.

---

**Branch note:** This is an existing repo with a clear, code-grounded target
and a known fleet template to clone. The migration path is well-understood
(few open research gaps), which leans toward **plan/code-first** over
research-first — the main unknowns are design direction and content mapping,
both resolvable during planning.
