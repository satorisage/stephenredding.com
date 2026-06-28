<!-- GENERATED-BY: scope/scope.sh on 2026-06-28T00:28:24Z -->
<!-- Source: /Users/stephen/Projects/dotagent/scope -->

# Scope Elicitation — Interview Pack

You are conducting a structured interview to populate a project's
`.agent/PROJECT-SCOPE.md`. The user opens this pack inside the
target project. Your job is to ask the questions in the **Interview**
section, one section at a time, and at the end emit a populated scope
file that follows the **Scope Template** structure exactly.

This is advisory. You produce the populated scope file as a final
markdown block; the human reviews and commits it. Do not write the
file yourself.

The **Principles** below are the source of truth the project will be
measured against. The **Scope Template** is the structure the
populated file must match. Optional **Additional context** sections
(included via `--include`) give domain background — typically a
pairings bundle the user has already selected.

---

# Principles (source of truth)

The text below is the canonical content of `personal/PERSONAL-PRINCIPLES.md`.
Reference principles by number when asking questions or producing the
populated scope.

# Personal Working Principles

These are the principles I apply across all projects I build. Individual
projects can extend, override, or de-prioritize these in their own
`PROJECT-SCOPE.md`, but in the absence of project-specific guidance, these
apply.

These principles are about *how to design and reason* — they do not
dictate implementation choices (language, runtime, framework, stack,
storage). Language and stack choices belong in `PROJECT-SCOPE.md` per
project, where they can be debated against specific requirements. If an
agent reads these and infers a specific implementation constraint
(e.g., "must be bash," "must be TypeScript"), that's a misread —
escalate it back to the project's scope file.

## Orthogonality

The spine. Two things are orthogonal when they sit on independent axes —
changes to one don't ripple into the other, and the same fact is never
represented in two places. The three subsections below establish axes,
keep engines and instructions on separate ones, and preserve axis
separation across modules.

### Establishing axes

1. **Vision down to detail.** Start from the overall picture, even if it's
   wild or only partially formed. The vision is what tells you which axes
   exist. Share specifics where I have conviction; leave the rest loose
   for the design to discover. Don't build detail-up without a vision.

