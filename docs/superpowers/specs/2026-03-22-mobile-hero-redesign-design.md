# Mobile Hero Redesign — WebGL Mesh + Flowing Lines

## Goal

Transform the mobile hero section from a simple aurora glow into a premium, cutting-edge experience inspired by Stripe and Linear. The desktop Spline 3D scene is untouched — this redesign targets mobile only (< 1024px).

## Design Decisions

- **Approach:** WebGL mesh gradient + flowing SVG lines + cinematic entrance + glowing CTA + noise texture
- **Color palette:** Cool Tech — cyan (#06b6d4) → electric blue (#3a3aff) → purple (#8b5cf6) → light blue (#6ec3f4)
- **Entrance style:** Cinematic orchestrated sequence (~1.25s total)
- **Mood:** Premium & cutting-edge — "this agency is ahead of everyone else"

## Architecture

### Files to Create

1. **`src/components/ui/mesh-gradient.tsx`** — Client component containing the WebGL canvas, shader code, and render loop
2. No other new files needed

### Files to Modify

1. **`src/components/sections/hero-section.tsx`** — Replace mobile aurora glow layer with MeshGradient component, add SVG lines layer, replace Motion entrance with CSS keyframe entrance, update CTA styling for mobile
2. **`src/app/globals.css`** — Add keyframe animations for entrance sequence, gradient text, CTA glow pulse, SVG line drift, and noise texture. Remove/replace existing `.hero-shimmer` mobile media query override (gold gradient `#D4A017, #8B6914`) which conflicts with the new cyan-blue-purple palette. Group all new hero keyframes under a `/* Mobile Hero Animations */` comment block.

### Files Unchanged

- `src/components/ui/spline-scene.tsx` — Desktop 3D scene untouched
- `src/components/ui/hero-fallback.tsx` — Desktop fallback untouched
- `src/components/ui/rainbow-button.tsx` — Stays for desktop CTAs
- `src/lib/content/homepage.ts` — Copy unchanged
- `src/app/layout.tsx` — No changes

## Component Design

### MeshGradient (`src/components/ui/mesh-gradient.tsx`)

A `"use client"` component that renders a `<canvas>` element with a custom WebGL shader.

**Props:** None (self-contained, uses internal constants for colors/speed). Only mounted on mobile via `useMediaQuery("(max-width: 1023px)")` to avoid initializing a WebGL context on desktop where Spline handles the background.

**WebGL fallback:** If `canvas.getContext('webgl')` returns null (older devices, low-power mode, privacy browsers), the component renders a CSS-only fallback: layered radial gradients using the same four color stops with a slow `background-position` animation. This provides 80% of the visual effect without WebGL. The component manages this internally — no external state needed.

**Internal architecture:**
- `useRef` for canvas element
- `useEffect` for WebGL context setup, shader compilation, render loop, and cleanup
- `IntersectionObserver` to pause/resume render loop when off-screen
- Respects `prefers-reduced-motion` — renders a single static frame, no animation

**Shader (GLSL fragment shader):**
- Simplex noise function (~30 lines)
- Fractal Brownian motion (fBM) layering 3 octaves of noise
- Four color uniforms blended based on noise values at each pixel
- Time uniform for animation
- UV coordinates with sinusoidal warping for organic flow

**Performance strategy:**
- Canvas renders at low resolution: `width=64, height=64` — intentionally low for a soft, painterly aesthetic. The blur from upscaling is a feature, not a bug. If testing reveals visible banding or pixelation artifacts, bump to `128x128` (16K pixels/frame) without meaningful perf impact.
- CSS scales canvas to fill container: `width: 100%; height: 100%; object-fit: cover`
- This means the shader computes only ~4096 pixels per frame regardless of screen size
- `requestAnimationFrame` for the render loop
- Cleanup: WebGL context loss handled, animation frame cancelled on unmount
- Orientation change: The fixed 64x64 resolution makes resize handling irrelevant — CSS scaling adapts automatically

**Color uniforms:**
```
u_color0: vec3(0.024, 0.714, 0.831)  // #06b6d4 cyan
u_color1: vec3(0.227, 0.227, 1.0)    // #3a3aff electric blue
u_color2: vec3(0.545, 0.361, 0.965)  // #8b5cf6 purple
u_color3: vec3(0.431, 0.765, 0.957)  // #6ec3f4 light blue
```

### SVG Flowing Lines

Inline SVG in `hero-section.tsx` (not a separate component — too small to warrant one).

**Structure:**
- 2-3 `<path>` elements with cubic bezier curves
- Animated via CSS `transform` (translateX, translateY, rotate) and `opacity` keyframes — NOT SMIL `<animate>` on the `d` attribute (SMIL is deprecated in Chromium and `d` morphing triggers main-thread repaints). Each path drifts and rotates slowly, creating the illusion of organic movement without path morphing.
- Duration: 8-10s per path, staggered `animation-delay`
- `linearGradient` stroke: cyan → purple
- Opacity: 8-10%
- Stroke width: 0.5-1px
- `viewBox="0 0 400 800"` with `preserveAspectRatio="none"`
- Positioned absolutely, z-index between canvas and text content

### Entrance Animation (CSS Keyframes)

Replaces the current Motion/Framer Motion stagger on mobile. Motion stagger stays on desktop.

**Parallax handoff:** The CSS entrance animations apply to individual child elements (eyebrow, headline words, subtext, CTAs) — NOT to the parallax wrapper div. The parallax wrapper controlled by Motion (`useScroll`/`useTransform` driving `parallaxY` and `parallaxOpacity`) stays as-is with no entrance animation on it, avoiding conflicts between CSS `animation-fill-mode` and Motion inline styles.

**Keyframe definition (`globals.css`):**
```
@keyframes heroFadeUp {
  from { opacity: 0; transform: translateY(var(--hero-translate, 12px)); }
  to   { opacity: 1; transform: translateY(0); }
}
```

**Sequence applied via animation-delay on each element:**

| Element | Delay | Duration | --hero-translate |
|---------|-------|----------|-----------------|
| WebGL canvas container | 0ms | 400ms | 0 (opacity only) |
| Eyebrow text | 150ms | 350ms | 12px |
| Headline word 1 | 300ms | 350ms | 16px |
| Headline word 2 | 380ms | 350ms | 16px |
| Headline word 3 | 460ms | 350ms | 16px |
| Headline word 4 | 540ms | 350ms | 16px |
| Headline word 5 | 620ms | 350ms | 16px |
| Subheadline | 750ms | 300ms | 12px |
| CTA buttons | 950ms | 300ms | 12px |

All use `animation-fill-mode: both` (start invisible, end in final state).

**`prefers-reduced-motion`:** All entrance delays set to 0, duration set to 0.01s (instant appearance).

### Gradient Text Effect

Applied to headline on mobile:
- `background: linear-gradient(135deg, #f1f5f9, #06b6d4 40%, #3a3aff 60%, #8b5cf6)`
- `background-clip: text; -webkit-background-clip: text; color: transparent`
- `background-size: 200% 200%`
- Animated with `@keyframes gradientTextShift` cycling `background-position` over 4s
- Runs indefinitely after entrance completes
- Disabled on `prefers-reduced-motion`

### Glowing CTA (Mobile)

**Primary button:**
- Background: `linear-gradient(135deg, #06b6d4, #3a3aff)`
- Box shadow: `0 0 20px rgba(6,182,212,0.3), 0 0 40px rgba(6,182,212,0.1)`
- Subtle glow pulse: `@keyframes ctaGlow` oscillating shadow opacity 0.8→1 over 3s
- Replaces rainbow button styling on mobile only

**Secondary button:**
- Ghost style: `border: 1px solid rgba(255,255,255,0.12)`, no background
- Text: `rgba(241,245,249,0.8)`

### Noise Texture Overlay

- Inline SVG `<feTurbulence>` noise pattern rendered as a CSS `background-image`
- Tiled at `128px` intervals
- Opacity: ~3%
- Applied to the hero section container via a pseudo-element or absolute-positioned div
- Static — no animation, zero performance cost

## What Changes vs Current

| Aspect | Current Mobile | New Mobile |
|--------|---------------|------------|
| Background | Aurora glow (2 radial gradients drifting) | WebGL mesh gradient (4-color noise shader) |
| Depth layers | Single glow layer | WebGL canvas + SVG lines + noise texture |
| Entrance | Motion stagger (JS-driven) | CSS keyframes with orchestrated delays |
| Headline | White text with static shimmer gradient | Animated gradient text (cyan→blue→purple) |
| Primary CTA | Rainbow gradient button | Cyan→blue gradient with pulsing glow |
| Secondary CTA | Rainbow gradient button | Ghost button (border only) |
| Texture | None | Noise overlay at 3% opacity |

## What Stays the Same

- Dark background color (#0a0a0a)
- Typography: Crimson Pro headings, Outfit body
- All copy/content
- Scroll parallax effect (Motion useScroll/useTransform)
- Desktop experience (Spline 3D, desktop entrance, desktop CTAs)
- prefers-reduced-motion support
- Responsive font scaling breakpoints

## Performance Budget

- WebGL shader: ~10KB of JS (inline, no external dependency)
- Canvas resolution: 64×64 pixels (CSS-scaled up)
- GPU: Minimal — only ~4096 pixels computed per frame
- SVG lines: CSS transform/opacity animations (compositor-only, GPU-accelerated)
- CSS animations: All on transform/opacity (compositor-only)
- IntersectionObserver: Pauses WebGL when hero not visible
- No new npm dependencies

## Accessibility

- `prefers-reduced-motion`: All animations disabled (static gradient rendered, instant entrance)
- Canvas: `aria-hidden="true"` (decorative)
- SVG lines: `aria-hidden="true"` (decorative)
- Focus order and keyboard navigation unchanged
- Color contrast: Text uses a gradient that shares hues with the background mesh. To maintain minimum 4.5:1 contrast, add a subtle `text-shadow: 0 0 20px rgba(0,0,0,0.5)` on the headline to create separation when text and background colors align. Test a frame where both peak in cyan.
- No content changes — screen readers experience identical content

## Testing Plan

- Verify WebGL renders on Safari iOS, Chrome Android, Firefox Android
- Verify entrance animation sequence timing feels right
- Verify IntersectionObserver pauses render loop when scrolled past
- Verify prefers-reduced-motion disables all animation
- Verify desktop experience is completely unchanged
- Verify no layout shift (CLS) during entrance animation
- Verify gradient text is readable against mesh background
- Test on slow 3G — hero should be visible within 2s even if WebGL hasn't started
- Test WebGL fallback by temporarily forcing `getContext('webgl')` to return null — verify CSS gradient fallback renders correctly
- Test gradient text readability when mesh gradient peaks in cyan region
