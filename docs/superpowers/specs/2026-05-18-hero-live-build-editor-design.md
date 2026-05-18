# Hero "Live Build" Editor — Design Spec

**Date:** 2026-05-18
**Status:** Approved (Option A from brainstorm)
**Author:** IDweb / Ilyas

---

## Problem

The current homepage hero (`src/components/sections/hero-section.tsx`) renders three small floating stat cards (Google rating, customer satisfaction, zero binding) in its right column. Visually they feel empty and disconnected — they read as decoration rather than evidence. For a web-development agency, the hero should *prove* the value prop on first paint, not just claim it.

## Goal

Replace the right-column stat-card cluster with a single, self-referential demonstration of IDweb's craft: a tilted macOS-style code editor that types real Next.js JSX in front of the visitor, with a synced mini-preview that renders the typed code, and a status bar that completes a Lighthouse build live. The hero itself becomes the product demo.

Non-goals:
- No new dependencies (no Monaco, no Prism, no Framer Motion bloat).
- No headline rework (existing serif headline + dual CTA stay).
- Not a real code editor — purely visual.

## Architecture

### Files changed

| File | Change |
|------|--------|
| `src/components/sections/hero-section.tsx` | Replace right column with `<LiveBuildEditor />`; remove `id` watermark + `TRUST_SIGNALS` rendering; add live-status dot to eyebrow. |
| `src/components/ui/live-build-editor.tsx` | **NEW** — the editor component (~250 lines incl. tokens). |
| `src/lib/content/hero-build-scenes.ts` | **NEW** — three "scenes" of typed code + preview metadata. |
| `src/app/globals.css` | Add caret blink, status-dot pulse, editor enter, and reduced-motion overrides (~40 lines). |
| `src/lib/content/homepage.ts` | Delete `TRUST_SIGNALS` export (no longer referenced anywhere). |
| `src/types/index.ts` (or wherever `TrustSignal` is defined) | Delete `TrustSignal` type if no other consumer. |

Component boundaries:
- `LiveBuildEditor` is the public component. It owns animation state and reads scenes from `hero-build-scenes.ts`.
- Scenes are pure data — strings + token arrays + preview slot descriptors. No JSX in the content file.
- The mini-preview inside the editor is rendered by `LiveBuildEditor` itself based on scene metadata (it does not import or render real page components — it draws simplified visual proxies).

### Data shape (`hero-build-scenes.ts`)

```ts
type Token = { text: string; kind: "keyword" | "tag" | "attr" | "string" | "comment" | "punct" | "plain" };
type Line = { tokens: Token[]; indent: number; revealsPreview?: PreviewSlot };
type PreviewSlot = "headline" | "subtitle" | "cta" | "image" | "card" | "metric";

type Scene = {
  id: "hero" | "metadata" | "pricing";
  filename: string;       // shown in the tab + title bar
  language: "tsx" | "ts";
  lines: Line[];
  preview: {
    chrome: { url: string; title: string };
    layout: "site-hero" | "google-snippet" | "pricing-card";
  };
};

export const HERO_BUILD_SCENES: Scene[] = [/* 3 scenes */];
```

Three scenes (rotate in order):
1. **`hero`** — types ~10 lines of JSX building a hero with `<h1>`, `<p>`, `<Button>`. Preview shows: black background, yellow headline, body text, yellow CTA pill.
2. **`metadata`** — types ~9 lines of Next.js `export const metadata = { title, description, ... }`. Preview shows: a Google search snippet with title + URL + meta description rendering.
3. **`pricing`** — types ~10 lines of a TypeScript pricing-tier object. Preview shows: a pricing card with title, big price, three feature dots.

### Animation engine

Single `requestAnimationFrame` loop in `LiveBuildEditor`. State machine:

```
IDLE → TYPING → COMPILING → BUILT → HOLDING → FADING → (next scene) IDLE
```

- **TYPING**: char-by-char insertion. Base speed ~38ms/char. Random ±15ms jitter. Pause +180ms after `;` `>` `,`. Pause +60ms after newline. Preview slot fades in (200ms) the frame a line with `revealsPreview` completes.
- **COMPILING**: 400ms, status bar shows `Compiling...` with spinner glyph.
- **BUILT**: status flips to `Compiled in 312ms · Lighthouse <count>`. Number counts up from 0 → 98 over 600ms, eased.
- **HOLDING**: 1800ms hold. After 1000ms, a `⌘S` pill flashes once.
- **FADING**: editor body + preview cross-fade (350ms) into the next scene's initial state.

Loop is paused when `document.visibilityState !== "visible"`. Reset to scene 0 on resume.

### Visual breakdown