2. **Upfront anticipation over reactive patching.** Enumerate the
   possibilities each axis must handle *before* building it, not after.
   Reactive patches couple by default — the new case gets stapled to
   whatever's nearest. This applies to scope, naming, module boundaries,
   and especially to engines (see #4). Anticipation means *enumerating
   the case-space and naming the undecided cases as parked forks* — not
   resolving them all upfront (that deferral is #3's job). Enumerate the
   axes; park the details.

3. **Modularity absorbs ambiguity within axes.** Identifying which axes
   exist is upfront work (#1, #2, #4). What lives on each axis can be
   deferred: when a detail is undecided, carve out a module to own it
   later rather than guessing or hardcoding. A module boundary is a
   deferred-decision marker — it isolates the unknown from everything
   around it. A deferred-decision marker should be *named and written* —
   a stub module, an address with no children yet, an `Open` fork — not
   left implicit. An empty-but-named boundary is valid and resolvable
   later. When the axis itself is unclear, you're still in vision work
   (#1), not yet in design.

### Engines and instructions as orthogonal layers

*"Engine" here is a role — the thing that handles a job's full
case-space within its module boundary. It is **not** an implementation
choice. A shell script, TypeScript module, Rust binary, SQL query, or
hosted service can each be the engine for the job they own. Per-project
scope decides implementation; the principles do not.*

4. **Engines are built to handle every possibility they could have to deal
   with, from the start — as much as possible.** Design the engine
   against the full range of what it might be asked to do, not just
   today's use case. A case discovered later shouldn't require changing
   the engine; if it does, use-case has coupled to engine internals and
   the upfront thinking was incomplete. This is a design *target*, not a
   claim of completed coverage — claims about coverage are governed
   by #9. An engine covers the *union* of cases across all anticipated
   use-sites; each site opts into a *subset*. Capabilities a site doesn't
   need stay optional and degrade silently (same engine, different
   subset).

5. **Instructions sequence engine capabilities; they don't extend them.**
   Engine and instructions live on orthogonal axes: the engine exposes
   capability, instructions sequence it for a use case. Specifics,
   sequencing, and use-case logic live in instructions written against
   the engine's exposed surface. If an instruction needs to reach past
   the engine, or asks for something the engine can't do, that's a
   coupling violation — fix the engine, don't paper over it. A derived
   view/projection is an instruction too: it reads and presents engine
   output but never authors back into the canonical store. A view that
   needs to write is the same coupling violation — fix the surface, not
   the view.

### Structural orthogonality

6. **Modules do one job.** Each component owns a single, well-named
   responsibility. If something feels like "two things glued together,"
   split it. One axis per module. The test for "two things glued
   together": do they change together (same axis — keep) or vary
   independently (different axes — split)? Independent variation is the
   split signal.

7. **Clean boundaries, owned state.** Components own their own state and
   controls. No reaching into siblings. The boundary is the contract;
   one fact lives in one place. When a fact must appear in a second place
   (a view, board, index, cache), it's a *derived projection* of the one
   canonical place — never a re-authored copy. Derivation preserves
   single-source; duplication breaks it.

8. **Architectural consistency.** Once a category, pattern, or convention
   exists, new items that fit it go there. Scattered parallels are
   duplicate representations of one concept — the same idea on multiple
   axes when it belongs on one. If the existing pattern is wrong, name
   it and propose replacing it before adding to it. Before extending a
   pattern, verify what it actually is *at source* — not from memory —
   and that you're extending the canonical instance, not a stale copy
   (links to #15).

## Scope and rigor

9. **Honest bounds over universal claims.** A claim like "this covers
   everything in domain X" must come with a definition of X and a
   constructive argument for the coverage. "Probably covers most cases"
   is not a finished thought. And when a claim *can't* yet be supported,
   state the gap and name precisely what would close it — an unprovable
   claim becomes a *named gap with a closing condition*, not a hand-wave
   and not a fake pass. (#9 — in-scope rigor — and #10 — naming what's
   out — are the two halves of honest scope.)

10. **Explicit exclusions over vague coverage.** What's NOT in scope
    should be named and justified. "We don't do X because Y" is a
    finished design decision; "we cover everything" is a hand-wave. An
    exclusion that *might* return should name its re-entry condition —
    "out now because Y; revisit when Z" — turning a static exclusion into
    a *tracked deferral* rather than a permanent no. (The negative half of
    honest scope; #9 is the positive half.)

11. **Scope decisions are durable.** Once captured in a decision file,
    a scope decision stands until explicitly superseded by a new dated
    decision. Implementation work cannot quietly expand scope. A change to
    durable scope comes as a new dated decision that **names its
    relationship to the prior** — *supersedes / amends / extends* —
    explicitly, never a silent edit and never left ambiguous.

12. **Surface conflicts, never resolve silently.** When two prior
    decisions disagree, or a new request contradicts an old decision,
    name the conflict and force an explicit choice. Silent resolution
    is how projects drift. The chosen resolution is then recorded durably
    (which way was chosen, and why), so the conflict stays resolved and
    doesn't resurface. Surfacing forces the choice; capturing keeps it.

## Execution

13. **Done means demonstrable, not reported.** If I can't point to it in
    a file or see the behavior, it doesn't exist yet. Roll-ups,
    milestone reports, and research summaries are inputs to verify —
    not evidence. This covers both *outcome* claims ("this was done")
    and *factual* claims ("X is defined at file:line, the value is N"):
    any concrete cite echoed without checking the source is hearsay.
    Where the demonstrable thing can be pointed at mechanically,
    *mechanize the check*: a done-claim carries a machine-resolvable
    evidence pointer (a passing test, an existing artifact, a Binding
    decision), and the verification itself becomes a *test*, not only a
    human reading a diff — "demonstrable" graduates from "a human *can*
    verify" to "the system *enforces*." Its document-review case —
    verifying cited claims in a doc before acting on it — is the corollary
    at #15. Verification protocol in `CLAUDE-OPERATING-MANUAL.md`
    operationalizes this rule.

14. **State lives in files, not conversations.** The chat is volatile;
    the repo is durable. Design rules, decisions, and milestones get
    written down — that's how they survive across sessions and automated
    runs. Durable state includes the *links between files* (provenance
    pointers), not just their contents — kept bidirectional so a fact's
    lineage is traversable from either end. The chain is state too.

15. **Verify cites — the document-review corollary of #13.** When
    reviewing a document with cited technical claims (file:line, "zero
    readers of X", "function does Y"), verify the load-bearing claims at
    source *before* pressure-testing the recommendation. Treat the doc's
    claims as claims-to-verify, not facts-to-paraphrase. Applies
    recursively to subagent reports. Verify the *verification* itself,
    too: confirm your check actually exercised the case it claims to — a
    check that "passes" without running the path it was meant to test is
    false confidence, worse than no check. When verification surfaces a
    finding the doc missed, name it — don't fold it silently into the
    next edit. Skip when the doc is descriptive (changelog, postmortem
    narrative) rather than recommendation-bearing.

16. **Lead architectural choices with capability data.** Before asking
    me to pick "unify vs keep both" / "refactor vs accept" / "implement
    vs delete metadata" — read both implementations, list each side's
    capabilities explicitly, name divergences as bug vs intentional,
    identify side-effects blocking direct merge, sketch the zero-loss
    migration path with effort estimate, and name residual losses
    honestly. Only then pose the question with the unification path
    concretely described. This applies to *greenfield* design forks too,
    not only existing-implementation comparisons: when neither option is
    built yet, the capability data is each direction's *projected*
    capabilities + trade-offs, laid out before the choice. The analysis
    is your job; my job is the architectural decision.

17. **Repeated failure indicts the model, not the attempt — but
    distinguish looping from iterating.** When the *same approach* fails
    the *same way* with *no new information*, treat the repeat as evidence
    of an unaccounted-for assumption, not a prompt to retry harder: stop,
    enumerate what both attempts silently took for granted, and hunt the
    hidden variable they shared. The trigger is *absence of information
    gain, not a failure count* — a path that fails *differently* each
    time, or narrows the problem with each miss, is iterating honestly;
    let it run. And the response is to *escalate the search to the frame,
    not abandon the path* — finding the missing variable often *rescues*
    it; dropping the path is only one possible outcome, and on a
    direction I chose it's a checkpoint to raise (Interaction-Style #4),
    not a unilateral give-up. (The self-directed complement of
    Interaction-Style #7: there *I* reframe a wrong frame; here *you* must,
    because two like failures are the signal your own frame is wrong.
    Distinct from #15 — that's false confidence in one check; this is
    false confidence across attempts.)

18. **Removal needs authorization, never absence.** An action that
    deletes, replaces, or contradicts a *load-bearing established
    structure* — a ratified decision, a data model, a spine an earlier
    body of work stood up — is a **Critical conflict by definition**, not
    a severity judgment call. It may proceed only by *citing the decision
    that authorizes it* (a supersede/amend, #11). "It wasn't in the
    inventory," "it looked unused," or "I assumed that's what you meant"
    is **never** authorization. Absence from a list is a *review
    trigger*, not a delete warrant — and the list may be stale (#15), so
    the authorizing cite is checked against the **decision register, not
    the inventory**. The default for removing load-bearing structure is
    **stop and surface** (#12), because destruction is asymmetric: a
    wrong build is edited, a wrong delete is rebuilt from nothing. The
    costliest context loss is not forgetting a fact — it is *acting
    against accumulated work*. (The destructive specialization of #11 and
    #12; its conversational reflex is Interaction-Style #10, its
    mechanical backstop the pre-commit removal gate.)

---

# Additional context

The sections below are injected by the caller via `--include` (typically a pairings bundle). Use this as domain context when tailoring interview questions and the populated scope.

<!-- ───── pairing: sveltekit ───── -->
<!-- GENERATED-BY: pairings/bundle.sh -->

# Pairing: SvelteKit

- **Pairs with:** SvelteKit the application framework (2.x, v2.57.x as of May 2026). Routing, load functions, adapters, server/universal split, `$env`, hooks, form actions, remote functions, prerendering, error boundaries, `$app/state`, service workers, link previews, page options.
- **Sources:** SvelteKit documentation, svelte.dev/docs/kit (ongoing); SvelteKit 2.x release notes (2024–present); Rich Harris on metaframework design (various conference talks); opinion.
- **Date:** 2026-05-27
- **Touches principles:** #1, #4, #5, #7, #8, #14

SvelteKit is the application framework around Svelte the component language. It covers everything that turns components into an app: where a route lives, when its data loads, where its code runs (server, client, or both), how its environment is read, how its errors are handled, how it ships. These are the decisions a "use Svelte" choice doesn't make for you, and they accumulate fast. This pairing covers framework concerns only — component-authoring concerns (reactivity primitives, props, snippets, scoped styles) are out of scope.

## Per-principle commentary

### #1 — Vision down to detail

Decide the runtime shape of the app *before* picking adapters and load patterns. A static-prerendered marketing site, a hybrid app with a few server-rendered routes inside a mostly-static shell, a fully server-rendered app behind a CDN, a client-only SPA — these are four different engines with four different ranges. Picking the adapter first and discovering the shape later forces the code to bend around the wrong frame.

The vision question SvelteKit forces early: *for each route, where does its code need to run, and what does it need to know?* That answer determines whether the route is `+page.svelte` (universal), `+page.server.ts` (server-only), or both, whether it prerenders, whether it streams, whether it ships JS at all.

### #4 — Engines handle every possibility

A SvelteKit route's engine range includes all of these states, and the page must render correctly in each:

- **Load pending** (no client-side `data` yet on first navigation; only relevant on universal load when the client navigates).
- **Loaded with data** (the happy path).
- **Loaded with error** (the route's `+error.svelte` boundary catches via `error(status, message)` from load; the page itself never enters this state, but the boundary does).
- **No JS** (if `csr = false` on the page or globally, the page must work as static HTML; forms must use native submission via form actions).
- **Hydrating** (server-rendered HTML, JS arrives, runes attach — the SSR snapshot and the post-hydration state must agree).
- **Streamed** (server load returned unresolved promises; the page renders with `{#await}` blocks or pending states until streamed chunks arrive).
- **Invalidated** (a parent's data changed; the load reruns; `data` updates without a full navigation).

A page that reads `data` as if it's always present and complete misses several of these. Each state is a design decision, not a default.

The same applies to adapter choice — the adapter is the engine that turns the build into a deployable artifact, and its range varies:

- `adapter-static` produces a static site. Every route must be prerenderable or covered by a `fallback` SPA shell. The range excludes server-rendered runtime routes by definition.
- `adapter-node` produces a Node server. The range includes everything; the cost is operating a server.
- `adapter-vercel`, `adapter-netlify`, `adapter-cloudflare`, `adapter-cloudflare-workers` target specific platforms. Each has its own constraints (edge runtime restrictions, function size limits, cold-start behavior, supported Node APIs).

Picking the adapter is a #4 decision (what range does the deployable engine handle?), not a default. "We'll figure out hosting later" is a deferred range decision masquerading as flexibility.

### #5 — Instructions don't extend engines

SvelteKit's primitives are the engine surface — `load`, `actions`, hooks, `$env`, `$app/state`, `$app/navigation`. Pages and components sequence those primitives for the route's use case. They do not reach past:

- **`load` is where data dependencies live.** A component-level `fetch()` in `onMount` (or its runes-mode equivalent in `$effect`) for data the route depends on is reaching past the load function — the framework can't dedupe it, can't deduplicate it across hydration, can't stream it, can't invalidate it. Reserve component-level fetches for genuinely post-mount, user-driven interactions.
- **Form actions are where mutations live.** A custom `fetch('/api/something', { method: 'POST' })` to a route that should have been a form action skips `use:enhance`, skips progressive enhancement, skips the framework's invalidation and redirect handling. Use form actions for mutations that mutate page state; use `+server.ts` API routes only when the data shape doesn't fit a page (third-party webhooks, JSON APIs for non-Kit consumers).
- **Navigation is `goto()`, not `window.location`.** The `goto` function from `$app/navigation` participates in the framework's client-side routing. Direct location mutation bypasses load, hooks, and the client router.
- **Page state is `page` from `$app/state`, not `$page` from `$app/stores`.** In runes-mode codebases, `$app/state` is canonical. `$app/stores` remains for compatibility but is the older store-based shape.

### #7 — Clean boundaries, owned state

Three boundaries SvelteKit makes explicit:

- **Server vs. client.** `.server.ts` files run only on the server and are tree-shaken from the client bundle. Importing a server-only module from a universal file is a build error — the framework enforces the boundary. Sensitive secrets, database clients, server-side libraries belong behind this line. Crossing the line accidentally (importing `$env/static/private` from a `+page.svelte`) fails the build.
- **Per-request vs. process-global.** SvelteKit's server is long-lived. Module-level mutable state on the server is shared across every request — one user's data leaks into another's response if you store request-scoped state at module scope. Per-request state goes in `event.locals` (set by `handle` in `hooks.server.ts`) or in load function returns. Process-global state is acceptable only for genuinely shared resources: database connection pools, cache clients, immutable config.
- **Load output owns the route's data.** A page reads its `data` prop; a layout reads its `data` prop. Child layout/page data merges with parent (child keys override). A page that mutates `data` in place is mutating the framework's owned state; a page that wants component-local state derived from `data` should compute it via `$derived` or copy it into local `$state`.

The Context API (`setContext` / `getContext`) is the right tool for "this subtree of the page needs to share state that isn't worth a store and isn't request data." Module-level singletons in `.svelte.ts` files are the right tool for client-side app-wide state. The two are not interchangeable; pick the one whose scope matches the state's lifetime.

### #8 — Architectural consistency

Pick a shape for each of these decisions and hold it:

- **Universal vs. server load.** A route that has access to both a `+page.ts` and a `+page.server.ts` will run server load first, then universal load receives the server's output via `parent()`. Mixing the two across a codebase without a rule ("server load for anything touching the DB, universal load for anything else") produces a codebase where every route is its own decision tree.
- **Form actions vs. API routes.** Decide which mutations go through form actions (page-coupled mutations, progressive enhancement matters) and which go through `+server.ts` (programmatic API consumers, third-party webhooks). A codebase that does both for the same kind of operation has duplicate representations.
- **`$env/static/*` vs. `$env/dynamic/*`.** Static is baked at build time; dynamic is read at runtime. Picking between them is itself a state-in-files decision (see #14). Mixing approaches for the same kind of config (some build-time, some runtime) without a rule creates configuration debt.
- **Error model.** `error()` from `@sveltejs/kit` throws a typed framework error caught by the nearest `+error.svelte` boundary. `throw new Error()` becomes an unexpected error routed through `handleError`. Pages and load functions should use the typed `error()` for user-facing failures and let unexpected errors actually propagate as unexpected.
- **Invalidation strategy.** `invalidate(url)` vs. `invalidateAll()` vs. `depends('app:tag')`. Pick a tagging convention; ad-hoc invalidate calls scattered through components turn cache control into spaghetti.

### #14 — State lives in files

SvelteKit's `load` functions are the file-based home for "what data this page needs." A page that reaches for data via component-level `onMount(fetch)` (or `$effect` in runes mode) puts that contract back into conversation rather than in a file. Use `load` for data the route depends on; reserve component-level fetches for genuinely dynamic, post-mount interactions.

Environment configuration belongs in `.env` files via typed accessors — `$env/static/private`, `$env/static/public`, `$env/dynamic/private`, `$env/dynamic/public`. Ad-hoc `import.meta.env.VITE_*` reads from random components are state-in-conversation: the contract for "what env vars this code needs" is implicit. Typed accessors make the contract a file.

Page options (`prerender`, `ssr`, `csr`, `trailingSlash`) belong in the route file (or the nearest layout). Setting them imperatively at runtime defeats the framework's ability to plan the build.

## Addenda

### Adapter choice is a deployment decision, made at build

The adapter is selected in `svelte.config.js`. It determines the shape of the build output and, transitively, the runtime constraints the rest of the code must respect. Common adapters and their shape:

- **`adapter-static`** — produces a directory of static files. Every route must be prerenderable. The `fallback` option mints a `200.html` / `404.html` SPA shell for routes that can't be prerendered, but the docs warn this has SEO and performance costs and should only be used for embedded contexts (e.g., a UI shipped inside another app, wrapped in a mobile shell). Requires `prerender = true` set at the root layout (or per-route). Static routes ship with zero server runtime; SSR happens at build time. Read endpoints that depend on a live API at runtime must be fetched client-side, which usually means the build cannot fully prerender — verify the prerender pass succeeds.
- **`adapter-node`** — produces a Node server. Universal-fit but you pay for operating it.
- **`adapter-auto`** — detects the platform and picks an adapter. Useful for getting started; "I don't know my deployment target" is a #1 deferred decision worth resolving before shipping.
- **Platform adapters** (`adapter-vercel`, `adapter-netlify`, `adapter-cloudflare`, `adapter-cloudflare-workers`) — produce platform-specific artifacts. Each has constraints on runtime, function size, supported Node APIs, edge vs. lambda routing. Verify against the platform's docs before committing.

A `fallback` SPA shell on `adapter-static` for an app that is *not* a static site is a smell — it means the app's runtime shape doesn't match the adapter's range. Either the app should be on a server adapter or the routes that fail to prerender should be made prerenderable.

### Load functions: dependency tracking, parent, streaming

Three modern load patterns worth being deliberate about:

- **Auto-dependency tracking.** Properties of `event` that a load function reads are tracked. Reading `params.slug` causes the load to re-run on slug change but not on unrelated query changes. Reading `url.searchParams.get('q')` causes re-run on `q` change but not on other params. `untrack()` excludes specific reads from tracking. Most invalidation surprises ("why did my load run / not run?") trace to a mismatch between what was read and what was expected to be tracked.
- **`parent()` and waterfalls.** A child load calling `await parent()` synchronizes on the parent's resolution. Doing this *before* the child's own independent fetches creates a serial waterfall the framework can't optimize. Pattern: fire the independent fetches, then `await parent()`, then await the independents.
- **Streamed promises.** A server load can return *unresolved* promises in its data object. SvelteKit inlines them into the HTML and resolves them as they arrive, enabling skeleton UI patterns without manual stream handling. Use for slow non-critical data; do not use for data the page can't render without — the page will render with a pending promise where the data should be.

### Form actions and progressive enhancement

Form actions are SvelteKit's mutation primitive. They're `POST`-only by design, return either successful data (the form prop populates, the page re-renders, load functions re-run) or a `fail(status, data)` result (validation errors with status, no re-run). The `use:enhance` directive client-side intercepts the submission, runs the action via `fetch`, and applies the result without a full navigation — but the form still works without JS, because it's an HTML form submitting to the same URL.

That progressive-enhancement guarantee is the engine range (#4) form actions claim. Reaching past them with client-side `fetch` mutations forfeits the guarantee. If the route needs a mutation that isn't a form (drag-to-reorder, real-time slider changes), consider whether the mutation belongs on a `+server.ts` endpoint or whether the UX would be better served by an explicit save action.

Default action vs. named actions: a route has either one default action or multiple named actions, not both. Named actions are invoked with `?/actionName` and the query persists in the URL, so a default-and-named mix would re-target. Pick one shape per route.

### Hooks: the request lifecycle

Server hooks (`src/hooks.server.ts`) wrap every request. Three load-bearing exports:

- **`handle({ event, resolve })`** — every request. Set `event.locals` (auth, request-scoped services), modify the response, transform the rendered HTML chunk. Chain multiple via `sequence()` from `@sveltejs/kit/hooks`.
- **`handleFetch({ event, request, fetch })`** — intercepts `event.fetch` calls made from server load functions. Use for redirecting same-origin API calls to localhost during SSR, attaching auth headers to outgoing requests, swapping URLs for internal hostnames.
- **`handleError({ error, event, status, message })`** — runs on unexpected errors during loading/rendering. Returns the safe public shape (`App.Error`) that flows to `+error.svelte` and the client; log here, send to Sentry, redact sensitive details.

Shared hooks (`hooks.ts`) run on both server and client. Universal `reroute({ url })` rewrites URLs before routing — for i18n route prefixes, A/B path remapping, legacy URL redirects. The `transport` hook defines custom serialization across the server/client boundary for types `devalue` doesn't handle natively — each transporter is a pair of `encode` (server) and `decode` (browser) functions.

The `init` hook runs once at server start (or client app init) — the right place for async setup (DB connection pools, warming caches, registering signal handlers).

### `$app/state` vs. `$app/stores`

`$app/state` (added in SvelteKit 2.12) exposes `page`, `navigating`, `updated` as runes-reactive objects. `$app/stores` exposes `$page`, `$navigating`, `$updated` as legacy stores and is deprecated — slated for removal in SvelteKit 3. In a runes-mode codebase, `$app/state` is canonical; the store-based API is compatibility surface only.

The migration shape: `$page.data.x` → `page.data.x`, read directly without a `$` prefix because the rune model handles reactivity on read. Mixing them in the same codebase creates two facts in two places (#8 violation). Note: changes to `page` are observable only from within runes contexts — legacy `$:` reactive statements won't see them.

### `.svelte.ts` modules for shared state

State that's app-wide but not request-scoped lives in `.svelte.ts` modules. The file extension signals to the compiler that runes are usable inside; export a singleton object literal containing `$state` and `$derived`:

```ts
// $lib/stores/preferences.svelte.ts
function createPreferences() {
  let theme = $state<'light' | 'dark'>('dark');
  return {
    get theme() { return theme; },
    set theme(v) { theme = v; }
  };
}
export const preferences = createPreferences();
```

**Hard caveat: this pattern is client-only.** A `.svelte.ts` module imported on the server will share its `$state` across every request — one user's preferences leak into another's response. Server-side state belongs in `event.locals` (set in `handle`) or returned from load functions. The `.svelte.ts` singleton pattern is for browser-only state: UI preferences, ephemeral interaction state, client-side caches.

### Prerender, SSR, CSR — three orthogonal page options

Each route (or layout, inherited down) sets three independent flags:

- **`prerender`** — whether the page is rendered at build time and served as static HTML. `true` requires the page to be deterministic from URL params alone. `'auto'` defers per-route.
- **`ssr`** — whether the page renders on the server at request time. `false` produces an empty shell hydrated on the client.
- **`csr`** — whether the page ships client-side JavaScript at all. `false` produces a server-only page (forms, links, no interactivity beyond what HTML provides).

`ssr: false` + `csr: false` is a content-less page — verify the combination matches intent. `csr: false` on a page that uses interactive components is a build-time delete of the interactivity. The flag set is a #4 range decision: what kind of page is this?

### CSP and security headers belong in `handle`

The `transformPageChunk` option of `resolve()` inside `handle` is the place to inject security headers and CSP nonces. SvelteKit's CSP support (set in `svelte.config.js` under `kit.csp`) emits nonces automatically and accepts a `mode` of `'auto'`, `'hash'`, or `'nonce'`. Picking between hash and nonce is a deployment-time decision: prerendered pages need hashes (no per-request nonce available); server-rendered pages can use nonces. Mixed mode is allowed but explicit.

### Service worker, link previews, preload

The `src/service-worker.ts` file is auto-registered if present. It has access to `$service-worker` for the precache manifest. A common pattern is offline-first caching of the prerendered shell + runtime cache of API responses; respect the framework's `build` and `files` and `version` exports so the precache doesn't drift from the deployed app.

The `data-sveltekit-preload-data` and `data-sveltekit-preload-code` attributes on links control preloading behavior — `hover`, `tap`, `viewport`, `off`. The default (`'hover'`) is usually right for desktop; `'tap'` or `'viewport'` are better for mobile or for pages where hover is rare. This is a UX-perceived-latency lever worth deliberate use, not a default.

### Remote functions (experimental in 2.x)

SvelteKit 2.x ships typed server functions callable directly from the client with end-to-end type inference. Four primitives, each with a distinct job:

- **`query`** — server-side data fetching invoked from the browser via a generated fetch wrapper. Replaces the common `+server.ts` GET-endpoint shape for typed RPC.
- **`form`** — progressively enhanced submissions. Works without JS via standard form submission; with JS, the form is enhanced and the result flows back with full type inference.
- **`command`** — JavaScript-dependent mutations. No progressive-enhancement guarantee — pick this only when the operation legitimately requires JS (drag-to-reorder, real-time slider changes).
- **`prerender`** — build-time static data, similar to a prerendered load function.

`.remote.ts` files can live anywhere in `src` except `src/lib/server`.

**Remote functions remain marked experimental as of mid-2026.** APIs may shift; the May 2026 release reworked transport to use `hydratable`, enabling richer query result types (2.56.0). Greenfield code on recent SvelteKit can prefer remote functions for typed RPC, but be ready for API drift on minor releases. Older codebases on form-action + load-function patterns cover most of the same ground without the experimental risk.


<!-- ───── pairing: svelte ───── -->
<!-- GENERATED-BY: pairings/bundle.sh -->

# Pairing: Svelte

- **Pairs with:** Svelte the language and compiler (versions 3–5, with the runes-based reactivity model as the canonical model in Svelte 5). Component-authoring concerns: reactivity primitives, props, snippets, lifecycle, scoped styles, transitions, actions, component-level state.
- **Sources:** Svelte documentation, svelte.dev/docs/svelte (ongoing); Rich Harris, *Rethinking Reactivity* (You Gotta Love Frontend, 2019) and *Computer, build me an app* (JSConf EU, 2018); Svelte 5 runes announcement (2023) and migration guide; opinion.
- **Date:** 2026-05-27
- **Touches principles:** #4, #5, #6, #7, #8

Svelte compiles components to imperative DOM operations rather than diffing a virtual DOM at runtime. That shifts where the work lands: more decisions move to author-time and compile-time, fewer to render-time. The principles below show where Svelte's compilation model and reactivity primitives change how axes get drawn. This pairing covers **the component language only** — framework concerns (routing, load, adapters, hooks, env) are out of scope.

## Per-principle commentary

### #4 — Engines handle every possibility

A Svelte component's engine surface is its props (declared via `$props()`), its bindable props (declared via `$bindable()`), its event callbacks (declared as props of function type), and its snippets (declared as props of `Snippet` type, including the implicit `children` snippet). The full range includes: the prop defaults, the absent-optional-prop case, the all-props-supplied case, every snippet absent and every snippet present, every callback fired and not fired. A component that renders correctly only when every prop is supplied has a narrower range than its API claims. Use TypeScript prop types on the `$props()` destructure to make the range explicit at the boundary.

The range also includes reactivity edge cases the compiler models for you and the ones it doesn't:

- A `$derived` of a `$state` that is later reassigned to a new object is tracked. A `$derived` over a deep property of an object that is mutated in place but not reassigned needs `$state` on the inner reference (or `$state.raw` if you're intentionally opting out of deep proxy).
- An `$effect` reads dependencies *synchronously*. Anything after `await` or inside `setTimeout` is not tracked. The "I expected this to re-run" bug is almost always this.
- An `$effect` returns a teardown function that runs before re-execution and on destroy. A component that allocates a resource in `$effect` and forgets the teardown leaks across re-runs.

### #5 — Instructions don't extend engines

Parent components communicate through the child's declared surface — props in (including callback props for events and snippet props for content), bindings via `$bindable()` for explicit two-way grants. Reaching past that surface — binding a DOM element ref and reading the child's internal state through it, importing a `.svelte` file's non-exported function, mutating a prop the child did not declare bindable — is the same coupling violation as monkey-patching in any other framework. If the parent needs something the child doesn't expose, the child is missing a capability — add the export.

`$bindable()` is the explicit grant of mutation rights. It is *not* the default; props are read-only unless the child declares them bindable. Treat unbindable state as the child's owned state. The same applies to snippets: the parent renders the snippet (`{@render children()}`), it does not reach into the snippet's lexical scope.

### #6 — Modules do one job

A `.svelte` file does one job: render one piece of UI with the state and behavior that piece needs. A file with three `<script>` blocks of mixed concerns, ten `$state` declarations spanning unrelated domains, and a 200-line `<style>` block is three components glued together. Split by responsibility, not by line count, but treat anything past ~300 lines as a smell worth a second look.

`.svelte.js` / `.svelte.ts` modules (the convention for using runes outside component contexts) follow the same rule: one module = one job. A `state.svelte.ts` grab-bag that exports five unrelated reactive objects is the canonical anti-pattern — the file's job becomes "everything reactive" instead of one named thing.

Snippets are the right unit for "this markup pattern repeats inside this component but isn't a separate component." A repeated markup block that would have been a snippet is the within-component analog of a copy-pasted function body.

### #7 — Clean boundaries, owned state

Svelte 5's reactivity primitives carry ownership semantics that the principle leans on:

- **`$state`** is owned by the component (or module) that declares it. Mutations from outside that boundary are explicit grants — `$bindable()` for components, `export`ed setter functions for modules. Uninvited mutation is a violation.
- **`$state.raw`** opts out of deep reactivity. Use it for state where deep proxying would be wasteful (large arrays you reassign rather than mutate, immutable data shapes) — but be explicit about the trade-off.
- **`$derived`** is read-only by contract. Computed views over state belong here, not in `$effect` blocks that imperatively assign. A derived value is a function of its inputs; if you reach for `$effect` to compute it, you've drawn the wrong boundary.
- **`$effect`** is for synchronization with the outside world — DOM APIs the compiler doesn't model, timers, network, third-party libraries. It is not the right tool for reactive computation. The `$effect.pre` variant runs before DOM updates (use for autoscroll, pre-render measurement); `$effect.root` creates a manually-controlled scope for effects outside component initialization.

A common anti-pattern: `$effect(() => { doubled = count * 2 })`. That is `$derived(count * 2)`. If you find yourself using `$effect` to assign a `$state`, you have almost certainly drawn the wrong boundary — the value is derived, not synchronized.

For derivations that don't fit a single expression — multiple statements, branching, accumulator loops — use `$derived.by(() => { ... })`. It accepts a function and is read-only by the same contract as `$derived`. Reach for it when an expression would be a contortion; do not reach for `$effect` to assign a `$state`.

### #8 — Architectural consistency

Three areas where Svelte projects accumulate scattered parallels:

- **Reactivity model.** Pre-Svelte-5 reactivity (`let x = 0` with implicit reactivity, `$:` for derived, `export let` for props) and Svelte 5 runes (`$state`, `$derived`, `$effect`, `$props`) can coexist during migration, but a finished codebase should be on one. Enforce runes mode globally via `svelte.config.js` `compilerOptions.runes: true` so the compiler rejects mixed files. Files mixed across both models force every reader to know the rules of each.
- **State scope.** Component-local `$state`, module-level `$state` in `.svelte.ts` files, and context (`setContext`/`getContext`) are three different scopes for stateful data. Pick which scope owns which kind of state and hold it. Per-instance state belongs in components; per-app singletons belong in `.svelte.ts` modules; per-tree state that depends on which subtree you're in belongs in context.
- **Snippet vs component.** Repeated markup with shared scope: snippet. Self-contained reusable UI unit with its own surface: component. The two are not interchangeable — using a component where a snippet would do scatters the state model; using a snippet where a component would do leaks the host's internals.

## Addenda

### Compilation moves decisions earlier

Svelte's compile-time model means certain mistakes surface earlier than in runtime-VDOM frameworks: unused `$state` warnings, accidental shadowing, unknown component imports, malformed reactive declarations, missing snippet renders. Treat compiler warnings as errors in CI; suppressing them ("we'll fix it later") accumulates the same dead wiring the compilation model was supposed to prevent.

The compiler produces meaningful sourcemaps. When debugging, step through the compiled output once or twice to build an intuition for what the framework actually does — the abstraction is leakier than React's because there is less runtime between author code and DOM operations.

### Snippets replace slots

Svelte 5 deprecates slots in favor of snippets. Migration shape:

- `<slot />` → `{@render children?.()}`
- Named slot `<slot name="header" />` → `{@render header?.()}` reading `header` from `$props()`
- Slot props (`<slot {value} />`) → snippet parameters (`{#snippet item(value)} ... {/snippet}` then `{@render item(value)}`)

For mechanical slot-to-snippet rewrites in a Svelte-4 codebase mid-migration, `npx sv migrate svelte-5` does most of the work. Treat it as a starting point — review its output for snippet-identity regressions and missed `let:` directives before merging.

Snippets are values: they can be passed as props, stored in `$state`, returned from functions. That makes them more flexible than slots, but also makes "snippet identity" a concern — a parent that re-creates a snippet on every render forces the child to re-render content that didn't conceptually change.

### Scoped styles and `:global()`

Svelte's `<style>` block is scoped to the component by default. The compiler rewrites selectors to target component-owned elements and elides unused rules. Two consequences:

- A selector that targets a child component's internal DOM gets scoped to the parent and matches nothing. Use `:global(...)` to opt out of scoping, but treat that as a coupling violation against the child's surface — the child should expose a styling hook (a class prop, a CSS custom property contract) instead.
- Unused selectors are dropped silently. A class name typo in markup gets a "unused CSS selector" warning; suppress it at your peril.

CSS custom properties (`--name`) pass through component boundaries cleanly; they are the canonical mechanism for "let the parent theme the child" without breaking style scoping. The child declares the custom properties it reads; the parent sets them.

### Transitions, actions, and the imperative escape hatch

Three places where Svelte exposes imperative DOM control through a declarative surface:

- **`transition:`** declares an animation tied to mount/unmount. The transition function returns CSS or a tick callback; the compiler wires it to the DOM lifecycle. Same engine-range thinking applies — what does this transition do when interrupted, when `prefers-reduced-motion` is set, when the element re-mounts under a different key?
- **`use:`** (actions) gives an imperative function access to the bare DOM node on mount, with optional update and destroy callbacks. Use it for integrating libraries that demand a DOM ref (focus traps, sortable lists, charting libraries). The action owns the side-effect; the component owns the slot it lives in.
- **`bind:this`** captures the DOM ref directly. Necessary for measurement, focus, and integration; a smell when used for state the compiler should manage.

Each of these is the right answer when the declarative model genuinely can't express the requirement. Each is the wrong answer when used to avoid learning the declarative model.

### The store contract is a public API (legacy)

A store exported from a `.ts` module (`writable`, `readable`, `derived` from `svelte/store`) is part of that module's public surface. The same is true of an exported reactive object from a `.svelte.ts` module. Changing the store/object shape — renaming a field, narrowing a type, changing the update semantics — breaks every subscriber. Treat shape changes the same as breaking function-signature changes: dated decision, supersede chain, callers updated in the same PR.

Stores from `svelte/store` are legacy in a runes-mode codebase. New shared state belongs in `.svelte.ts` modules using `$state`. Stores remain useful for interop with non-runes code and for cases where the subscription model (versus the proxy-based reactivity of `$state`) is a better fit (RxJS-style streams, observables).

### Legacy `$:` ambiguity

In pre-Svelte-5 code, the `$:` label has two uses that look the same and behave differently:

- **Derivations:** `$: total = items.reduce(...)` — a pure computation, re-runs when dependencies change.
- **Effects:** `$: console.log(total)` — a side effect, re-runs when dependencies change.

The Svelte 5 split into `$derived` and `$effect` makes the distinction syntactic. In legacy code (or code mid-migration), the ambiguity hides bugs: a derivation that secretly mutates external state, or an effect treated as a pure value. When auditing reactivity, classify each `$:` line as one or the other before changing anything.


<!-- ───── pairing: typescript ───── -->
<!-- GENERATED-BY: pairings/bundle.sh -->

# Pairing: TypeScript

- **Pairs with:** TypeScript (versions 4.x, 5.x, and 6.x). 6.0 shipped March 2026 as the last JavaScript-implemented release; `strict` is now the default, `target` defaults to `ES2025`, `module` to `esnext`, and `target: es5` is deprecated. TypeScript 7.0 will be a Go-native compiler rewrite. Applies to any project where TypeScript is the primary authored language — pure-library packages, application code, and codebases that transpile to JavaScript for runtime.
- **Sources:** TypeScript Handbook (typescriptlang.org/docs/handbook); Dan Vanderkam, *Effective TypeScript* (2nd ed., 2024); Anders Hejlsberg, *Introducing TypeScript* (Microsoft Build, 2014) and successor talks on structural typing; Marius Schulz, *TypeScript Evolution* series; Matt Pocock, *Total TypeScript* (totaltypescript.com); microsoft/TypeScript design notes (github.com/microsoft/TypeScript/wiki/Design-Goals); opinion.
- **Date:** 2026-05-20
- **Touches principles:** #4, #5, #6, #7, #8, #13

TypeScript's job is to make the engine surface (function signatures, exported types, public APIs) checkable before runtime. The principles below are about treating the type system as a real engine layer with its own range — not as documentation, not as decoration, and not as an obstacle to opt out of with `any`.

## Per-principle commentary

### #4 — Engines handle every possibility

A function's type signature is a claim about its engine range. `function divide(a: number, b: number): number` claims it handles every pair of numbers and always returns a number — including `b = 0`, which actually returns `Infinity` or `NaN`. The signature lies. The honest version either narrows the input (`function divide(a: number, b: NonZeroNumber): number`) or widens the output (`function divide(a: number, b: number): number | DivisionByZeroError`).

Discriminated unions are the canonical tool for "the engine handles N cases":

```ts
type ParseResult =
  | { ok: true; value: T }
  | { ok: false; error: ParseError };
```

The type forces every consumer to handle both branches (the compiler enforces it via exhaustiveness checking with `never`). A function returning `T | undefined` makes the same claim less honestly — `undefined` collapses every failure mode into one. Use discriminated unions when failure modes carry information.

### #5 — Instructions don't extend engines

A module's exported types are its surface. `export type` declarations and `export interface` declarations are as load-bearing as exported functions — consumers depend on their shape. Internal types live in non-exported declarations, in `_internal` submodules, or behind `internal` JSDoc tags enforced by a linter (TypeDoc's `@internal`, api-extractor's `@internal`).

The most common surface-violation pattern in TypeScript codebases: a consumer imports an internal type via a deep path or a re-export, then writes code that depends on the internal shape. When the internal type changes, the consumer breaks even though the module's public surface didn't change. Lock down deep imports at the package boundary (`exports` field in `package.json`, or path-mapping that aliases only the public entry points).

### #6 — Modules do one job

A `.ts` file does one job. A `types.ts` grab-bag (every shared type in one file) is the canonical anti-pattern — the file's only job is "be a place where types go," which is no job at all. Co-locate types with the code that owns them, or split by domain (`song-types.ts`, `engine-types.ts`) rather than by category.

Index files (`src/index.ts` as the package surface) are the legitimate exception: their job is to declare what's public.

### #7 — Clean boundaries, owned state

TypeScript carries no runtime mutability discipline by default — `let x: User = ...; x.name = '...'` compiles regardless of intent. The type system provides `readonly` and `ReadonlyArray<T>` (or `readonly T[]`) for opt-in immutability. Use them at boundaries:

- Function parameters that the function does not mutate: `readonly`.
- Return values whose contents the caller should not mutate: `readonly`.
- Exported shared state: typed `readonly` at every boundary, with a single owner who holds the mutable reference internally.

Branded types make ownership and identity explicit. The pattern:

```ts
type UserId = string & { readonly __brand: 'UserId' };
type SongId = string & { readonly __brand: 'SongId' };
```

Now `userId` and `songId` cannot be swapped at compile time, even though both are runtime strings. Use brands when an identifier's source matters and accidental cross-use would be a bug — IDs from different domains, paths that have been validated vs. not, strings that have been escaped vs. not.

### #8 — Architectural consistency

The categories where TypeScript projects accumulate scattered parallels:

- **Strictness settings.** `tsconfig.json`'s `strict` flag enables a bundle of checks; as of TypeScript 6.0 it defaults to `true`, so the question shifts from "did we enable it" to "did we leave it on." Half-strict codebases (`strict: true` but `noImplicitAny: false` overridden) signal that strictness was abandoned without explicit decision. Either keep the full `strict` bundle and address every error, or document the override.
- **Null handling.** `T | null`, `T | undefined`, `T | null | undefined`, and `T?` (optional) are four different shapes that callers must check differently. Pick one for the codebase (most projects: `T | undefined` and use `?` for optionality) and apply it everywhere.
- **Type vs. interface.** Both work most of the time; they diverge on declaration merging (`interface` allows it; `type` doesn't), on intersection vs. extension semantics, on tooling errors. Pick a default (`type` for unions and computed types, `interface` for object shapes that may be merged, OR `type` for everything — both are defensible) and stick to it.
- **Generic vs. specific.** A function that takes `T extends Record<string, unknown>` and a function that takes `User` solve different problems. Reaching for generics by default is over-engineering; reaching for `any` or `unknown` to avoid generics is under-engineering. The decision should be: is this function's *job* to be generic (it operates on shape, not domain), or is its job to operate on a specific domain type?

### #13 — Done means demonstrable

`tsc --noEmit` (or `tsc -b --noEmit` in build-mode projects) is the type-system equivalent of "it compiles." Passing it is a precondition, not done. Demonstrable also requires:

- **No `any` escape.** `any` defeats every check downstream of it. Codebases with `any` accept that the type system stops mattering at that boundary. Use `unknown` and narrow explicitly instead.
- **No `@ts-ignore` or `@ts-expect-error` without comment.** When the type system is wrong (rare, but happens — DOM lib quirks, third-party type bugs), document why with a comment that names the specific issue. A naked `@ts-ignore` is a silent assertion that future maintainers cannot evaluate.
- **No `as` casts without justification.** `as` is the type-system's escape hatch. Each use is a claim by the author that the type they're casting to is actually correct. If the claim isn't obvious from context, comment.
- **Tests run against the real types.** A test that types its inputs as `any` proves nothing about the real surface.

CI runs `tsc --noEmit`, the unit tests, and the lint rules that enforce the above. "It compiles locally" is the C-pairing's "it compiles" all over again — necessary, not sufficient.

## Addenda

### Structural typing means the type is a description, not an identity

TypeScript's type system is structural: two types are compatible if their structures match, regardless of where they were declared. This is genuinely different from nominally-typed languages (Java, C#, Rust enums) and changes how to think about type design:

- A function accepting `{ x: number }` accepts *any* object with an `x: number`, including objects that were never declared as that type.
- Brands and discriminants are how to recover nominal-like identity when needed.
- "I declared two types with the same shape; the compiler doesn't distinguish them" is structural typing working as designed, not a bug.

### `unknown` is the right top type; `any` is poison

`unknown` requires the caller to narrow before use; the type system stays honest. `any` silently propagates, infecting every type that touches it. In codebases that started in JavaScript and migrated, `any` often appears as the migration's residue — convert each one to `unknown` + narrowing, or to a specific type, deliberately.

### Compile-time vs. runtime are different engines

The type system is a compile-time engine; the JavaScript runtime is a separate engine. They don't share state. A type that says `User` does not guarantee the runtime value is a `User` — only that the author's code path *should* produce one. At every boundary where untyped data enters (network responses, user input, file reads, third-party APIs), validate at runtime with a schema library (Zod, Valibot, ArkType, io-ts) or hand-written predicates. Treat compile-time types and runtime validators as two artifacts that need to agree — and treat their disagreement as a bug worth surfacing.

### Type-level programming is a power tool

Conditional types, mapped types, template literal types, and inference in conditional types make TypeScript's type system into a small functional language. Used judiciously, they encode constraints that would otherwise require runtime checks (typed event buses, typed routers, typed query builders). Used indulgently, they produce libraries whose type errors are unreadable, whose IDE performance is poor, and whose maintenance cost is borne by everyone after the original author.

The honest test: can a maintainer who didn't write the type read the error message it produces and know what to fix? If not, the type is too clever for the job.


<!-- ───── pairing: css ───── -->
<!-- GENERATED-BY: pairings/bundle.sh -->

# Pairing: CSS

- **Pairs with:** CSS the language — selectors, cascade, layout, typography, color, motion, custom properties, modern modules (cascade layers, container queries, `:has()`, nesting, view transitions, color spaces, `@property`, scope). Framework-agnostic; applies whether the surface is vanilla CSS, CSS modules, Svelte scoped styles, Tailwind, or any combination.
- **Sources:** MDN Web Docs (Mozilla, ongoing); W3C CSSWG specifications (ongoing); Adam Wathan & Steve Schoger, *Refactoring UI* (2018); Lea Verou, *CSS Secrets* (2015); Andy Bell & Heydon Pickering, *Every Layout* (2020); Heydon Pickering, *Inclusive Components* (2019); Una Kravets et al., *web.dev / CSS guides* (2023+); Josh W. Comeau, *CSS for JavaScript Developers* (2021); Evil Martians, *OKLCH in CSS* (2023+) and *Better dynamic themes in Tailwind with OKLCH* (2024); Radix Colors documentation; Tailwind CSS v4 documentation (2024+); opinion.
- **Date:** 2026-05-27
- **Touches principles:** #4, #6, #7, #8, #9, #10

CSS has been doing more for fewer lines every year. The post-2022 baseline — cascade layers, container queries, `:has()`, native nesting, OKLCH, view transitions, `@property`, `@scope` — has changed what "modern CSS" means more in three years than the prior decade. The principles below specialize the design rules for CSS's specific texture: a declarative cascade where order, specificity, and scope all decide who wins, and where the same visual result can be produced by very different cascade strategies.

## Per-principle commentary

### #4 — Engines handle every possibility

A stylesheet engine's range is the matrix of (viewport size × pointer modality × color scheme preference × motion preference × contrast preference × locale/direction × device capability). The stylesheet that styles only the "1440px desktop, mouse, dark mode, no motion preference, English LTR, high-end laptop" cell of that matrix has a range narrower than the audience it claims. The full range includes at least:

- Viewport widths from ~320px to ultra-wide (and the cases where the user zooms, which changes effective viewport).
- Pointer modalities (`hover: hover` + `pointer: fine`, `hover: none` + `pointer: coarse`, the touch-and-keyboard hybrid).
- `prefers-color-scheme: light | dark` and `prefers-contrast: more | less | no-preference`.
- `prefers-reduced-motion: reduce` (animations should be inert or instantaneous; transitions of decorative properties only) and `prefers-reduced-data` (defer non-critical fetches).
- LTR and RTL writing modes; physical (left/right) vs. logical (inline-start/inline-end) properties.
- Forced-colors mode (Windows high-contrast) — `@media (forced-colors: active)` and `forced-color-adjust`.
- Print (`@media print`) for any document users might print.

Logical properties (`margin-inline-start`, `padding-block`, `border-end-end-radius`) make most of the writing-mode axis trivial — write logical, opt into physical only for genuinely physical concerns (drop shadows, transforms that mean something visual rather than directional).

### #6 — Modules do one job

Each rule does one job. A rule that sets layout *and* typography *and* color *and* a transition is four rules glued together — easier to read written separately, easier to override surgically when one of the four needs to change. Same for selectors: `.btn` doing too many jobs (primary button, link-styled button, icon button) becomes the canonical "scattered parallels" pathology — split into `.btn-primary`, `.btn-link`, `.btn-icon` with `.btn` as the shared base, or accept the variants as explicit modifiers and document them.

A custom property does one job: it names one design decision. A `--color-primary` that's used as both a background and a border in different places means "this is the primary color"; that's one job. A `--blue-500` used as background, border, link, and focus ring without naming the *role* couples the visual to the value — when the design changes blue, every usage has to be audited individually. The role-based naming (`--color-link`, `--color-focus-ring`, `--bg-card`) is the design-token discipline; the value-based naming is the palette under the design tokens.

### #7 — Clean boundaries, owned state

A component's stylesheet owns the component's visual state. Three lines that boundary cleanly:

- **Custom properties as the public surface.** A component declares the custom properties it reads (`--card-bg`, `--card-padding`, `--card-radius`) and the parent sets them. This is the equivalent of typed props for styles — the parent themes the child without breaking the child's scoping.
- **The cascade as the *implementation*, not the *contract*.** Two stylesheets fighting over specificity to override each other is two modules reaching across the boundary. The right fix is almost always to expose a property (custom property, modifier class, data attribute) that the parent uses through the supported surface.
- **Scoped styles where the framework offers them.** Svelte's `<style>` block, CSS modules, `@scope` natively, web component shadow DOM — each is a mechanism for "this rule only applies inside this boundary." A `:global(...)` escape (or its equivalent in other systems) is an opt-out of the boundary; treat it the same as `any` in TypeScript — a typed escape hatch, not a default.

### #8 — Architectural consistency

CSS accumulates inconsistency faster than most languages because every rule is independently valid in isolation. The hot spots:

- **Methodology.** BEM, utility-first (Tailwind-style), CSS modules, scoped styles, atomic CSS, attribute-based — pick one as the primary shape and use the others only where the primary genuinely can't express the requirement. A codebase with three methodologies has three mental models active at every read.
- **Layer architecture.** `@layer reset, base, theme, components, utilities;` is one common ordering. Whatever ordering is picked, hold it. Unlayered styles override layered styles for normal declarations (the rule is inverted for `!important`, which is why `!important` accumulation is a smell — it's reaching for the priority lever instead of the intended cascade).
- **Spacing scale, type scale, color scale.** A spacing system with eight values used consistently is a system; eight values used and four more added inline because "we needed something between 12px and 16px" is a system in name only. The discipline is "no magic numbers in components; if you need a new value, add it to the scale and explain why."
- **Naming.** Role-based names (`--color-danger`, `--color-link`) at the component layer; value-based names (`--blue-500`, `--space-3`) at the palette layer. Mixing them at the same layer is what makes a codebase impossible to refactor — the next maintainer can't tell which usages mean "I want this color" vs. "I want danger."

### #9 — Honest bounds over universal claims

"This stylesheet supports modern browsers" is a claim — back it. A finished stylesheet's bounds include the actual minimum-version matrix (Chrome 99+ for cascade layers, Safari 15.4+ for cascade layers and container queries, Firefox 121+ for native nesting, etc.). Features behind the chosen baseline can be used directly. Features ahead of it need feature queries (`@supports`) or progressive enhancement (the base styles work without; the enhancement layers on for browsers that support it).

The honesty fails most often around `:has()` (Firefox added it last among modern browsers; the support floor in late 2023), container queries (Safari 16+), `@scope` (newer than the others — verify per the target matrix), and color spaces (`color()`, `oklch()` — broadly supported now but gamut-mapping behavior varies). Each is worth deliberate use; each is worth checking the target matrix before reaching for.

### #10 — Explicit exclusions over vague coverage

"We don't support [internet explorer | old Safari | print | dark mode | forced colors | RTL | screen readers]" should be a stated decision, not an accidental omission. Each non-support claim belongs on a list with a reason. The default in CSS is to silently degrade; the discipline is to make the degradation intentional.

The flip side: a stylesheet that *claims* to support reduced-motion but only honors it for one of fifteen animations is technically dishonest. Pick: support fully, or don't claim support.

## Addenda

### The cascade as the system

Specificity, source order, and origin decide which rule wins — and in modern CSS, *layers* decide before any of those. The mental model worth keeping:

1. Origin and importance (user agent < user < author; normal < important; the importance flag inverts most of the ordering).
2. Layer order (later-declared layers win for normal declarations; earlier-declared layers win for `!important` — yes, inverted).
3. Specificity (inline > IDs > classes/attributes/pseudo-classes > elements/pseudo-elements).
4. Source order (last wins, ties broken by declaration order in the source).

Cascade layers (`@layer`) collapse most of the specificity wars. A common architecture:

```css
@layer reset, base, tokens, components, utilities;

@layer reset {
  /* normalize / reset */
}
@layer base {
  /* element defaults: h1, p, a, button defaults */
}
@layer tokens {
  /* :root custom properties */
}
@layer components {
  /* .card, .btn, .input, etc. */
}
@layer utilities {
  /* .text-center, .visually-hidden, etc. */
}
```

Anything outside `@layer` (a stylesheet that loads without being wrapped) wins over layered styles for normal declarations. Treat that as the "escape hatch" tier — a place to put third-party stylesheets you can't move into layers and a place to put per-page overrides that genuinely should win.

### Custom properties as the configuration surface

CSS custom properties (`--name`) are runtime-resolved, inherit through the DOM, and cross every styling boundary that respects the cascade. They are the canonical mechanism for:

- **Theming.** Light mode and dark mode are two values for the same set of custom properties, swapped at `:root` (or scoped to a subtree via a class).
- **Component configuration.** `--card-padding`, `--card-radius`, `--card-bg` declared by the component, settable from the parent — a typed interface for styles without breaking scoping.
- **Computed values.** `calc(var(--space-1) * 2)` lets a single source of truth drive derived spacing.

`@property` registers a custom property with a type, default, and inheritance behavior. Registered properties can be transitioned (an unregistered `--rotation` can't transition smoothly because the browser doesn't know it's an angle; registered as `<angle>` it can). Treat `@property` registration as the typed-prop equivalent for custom properties — opt in for properties that benefit from typed behavior.

### Layout: flex, grid, subgrid, container queries

Three layout systems coexist, each better at different jobs:

- **Flexbox** — one-dimensional flow with wrap and alignment. Right for navigation bars, button rows, anything that lays out as a line and wraps.
- **Grid** — two-dimensional placement with named tracks and areas. Right for page layouts, component layouts with positional logic, anything that needs alignment in both axes.
- **Subgrid** — grid items can opt into participating in their parent grid's tracks. Right for "rows of cards where the titles align across all cards" — without subgrid, each card laid out its own grid and the alignment was approximate.

Container queries (`@container`) replace media queries for component-level responsiveness. A media query asks "how big is the viewport"; a container query asks "how big is *this container*." A card that has to be narrow in a sidebar and wide in a main column is a card whose layout depends on its container, not the viewport. Set `container-type: inline-size` on the container; query against named or anonymous container with `@container (width > 700px)`. Container query units (`cqw`, `cqh`, `cqi`, `cqb`) are relative to the nearest query container — typography that scales with container width without a single media query.

Media queries remain right for *page-level* decisions (sidebar collapses below a threshold; navigation switches to a drawer). Container queries are for *component-level* decisions (the card's title shrinks; the card's image moves above the text). Mixing them haphazardly produces the same scattered parallels as mixing methodologies — pick a rule for which decisions belong at which scope and hold it.

### Color: OKLCH, color-mix, wide gamut

`oklch()` (and the rectangular `oklab()`) is perceptually uniform — equal numeric steps in lightness produce equal visual steps. HSL is not (50% lightness in HSL yellow and 50% lightness in HSL blue are not the same perceived brightness). The practical consequences:

- **Color palettes generate cleanly.** `oklch(70% 0.18 220)` and `oklch(60% 0.18 220)` and `oklch(50% 0.18 220)` are a perceptually uniform shade ramp; the HSL equivalent is not.
- **Color-mix produces predictable results.** `color-mix(in oklch, white 20%, var(--brand))` is a perceptually-uniform tint; mixing in sRGB produces a tinted result that visually differs from intent.
- **Wide-gamut displays display more.** `oklch()` can express colors outside sRGB; `display-p3` is the practical wide gamut on Apple devices. `color(display-p3 r g b)` is the explicit form. Fallback colors in sRGB for non-wide-gamut displays remain necessary.

Relative color syntax — `oklch(from var(--brand) calc(l - 0.1) c h)` — derives one color from another in a single declaration. Useful for hover/active/focus state derivation without an explicit palette per state.

For contrast, design tokens that *name a role* (`--color-text`, `--color-text-muted`, `--color-link`) instead of *a value* (`--color-blue-700`) make the contrast question answerable: does `--color-text` on `--color-bg` meet 4.5:1? The answer is one check per role pair, not one check per usage.

### Color systems and hue matching for UIs

A UI palette has to satisfy several constraints at once: brand identity, perceptual consistency across hues, accessible contrast against backgrounds, semantic meaning (danger / success / warning / info), and visual harmony so the eye doesn't trip on a button that's "the wrong shade of the right color." Modern CSS in OKLCH lets these be expressed as a discipline rather than a guess.

**Three-layer token architecture.** The canonical structure (Tailwind v4, Radix Colors, Vercel Geist, Material You all use variants of this):

1. **Primitives** — the raw palette, named by hue family and lightness step. `--blue-50` … `--blue-950`, `--red-50` … `--red-950`. Value-named; no role.
2. **Semantic tokens** — role assignments. `--color-bg`, `--color-bg-elevated`, `--color-text`, `--color-text-muted`, `--color-border`, `--color-accent`, `--color-danger`, `--color-success`. Role-named; no specific value at this layer.
3. **Component tokens** — component-scoped, reading from semantic tokens. `--card-bg: var(--color-bg-elevated)`, `--input-border: var(--color-border)`.

Each layer reads only from the layer beneath. A component never reads a primitive; a semantic token never references a component-local value. Crossing the layers is the scattered-parallels pathology — when the blue brand changes, you have one place to update at each layer, not every usage.

**Building a hue family in OKLCH.** A lightness scale (steps 50 → 950 mapped to OKLCH L from ~0.97 → ~0.15) at fixed hue produces perceptually even shades. Chroma is *not* constant across the scale — peak chroma sits in the middle; very light and very dark colors desaturate naturally:

```css
:root {
  --blue-50:  oklch(0.97 0.02 240);
  --blue-100: oklch(0.93 0.05 240);
  --blue-200: oklch(0.87 0.08 240);
  --blue-300: oklch(0.78 0.12 240);
  --blue-400: oklch(0.68 0.16 240);
  --blue-500: oklch(0.58 0.18 240);  /* base */
  --blue-600: oklch(0.48 0.18 240);
  --blue-700: oklch(0.38 0.16 240);
  --blue-800: oklch(0.28 0.13 240);
  --blue-900: oklch(0.18 0.09 240);
  --blue-950: oklch(0.12 0.05 240);
}
```

The curve constants are hand-tuned per palette. `atmos.style`, `oklch.fyi`, Radix Colors, and the Tailwind v4 default theme all publish curves worth borrowing or referencing rather than guessing.

**Hue matching across hue families.** A red, a blue, and a green at the *same lightness step* should feel like siblings — equally weighted. In OKLCH this means equal L (and where the gamut allows, equal C) across hues:

```css
--blue-500:  oklch(0.58 0.18 240);
--red-500:   oklch(0.58 0.18 25);
--green-500: oklch(0.58 0.18 145);
```

Yellow is the practical exception — peak-chroma yellow lives at higher L than peak-chroma red / blue / green, so a yellow at L=0.58 looks muted. Two honest fixes: either give yellow its own L curve (`--yellow-500: oklch(0.85 0.18 95)`) and label that deviation explicitly, or keep yellow out of the equal-step grid and use it as a special-purpose accent.

**Hue harmony patterns.** From a base hue `h` (modulo 360), the standard harmonic relationships:

| Harmony | Hues |
|---|---|
| Monochromatic | `h` only; vary L and C |
| Analogous | `h`, `h ± 30`, `h ± 60` — same temperature; calm |
| Complementary | `h`, `h + 180` — high contrast; use one as the accent |
| Split-complementary | `h`, `h + 150`, `h + 210` — softer than complementary |
| Triadic | `h`, `h + 120`, `h + 240` — vibrant; tricky to balance |
| Tetradic | `h`, `h + 90`, `h + 180`, `h + 270` — four-color theme; needs one dominant |

Relative color syntax makes these computable in a single declaration:

```css
--accent-complement: oklch(from var(--brand) l c calc(h + 180));
--accent-analog:     oklch(from var(--brand) l c calc(h + 30));
```

**Accent chroma honesty.** A common drift: each new accent gets added at "whatever looks right today" chroma. Three months later the palette has a 0.12-chroma blue accent, a 0.20-chroma red accent, and a 0.08-chroma green accent — none wrong individually, but together they read as different visual weights and the UI feels incoherent. Pick one accent chroma (e.g., 0.18) and only deviate when there's a reason to: gamut-clipping on a particular hue, or deliberate de-emphasis. Document the deviation.

**Light and dark theme construction.** `light-dark()` (Baseline since May 2024; expected Widely Available November 2026) expresses both modes in one declaration when `color-scheme` is set:

```css
:root { color-scheme: light dark; }

.card {
  background: light-dark(oklch(0.97 0.01 240), oklch(0.18 0.02 240));
  color:      light-dark(oklch(0.18 0.02 240), oklch(0.95 0.01 240));
}
```

The principle behind a dark palette: it is *not* the light palette inverted. It is a separate palette with its own L / C / h curve. The semantic tokens (`--color-bg`, `--color-text`) map to different primitives in each mode; the components are unchanged. Tailwind v4's `@theme` block and Radix's color scales both ship light/dark pairs constructed this way.

Background hue tint in dark mode: prefer near-black with a slight tint in the dominant brand hue (`oklch(0.18 0.02 240)`) over pure black. Pure black is fine on OLED; on LCD it looks lifeless. The slight tint keeps the surface coherent with the rest of the palette.

`light-dark()` accepts only color values. For images, gradients, or other mode-dependent properties, fall back to `@media (prefers-color-scheme: dark)`.

**Contrast checking by token pair, not by usage.** With the three-layer architecture, the contrast audit is one check per role pair:

- `--color-text` on `--color-bg`: 4.5:1 (WCAG AA, normal text).
- `--color-text-muted` on `--color-bg`: 4.5:1 (still readable text).
- `--color-text` on `--color-bg-elevated`: 4.5:1.
- `--color-link` on `--color-bg`: 4.5:1 against background **and** 3:1 against surrounding text (distinguishable beyond color, per WCAG 1.4.1).
- `--color-focus-ring` on whatever it sits over: 3:1 minimum.
- `--color-danger` / `--color-success` / `--color-warning` as text on `--color-bg`: 4.5:1 each.

OKLCH L is a strong predictor of perceived brightness, so the rough rule "text L ≤ 0.35 on bg L ≥ 0.85 will pass AA" gives a starting palette before the contrast tool confirms it. The tool is still the source of truth — perceptual lightness isn't quite WCAG contrast.

**Tools and reference palettes.** `oklch.com`, `oklch.fyi`, `atmos.style/playground` are interactive OKLCH pickers and palette generators. Radix Colors and Tailwind v4 publish full OKLCH-based palettes (light + dark) you can copy or use as calibration. Evil Martians' "OKLCH in CSS" articles are the practical write-up for migrating from HSL.

### Motion: budget, intent, and the reduced-motion contract

A `transition` is a contract: the browser smooths a property change over time. Honor it deliberately:

- **Transition decorative properties** (`opacity`, `transform`, `background-color`, `box-shadow`) — these are cheap and don't reflow.
- **Avoid transitioning layout properties** (`width`, `height`, `top`, `left`, `padding`) — they reflow. If a size change is part of the motion, use `transform: scale()` over a size transition.
- **Specify the property, not `all`.** `transition: all 200ms` transitions every property the browser detects changing, including ones you didn't intend. `transition: opacity 200ms, transform 200ms` is the explicit contract.
- **`prefers-reduced-motion: reduce` is a hard signal.** Honor it by either disabling the animation entirely or replacing it with an instantaneous state change. A "subtle" animation under reduced-motion is the wrong reading of the preference — the user is asking for no animation, not less animation.

The `@property` registration unlocks transitioning of custom properties (angles, lengths, numbers). The View Transitions API extends transitions across DOM mutations — `document.startViewTransition(() => { /* mutate DOM */ })` produces a cross-fade between the before and after states for free, with `view-transition-name` opting individual elements into named coordinated transitions. View transitions are an engine — they have a range (single-document by default, cross-document with `@view-transition { navigation: auto; }`) and a reduced-motion contract (the browser skips the transition when reduced-motion is set, if the developer doesn't override it).

### `:has()`, `@scope`, native nesting

Three modern selector features that change how rules are written:

- **`:has(...)`** is the parent selector. `article:has(> img)` selects articles that contain a direct-child image; `form:has(:invalid)` selects a form with any invalid field. Specificity follows the most specific selector inside `:has()`. Performance caveat: broad anchors (`body:has(...)`, `*:has(...)`) force the browser to recompute on every subtree change. Use narrow anchors (`.card:has(...)`) and limited combinators (`> child`, `+ sibling`).
- **Native nesting** lets a stylesheet author write child/sibling/pseudo rules under the parent. Differences from Sass nesting: no `&__bem` concatenation (the parser reads `&__bem` as a compound selector `&.__bem`, which is almost never what you want); `&` carries the specificity of `:is(...)` against the parent list (a `&.active` nested under `.btn, .link` has the specificity of `:is(.btn, .link).active`, not the union). Use nesting for genuinely contextual rules; avoid it for grouping unrelated rules under a common parent purely for organization.
- **`@scope`** scopes a block of rules to a starting element and (optionally) a scope-end element, with the implicit `:scope` selector matching the scope root. Useful for "these rules apply to a card's interior but not to nested cards" without the framework-specific scoping mechanisms. As of early 2026 it is **Baseline Newly Available** — Firefox 146 joined Chrome and Safari — so it can be used directly on modern-browser targets, with a fallback (BEM, CSS modules, scoped component styles) only for older support matrices.

### Typography

System font stacks remove a layout shift and a download cost; web fonts buy specific identity. Pick deliberately. When using web fonts:

- **`font-display: swap`** or `optional` — never default. `swap` shows fallback text immediately and swaps when the font loads (one FOUT); `optional` shows fallback and only swaps if the font arrives in a tiny budget (preferred for slower networks; avoids late layout shifts).
- **Variable fonts** collapse multiple font files into one. A variable font with weight, slant, and width axes serves more typographic intent for less network cost than a dozen static face files.
- **Fluid typography** — `font-size: clamp(1rem, 0.95rem + 0.3vw, 1.2rem)` scales between a min and max with viewport. With container query units, the same pattern scales with container width: `clamp(1rem, 0.9rem + 0.5cqi, 1.2rem)`.
- **Line height should be unitless.** `line-height: 1.5` inherits multiplicatively; `line-height: 24px` doesn't.
- **Logical type properties for international support.** `text-align: start` (not `left`) honors writing direction.

### Accessibility surface in CSS

CSS can break accessibility in specific, named ways:

- **`outline: none` on focusable elements without a replacement** removes the keyboard focus indicator. The replacement must be visible at the chosen contrast (3:1 against the background for non-text per WCAG 2.2).
- **`:focus` vs. `:focus-visible`.** `:focus` matches on every focus (including mouse clicks); `:focus-visible` matches only when the browser determines the focus should be visible (keyboard navigation, programmatic focus). Pattern: `outline: none` on `:focus`; full focus ring on `:focus-visible`.
- **`display: none` removes from the accessibility tree.** `visibility: hidden` and `opacity: 0` with `pointer-events: none` may or may not, depending on UA. For "hide from sighted users, keep for screen readers," use the `.visually-hidden` pattern (clip to 1px, position absolute, etc.), not display:none.
- **Forced-colors mode** (Windows high-contrast) overrides most color values. Test the layout under forced-colors; specify `forced-color-adjust: auto` (default) or `none` deliberately.
- **Color contrast** is a CSS concern: 4.5:1 for normal text, 3:1 for large text (24px regular or 18.66px bold) and non-text UI components, per WCAG 2.2 AA. Audit roles, not individual usages — a `--color-text` on `--color-bg` audit covers every place those tokens are used.

### Performance: layout, paint, composite

The CSS performance model is three stages: layout (reflow), paint (rasterize), composite (assemble layers). Properties differ in cost:

- **Composite-only properties** (`transform`, `opacity`, `filter` in some cases) — animations on these skip layout and paint entirely. Cheap.
- **Paint-only properties** (`color`, `background-color`, `box-shadow`) — repaints the affected area. Acceptable for transitions.
- **Layout properties** (`width`, `height`, `top`, `padding`, anything that affects geometry) — reflows the document. Expensive; avoid in animations.

`will-change: transform` hints the browser to promote the element to its own layer in anticipation of a change — useful for animations starting from a user gesture, harmful if applied permanently (the browser allocates a layer even when no change is happening).

Content visibility (`content-visibility: auto`) opts an offscreen subtree out of rendering until needed. For very long pages with many independent sections (a feed, a list of cards), the savings are real. Pair with `contain-intrinsic-size` to give the browser a size estimate so the scrollbar doesn't jump.

### Print, forced-colors, and the other media types

`@media print` is the styling for printed output. Worth at minimum: ensure links print their URL (`a::after { content: " (" attr(href) ")"; }`), hide navigation, set a print-appropriate background (`background: white; color: black;`), specify page margins via `@page`.

`@media (forced-colors: active)` is Windows high-contrast mode. Most color values are overridden; use `forced-color-adjust: none` only when the element must retain its colors (a logo, a color picker) and accept that you've taken on responsibility for legibility.

`@media (update: slow)` is e-ink and similar — avoid animations entirely. `@media (hover: none)` is touch-primary devices — avoid hover-only affordances. `@media (any-pointer: coarse)` reports if any pointing device is coarse; useful for "this layout has touch targets that work for fingers even on a hybrid device."


<!-- ───── pairing: ui-ux ───── -->
<!-- GENERATED-BY: pairings/bundle.sh -->

# Pairing: UI/UX

- **Pairs with:** UI design as architectural discipline — vision and journey to screens, single-purpose screens, components as bounded units, design systems, visual hierarchy and typography, accessibility basics, and usability testing as the verification surface. Covers the structural and visual layer of UI work. Out of scope: the cognitive layer (mental-model formation, signifiers, recognition vs. recall, cognitive load) and the interaction-behavior layer (microinteractions, feedback timing, error recovery, gesture and modality, latency budgets).
- **Sources:** Steve Krug, *Don't Make Me Think, Revisited* (3rd ed., New Riders, 2014); Jakob Nielsen's *10 Usability Heuristics* (NN/g, ongoing); Edward Tufte, *The Visual Display of Quantitative Information* (2nd ed., Graphics Press, 2001) and *Envisioning Information* (1990); Adam Wathan & Steve Schoger, *Refactoring UI* (2018); W3C WCAG 2.2 (2023); Apple Human Interface Guidelines (ongoing); Material Design 3 (Google, ongoing); opinion.
- **Date:** 2026-05-28
- **Touches principles:** #1, #2, #6, #7, #8, #9, #10, #13

UI work has three layers that pull on different design muscles: the **architectural and visual surface** (how the product is structured, how screens compose, what the design system says), the **cognitive layer** (how users build a working model of the system in their heads), and the **interaction-behavior layer** (what happens over time when the user acts). This pairing covers the first. It is about UI as architecture — vision, structure, component boundaries, design systems, visual hierarchy, accessibility surface. Get the architecture right and the other two layers have somewhere coherent to live.

## Per-principle commentary

### #1 — Vision down to detail
Start with the user's job-to-be-done, then the journey, then the screens, then the components. Designing screen-by-screen produces a collection of screens, not a product. The vision answers "what does the user accomplish?" — that's the axis every screen sits on. Without it, every new screen is its own ad-hoc decision and the product accretes rather than composes.

### #2 — Upfront anticipation over reactive patching
Enumerate every state of every screen before building: empty (first-run, no data, search returned nothing), loading, partial-load, success, error (with sub-categories: network, permission, validation, server, rate-limit), edit, read-only, disabled. Most ugly UIs are 80% complete on the success path and underspecified on the others. Anticipate the range; design each state intentionally. Discovering a needed state in production usually means a screen has to be redesigned, not just patched.

### #6 — Modules do one job
Each screen has one primary purpose. Multi-purpose dashboards confuse users about what they should do next. If a screen needs three calls to action, it's either three screens or one screen with explicit hierarchy that makes the primary action obvious and demotes the rest. Each component does one job; reuse the same component for the same job across the product. A single component that's secretly five, selected by a mode or `variant` parameter, is the multi-job pathology — split it into named components, or design the variant surface as a narrow, deliberate parameter set.

### #7 — Clean boundaries, owned state
Each component owns its local state (open/closed, hover, expanded, focus). Inputs flow in from the parent; events flow back out to it. No reaching into sibling state. The component boundary is the contract — violating it is how a small change in one component breaks three others. Shared state lives in an explicit owner with a named slice; implicit shared state (two components reading the same source and silently drifting) is the canonical decay path.

### #8 — Architectural consistency
A design system is Principle 8 applied to UI. Once typography, spacing, color, and component conventions exist, new screens use them — not local alternatives. A modal in one place and a sheet in another for the same purpose is the visual equivalent of inconsistent error handling in code. If a pattern is wrong, fix it in the system; don't scatter alternatives. The design system is itself a pairing artefact (per Principle 11 — it is a dated, durable decision about the visual surface) and changes to it should be ratified, not slipped in.

The categories where consistency pays the most:

- **Typography scale.** A finite set of type sizes and weights, used consistently. Inline overrides ("just this one place needs `13.5px`") are the visible residue of an under-designed scale.
- **Spacing scale.** A finite set of spacing values driving every margin, padding, gap. Magic numbers in components are scattered parallels of the same fact.
- **Color tokens.** Role-named semantic tokens (`color.bg`, `color.text`, `color.accent`) at the component layer; value-named primitives (`blue-500`) at the palette layer. Components consume semantic tokens; primitives stay below the role layer. The token system is itself a versioned artefact — changes to it propagate everywhere and deserve dated decisions.
- **Component naming and shape.** `Button`, `Card`, `Modal`, `Sheet` mean specific things in your system. Don't reuse a name for a different shape; don't introduce two names for the same shape.

### #9 — Honest bounds over universal claims
Visual hierarchy is a claim about priority. What looks important must *be* important; what looks secondary must be. A heading style applied to non-heading text mis-claims importance and confuses the eye's first read. A primary-button style on a destructive action mis-claims safety. Treat the visual scale (size, weight, color, contrast, position) as a budget — the most prominent slot is the most expensive, and spending it on a low-priority element costs the high-priority element its place.

The same applies to claims about the product itself: "modern, responsive, accessible" without a stated baseline (which devices, which assistive tech, which contrast level) is marketing, not specification. Pick the floor; document it; design against it.

### #10 — Explicit exclusions over vague coverage
"We don't support keyboard navigation" should be a stated decision, not an accidental omission. Same for: offline mode, multi-language, screen readers, RTL layouts, dark mode, reduced-motion, forced-colors mode, print, e-ink readers. Each not-in-scope item belongs on a list with a reason. "We're inclusive" without an enumeration is a hand-wave; "we support WCAG 2.2 AA on Chrome/Firefox/Safari current-and-prior major versions, with keyboard navigation and screen-reader semantics; we do not support forced-colors mode or RTL in v1 — both planned for Q3" is a finished decision.

### #13 — Done means demonstrable
"It looks good" is not done. "A user new to the product completes the task without help in under N seconds on the first try" is. Usability test with five real users — that catches roughly 85% of issues per Nielsen's classic study (NN/g, 2000). Heuristic walkthroughs against the 10 heuristics catch most of the rest. Designs without a test plan are speculation; designs that have only been tested by their author are speculation by a biased observer.

## Addenda

### Visual hierarchy as a budget

The eye reads a screen in scan order — typically top-left for LTR languages, biased by size, weight, color contrast, and position. That order is a finite budget: only a few elements can be "first." Spending it deliberately is the design move; spending it accidentally (by giving every element similar weight) flattens the screen and forces the user to read everything to find anything.

Levers, ranked roughly by perceptual weight:

- **Size.** A 32px headline in a sea of 14px body is read first.
- **Contrast.** High-contrast against background outranks low-contrast at the same size.
- **Weight.** Bold draws the eye before regular.
- **Color saturation.** A saturated accent on a desaturated surface pulls focus.
- **Position.** Top-left (LTR) is read first; isolation pulls focus regardless of position.
- **Negative space.** An element surrounded by empty space is more prominent than the same element packed against neighbors.

These compose. A 14px bold high-contrast saturated word with whitespace around it can outweigh a 24px low-contrast regular headline. The design system's job is to make these levers a small, named set so combinations are deliberate, not accidental.

### Design system vs. style guide

A **style guide** documents visual conventions (typography, colors, spacings) as values. A **design system** adds the component primitives, the role-based tokens that consume the values, and the rules for composing them — and ships as code, not just as a design-tool document. A style guide constrains; a design system constrains *and provides the building blocks*. The handoff between design and engineering is where the difference matters: a design system has one source of truth (the code); a style guide drifts the moment a designer makes a one-off in the design tool and an engineer hardcodes a near-match in the implementation.

The discipline: every new visual decision lands in the design system before it lands in a feature. Features consume the system; they don't extend it locally.

### Accessibility surface (UI architecture concerns)

The interaction-behavior side of accessibility (focus management, ARIA live regions, gesture alternatives) belongs to interaction-behavior work. The architecture-side concerns:

- **Color contrast as token-level decision.** Audit role pairs (`--color-text` on `--color-bg`, etc.) rather than individual usages — one check per pair covers every place those tokens are used.
- **Type sizes at the lower bound.** Body text below 14–16px is fragile on dense displays and below WCAG large-text definitions. Pick a floor; respect it.
- **Touch target floors.** 44×44 pt on Apple HIG, 48×48 dp on Material — these are minimum interactive sizes for finger-driven UIs. Components in the design system should not undercut them; if a layout needs to, add extra hit area beyond the visible bounds.
- **Reduced-motion contract.** Components in the design system declare which motion they include; the platform's reduced-motion signal switches them to instantaneous variants. Decorative animation is a system-level decision, not a per-component one.
- **Forced-colors mode** (Windows high-contrast). The design system declares which surfaces opt out of system color override (logos, color pickers, deliberate brand surfaces); everything else honors it.

### Information architecture (where this pairing meets it)

Information architecture — taxonomy, navigation structure, content categorization, search vs. browse — is a deeper concern than this pairing covers, but it touches the architecture work: the navigation system, the page hierarchy, the URL structure, the breadcrumb scheme. If the product has more than ~20 screens, treat the navigation architecture as a first-class design artefact (a tree or graph, drawn out, reviewed before any screen is laid out). Without it, screens accumulate, navigation accretes, and the user has to learn the product's geography by trial.

### Usability testing as the verification surface

Five users is enough to surface the bulk of issues for one task on one design (Nielsen, NN/g 2000). The discipline:

- **Tasks, not interviews.** "Show me how you would do X" beats "What do you think of this?" — opinions are cheap; observed behavior is expensive and accurate.
- **Don't help.** Watch them struggle silently. Help only when fully stuck and only at the end.
- **Record what they do, not what they say.** "I would click here" is a guess; the click itself is data.
- **Test against the actual design fidelity.** Wireframe-stage tests catch wireframe-stage issues; high-fidelity tests catch visual-hierarchy issues. Match the test to the question.
- **Re-test after changes.** A redesign that fixed one issue often introduces another. Re-test before shipping.


<!-- ───── pairing: jobs-to-be-done ───── -->
<!-- GENERATED-BY: pairings/bundle.sh -->

# Pairing: Jobs to Be Done

- **Pairs with:** Product and feature work seen through the *user's lived perspective* — the jobs-to-be-done lens and its companions (personas, goal-directed design, mental models). A reasoning discipline for *which feature, and for whom*, not a UI surface-design method.
- **Sources:** Clayton Christensen et al., *Competing Against Luck* (HarperBusiness, 2016 — JTBD, "progress in a circumstance"); Anthony Ulwick, *Jobs to Be Done: Theory to Practice* (Idea Bite Press, 2016) and *What Customers Want* (McGraw-Hill, 2005 — Outcome-Driven Innovation, the job-statement form); Alan Cooper, *The Inmates Are Running the Asylum* (Sams, 1999 — personas, goal-directed design); Indi Young, *Mental Models* (Rosenfeld Media, 2008 — mental-model audits, the user's task structure); opinion.
- **Date:** 2026-06-25
- **Touches principles:** #1, #2, #6, #7, #10, #12

A feature is never the thing the user wants; it is the mechanism you hope serves
the thing they want. The job-to-be-done lens forces a slowdown before any
mechanism gets built: a product is *hired* to make **progress in a
circumstance**, so the design starts from the **job and the person's lived
context** — who they are, what progress they are reaching for, and what a domain
word means *to them* — not from the feature you were about to ship. The
discipline's sharpest single move is naming **who** the user is (including the
user who wears **two roles at once**) and then watching for a **domain word that
means two different things** to that user: an overloaded term is the tell that
two jobs — or two roles — have been quietly collapsed onto one axis. The
principles below show where that lens already lives in this collection, and where
reasoning from the user's side catches an axis you cannot see from the feature's
side.

## Per-principle commentary

### #1 — Vision down to detail
The "overall picture" that tells you which axes exist is **who the product is for
and the job they're getting done** — not the feature list. Christensen's framing
is exactly vision-down-to-detail aimed at the user: name the progress someone is
trying to make in a circumstance, *then* the surfaces and controls decompose
under it. The decisive case is the **dual-role user** — an axis you can only see
from the user's side. From the feature's side, "show the user their work" looks
like one job; from the person's side, the admin who *dispatches a board* and the
technician who *does the jobs* are two circumstances wearing one body. Miss that
vision and you build detail-up: a screen with no person above it, locally
sensible and globally aimed at no one.

### #2 — Upfront anticipation over reactive patching
This is where the lens earns its keep. The classic smell: a need surfaces — "let
me see just *my* stuff" — and it gets stapled on as a **"My / All" filter**. The
filter is the reactive patch; it encodes a role distinction as a UI toggle
instead of naming the role. Anticipation is the JTBD move: enumerate *who* uses
this and *what job each is doing* before building the mechanism, and the dual
role appears as an axis to model, not a flag to add later. The rule of thumb —
**a flag or filter that quietly encodes a role or persona distinction is patching
where you should have modeled.** Re-enumerate from the person; don't re-staple
onto the nearest screen.

### #6 — Modules do one job
One user-job per surface, the way one responsibility lives per module. The split
test transfers directly: do two uses of a surface vary independently (different
jobs — split) or only together (one job — keep)? The dual-role "work" is the
user-facing version of the "and" smell — when one capability description needs an
*and* to be true (*dispatch the board* **and** *do the jobs*), it is usually two
jobs glued to one card, here in the user's mental model rather than in the code.
The signal that you've glued two jobs together is usually a single label
straining to cover both; the antidote is to give each job its own surface (or at
least its own clearly-named mode), so neither has to pretend to be the other.

### #7 — Clean boundaries, owned state
A **role is a real boundary**, and the persona/role model is the single place
"who does what" is authored. When each screen re-derives "is this person an admin
or a tech?" from whatever's handy — a flag here, a permission check there, an
inferred default elsewhere — the same fact lives in several places and drifts.
Define the roles and their jobs once; every surface reads that model rather than
re-inventing a local notion of the user. A screen that needs to *re-decide* who
the user is, instead of *reading* it from the owned role model, is reaching
across the boundary — the same single-source violation this principle names,
expressed in personas.

### #10 — Explicit exclusions over vague coverage
"For everyone" is the user-facing hand-wave this principle forbids. A finished
product decision names **which users and jobs are out of scope, and why** — a
non-user is a real design decision, not an oversight. JTBD makes this concrete:
the jobs you are *not* serving are stated ("we don't serve the dispatcher's job
here, because this surface is the technician's"), and an exclusion that might
return names its re-entry condition ("not the admin's job yet; revisit when a
single user holds both roles"). Naming the non-user sharpens the job you *are*
serving; "works for any user" usually means it was designed for none.

### #12 — Surface conflicts, never resolve silently
An **overloaded domain term is a surfaced conflict waiting to be named**. When
"work" means *the board I dispatch* to one role and *the jobs I personally do* to
another, the word is silently resolving a conflict — and shipping it lets one
term mean two things, drifting the whole product around the ambiguity. The
discipline is the same as for two disagreeing decisions: stop, name the collision
out loud ("'work' is carrying two jobs"), and force the split — two terms, or one
term with an explicit role qualifier — recorded so it stays split. The glossary
of *what each key word means to whom* is where that resolution lives durably; an
un-audited domain vocabulary is where collapsed roles hide.

## Addenda

### The job statement, and how to write one
A job is stated as **progress + circumstance**, not as a feature or a
demographic: *"when I'm mid-route between calls, help me see only the jobs
assigned to me, so I don't waste a stop on someone else's ticket."* The form is
`when [situation], I want to [motivation], so I can [expected outcome]`
(Ulwick/Christensen lineage). The discipline of writing it this way is that it
*cannot* be satisfied by naming a feature — it forces the circumstance and the
outcome into view, which is exactly where the dual-role split tends to reveal
itself. If two plausible job statements both claim the same surface, that surface
is serving two jobs (see #6).

### Personas and roles — and the user who is more than one
A persona is a named, durable model of a user's goals and context, not a
demographic sketch; its job is to be *re-read before feature work* so the
slowdown fires by construction rather than by luck. The case this lens exists to
catch is the **multi-role / dual-role user**: one human who, in different
circumstances, is doing different jobs. Model the *roles* and the *jobs*, and let
a person map to more than one — rather than treating "the user" as a single
undifferentiated actor. The dispatch-admin who is also a field technician is one
user and two roles; the product that models them as one role will reach for a
filter (see #2) exactly where it should have reached for a role.

### The overloaded-term audit
Before building, run the key domain nouns past a single question: *does this word
mean the same thing to every role, in every circumstance?* "Work," "job,"
"account," "owner," "team" are the usual offenders — each tends to mean one thing
to the person who *administers* and another to the person who *operates*. A word
that fails the test is not a naming nitpick; it is a structural signal that two
jobs or two roles have been collapsed onto one axis (#12), and the cheapest
moment to split them is before the mechanism is built around the collapsed term.


<!-- ───── pairing: microsoft-graph ───── -->
<!-- GENERATED-BY: pairings/bundle.sh -->

# Pairing: Microsoft Graph API

- **Pairs with:** Microsoft Graph API — the unified REST API surface for Microsoft 365 services (Entra ID, Outlook mail/calendar, SharePoint, OneDrive, Teams, Planner, users, groups). Covers v1.0 and beta endpoints, Microsoft Graph SDKs, and the authentication/authorization model via Microsoft Identity Platform (MSAL).
- **Sources:** Microsoft Graph REST API reference (learn.microsoft.com/en-us/graph/api/overview); Microsoft Graph best practices (learn.microsoft.com/en-us/graph/best-practices-concept); Microsoft Identity Platform documentation (learn.microsoft.com/en-us/entra/identity-platform); Microsoft Graph SDK design requirements (github.com/microsoftgraph/msgraph-sdk-design); Microsoft Graph throttling guidance (learn.microsoft.com/en-us/graph/throttling); opinion.
- **Date:** 2026-06-05
- **Touches principles:** #1, #2, #4, #5, #7, #8, #9

Microsoft Graph is a single endpoint (`https://graph.microsoft.com`) that federates dozens of backend services, each with its own consistency model, throttling behavior, and permission granularity. The principles below address the fact that "one API" is a convenient lie — the unified surface hides per-service differences that matter for correctness, performance, and authorization. Treating Graph as uniform invites the kind of reactive patching Principle 2 warns against.

## Per-principle commentary

### #1 — Vision down to detail

The first axis to establish: **delegated vs. application permissions**. This is not a configuration detail — it determines which endpoints are reachable, what consent model applies, and whether your app acts as-a-user or as-itself.

- **Delegated (user context):** the app acts on behalf of a signed-in user. Permissions are the intersection of what the app is granted and what the user can access. Requires an interactive auth flow (authorization code, device code) or a cached refresh token.
- **Application (daemon/service context):** the app acts as itself with no signed-in user. Permissions are granted by a tenant admin via admin consent. Can access any user's mailbox, any team, any SharePoint site — scoping is your responsibility.

Decide this before writing any code. The permission model shapes everything downstream: which OAuth flows you use, whether you need user-specific token caches, whether your batch requests can span users, and which Graph endpoints are even available (some are delegated-only, some are application-only).

A common mistake: starting with delegated permissions for a prototype, then discovering the production use case requires application permissions. The auth flow, token management, and permission scopes all change. Establish the axis up front.

### #2 — Upfront anticipation over reactive patching

Graph federates services with different operational characteristics. Anticipate these before they surface as production incidents:

**Rate limiting and throttling.** Graph returns HTTP 429 with a `Retry-After` header. But throttling is not uniform:
- Outlook endpoints: per-mailbox and per-app throttling. Bulk operations on a single mailbox hit limits faster than the same volume spread across mailboxes.
- SharePoint/OneDrive: separate throttling regime. SharePoint list views enforce a 5,000-item threshold — queries returning more than 5,000 items without indexing are rejected, not just slow.
- Directory (users/groups): 10,000 requests per 10 minutes per tenant for most operations. Write operations are more restrictive.
- Teams: channel message operations are heavily throttled; creating messages across many channels hits per-app limits quickly.

**Token lifecycle.** Access tokens expire (typically 60-90 minutes). In long-running operations — syncing a large mailbox, processing a multi-page delta query — the token can expire mid-operation. The SDK handles refresh automatically if configured with a credential that supports it, but raw HTTP integrations must handle this explicitly.

**Eventual consistency.** Directory changes (new user, group membership change) propagate asynchronously. A `POST` to create a user followed immediately by a `GET` for that user can return 404. Use the `ConsistencyLevel: eventual` header with `$count` for directory queries that need to include recently-changed objects, and design flows that tolerate propagation delay.

**Mail sending limits.** Exchange Online enforces per-user sending limits: 10,000 recipients per day, 30 messages per minute for application-permission sends. These are tenant-level limits that cannot be raised by API configuration.

### #4 — Engines handle every possibility

Graph's engine surface includes capabilities that many integrations discover late. Design against the full range from the start:

- **CRUD on 365 resources.** Users, groups, mail messages, calendar events, files, SharePoint list items, Teams channels, Planner tasks — each with its own property set and relationship navigation.
- **Query shaping.** `$select` (choose fields), `$filter` (server-side filtering), `$expand` (inline related resources), `$orderby`, `$top`, `$skip`, `$count`, `$search`. Not all query parameters are supported on all endpoints — this is where the "unified API" abstraction leaks. Check per-endpoint documentation.
- **Batch requests.** Up to 20 individual requests in a single `POST /$batch`. Supports sequential dependencies between requests within a batch via `dependsOn`. Each request in the batch gets its own status code — a batch can partially succeed.
- **Delta queries.** `GET /users/delta` returns changes since the last sync. Returns a `@delta.token` to use on the next call. The engine for change-tracking without polling. Max 50 items per page by default; follow `@odata.nextLink` to drain the full delta.
- **Change notifications (webhooks).** Subscribe to resource changes; Graph POSTs to your endpoint when changes occur. Subscriptions expire (mail: 4,230 minutes max, drive items: 43,200 minutes max, Teams messages: 60 minutes) and must be renewed. Your endpoint must respond to a validation request on subscription creation.
- **Large file upload.** Files over 4 MB use upload sessions (resumable chunked upload) rather than single PUT. The SDK wraps this, but the engine supports the full lifecycle: create session, upload chunks, commit.
- **Streaming and export.** Content downloads (file content, mail MIME) return streams, not JSON. Handle these as binary/stream responses, not parsed objects.

An integration that only uses CRUD and ignores delta queries will eventually rebuild change-tracking from scratch. An integration that ignores batch will make 20 serial HTTP calls where one would do. Know the full surface before designing the instruction layer.

### #5 — Instructions don't extend engines

The Microsoft Graph SDK (available for .NET, TypeScript/JavaScript, Java, Python, Go, PHP) is the engine for HTTP transport, authentication, retry, and serialization. Your application code is the instruction layer that sequences SDK calls for business logic.

The SDK provides:
- **Authentication middleware.** Token acquisition, caching, and refresh via MSAL integration. The SDK accepts a credential/auth provider and injects tokens into every request.
- **Retry handling.** Automatic retry on 429 (respecting `Retry-After`), 503, and 504 responses. Configurable retry count and backoff.
- **Request building.** Fluent API that constructs URLs, query parameters, and headers. `client.users.byUserId(id).messages.get()` rather than string concatenation.
- **Serialization.** Response deserialization into typed models. The SDK ships generated types for every Graph entity.

What the SDK does not own — and your instruction layer must:
- **Business rules** about which resources to access, when, and why.
- **Pagination orchestration.** The SDK provides `PageIterator` helpers, but the decision of "drain all pages vs. take first N" is business logic.
- **Error interpretation.** The SDK surfaces Graph error responses; your code decides what a 403 on a specific mailbox means for your workflow.
- **Concurrency control.** The SDK doesn't throttle your call rate. If you're iterating 10,000 users and making a Graph call per user, you own the concurrency limit.

Don't bypass the SDK to make raw `fetch` calls unless the SDK genuinely can't do what you need (rare — typically limited to beta endpoints the SDK hasn't generated types for yet). Bypassing the SDK means re-implementing auth injection, retry logic, and error normalization — extending the engine from the instruction layer.

### #7 — Clean boundaries, owned state

Graph tokens, subscription state, and delta tokens are state that must be owned cleanly:

**Token state.** MSAL maintains a token cache (in-memory by default, pluggable to persistent storage). The token cache is MSAL's state — don't extract tokens and manage them yourself. If you need tokens across processes, configure MSAL's distributed cache (Redis, database) rather than passing tokens between services.

**Delta tokens.** A delta token represents "the state of the world as of this sync." It is your app's state — store it durably (database, file) keyed to the resource being tracked. Losing a delta token means re-syncing from scratch. Never store delta tokens only in memory for production sync flows.

**Webhook subscription IDs.** Each subscription has an ID and an expiry. Your app owns the renewal lifecycle — Graph does not auto-renew. Store subscription metadata (ID, resource, expiry) and implement renewal before expiry. A subscription that silently expires is a silent data loss.

**Permissions as boundaries.** Graph permissions are granular: `Mail.Read`, `Mail.ReadWrite`, `Mail.Send`, `Calendars.Read`, `Sites.Read.All`. Each permission is a boundary. Request the minimum set needed (principle of least privilege). The permission set is the contract between your app and the tenant admin — expanding it later requires re-consent.

### #8 — Architectural consistency

Once you establish patterns for Graph integration, apply them everywhere:

**Always use `$select`.** Every Graph request should specify which fields to return. Without `$select`, Graph returns a default set that varies by endpoint and version — and may include fields your app doesn't need, increasing payload size and potentially exposing data your app shouldn't handle. `$select` is both a performance pattern and a security pattern.

**Always handle pagination.** Any Graph endpoint that returns a collection can paginate. The response includes `@odata.nextLink` if there are more results. Code that reads the first page and stops is a latent bug — it works until the collection exceeds one page. Use the SDK's `PageIterator` or implement a drain loop.

**Always set `Prefer` headers where they matter.** `Prefer: return=minimal` on POST/PATCH to reduce response size. `Prefer: outlook.body-content-type="text"` to control mail body format. `Prefer: IdType="ImmutableId"` for stable IDs across mailbox moves. These are not optional polish — they affect correctness.

**Consistent error handling.** Graph error responses follow OData error format: `{ error: { code, message, innerError } }`. The `code` field is machine-readable (`ErrorAccessDenied`, `ErrorItemNotFound`, `ErrorQuotaExceeded`). Handle by code, not by message string — messages are localized and change between API versions.

### #9 — Honest bounds over universal claims

Graph's limits are concrete and vary by service. Claiming "we handle all Graph operations" requires knowing:

- **Batch:** max 20 requests per batch. Batches containing JSON payloads are limited to 4 MB total. Requests to different workloads within a batch may be executed in any order unless `dependsOn` is specified.
- **Throttling:** varies per endpoint family. Outlook: per-mailbox + per-app. Directory: per-tenant. SharePoint: per-site + per-app. There is no single "Graph rate limit."
- **Delta query:** max page size varies. Delta tokens can expire (typically after 30 days of non-use) — a sync that hasn't run in a month may need to re-sync from scratch.
- **Webhook subscriptions:** max expiry varies by resource type. Chat/channel messages: 60 minutes. Mail: ~2.9 days. Drive items: 30 days. Your renewal logic must account for the shortest-lived subscription type you use.
- **Beta vs. v1.0:** beta endpoints can change without notice. v1.0 endpoints have backward-compatibility guarantees. Any integration claiming production readiness on beta endpoints is making a claim it cannot back.
- **Permissions:** some operations require admin consent and cannot be granted by end users. An app that "works for any user" but requires admin-consent permissions actually works for any user *in tenants where an admin has consented*.

## Addenda

### SharePoint list operations

SharePoint lists via Graph (`/sites/{site-id}/lists/{list-id}/items`) have operational characteristics that differ from other Graph resources:

- **View threshold.** SharePoint enforces a 5,000-item list view threshold inherited from on-premises SharePoint. Queries against lists with more than 5,000 items must filter on indexed columns or they return HTTP 503. This is not a Graph limit — it is a SharePoint engine limit surfaced through Graph.
- **Column types.** SharePoint list columns map to OData types. Choice columns, lookup columns, and managed metadata columns have specific JSON shapes in the Graph response. `$expand` on lookup columns is required to get the looked-up value rather than just the ID.
- **Creating items.** `POST /sites/{site-id}/lists/{list-id}/items` with `fields` in the body. Field names use internal names (which may differ from display names). Use `GET /sites/{site-id}/lists/{list-id}/columns` to discover internal names.

### sendMail patterns

Sending mail via Graph (`POST /users/{id}/sendMail` or `POST /me/sendMail`) differs between permission models:

- **Delegated:** sends as the signed-in user. Appears in their Sent Items. Subject to the user's sending limits.
- **Application:** sends as any user in the tenant. Requires `Mail.Send` application permission. The `from` address must be a valid mailbox. Does *not* automatically save to Sent Items unless `saveToSentItems: true` is set in the request body.
- **Shared mailbox:** use application permissions with the shared mailbox as the sender. Or use delegated permissions where the signed-in user has Send As / Send on Behalf permission on the shared mailbox.
- **HTML bodies:** set `body.contentType` to `"HTML"`. Graph does not sanitize outbound HTML — your app is responsible for producing valid HTML and avoiding injection if body content includes user-supplied data.

### Batch API patterns

The JSON batch endpoint (`POST /$batch`) accepts a JSON body with an array of individual requests:

```json
{
  "requests": [
    { "id": "1", "method": "GET", "url": "/me/messages?$top=5" },
    { "id": "2", "method": "GET", "url": "/me/events?$top=5" }
  ]
}
```

Key patterns:
- **Dependent requests.** Use `dependsOn: ["1"]` to ensure request 2 runs only after request 1 succeeds. Without `dependsOn`, requests may execute in any order or in parallel.
- **Per-request errors.** Each response in the batch carries its own status code. A batch `POST` returns HTTP 200 even if individual requests within it failed. Your code must check each response's `status` field.
- **Atomicity.** Batches are *not* atomic. There is no rollback if request 3 of 20 fails. Design batch operations to be idempotent or to handle partial failure explicitly.
- **Size limit.** Max 20 requests per batch. For operations requiring more, chunk into multiple batch calls. Max 4 MB total payload for JSON batches.

### Change notifications and webhooks

Graph change notifications push resource changes to your endpoint rather than requiring polling:

**Subscription lifecycle:**
1. `POST /subscriptions` with `changeType`, `notificationUrl`, `resource`, and `expirationDateTime`.
2. Graph sends a validation request (`POST` to your URL with a `validationToken` query parameter). Your endpoint must return the token as plain text within 10 seconds.
3. On resource change, Graph POSTs a notification payload to your endpoint. Respond with HTTP 202 within 3 seconds — do not process inline; queue for async handling.
4. Before expiry, `PATCH /subscriptions/{id}` with a new `expirationDateTime` to renew.

**Lifecycle notifications.** Subscribe to `lifecycle` events (`subscriptionRemoved`, `missed`) to detect when Graph drops your subscription due to prolonged endpoint unavailability or backend issues. Without lifecycle notification handling, a silently-dropped subscription means silently-missed data.

**Rich notifications.** Set `includeResourceData: true` to receive the changed resource inline in the notification (requires encryption — you must provide a public key in the subscription). Without this, notifications only tell you *that* something changed; you must call Graph to get *what* changed.


<!-- ───── pairing: local-trade-marketing ───── -->
<!-- GENERATED-BY: pairings/bundle.sh -->

# Pairing: Local Trade Marketing

- **Pairs with:** Marketing a **local, trust-dependent trade or services business** — a locksmith, alarm/security installer, safe dealer, electrician, plumber, HVAC, roofer, or similar. The buyer is choosing someone to come into their home or business and be trusted with their safety, money, or property; the purchase is high-consideration, locally bounded, and won on credibility rather than price or novelty. This is the *demand-side* discipline — positioning, audience segmentation, proof, local discoverability, and lead conversion. Out of scope: the visual presentation of the site (a UI concern), the truthfulness mechanics of individual strings (a copy-discipline concern), and the product/feature-selection lens (a jobs-to-be-done concern).
- **Sources:** B.J. Fogg, *Stanford Web Credibility Research / Prominence-Interpretation Theory* (2003); Robert Cialdini, *Influence* (authority, social proof, consistency — applied ethically, never manufactured); Google *Search Quality Rater Guidelines* (E-E-A-T) and Google Business Profile / local-pack guidance (ongoing); Eugene Schwartz, *Breakthrough Advertising* (1966 — market awareness stages); Neil Rackham, *SPIN Selling* (1988 — the consultative, listen-first sale); opinion.
- **Date:** 2026-06-27
- **Touches principles:** #1, #2, #9, #10, #12, #13

A local trade business does not win the way a SaaS product or a national brand wins. The prospect has a *circumstance* — a break-in down the street, a lockout, a new building to secure, a safe to move — and is looking, locally and often urgently, for someone competent and trustworthy. They cannot inspect the work before buying, so they buy **signals of credibility**: years in business, real credentials and manufacturer authorizations, a real address and phone, a recognizable local name, and proof that real neighbors trust them. Marketing here is the disciplined assembly of *true* signals into a path that ends in a call or a quote request. The discipline's spine: every persuasive claim is a credibility claim, every credibility claim must be real and verifiable, and the whole funnel is judged by leads, not applause.

## Per-principle commentary

### #1 — Vision down to detail
Start from the prospect's circumstance and the *job they are hiring you for*, not the service catalogue. A homeowner doesn't want "access control" — they want to stop worrying about who can get in. A business owner doesn't want "CCTV" — they want shrinkage to stop and evidence when it doesn't. The marketing vision names the **audiences and their fears/goals first** (e.g. residential / commercial / new-construction), then maps offerings onto them. A site organized by the company's internal product taxonomy instead of the buyer's situation is detail-up: it lists what you sell and makes the visitor do the translation. Lead with the situation; let the catalogue answer it.

### #2 — Upfront anticipation over reactive patching
Enumerate the audience segments and their **awareness stages** (Schwartz) before writing a single page, because the same business serves buyers at very different distances from the purchase. The *most-aware* prospect already knows the company name and just needs the phone number and hours one tap away. The *problem-aware* prospect (just had a scare, is researching) needs the threat named, the solution explained, and trust established. The *unaware* prospect needs the problem made vivid. Anticipating this spread up front means the IA carries a fast-path for the ready buyer (click-to-call, address, "request a quote" always reachable) *and* a slower trust-building path for the researcher — instead of one undifferentiated brochure stapled together reactively as each new question arises. Segment the case-space; don't patch it.

### #9 — Honest bounds over universal claims
This is the load-bearing principle for trade marketing, because the entire genre is built on credibility and credibility dies on a single caught exaggeration. **Every persuasive claim is a factual claim that must hold:** "since 1982" must be true to the year; "licensed" must cite a real license number; "authorized Medeco dealer" must be a real authorization; "trusted by central Illinois" is only as strong as the proof behind it. Prefer **specific, verifiable signals over superlatives** — a license number, a manufacturer authorization, a real review count, a founding year, a named service area beat "best," "#1," "trusted," and "premier," which are vacuous and, worse, pattern-match as exactly what a low-credibility competitor also says. Social proof and authority (Cialdini) are powerful *only* when genuine: a real testimonial with a real name outperforms five invented ones and carries none of the legal and reputational risk. When a credibility signal cannot yet be substantiated, the honest move is to omit it or render a clearly-marked placeholder, never to invent a specific. The strongest marketing asset a trade business has is being *checkably* what it claims to be.

### #10 — Explicit exclusions over vague coverage
Name what you **don't** do and **whom you don't serve**, because in local services a false implied promise wastes the lead and burns trust. State the **service area** honestly (the towns actually covered) rather than implying nationwide reach; state the **hours** and what happens after them; distinguish what's sold/installed/serviced from what's merely referred out. "We don't do X — but here's who does" is a finished, trust-building position; vague "full-service, any need" coverage invites the mismatched call that ends in a one-star review. An honest boundary is a qualifier that improves lead quality, not a weakness.

### #12 — Surface conflicts, never resolve silently
When marketing instinct ("say we're the area's #1 security company") collides with what's verifiable ("we have no basis for a #1 claim"), that is a conflict to **surface to the owner**, not to quietly resolve by either writing the puffery or silently dropping a claim the owner believes is true. The owner may hold proof the marketer can't see (a real award, a real volume stat), or may be about to ship an unsubstantiated boast that creates real exposure. Name the claim, name what would substantiate it, and let the owner decide — then capture which way it went. The same applies when two surfaces disagree about a fact (the footer says "since 1982," an about page says "over 40 years," and the math drifts as years pass): both can't stay right untended.

### #13 — Done means demonstrable
The marketing site's job is leads, and "done" means the **conversion path is demonstrably present and working**, not that the page looks persuasive. Every page a prospect can land on offers a reachable next step — click-to-call, a quote request, directions — and that step actually functions (the form delivers, the number dials, the map points to the real address). "Demonstrable" extends to measurement: a lead-generation claim is only checkable if calls and submissions are *counted*, so conversion instrumentation (form-submit and click-to-call events) is part of done, not a later nicety. Persuasion you can't measure is a vibe; a tracked path from landing to lead is the demonstrable artifact.

## Addenda

### The local discoverability triple (NAP) and E-E-A-T
For a locally-bounded business, the single highest-leverage technical-marketing fact is **NAP consistency** — Name, Address, Phone identical across the website, structured data, and every external listing (Google Business Profile, maps, directories). Inconsistency splits the business's identity in the eyes of local search and suppresses the local-pack ranking that drives "locksmith near me" intent. Treat NAP as one canonical fact with many derived projections, never re-typed. E-E-A-T (Experience, Expertise, Authoritativeness, Trust) is not an abstraction here: it is the founding year, the license, the manufacturer authorizations, the real reviews, the named local address — the same true credibility signals #9 governs, read by the search engine as well as the human.

### The credibility hierarchy (what actually moves a trade buyer)
Roughly in order of persuasive weight, all of which must be real: (1) **a real, reachable local presence** — address, phone, hours, a photo of the actual storefront/team; (2) **specific credentials** — license numbers, manufacturer/brand authorizations, years in business; (3) **real social proof** — named reviews, recognizable local clients, genuine ratings; (4) **demonstrated expertise** — plain-language explanation of the buyer's problem and the options; (5) **friction-free contact** — the call/quote step one tap away at the moment trust peaks. Puffery and stock imagery sit at the bottom and can even *invert* — a generic "trusted professionals" hero with a stock photo reads as less credible than a slightly plain page with a real photo of the real shop.

### The consultative frame
Many trade businesses sell by *listening first* — survey the site, understand the need and budget, then propose. Marketing should mirror that frame rather than fight it with hard-sell urgency: the call-to-action is "tell us what you'd like to protect" / "request a quote," an invitation to a conversation, not "buy now." This both matches how the sale actually closes (Rackham) and reads as more credible to a high-consideration buyer who distrusts pressure. Urgency tactics (countdown timers, false scarcity) are a poor fit and a credibility risk for a trust-bought service; genuine, dated, true offers ("in-stock safes, while they last") are fine.


<!-- ───── pairing: copy-truth ───── -->
<!-- GENERATED-BY: pairings/bundle.sh -->

# Pairing: Copy Truth

- **Pairs with:** user-facing instructional text as a verification surface — every helper line, tooltip, placeholder, empty state, confirmation prompt, error message, badge title, and onboarding hint a product shows its users. Each one is a *claim about behavior*, and this pairing treats the full set as an auditable contract: instruction must match function. Covers the truthfulness and synchronization of in-product copy. Out of scope: visual presentation of text (a perceptual concern), vocabulary architecture (which words name which concepts — a mental-model concern), and developer-facing comments/docs (covered by code-level doc-drift discipline).
- **Sources:** Jakob Nielsen, *10 Usability Heuristics* (NN/g) — #1 "visibility of system status", #2 "match between system and the real world", #9 "help users recognize... errors", #10 "help and documentation"; Microsoft Writing Style Guide (ongoing); GOV.UK Content Design guidance (ongoing); Torrey Podmajersky, *Strategic Writing for UX* (O'Reilly, 2019); opinion.
- **Date:** 2026-06-11
- **Touches principles:** #2, #7, #9, #12, #13

Instructional copy is the one part of the system users actually read, and the one part no compiler checks. A tooltip that says "never invoiced" while the engine invoices anyway isn't a typo — it's a false statement of behavior delivered at the exact moment of a decision, with the product's full authority behind it. Code that drifts from comments wastes developers' time; copy that drifts from function makes *users* wrong, and they have no way to debug the discrepancy. The discipline: every instructional string is a claim; claims get verified against the code path they describe, and re-verified when that path changes.

## Per-principle commentary

### #2 — Upfront anticipation over reactive patching
Enumerate where instructional claims live before auditing or writing them — the inventory is finite and greppable: helper paragraphs under headings, `placeholder=` text, `title=` tooltips, `confirm()` strings, empty-state messages, error strings (client and server `fail()` messages), notification copy (push/SMS/email bodies), button labels that assert behavior ("Save draft" claims a draft exists), and settings descriptions. A copy audit that only reads visible page text misses the tooltips and confirms — which are precisely where behavioral promises concentrate, because that's where designers put the fine print.

### #7 — Clean boundaries, owned state
A behavioral fact stated in copy is that fact represented *twice*: once in code, once in prose. Twice is the minimum (users must be told things), but every restatement multiplies drift surface. So: state each behavioral claim in the fewest places that serve the user, and when one behavior is described on several surfaces (a tooltip, a settings hint, a notification), treat those strings as a named set that changes together. The strongest form is structural: derive the copy from the same constant the code uses (a shared limit, a shared label map, a shared duration) so prose and behavior cannot disagree. "The session times out after 30 minutes" hardcoded in copy while `TIMEOUT_MS` lives elsewhere is the canonical violation.

### #9 — Honest bounds over universal claims
Copy loves absolutes — "never", "always", "automatically", "instantly", "secure" — and every absolute is a universal claim requiring a constructive argument. Audit them by strength: "never invoiced" must be enforced on every code path, not just the visible one; "syncs automatically" must state or honestly imply the cadence; "saved" must mean durably saved, not optimistically rendered (the honest version when queued is "saved — will sync", and only if the queue can actually deliver it). Where behavior is conditional, the copy carries the condition ("admins can..." / "once published..."). Weasel-soft copy is the opposite failure: "may take some time" where the code has a fixed 45-second deadline is vagueness where precision was free. Say what the code does; the code is sitting right there.

### #12 — Surface conflicts, never resolve silently
When an audit finds copy contradicting code, there are always two fixes — change the words or change the behavior — and choosing is a *product decision*, not a copy edit. The string may be the spec ("non-billable jobs are never invoiced" was the intent; the engine was wrong) or the fossil (the behavior moved on; the words didn't). An auditor who silently rewrites copy to match drifted behavior may be laundering a regression into documentation. Surface the pair — claim, behavior, cites for both — and let the owner pick the truth. The same applies between two pieces of copy that disagree with each other: both can't be right, and averaging them helps no one.

### #13 — Done means demonstrable
A copy claim is verified when you can point to the code path that makes it true — `file:line` for the enforcement, not vibes about intent. "This tooltip is accurate" means: the guard exists, on every route to the behavior, including the ones the UI doesn't expose (direct POST, API, scheduled job). Inventory coverage is also demonstrable: report claims-checked / true / false / stale / unverifiable, like any audit. And the contract runs forward: a behavior change isn't done until the strings describing that behavior were grepped for and updated — "find the copy" belongs in the definition of done for any user-visible behavior change.

## Addenda

### The claim taxonomy

Audit verdicts that keep findings honest:

- **TRUE** — claim matches behavior; cite the enforcing code.
- **FALSE** — claim contradicts behavior; this is a product decision (see #12), severity scales with what the user risks by believing it (money, data loss, security > convenience).
- **STALE** — was true, behavior moved; usually a copy fix, but confirm the behavior change was intentional before blessing it.
- **PARTIAL** — true on the happy path, false on edge paths (the "never" that's mostly never).
- **UNVERIFIABLE** — depends on runtime/config/external services; either make it verifiable or soften the claim to what is.
- **VACUOUS** — claims nothing checkable ("powerful", "seamless"); not a defect, but flag it where users needed an actual instruction.

### Where the lies concentrate

Empirically, the highest-yield surfaces: **tooltips and `title=` attributes** (fine print nobody re-reads after writing), **confirmation dialogs** (consequence statements drift as consequences change), **empty states** (written before the feature matured), **offline/sync messaging** (the gap between optimistic UI and durable truth), **permission hints** ("only admins can..." after a role model changes), and **stale counts or limits** baked into prose. Start there.

### Writing copy that stays true

- Prefer copy that describes the *user's situation* over the *system's mechanism* — mechanisms change more often ("We'll text you if this doesn't reach your phone" survives a transport rewrite; "uses Web Push with SMS fallback via the 45-second escalation sweep" does not).
- When the mechanism matters to the user, bind the number to the code's constant or accept a standing audit obligation for it.
- Date-stamp nothing in UI copy; "new" is a countdown to a lie.
- Every `confirm()` states the consequence, and the consequence stated is the consequence implemented — including reversibility ("This cannot be undone" is a claim about the database, verify it).


<!-- ───── pairing: prose-craft ───── -->
<!-- GENERATED-BY: pairings/bundle.sh -->

# Pairing: Prose Craft

- **Pairs with:** any prose a human reads — emails, announcements, release notes, README and docs prose, marketing and landing copy, in-product paragraphs longer than a label, commit/PR descriptions, reports. The unit is the *sentence and the paragraph*, judged as English: grammar, mechanics, rhythm, structure, and readability. This pairing owns whether the writing is **well-formed and clear**, independent of whether its claims are **true** — that truthfulness axis belongs to `copy-truth`. A sentence can be true and unreadable (this pairing's job) or grammatical and false (copy-truth's job); the two are orthogonal and a good piece of writing passes both. Out of scope: truth of behavioral claims (copy-truth), the *visual* presentation of text — type, spacing, hierarchy (a perceptual concern), and which words *name product concepts* — vocabulary architecture (a mental-model concern).
- **Sources:** William Strunk & E.B. White, *The Elements of Style*; Joseph M. Williams, *Style: Toward Clarity and Grace*; Bryan Garner, *Garner's Modern English Usage*; *The Chicago Manual of Style*; GOV.UK / Microsoft writing style guidance; opinion.
- **Date:** 2026-06-13
- **Touches principles:** #1, #2, #6, #7, #8

Prose is the one artifact whose defects no linter catches and every reader feels. A clumsy sentence doesn't error — it just quietly costs the reader attention: a buried point, a pronoun with no antecedent, four bullets that start four different ways, a paragraph that makes the reader hold five clauses in their head to reach a verb. None of it is "wrong" the way a bug is wrong, so it ships. The discipline is to treat writing structurally — the same orthogonality, boundaries, and consistency the principles demand of code apply to clauses, sentences, and sections — and to revise against that structure, because first-draft prose is reactive-patched by default: each thought stapled to the one before it in the order it occurred to the writer, not the order the reader needs.

## Per-principle commentary

### #1 — Vision down to detail
Lead with the point, then support it — top-down, not chronological. The reader should get the takeaway in the first sentence of a paragraph and the first paragraph of a piece (BLUF: bottom line up front); everything after is elaboration they can stop reading once convinced. First drafts almost always run the other way — context, context, context, *then* the point — because that's the order the writer discovered it. Revision inverts it. A paragraph whose topic sentence is its last sentence is a paragraph written forward and not yet edited. The same shape scales: the subject line states the news, the opening states the offer, the section heading states what the section delivers.

### #2 — Upfront anticipation over reactive patching
Decide the reader and the register *before* writing, not by drifting into one mid-paragraph. Who reads this, what do they already know, what do they need to do next, and how formal is the relationship — those four answers fix diction, sentence length, and how much you explain. Anticipating them up front is what keeps a piece in one voice; discovering them as you go is what produces the email that opens breezy and ends in legalese. The finished-thought test: name the audience and the one action you want before the first sentence exists.

### #6 — Modules do one job
One idea per sentence; one job per paragraph. The longest-pole defect in real prose is the overloaded sentence — two independent thoughts fused with a comma and an "and," so the reader parses a compound to extract two simple facts that wanted to be two sentences. Split them. A paragraph has a single job too: if you can't name what it's for in four words, it's two paragraphs wearing one indent. Bullets earn their place by atomicity — a bullet that contains a semicolon-joined second clause is usually two bullets, or a bullet plus a sentence that didn't belong in the list.

### #7 — Clean boundaries, owned state
Every fact appears once. Prose redundancy is the same defect as duplicated state: the intro that previews what the body then says verbatim, the bullet that restates its own heading, the "as mentioned above." Say it in the one place it does the most work and cut the echoes. Pronouns are the boundary contract of a sentence — every "it / this / that / they" must have exactly one antecedent the reader can resolve without rereading; a "this" pointing at the whole previous sentence's gist is a dangling reference. And keep one fact in one register: don't define a term in the intro and silently redefine it by example later.

### #8 — Architectural consistency
Parallel things take parallel form. A bulleted list is a category, and per Principle 8 every member that fits the category gets built the same way: if one bullet starts with an imperative verb, they all do; if one is a noun phrase, they all are. Mixed openings ("Capture anywhere…", "Work page is…", "Inline-edit…") read as three lists spliced together and force the reader to re-find the pattern each line. Consistency runs deeper than lists: one tense, one voice (prefer active — a named actor doing a thing — and reserve passive for when the actor genuinely doesn't matter), one term per concept (don't alternate "job / ticket / work order" for one thing as elegant variation; the variation reads as three different things), one serial-comma policy, one capitalization rule for headings. Where the established pattern is itself clumsy, name it and replace it across the piece — don't add a fourth inconsistent member.

## Addenda

### The revision pass (mechanical, repeatable)

First drafts are for discovering what you mean; revision is where prose-craft happens. A deterministic sweep, in order:

1. **Cut the throat-clearing.** Delete openers that carry no information — "I just wanted to," "It's worth noting that," "In order to," "There is/are … that." The sentence almost always starts better one clause in.
2. **Find the verb.** Prefer a strong verb to a nominalization plus a weak one: "decide" over "make a decision," "because" over "due to the fact that." Buried verbs are where energy leaks.
3. **De-hedge.** Strike reflexive qualifiers — "very, quite, really, just, basically, actually, essentially, simply" — that weaken without adding. (This is a *prose* concern: cutting filler. Whether a remaining qualifier states an honest bound is `copy-truth`'s call, not this pairing's.)
4. **Shorten the long pole.** Find the longest sentence; if it holds two ideas, split it. Vary length deliberately — a short sentence after two long ones lands. Uniform length, long or short, drones.
5. **Parallelize the lists.** Make every bullet in a set share an opening part of speech and grammatical shape (#8).
6. **Resolve every pronoun.** Each "it/this/that/they" gets exactly one unambiguous antecedent, or gets replaced with the noun (#7).
7. **Read it aloud.** The ear catches what the eye skims — a missing rhythm, a tangled clause, an accidental rhyme, a sentence with no breath in it. If you stumble reading it, the reader will.

### Voice without slop

"Snazzy," "punchy," "with personality" is rhythm and concreteness, not exclamation marks and adjectives. The levers: concrete over abstract ("text the customer back" beats "facilitate communication"); a real actor doing a real verb beats an abstraction in the subject slot; sentence-length variety creates pace; a confident period beats a nervous "!". Avoid the tells of machine-flat prose — the rule-of-three everything, "it's not just X, it's Y," "seamless / robust / powerful / elevate / unlock," and the relentless even rhythm where no sentence is shorter than nine words. Specificity is the whole game: the detail that proves you were actually there ("every screen got better because someone in the field said something") does more than any pile of adjectives.

### Mechanics that silently cost credibility

The errors a reader won't name but will feel: its/it's, your/you're, lead/led, comma splices, subject-verb disagreement across a long subject, dangling modifiers ("Walking in, the room was dark"), inconsistent em-dash and quote style, and a heading-capitalization scheme that changes halfway down. None change the meaning; all change whether the reader trusts the writer with the meaning. Run the mechanical sweep even on a "quick" send — the quick sends are the ones read most literally.


<!-- ───── pairing: cloudflare-pages-workers ───── -->
<!-- GENERATED-BY: pairings/bundle.sh -->

# Pairing: Cloudflare Pages & Workers

- **Pairs with:** Hosting web applications on Cloudflare's edge — Cloudflare Pages and the Workers runtime, including `wrangler` (project config, deploy, secrets), the Workers execution model (V8 isolates, not Node), bindings (D1, KV, R2, Queues, Durable Objects, service bindings, env vars/secrets), `@sveltejs/adapter-cloudflare`, and the edge-platform services a site composes with (Cloudflare Web Analytics, Turnstile, the CDN/cache, TLS). Covers the *hosting and runtime* layer: how the edge execution model shapes application design. Out of scope: the application framework itself (SvelteKit/Svelte have their own pairings), and Cloudflare's network-security products (WAF, Zero Trust, Access) except where a site directly depends on them.
- **Sources:** Cloudflare Workers docs (developers.cloudflare.com/workers), Cloudflare Pages docs (developers.cloudflare.com/pages), `wrangler` CLI reference, `@sveltejs/adapter-cloudflare` docs, Workers runtime model (`workerd`) and limits documentation, Cloudflare Web Analytics and Turnstile docs; opinion.
- **Date:** 2026-06-27
- **Touches principles:** #1, #2, #4, #5, #7, #8, #9, #10, #13

Cloudflare's edge is a managed runtime, not a server you rent. Your code runs as a V8 *isolate* spun up near the visitor in one of hundreds of locations — it boots in single-digit milliseconds, holds no durable memory between requests, runs under a CPU-time budget, and has no filesystem and no Node.js standard library unless you opt in. The platform owns TLS, the CDN, routing, DNS, static-asset serving, and a menu of *bindings* (D1, KV, R2, Queues, Durable Objects) that are the only sanctioned places to keep state. Your code owns request handling and business logic. The line between "the platform does this" and "my code does this" is sharper than on a classic VM host, and the most common failures come from writing Node-server code — in-memory caches, a local SQLite file, a background timer — that the isolate model silently breaks. This pairing maps the principles onto that boundary.

## Per-principle commentary

### #1 — Vision down to detail

Decide the compute and project model before writing `wrangler` config. Cloudflare offers more than one shape, and the choice drives routing, bindings, build output, and deploy mechanics:

- **Pages (static + Pages Functions).** A site project: a static-asset build plus optional serverless functions (`functions/` directory, or a framework adapter's server output). Built for sites with a frontend. Deploys via `wrangler pages deploy <dir>` (direct-upload) or Cloudflare's git integration. This is the canonical choice for a marketing/content site with a few server routes (a contact form action, an API endpoint).
- **Workers (standalone).** A single Worker script with no implied static frontend — an API, a webhook handler, a cron job, a proxy. Deploys via `wrangler deploy`. Static assets can now be attached to a Worker (the "Workers with static assets" model), which is where Cloudflare is steering new full-stack apps; Pages remains the mature path for adapter-based site frameworks.
- **Framework adapter on Pages.** SvelteKit (`adapter-cloudflare`), Next, Astro, etc. compile to a Pages-compatible output (`.svelte-kit/cloudflare`) — static prerendered pages plus a Worker that runs SSR, `load`, and form actions. The adapter, not you, decides what is prerendered vs. server-rendered; your `prerender`/`ssr` page options are the vision decision that shapes it.

Picking "Cloudflare" without choosing Pages-vs-Workers and direct-upload-vs-git-integration is a deferred vision decision. Direct-upload (`wrangler pages deploy` from CI) and git-integration (Cloudflare builds on push) are mutually-exclusive deploy models for the same Pages project — choose one up front, because mixing them produces two build pipelines with different env handling and different rollback stories.

### #2 — Upfront anticipation over reactive patching

Enumerate the runtime states the edge imposes. Each differs from a long-lived Node server, and meeting them in production is reactive patching:

- **Cold isolate.** A request may hit a location with no warm isolate; the platform boots one in ~5ms. There is no 20-second warm-up window and no "Always On" to buy — boot is cheap *because* you get no durable per-isolate state to initialize. Code that assumes an expensive one-time setup amortized across requests (a warmed cache, a loaded model, a connection pool) is mismodeling the runtime: that work re-runs per cold isolate, in hundreds of locations.
- **Per-request memory only.** Global/module-scope variables persist *within* one isolate while it's alive, but isolates are created and destroyed unpredictably and exist in many locations at once. There is no single process whose memory is the source of truth. Anything that must survive a request must live in a binding (KV, D1, R2, Durable Object), not a module global.
- **CPU-time budget, not wall-clock.** A request is billed and bounded by *CPU* time (default 30s on paid; effectively far less on free, and async I/O wait does not count against it). Long synchronous loops trip the limit; waiting on a `fetch` does not. Design heavy work as I/O-bound or push it to a Queue / cron Worker.
- **Eventual consistency of KV.** Workers KV is read-optimized and eventually consistent — a write may take up to ~60s to be visible globally, and reads are cached at the edge. Logic that writes then immediately reads-back expecting its own write is a race. Use D1 (strongly consistent within its region) or a Durable Object when read-after-write matters.
- **Deploy propagation.** A `wrangler` deploy returns after the upload/build, but the new version propagates across the network over seconds. For Pages, the deployment also has a preview URL before it's promoted to production. "Deploy command exited 0" is not "the new version is live everywhere" (see #13).
- **Subrequest fan-out limits.** A single invocation can make a bounded number of `fetch` subrequests (50 on free, 1000 on paid) and bounded simultaneous open connections. A handler that fans out to many downstreams must respect the cap rather than discover it under load.

### #4 — Engines handle every possibility

The Cloudflare platform is the engine. Its range — the things you must *not* re-implement in app code:

- **TLS and certificates.** Terminated at the edge, including free managed certs for custom domains and automatic renewal. Your code never touches TLS. The original scheme arrives via standard headers; the request reaching your handler is already HTTPS-fronted.
- **CDN, caching, and static-asset serving.** Static files from a Pages build are served from the edge cache directly — your Worker code does not run for them. The `Cache` API and cache-control headers let you participate in caching for dynamic responses. Don't build an app-level static-file server; the platform owns asset delivery.
- **Routing.** Pages maps URLs to prerendered assets and to the SSR Worker; custom domains and routes are platform config. `_redirects` and `_headers` files (Pages) declare redirects and response headers declaratively.
- **Bindings — the sanctioned state and capability surface.** Declared in `wrangler.jsonc`/`wrangler.toml` and injected into the runtime (reached in SvelteKit via `platform.env`):
  - **D1** — SQLite at the edge, strongly consistent, the default for relational app data.
  - **KV** — eventually-consistent key-value, read-optimized, for config/flags/cache.
  - **R2** — S3-compatible object storage, no egress fees, for blobs/uploads.
  - **Queues** — async message passing for deferred/background work.
  - **Durable Objects** — single-threaded, strongly-consistent stateful coordinators; the engine for per-entity state, WebSocket hibernation, and real-time coordination.
  - **Service bindings** — call another Worker in-process without a network hop.
  - **Secrets and vars** — `secret`s (encrypted, set out-of-band) and plaintext `vars`.
- **Cron triggers.** Scheduled invocation (`scheduled` handler) for periodic work — no external scheduler needed.
- **Composable edge services.** Turnstile (privacy-preserving CAPTCHA), Cloudflare Web Analytics (server-side, cookieless page analytics via a beacon), Images, Stream — each a platform capability a site opts into rather than builds.

Know which of these your app uses and which it ignores (#4: each site opts into a subset; unused capabilities degrade silently). An app that ships its own in-memory rate-limiter, its own static-file route, or its own analytics pixel when the platform provides each is duplicating the engine's range — a coupling violation.

### #5 — Instructions don't extend engines

`wrangler` config, deploy commands, and CI workflows are instructions that *sequence* the platform's capabilities. `wrangler.jsonc` declares which bindings exist, which compatibility flags are on, and what the build output is; `wrangler pages deploy` / `wrangler deploy` ships it; `wrangler secret put` injects a secret. None of these extend what the runtime can do.

When an instruction needs something the runtime doesn't offer — a Node-only API, a persistent local file, a raw long-lived process — the answer is not a polyfill hack in the deploy script. It is either the right binding (R2 for the "file", a Durable Object for the "process", Queues for the "background job") or the honest conclusion that the workload doesn't belong on Workers. `nodejs_compat` is a real compatibility flag that brings a curated subset of Node APIs into the runtime; it is the *engine* opting to expose more surface, not an instruction reaching past the engine. Reaching for it should be a deliberate "the runtime now supports this" decision recorded in `wrangler` config, not a per-script workaround.

The split between **build-time** and **runtime** environment access is where this principle bites in practice. In a SvelteKit-on-Cloudflare app: `$env/static/*` and `$env/dynamic/*` read build/deploy-time environment; **bindings** (D1, KV, secrets) are reached only at request time via `platform.env`. Trying to read a D1 binding at module top-level (build time) is asking the instruction layer for something only the runtime provides — it will be undefined. Keep build-time config and runtime bindings on their two axes.

### #7 — Clean boundaries, owned state

The boundary between what the platform owns and what the app owns:

**Cloudflare owns:**
- TLS termination, certificate issuance/renewal, the custom domain.
- The CDN, edge cache, and static-asset delivery.
- Routing, DNS, redirects/headers declared in platform config.
- Isolate lifecycle — creation, destruction, placement, scaling. There is nothing to scale-configure.
- The durable state stores (D1, KV, R2, Durable Objects) and their consistency guarantees.
- Secret storage and injection.

**Your app owns:**
- Request handling and business logic.
- All durable state — *placed in a binding*, never in isolate memory.
- Validation and authorization of every request (the edge authenticates nothing by default).
- Idempotency and consistency choices: which store, and whether read-after-write matters.
- Graceful handling of binding failures (a D1 query can fail; a KV read can miss).

**Boundary violations to watch for:**
- **In-memory state as a source of truth.** A module-level cache, counter, or session map. Isolates are ephemeral and plural — the value is per-isolate, per-location, and lost on recycle. Use KV/D1/a Durable Object.
- **Local-filesystem persistence.** There is no writable filesystem. A bundled SQLite file, a `fs.writeFile`, an upload saved to disk — all wrong. R2 is the object store; D1 is the database.
- **In-process background work.** A `setInterval`, a fire-and-forget promise meant to outlive the response. The isolate may be frozen or killed after the response is returned (`ctx.waitUntil` extends it briefly, but it is not a job runner). Background work belongs in Queues or a cron Worker.
- **Long-lived connections held in a global.** A database socket pool stashed at module scope assumes one durable process. Use HTTP-based / edge-native data access (D1, or a driver designed for serverless), or a Durable Object when a connection genuinely must persist.

### #8 — Architectural consistency

Once a pattern is chosen, hold it across the project:

- **One deploy model per project.** Direct-upload (`wrangler pages deploy` from CI) *or* Cloudflare git-integration — not both. Two paths mean two build environments, two places env vars live, and two rollback stories.
- **One config file shape.** `wrangler.jsonc` (or `.toml`) is the single declared source for bindings, compatibility date/flags, and build output. Don't set the same binding in the dashboard *and* the file — the dashboard becomes invisible drift. Declare in the file; treat the dashboard as read-only for committed config.
- **Secrets vs. vars, consistently.** `vars` in `wrangler.jsonc` are plaintext and committed — fine for public, build-time values (e.g. a public analytics token). Real secrets (`TURNSTILE_SECRET_KEY`, mail credentials, API tokens) go through `wrangler secret put` / the dashboard's encrypted secrets / CI secret store — never as a committed `var`. Pick the right bucket per value and never mix.
- **Env access pattern.** Choose how the app reads configuration — `$env/static` for inlined build-time, `$env/dynamic` for deploy-time, `platform.env` for runtime bindings — and apply it consistently by category rather than reaching for whichever works in the moment.
- **`compatibility_date` discipline.** Set it deliberately and bump it intentionally; it pins runtime behavior. Drifting or copy-pasted dates across a fleet make "same runtime" an illusion.

### #9 — Honest bounds over universal claims

The edge runtime has real limits that shape design — name them, don't discover them:

- **CPU time.** Bounded per request (free tiers are tight; paid default ~30s CPU, configurable). I/O wait is excluded, but CPU-bound work (crypto in a loop, large synchronous parsing) can trip it.
- **Memory.** ~128 MB per isolate. Large in-memory buffers (loading a whole file, a big in-RAM dataset) don't fit. Stream instead.
- **Subrequests.** 50 (free) / 1000 (paid) `fetch` calls per invocation; bounded simultaneous connections.
- **Request/response size and bundle size.** Worker script bundle is size-capped (single-digit MB compressed, tier-dependent); request body limits are plan-dependent. Large uploads go to R2 via presigned/multipart paths, not through the Worker's memory.
- **No Node standard library by default.** `fs`, `net`, `child_process`, raw threads — absent. `nodejs_compat` adds a curated subset (e.g. parts of `crypto`, `buffer`, `stream`); it is not "Node on the edge." Verify an API is actually supported rather than assuming.
- **KV is eventually consistent.** Up to ~60s global write propagation; reads edge-cached. Not a database for read-after-write.
- **D1 limits.** Database size, query, and rows-read limits per plan; it is SQLite semantics, not Postgres — no extensions, limited concurrency.
- **No raw inbound TCP/UDP.** Inbound is HTTP(S)/WebSocket. (Outbound TCP via `connect()` exists but is a deliberate, bounded capability.) A protocol broker is the wrong fit.
- **WebSockets need Durable Objects.** A plain Worker can accept a WebSocket but has no durable place to coordinate connections; real-time fan-out is a Durable Object job.

### #10 — Explicit exclusions over vague coverage

When scoping a Cloudflare deployment, name what the platform does *not* give you:

- **No persistent local compute state.** No process that stays up, no in-RAM source of truth, no local disk. If the design needs any of those, the binding (or a different platform) is the answer — say so up front rather than implying "it just runs like a server."
- **No built-in user authentication.** The edge does not authenticate requests by default (unlike a PaaS with built-in auth). Cloudflare Access exists as a separate Zero Trust product; absent it, the app owns all auth. Don't assume an identity header is present.
- **No automatic background jobs from request code.** Deferred work is Queues or cron triggers — an explicit binding, not a promise left running after the response.
- **Static IP / egress allowlisting** is not a default; downstreams that require a fixed source IP need a deliberate Cloudflare networking feature, not an app config.
- **Vendor-specific bindings are Cloudflare-shaped.** D1, KV, R2, Durable Objects are not drop-in Postgres/Redis/S3/processes. Choosing them is choosing Cloudflare's semantics and limits; name that as a portability cost when it's a real constraint (revisit if multi-cloud becomes a requirement).

### #13 — Done means demonstrable, not reported

A deploy to Cloudflare is done when:

1. The deploy command (`wrangler pages deploy` / `wrangler deploy`) completed without error — the artifact was accepted. This is step 1, not the finish line.
2. The deployment is **promoted to production** (for Pages, a direct-upload to the production branch, or the preview deployment explicitly promoted), not sitting on a preview URL.
3. The **production custom domain** serves the new version — fetch the real URL and observe the change, not just the `*.pages.dev` deployment URL.
4. **Bindings resolve at runtime** — a route that reads D1/KV/a secret returns real data, proving the binding is wired, not just declared. A deploy can succeed with a binding misnamed in `wrangler.jsonc`; only a request exercising it proves the wiring.
5. For a fleet under a conformance check (e.g. a sentinel register): the public surface the check probes — HTTPS, headers/CSP, sitemap, structured data — is live on the production domain.

"`wrangler` exited 0" means the upload/build was accepted. It does not mean the new version is promoted, that DNS/routes point at it, or that a single binding actually resolves. A CI step that reports success on the command's exit code is reporting intent; fetch the production URL and exercise a binding-backed route to demonstrate outcome.

## Addenda

### `wrangler.jsonc` as the declared engine surface

`wrangler.jsonc` (JSONC — JSON with comments — is the modern default; `.toml` is equivalent) is the single declared description of *what the platform must provision and inject*. Treat it as the binding contract, not a scratch file. Typical shape for a Pages site with an adapter:

```jsonc
{
  "name": "my-site",
  "compatibility_date": "2026-06-01",
  "compatibility_flags": ["nodejs_compat"],
  "pages_build_output_dir": ".svelte-kit/cloudflare",
  "vars": {
    "PUBLIC_CF_ANALYTICS_TOKEN": "…"   // public, build-time-safe — fine to commit
  },
  "d1_databases": [
    { "binding": "DB", "database_name": "site", "database_id": "…" }
  ]
  // secrets (TURNSTILE_SECRET_KEY, mail creds) are NOT here —
  // set via `wrangler secret put` / dashboard / CI secret store
}
```

Two rules ride on this file: **bindings declared here are reached at runtime** (in SvelteKit, `event.platform.env.DB`), never at build/module-init time; and **secrets never live here** — only non-secret `vars` do. The `binding` name in this file is the exact identifier the runtime exposes; a typo here surfaces only as an undefined binding at request time, which is why #13 insists on exercising a binding-backed route before calling a deploy done.

### SvelteKit on Cloudflare (`adapter-cloudflare`)

`@sveltejs/adapter-cloudflare` compiles a SvelteKit app into a Pages-compatible output: prerendered static pages plus a Worker that runs SSR, `load` functions, and `+page.server.ts` form actions. Practical seams:

- **`platform.env` is the binding accessor.** `load`, actions, and endpoints receive `event.platform?.env` — that's where D1/KV/R2/secrets live. It is optional-typed because it's absent in some dev/prerender contexts; handle the undefined case.
- **`PUBLIC_`-prefixed env** is exposed to the client; everything else stays server-only. A public Cloudflare Web Analytics token is fine as a `PUBLIC_` var; a Turnstile *secret* or mail credential is not.
- **Prerender what's static.** `export const prerender = true` on content pages emits pure static assets served from the edge cache with zero Worker invocation — faster and cheaper. Reserve SSR for pages that genuinely need per-request work (a form action's response). The prerender/ssr decision is the #1 vision call that determines how much of the site even touches the Worker.
- **Form actions are the server surface.** A contact/lead form posts to a `+page.server.ts` action that runs in the Worker — the right place to verify Turnstile and send mail, reading both secrets from `platform.env`.

### Cloudflare Web Analytics

Server-side, cookieless, privacy-preserving page analytics. Integration is a small beacon snippet injected once (commonly in the root layout) carrying a site token:

```html
<script defer src="https://static.cloudflareinsights.com/beacon.min.js"
        data-cf-beacon='{"token":"<PUBLIC_CF_ANALYTICS_TOKEN>"}'></script>
```

The token is public by design — ship it as a `PUBLIC_`/`vars` value, not a secret. Because it loads a third-party script, the site's **Content-Security-Policy must allowlist `https://static.cloudflareinsights.com`** in `script-src` (and the beacon's report endpoint in `connect-src`). A hashed/strict CSP that forgets this silently drops analytics. This is the canonical example of an edge service the platform owns (#4): don't build a homemade pageview pixel when the platform ships a cookieless one.

### Turnstile (bot mitigation for forms)

Turnstile is Cloudflare's privacy-preserving CAPTCHA alternative. It has a **public side** (a widget script + sitekey rendered in the form) and a **secret side** (`TURNSTILE_SECRET_KEY`, used server-side to verify the token against Cloudflare's `siteverify` endpoint). The split maps exactly onto #8's secrets-vs-vars rule: the sitekey is a public `var`; the secret key is a `wrangler secret`. Verification happens in the server form action *before* trusting the submission — the widget passing on the client proves nothing on its own (the server-side `siteverify` call is the real gate). CSP must allowlist `https://challenges.cloudflare.com` for the widget to load.

### Local development and parity

`wrangler dev` (and framework dev servers that invoke it under the hood) run the app against `workerd` — the *actual* Workers runtime — with local emulations of bindings (a local D1 SQLite, local KV, etc.). This is meaningfully higher-fidelity than a Node dev server: code that works in `wrangler dev` is far likelier to work deployed, because the runtime is the same. The remaining parity gaps to watch: KV's eventual consistency isn't reproduced locally (local reads are immediate), secret values differ between local `.dev.vars` and deployed secrets, and `compatibility_date`/`flags` must match what production uses or a locally-passing API may be absent in prod. Develop against `wrangler dev`, not a plain Node server, to keep the runtime honest.




---

# Scope Template

The populated scope file must follow this structure exactly.
Section headings and ordering are part of the contract. Fill
placeholders with the user's answers, not the template's
bracketed instructions.

# Project Scope: [Project Name]

## Overview
[2-3 sentences. What this project is, who it's for, what success looks like.]

## Pairings (optional)
[Domain specializations from `pairings/` that color the canonical principles 
in for a specific domain (language, framework, methodology, skill). Additive 
only — cannot contradict principles. List each by name as it appears in 
`pairings/`. Leave the section empty (or remove it) if none apply.]

- [pairing-name] — [one-line note on why this pairing is selected]
- [pairing-name] — [reason]

## Principles, in priority order
[These extend or override PERSONAL-PRINCIPLES.md for this specific project. 
If a personal principle doesn't fit this project, say so explicitly. If a 
project-specific principle is needed, list it.]

1. [Principle name]. [Brief statement.]
2. [Principle name]. [Brief statement.]
3. [...]

[When principles conflict, prioritize by number. Flag severe conflicts.]

## Hard constraints
[Things that must always be true in this project. Violations are bugs.]

- [Constraint]
- [Constraint]

## Capabilities currently in scope (optional but recommended)
[Authoritative inventory of what this project IS supposed to do. Anything 
not on this list is a *review trigger* — re-check it against the decision 
register and surface it — NOT a delete warrant (Principle 18). This list 
can lag `main/` (#15), so its silence is a prompt to look, never an 
authorization to remove. Skip this section for small or early-stage 
projects; add it once the project has enough surface area that scope 
drift becomes a risk.]

### [Category]
- [Capability]
- [Capability]

### Planned but not yet specified (preserve, do not extend)
- **[Capability].** [Why preserved without active development.]

## Out of scope
[Capabilities explicitly excluded from this version of the project. Adding 
anything from this list requires a check-in.]

- [Excluded capability] — [why excluded, and what would be needed to add it later]
- [Excluded capability] — [reason]

## Removal review (optional, pairs with "Capabilities currently in scope")
[If the in-scope inventory exists, this section governs how the agent 
treats things that don't map to it. Skip if no in-scope inventory.]

Anything in the codebase that does not map to a capability in 
"Capabilities currently in scope" above is a **review trigger, not a 
delete warrant** (Principle 18). The default for unmapped surface is 
**stop and surface** — re-check it against the decision register (it may 
be load-bearing structure the inventory simply hasn't caught up to, #15), 
and raise it. Removal of anything a decision cites requires citing the 
superseding/amending decision — absence from this list is never the 
authorization. Removal is never the default action.

## Criticality rubric

What counts as Critical, Material, or Minor for THIS project. The operating 
manual uses this to decide whether to hard-stop or continue on parallel work 
when a check-in is filed.

**Critical** (hard-stop, do not touch related work):
- [Type of change]
- [Type of change]

**Material** (continue on parallel work, avoid downstream):
- [Type of change]
- [Type of change]

**Minor** (continue freely):
- [Type of change]
- [Type of change]

## Default check-in mode
[Usually: hybrid per the operating manual. Override only if this project needs 
something different, like always-hard-stop or always-continue.]

## Active milestone
[If the project uses `.agent/ROADMAP.md` (D-0050), the active milestone, its
per-task done-when, backlog, and shipped history live there — keep this a
one-line pointer and don't duplicate the DoD here. Otherwise fill in below.]

**Milestone:** [name/number — or "see ROADMAP `## Active`"]
**Definition of done:** [observable, verifiable criteria — or per-task in ROADMAP]
**Active blockers:** [if any]

## Project-specific glossary (optional)
[If the project has domain terms that need precise meaning, define them here. 
This is the canonical reference — when in doubt, terms mean what this glossary 
says they mean.]

- **[Term]**: [definition]
- **[Term]**: [definition]
---

# Interview

Conduct this interview one section at a time. For each section:

1. Ask the questions listed.
2. Wait for the user's answer. Ask one follow-up if the answer is
   ambiguous — do not fan out into branching what-ifs (one good
   question, not five hedging ones).
3. Summarize back what you heard in 1–2 sentences. Confirm before
   moving on.
4. Move to the next section.

Sections marked **(optional)** should be asked only if the user
signals they want them, or if the project's surface area justifies
them. Sections marked **(skip if covered by `--include`)** should be
skipped when included context already answers them.

Push back when answers are vague. Defaults are valid answers if the
user explicitly says "default" — record that and move on.

---

## 0. Prior context — read this first

Before asking anything, check for `.agent/REPORTS/project-brief.md`. If it
exists, it carries the vision, stack, surface, methodology, and constraints
captured during the vision phase (Phase 0) — read it in full. Use it to
*pre-fill and confirm* the sections below, not to re-elicit from a blank
slate: state back what the brief already establishes, ask the user to
confirm or correct, and spend new questions only on what the brief doesn't
cover (milestone, definition of done, out of scope, criticality rubric).
Re-asking from scratch what the brief already answers is the
information-loss this step exists to prevent (Principle 14). If no brief
exists, conduct the full interview below.

## 1. Overview

- In 2–3 sentences, what is this project? Who is it for, and what does
  success look like? *(If a project brief exists, confirm its Vision
  rather than re-asking.)*
- Is this a greenfield start, or an existing codebase being adopted
  into this system?

## 2. Pairings (skip if covered by `--include`)

If no pairings bundle was included, ask:

- Which `pairings/` (if any) apply to this project? Name them.
- For each: one line on why it's selected.

If a bundle was included, the user has already chosen — list the
pairing names you see in the additional context and confirm them as
the selection.

## 3. Principles, in priority order

The canonical principles in `personal/PERSONAL-PRINCIPLES.md` apply by
default. Ask:

- Are there any canonical principles that do **not** fit this project,
  and why? (Overrides become numbered project principles that
  explicitly de-prioritize a canonical one — surface the conflict per
  Principle 12, don't bury it.)
- Are there any project-specific principles to add? (E.g., "ship daily
  over polish" for an MVP, "no third-party deps" for embedded, "every
  change ships with a test" for TDD.)

If the user says "defaults are fine," record that as the priority
list — no overrides needed.

## 4. Hard constraints

Hard constraints are things that must always be true. Violations are
bugs, not preferences. Ask:

- What are the immovable constraints? (Performance ceilings, security
  requirements, regulatory limits, hardware budgets, dependency locks,
  language/runtime constraints, deployment targets.)
- For each: what happens if it's violated? If the answer is "nothing
  serious" — it's a preference, not a hard constraint. Recategorize.

## 5. Active milestone & definition of done

Per Principle 13 — done means demonstrable, not reported. Ask:

- What is the current milestone? Give it a short name or number.
- What is the **observable, verifiable** definition of done? (Which
  files exist with what content? What behavior is demonstrated? What
  can the user do after?)
- Any active blockers right now?

If the definition of done is vague ("ship the feature"), push back:
what specifically demonstrates it shipped?

## 6. Out of scope

Per Principles 9 and 10 — honest bounds, explicit exclusions. Ask:

- What capabilities are explicitly **not** part of this version's
  scope? Name 2–5.
- For each: why excluded, and what would be needed to add it later?

This is one of the most load-bearing sections. If the user struggles,
prompt with examples adjacent to their stated scope: "Would X be in
scope? Y? Z?"

## 7. Criticality rubric

This is how the agent decides when to hard-stop vs. continue. Ask:

- What kinds of changes are **Critical** (hard-stop, do not touch
  related work) for this project?
- What kinds are **Material** (continue parallel work, avoid
  downstream)?
- What kinds are **Minor** (continue freely)?

Defaults to suggest if the user is unsure: scope/architecture/data-shape
changes are usually Critical; refactors in well-bounded modules are
usually Material; cosmetic edits, comment fixes, and additive tests are
usually Minor.

## 8. Default check-in mode

Almost always "hybrid" per the operating manual. Ask once:

- Default to hybrid check-ins (mix per criticality), or override to
  always-hard-stop / always-continue?

If "default," set hybrid and move on.

## 9. In-scope capabilities (optional)

Skip for small or early-stage projects. Only ask if the project has
enough surface area that scope drift is a real risk. Ask:

- What capabilities does the project currently have? Group by category
  if useful.
- Are any "planned but not yet specified" — preserve, do not extend?

## 10. Removal authority (optional, pairs with §9)

Only if §9 was populated. Ask:

- Should anything not in the in-scope list be treated as a candidate
  for removal? (Default: yes, per the template's standing language.)

## 11. Project-specific glossary (optional)

Ask:

- Are there domain terms that need precise meaning in this project?
  List them.

If none, skip the section.

---

# Output format

After the interview, produce a single markdown code block containing
the populated scope file. Use the exact section headings from the
**Scope Template**. Fill placeholders with the user's answers, not the
template's bracketed instructions. Sections marked **(optional)** that
were skipped should be **omitted entirely** — do not leave empty
sections with placeholder text.

Hand the populated scope file to the user with these instructions:

1. Review it. Edit anything that drifted from what you said.
2. Save to `.agent/PROJECT-SCOPE.md` in the target project.
3. Run the publish step to produce the project's `CLAUDE.md`:
   ```bash
   cd <target-project>
   ~/Projects/dotagent/publish/publish.sh claude-md \
     --include <(~/Projects/dotagent/pairings/bundle.sh)
   ```

Do not write the file yourself. The human commits scope decisions
(Principle 11).
