# Spline 3D Hero Section — Design Spec

## Overview

Replace the current two-column hero (headline + laptop carousel) with a full-viewport immersive hero where a Spline 3D scene fills the background and centered text overlays on top. Desktop-only 3D with a static gradient fallback on mobile.

## Decisions

| Decision | Choice |
|----------|--------|
| Layout | Full-background 3D, replaces carousel entirely |
| Text position | Centered (both axes) |
| Mobile strategy | Desktop-only Spline; static gradient fallback on mobile (<1024px) |
| Loading UX | Gradient placeholder → 0.5s crossfade when Spline ready |

## Spline Scene

- **URL:** `https://my.spline.design/claritystream-r57sGCeLIqTWMePyprTC76lE/`
- **Packages:** `@splinetool/react-spline`, `@splinetool/runtime`
- **Scene hosting:** Loaded from Spline's CDN (the URL above). No self-hosting needed — the runtime fetches the scene file from `prod.spline.design` at render time.
- **Bundle impact:** `@splinetool/runtime` is ~200-400KB gzipped. Mitigated by `next/dynamic` code splitting — the runtime only loads on desktop after initial page render.

## Layout & Structure

The hero section becomes a full-viewport container:

- **Height:** `100svh` (safe viewport height for mobile Safari compatibility)
- **Spline canvas:** Absolutely positioned, `inset: 0`, `z-index: 0`. The Spline runtime handles its own canvas sizing — it fills the container and scales the camera viewport proportionally (similar to `object-fit: cover`). No special handling needed for ultra-wide or tall viewports.
- **Readability overlay:** A dedicated `<div>` inside `hero-section.tsx`, positioned absolute with `inset: 0`, `z-index: 5`. Renders a radial gradient darker at center, transparent toward edges. Sits between the Spline canvas (z-0) and the text layer (z-10).
- **Text layer:** Flex-centered (both axes), `position: relative`, `z-index: 10`
- **Content:** Eyebrow, headline, subheadline, two CTA buttons — all centered, existing content from `homepage.ts`

## Component Architecture

```
hero-section.tsx            — 'use client', main section container
├── hero-fallback.tsx       — gradient placeholder background (z-0)
├── spline-scene.tsx        — client component, lazy Spline canvas (z-1)
├── readability overlay     — inline div, radial gradient (z-5)
└── text content            — centered text + CTAs (z-10)
```

`hero-section.tsx` retains `'use client'` because it uses Motion entrance animations on the text content and manages the `isSplineLoaded` state that coordinates the fallback-to-Spline crossfade.

### spline-scene.tsx

- `'use client'` directive (WebGL requires browser APIs)
- Uses `next/dynamic` with `{ ssr: false }` to lazy-load `@splinetool/react-spline` — this is the Next.js convention for code splitting and prevents SSR issues with the Spline runtime
- `useMediaQuery('(min-width: 1024px)')` gate — returns `false` during SSR and on mobile, preventing Spline JS from loading entirely
- **SSR hydration:** The `useMediaQuery` hook defaults to `false` on the server. On desktop clients, it flips to `true` after hydration, triggering Spline mount. This means: server renders the fallback gradient, client may add Spline on top. No layout shift because Spline mounts with `opacity: 0` behind the already-visible gradient.
- Mounts with `opacity: 0`, transitions to `opacity: 1` on `onLoad` callback via Motion's `animate`
- Calls `onLoaded` prop (from parent) so `hero-section.tsx` can fade out the fallback
- **Failure handling:** If Spline fails to load (network error, WebGL unsupported), the component stays at `opacity: 0`. No error UI shown.
- **WebGL context loss:** Listen for `webglcontextlost` on the canvas element. On context loss, set opacity back to 0 and call `onLoaded(false)` so the gradient fallback fades back in. The user never sees a black hole.
- Gets `aria-hidden="true"` — decorative, not interactive content

### hero-fallback.tsx

- Static gradient background matching current hero aesthetic
- `background: radial-gradient(ellipse at 50% 40%, rgba(244,206,20,0.08), #0F172A 70%)`
- Renders immediately with zero loading delay
- Controlled by `isSplineLoaded` prop from parent:
  - `false` → `opacity: 1` (visible)
  - `true` → `opacity: 0` via 0.5s Motion transition (hidden but still in DOM)
