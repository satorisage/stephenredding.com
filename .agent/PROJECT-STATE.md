# Project State

**Last updated:** 2026-06-28
**Active focus:** M1 migration. **T1–T3 done** — scaffold builds clean; all
content ported into the typed model at `src/lib/content` (14 certifications
[corrected from 16], 3 services with identity-reset preserved disabled,
About/contact/social; praise intentionally empty — no real testimonials).
`svelte-check` 0 errors. Hugo files dormant as reference (removal authorized
for T9). **Sole ready task: T4** — the CSS-token "pop" theme, **held:design**,
awaiting a ratified design direction (options being presented to the user). T5
(pages) is blocked on T4.

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

Continue M1 at **T4** — the CSS-token "pop" theme. Held on design: lock a
direction (palette / type / mood / motion) for a fresh, striking,
conversion-focused coaching identity, then build `tokens.css` + base layout.
Then T5 (pages) unblocks: build home/About, Services index+[slug],
Certifications index+[slug] (use `certificationsByCategory()`), Praise
(empty-state), Contact.

Open factual correction to ratify: SCOPE says "16 certifications" — actual is
**14**. Update SCOPE hard-constraint + capability lines once confirmed.

Secrets needed later (T6/T8): `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`,
`PUBLIC_CF_ANALYTICS_TOKEN`, Turnstile sitekey/secret, Microsoft Graph creds.