Editor window (right column, 100% width up to 520px):
- Outer container: `rounded-2xl border border-white/[0.08] bg-[#0d0d0f] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.04)]`
- Transform: `rotateY(-6deg) rotateX(2deg) translateZ(0)`, perspective applied on parent.
- Title bar (32px): three traffic-light dots (#FF5F57 / #FEBC2E / #28C840 at 0.55 alpha), centered file path in 11px mono `text-white/40`.
- Tab strip (32px): three tabs, active = `bg-[#1a1a1d] text-white/90`, inactive = `text-white/35`. Tabs change with scene.
- Editor body (flex-1, min-height 260px): line numbers in `text-white/20` mono, code in JetBrains Mono. Caret = 1.5px solid yellow `#F4CE14`, blinks 1.1s.
- Preview pane (160px): separated by a `border-t border-white/[0.06]`. Inside: mini browser chrome (16px tall, 3 dots + URL pill), then layout-specific rendering.
- Status bar (28px): left = pulsing green `bg-emerald-400` 6px dot + `Compiled in 312ms`; right = `Lighthouse 98 · LCP 0.8s` in yellow + `TSX · UTF-8 · LF` in white/30.

Token colors (close to VS Code Dark+ but tuned to yellow accent):
- keyword: `#C586C0` (purple)
- tag: `#569CD6` (blue)
- attr: `#9CDCFE` (light blue)
- string: `#F4CE14` (brand yellow — replaces VS Code's amber, ties to brand)
- comment: `#6A737D` (slate)
- punct/plain: `#D4D4D4`

### Left column changes (`hero-section.tsx`)

Kept verbatim from current:
- Eyebrow row, headline, subhead, dual CTA, all `hero-entrance` animations and timing.

Modified:
- Eyebrow gets a 6px pulsing green dot prepended (mirrors editor's "live" status).
- Remove the giant `id` watermark `<span>` that lives behind the trust signals (lines 128–133 of current `hero-section.tsx`) — editor carries the visual mass.
- Replace the dotted-grid `<div>` (lines 26–34) with `<InteractiveGrid />` from `src/components/ui/interactive-grid.tsx`. Existing component, reuse as-is.

### Accessibility

- Editor wrapper: `role="img"` with `aria-label="Animasjon: kode for nettside skrives og kompileres"` (Norwegian).
- All inner content marked `aria-hidden="true"` so screen readers don't read syntax tokens.
- `prefers-reduced-motion: reduce`: the editor renders the *final* state of scene 0 — all code visible, preview filled, status bar showing the "compiled" state. No typing, no rAF loop, no transitions.
- Headline + CTA semantic structure unchanged.

### Responsive behavior

- `lg` and up (≥1024px): editor visible, grid is 7-col headline / 5-col editor (same proportions as current).
- Below `lg`: editor `hidden`, headline column spans full width. No fallback chip cluster — the page's existing `social-proof-bar` and pricing CTAs carry the trust load.
- Editor max-width 520px, max-height 480px, so it never dwarfs the headline on 13" laptops.

### Performance budget

- Initial paint: no JS animation runs before hydration. Editor mounts hydrated, then starts the rAF loop after a 250ms delay (so headline entrance finishes first).
- rAF loop work: ~one string concatenation + one state update per char (~38ms cadence). Bounded.
- No `setInterval`. No `setTimeout` chains for typing (only for state-machine phases, cleared on unmount).
- Editor body uses a single `<pre>` with content rebuilt each frame; preview slots use opacity transitions only (composited).
- No new fonts loaded — JetBrains Mono already in `var(--font-code)`.
- No new images, no SVG filters, no canvas, no WebGL.

## Error handling

Animation has no failure modes — it's deterministic with hard-coded data. The only edge cases:

- **Tab backgrounded mid-type**: rAF loop pauses (visibility listener). On resume, continue from current state.
- **`prefers-reduced-motion` toggled at runtime**: not supported — initial-load value wins. Acceptable; vanishingly rare.
- **JS disabled**: editor renders nothing (it's client-only `"use client"`). Headline + CTA still render server-side. Acceptable degradation.

## Testing

This is a visual change with no business logic. Verification via:

1. Browser preview at `localhost:3000` — verify typing animation runs, preview elements appear in sync, status bar counts up.
2. Resize to `<lg`: editor hidden, headline takes full width.
3. Throttle CPU to 4x in DevTools: animation stays smooth (no jank above 16ms frame budget).
4. Toggle `prefers-reduced-motion: reduce` in DevTools rendering panel: editor shows static final state.
5. `web-design-guidelines` audit pass on the implementation.

No unit tests — the animation timing is presentational and tested via eye.

## Out of scope

- Real syntax parsing (we hand-tokenize each scene)
- User interaction with the editor (no hover, no clicks, no copy)
- Real-time Web Vitals measurement (the "Lighthouse 98" is static — it's a brand statement, not telemetry)
- Mobile editor variant (intentionally hidden under `lg`)