- The fallback remains in the DOM at `opacity: 0` on desktop so it can fade back in on WebGL context loss
- On mobile: stays permanently at `opacity: 1` as the hero background

### hero-section.tsx changes

- Retains `'use client'` for Motion animations and `isSplineLoaded` state
- Remove: `InteractiveGrid`, `LaptopFrame`, portfolio carousel logic, `PageSpeedBadge`, portfolio data imports, `currentProject` state, rotation timer
- Add: `SplineScene`, `HeroFallback`, and readability overlay div
- Text content restructured from left-aligned to centered layout
- Keep: Motion entrance animations for text (fade-in from bottom)
- New state: `const [isSplineLoaded, setIsSplineLoaded] = useState(false)`

## Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| ≥1024px (desktop/laptop) | Spline scene loads, crossfades in over gradient |
| <1024px (tablet/mobile) | No Spline component rendered, no JS loaded. Gradient fallback is the permanent background |

The 1024px threshold (Tailwind `lg:`) is used instead of 768px because WebGL is heavy — loading a full 3D scene on an iPad at 768px would hurt performance. The current codebase already uses `lg:` for major layout shifts.

Detection uses a `useMediaQuery` hook checking `(min-width: 1024px)`. The hook defaults to `false` during SSR to avoid hydration mismatches.

## Loading Sequence (Desktop)

1. **SSR / Frame 0:** Hero renders at full viewport height. `HeroFallback` gradient visible at `opacity: 1`. Text content renders immediately — no layout shift. `SplineScene` not rendered (hook returns `false` on server).
2. **Hydration:** `useMediaQuery` flips to `true` on desktop clients. `SplineScene` mounts. `next/dynamic` triggers async import of `@splinetool/react-spline`. Spline canvas initializes with `opacity: 0`.
3. **Spline ready:** `onLoad` callback fires. Parent sets `isSplineLoaded = true`. Motion animates Spline to `opacity: 1` and fallback to `opacity: 0` over 0.5s simultaneously.
4. **Failure path:** If Spline fails (network error, WebGL unsupported), `onLoad` never fires. Fallback stays at `opacity: 1`. No error UI shown.
5. **Context loss:** If WebGL context is lost mid-session, Spline fades to `opacity: 0`, fallback fades back to `opacity: 1`.

## What Gets Removed from Hero

- `InteractiveGrid` component usage
- `LaptopFrame` component + portfolio carousel (rotation timer, `currentProject` state, pagination dots)
- `PageSpeedBadge` floating element
- Portfolio-related imports: `FEATURED_PORTFOLIO_IDS`, `PORTFOLIO_STATS`, `portfolioProjects`
- Two-column grid layout (`lg:grid-cols-2`)

None of these are deleted from the codebase — they remain used in other sections (PortfolioShowcase, etc.).

## New Dependencies

| Package | Purpose |
|---------|---------|
| `@splinetool/react-spline` | React wrapper for Spline scenes |
| `@splinetool/runtime` | Spline WebGL runtime (peer dep) |

## New Files

| File | Type | Purpose |
|------|------|---------|
| `src/components/ui/spline-scene.tsx` | Client component | Lazy-loaded Spline canvas with media query gate and WebGL recovery |
| `src/components/ui/hero-fallback.tsx` | Component | Gradient placeholder / mobile background |
| `src/hooks/use-media-query.ts` | Hook | SSR-safe media query hook (defaults to `false` on server) |

## Modified Files

| File | Changes |
|------|---------|
| `src/components/sections/hero-section.tsx` | Replace two-column layout with centered full-viewport layout; swap carousel for Spline + fallback; add readability overlay |
| `package.json` | Add Spline dependencies |

## Accessibility

- **`prefers-reduced-motion`:** When active, skip the crossfade animation (instant swap via `duration: 0`). Pause Spline scene animations by calling `splineApp.stop()` on the Application instance returned by `onLoad`. The scene renders as a static frame.
- All text meets WCAG AA contrast against the dark radial overlay
- Spline canvas gets `aria-hidden="true"` — decorative, not interactive content
- Focus order unaffected — CTAs remain keyboard-accessible
