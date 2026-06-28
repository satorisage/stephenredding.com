# Project State

**Last updated:** 2026-06-28
**Active focus:** M1 migration underway. **T1 (scaffold) done** — fresh
SvelteKit + Svelte 5 runes + adapter-cloudflare project builds clean
(`svelte-check` 0 errors, `vite build` → `.svelte-kit/cloudflare`, dev serves
200). Hugo files left dormant as porting source (removal authorized for T9).
Ready frontier: **T2** (typed content model) and **T4** (CSS-token "pop"
theme — held:design, awaiting a ratified design direction).

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

none

---

## 4. (Dissolved per D-0050)

Deferred work routes by kind. The one tracked deferral so far:
- **New personal sentinel instance** to audit this site — separate downstream
  work, not in this repo. Recorded under PROJECT-SCOPE "Planned but not yet
  specified."

---

## 5. Next session

Continue M1. Two ready tasks:
- **T2** — typed content model in `src/lib/content` (Service, Certification,
  Praise, Profile). Design-independent; can proceed now. Sources: `content/`
  + `data/social.toml` (Hugo, kept as reference).
- **T4** — CSS-token "pop" theme. **Held on design**: the user wants a fresh,
  striking, conversion-focused identity ("actually pop to someone wanting the
  services") — align a design direction before building it.

Secrets needed later (T6/T8): `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`,
`PUBLIC_CF_ANALYTICS_TOKEN`, Turnstile sitekey/secret, Microsoft Graph creds.
