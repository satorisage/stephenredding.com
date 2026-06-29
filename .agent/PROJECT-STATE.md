# Project State

**Last updated:** 2026-06-28
**Active focus:** **M1 SHIPPED.** stephenredding.com is LIVE on Cloudflare Pages
(SvelteKit/Svelte 5/TS, Luminous Calm theme) — all 8 pages, Turnstile + Resend
lead form (verified), full conformance surface, HTTPS, custom-domain cutover
done (apex+www → CF Pages; iCloud email untouched); Hugo removed; CI auto-deploys
on push. Portrait (me.jpg) added to home + about. Copy reframed toward "peace
already within" (services intro, hero→2nd person, 1:1 tightened 5→4, certs
intro, services meta) — live. CF Web Analytics beacon wired + live
(token 9d40ea5b…). risentech.net sender updated → `risentech.net@send.font11a.io`
(separate repo, shipped). Dependabot: only 1 low `cookie` advisory (CVE-2024-47764,
transitive via @sveltejs/kit) — no action, revisit on next Kit bump.
**Remaining (operator/optional):** submit the live form once to confirm Turnstile
round-trip; B1 backlog — personal sentinel instance.

---

## 1. Authority surface — where to look for X

| You want to know... | Look in |
|---|---|
| **Scope, principles, hard constraints, criticality rubric** | `.agent/PROJECT-SCOPE.md` |
| **Current state, in-flight work, next session plan** | `.agent/PROJECT-STATE.md` (this file) |
| **All ratified design decisions** | `.agent/DECISIONS/` (index in `DECISIONS/README.md`) |
| **Open check-ins awaiting input** | `.agent/CHECKINS/` (root; archived in `CHECKINS/ARCHIVED/`) |
| **Generated bootstrap / audit / inspect reports** | `.agent/REPORTS/` (incl. `project-brief.md`, the locked vision) |
| **Ratified work-structure (milestone→task tree, depends-edges)** | `.agent/ROADMAP.md` (canonical; M1 is Active) |
| **Committed work ready now (derived frontier)** | `.agent/TODO.md` (generated from ROADMAP by `roadmap-render.sh`; never hand-edited) |

No IDEAS inbox in use yet. Add rows here when a new surface is first created.

---

## 2. Active milestone

Not yet using `.agent/ROADMAP.md`; the milestone DoD lives in
`PROJECT-SCOPE.md` `## Active milestone`.

**Milestone:** M1 — Hugo → SvelteKit/Cloudflare migration → see `.agent/ROADMAP.md` `## Active` (T1–T10). Ready now: **T1** (scaffold). Per-task `done-when:` lives in ROADMAP.
**Active blockers:** none (T4 held: design; T6/T8 held: creds; T9 held: destructive — none blocking the ready frontier)

---

## 3. Open check-ins

- **Lead-form email — DECIDED: Resend (HTTP API). Code wired; pending creds.**
  (`send_email` binding is Workers-only / Pages-incompatible; no M365 → Resend,
  a plain HTTP call that works on Pages.) `email.ts` posts to Resend; reads
  `RESEND_API_KEY` (secret) + `EMAIL_FROM`/`EMAIL_TO`. Graceful no-op without the
  key. **Operator TODO:** create a Resend account, verify `stephenredding.com`
  as a sender (DNS records), set `RESEND_API_KEY` as a CF Pages secret + set
  `EMAIL_TO`.
- **T8 deploy — partially done.** Site is LIVE on Cloudflare Pages at
  `stephenredding-com.pages.dev` (manual `wrangler pages deploy`, account
  "Personal" da577f8e…). Remaining: email transport (above), custom-domain +
  DNS cutover (stephenredding.com → CF Pages), GH Actions API token/secrets for
  auto-deploy, Turnstile + analytics tokens. Runbook:
  `.agent/REPORTS/t8-deploy-setup.md`.

---

## 4. (Dissolved per D-0050)

Deferred work routes by kind. The one tracked deferral so far:
- **New personal sentinel instance** to audit this site — separate downstream
  work, not in this repo. Recorded under PROJECT-SCOPE "Planned but not yet
  specified."

---

## 5. Next session

**M1 is shipped.** Active work = **M2 Luminous Glow** (visual elevation). Owner
feels the site "still feels like Hugo" — too flat/static vs font11a/risentech.
Approved a warm-but-serene glamour pass (animated aurora, film grain, gradient
headline, scroll-reveal, glow/glass; keep layout + copy). **M2 (Luminous Glow) SHIPPED 2026-06-28** — live on https://stephenredding.com:
ambient warm aurora + film grain + gradient headlines + scroll-reveals + amber
glow/glass across all 7 pages; footer copyright restyled; greeting paired as a
caption under the hero portrait. Owner approved the home preview, then said
"roll it"; merged `feat/m2-luminous-glow` → main, CI green. svelte-check 0
errors; CSP intact; reduced-motion respected. (Preview branch
`glow-preview.stephenredding-com.pages.dev` can be left or deleted.) Registered in **font11a-sentinel** (B1 done) and **all flagged gaps closed**:
Seo component (OG/Twitter), llms.txt route, security headers (HSTS +
Permissions-Policy + X-Frame-Options + COOP via hooks.server.ts + root
`_headers`) — re-probed live, sentinel shows og/llms/headers = pass. No active
milestone now — remaining optional: live form Turnstile round-trip test (owner),
measure lh-perf/cwv to fill the last 2 sentinel criteria, the 1 low `cookie` dep
advisory on next Kit bump.

---
### (M1 archive note) Continue M1 — superseded; M1 shipped 2026-06-28.

**T7 (conformance)** is mostly doable without creds — robots.txt,
sitemap.xml (prerender endpoint), canonical + JSON-LD (Person/WebSite/Service
schema), strict hashed CSP via hooks/`_headers`. Only the CF Web Analytics
beacon needs `PUBLIC_CF_ANALYTICS_TOKEN`. **T6 (lead form)** is held on creds:
Turnstile sitekey/secret + Microsoft Graph app creds.

Creds needed from the operator:
- T6: Turnstile sitekey (public) + secret; Microsoft Graph (tenant/client id +
  secret, sender mailbox).
- T7: `PUBLIC_CF_ANALYTICS_TOKEN`.
- T8: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`; CF Pages project + custom
  domain.

Open factual correction to ratify: SCOPE says "16 certifications" — actual is
**14**. Update SCOPE hard-constraint + capability lines once confirmed.
