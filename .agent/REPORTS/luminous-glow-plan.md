# Luminous Glow — visual elevation plan

> Approved direction (2026-06-28). Keep the existing **layout + copy** (owner
> likes both); add the production/"glamour" layer that makes the fleet sites
> (font11a, risentech) feel premium, tuned **warm + serene** for a calm
> self-awareness-coach brand — NOT font11a's playful/electric energy.

## The gap (why it reads "Hugo / flat")

Current "Luminous Calm" is static and flat: one non-animated hero glow, plain
headline, hover-lift only, 10px nav blur, muted single amber. The siblings
breathe (animated aurora, grain, gradient text, scroll reveals, glow/glass).

## The seven moves (build on home first, then roll out)

1. **Animated warm aurora** — replace the single static `.hero-glow` with 2–3
   soft drifting blobs in amber/rose/gold (e.g. `oklch(0.82 0.13 75)`,
   `oklch(0.78 0.10 30)`, `oklch(0.85 0.09 95)`), `filter: blur(70px)`,
   `mix-blend-mode` for light/dark, each animated ~22–28s with translate+scale
   keyframes (`ease-in-out infinite alternate`). Behind hero (and optionally a
   fixed body-level version at low opacity).
2. **Film grain** — fixed full-page SVG `feTurbulence` noise (`baseFrequency
   ~0.85`, `numOctaves 2`) as a data-URI background, `opacity ~0.04`,
   `mix-blend-mode: overlay`, `pointer-events:none`, `z-index` above bg/below
   content. (CSP: data: img is allowed.)
3. **Gradient headline** — `background-clip:text` warm gradient on the H1 accent
   word(s) ("truth"), optional gentle `blur-in` on load
   (`@keyframes` from `blur(12px)`/opacity 0). Keep Fraunces.
4. **Scroll-reveal** — a small `use:reveal` Svelte action (IntersectionObserver):
   `opacity 0 → 1`, `translateY(24px) → 0`, `blur(6px) → 0`, ~700–800ms
   `cubic-bezier(0.16,1,0.3,1)`, staggered per section (60/120/180ms). Gate all
   of it behind `prefers-reduced-motion`.
5. **Glow + glass** — colored glow shadow on `.btn-primary`
   (`0 10px 30px oklch(0.80 0.13 75 / 0.4)`, grows on hover) and on cards;
   stronger nav blur (`blur(16px) saturate(160%)`); gradient hover borders on
   cards (`color-mix` accent).
6. **Token additions** — add `--accent-2` (rose/gold) for gradients, a glow
   shadow token, an aurora blob color set; bump shadow palette to 3–4 levels.
7. **Footer fix** — restyle the muted `© …` copyright + social row so nothing
   reads as plain unstyled text (the owner noticed this).

## Constraints

- CSP-safe (all CSS + bundled Svelte JS; grain = data: URI; no new external
  origins). `prefers-reduced-motion` disables aurora drift, blur-in, reveals.
- Keep it **calm**: slow, soft, warm — glamour through light and depth, not
  loud color or playful gimmicks. No cursor-glow/confetti/mascot.
- Don't touch layout structure or copy.

## Rollout

First pass = **home page only**, on a feature branch, deployed to a **preview**
branch URL (NOT production) so the owner reacts to the vibe before it rolls to
About / Services / Certifications / Contact / Nav / Footer globally.
