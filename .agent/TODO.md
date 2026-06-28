# TODO — committed-work queue (derived)

<!-- GENERATED-BY: roadmap-render/roadmap-render.sh -->
<!-- DO NOT HAND-EDIT. This file is the ready-task frontier
     rendered from .agent/ROADMAP.md by roadmap-render.sh.
     Edit ROADMAP.md and re-render. -->

> One axis: *committed, actionable work not yet done* (D-0035),
> derived from ROADMAP.md (D-0050). Now = ready tasks; Next =
> blocked tasks (deps unmet); Parked = ## Backlog tasks (future/parked).
> Each line cites its ROADMAP task; a Loose task's
> own source is preserved in parentheses.

## Now

- [ ] Scaffold SvelteKit + `adapter-cloudflare` project from a custom-CSS-token sibling (risentech.net / font11a.io) — source: ROADMAP M1.T1 (PROJECT-SCOPE.md)

## Next

- [ ] Define the typed content model in `src/lib/content` (Service, Certification, Praise, Profile types) — source: ROADMAP M1.T2
- [ ] Port all existing content into the typed model — source: ROADMAP M1.T3
- [ ] Build the CSS-token theme (`tokens.css`, OKLCH palette, `light-dark()`), base layout + global styles — source: ROADMAP M1.T4
- [ ] Build routes + components wiring content to theme — source: ROADMAP M1.T5
- [ ] Lead form — SvelteKit form action + Turnstile verification + Microsoft Graph email — source: ROADMAP M1.T6
- [ ] Conformance surface — robots.txt, sitemap.xml, canonical, JSON-LD, strict hashed CSP, Cloudflare Web Analytics — source: ROADMAP M1.T7
- [ ] CI/deploy — `wrangler.jsonc` bindings/vars, GitHub Actions (check → build → `wrangler pages deploy`), secrets, custom domain — source: ROADMAP M1.T8
- [ ] Remove Hugo + Tailwind v3 (layouts/, content/, archetypes/, `hugo.toml`, `generate-safelist.js`, tailwind v3 config, `.github/workflows/hugo.yml`); update `package.json` — source: ROADMAP M1.T9
- [ ] Verify M1 definition-of-done live + register the site in a sentinel instance — source: ROADMAP M1.T10

## Parked

- [ ] Stand up a new personal sentinel instance (own `sites.ts` register, CF Access policy, Pages project) to audit this site — source: ROADMAP B1 (PROJECT-SCOPE.md)
