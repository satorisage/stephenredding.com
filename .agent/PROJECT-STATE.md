# Project State

**Last updated:** 2026-06-27
**Active focus:** Just bootstrapped into the dotagent system. The work ahead is
M1 — migrating stephenredding.com from Hugo to the fleet's SvelteKit + Svelte 5
+ TypeScript + Cloudflare Pages stack, with a Turnstile+Graph lead form and
sentinel-conformant public surface. No build work started yet.

---

## 1. Authority surface — where to look for X

| You want to know... | Look in |
|---|---|
| **Scope, principles, hard constraints, criticality rubric** | `.agent/PROJECT-SCOPE.md` |
| **Current state, in-flight work, next session plan** | `.agent/PROJECT-STATE.md` (this file) |
| **All ratified design decisions** | `.agent/DECISIONS/` (index in `DECISIONS/README.md`) |
| **Open check-ins awaiting input** | `.agent/CHECKINS/` (root; archived in `CHECKINS/ARCHIVED/`) |
| **Generated bootstrap / audit / inspect reports** | `.agent/REPORTS/` (incl. `project-brief.md`, the locked vision) |

No project-specific extension surfaces yet (no ROADMAP/TODO/IDEAS in use).
Add rows here when one is first created.

---

## 2. Active milestone

Not yet using `.agent/ROADMAP.md`; the milestone DoD lives in
`PROJECT-SCOPE.md` `## Active milestone`.

**Milestone:** M1 — Hugo → SvelteKit/Cloudflare migration (see PROJECT-SCOPE.md for the 5-point definition of done)
**Active blockers:** none

---

## 3. Open check-ins

none

---

## 4. (Dissolved per D-0050)

Deferred work routes by kind. The one tracked deferral so far:
- **New personal sentinel instance** to audit this site — separate downstream
  work, not in this repo. Recorded under PROJECT-SCOPE "Planned but not yet
  specified."

---

## 5. Next session

Phase 3 = **code**: start the SvelteKit migration against the published
`CLAUDE.md`. Clone fleet conventions from `risentech.net`/`font11a.io`
(custom-CSS-token siblings) for the scaffold. Secrets needed at deploy time:
`CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `PUBLIC_CF_ANALYTICS_TOKEN`,
Turnstile sitekey/secret, Microsoft Graph credentials.
