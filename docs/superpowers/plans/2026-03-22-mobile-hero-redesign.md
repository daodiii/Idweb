# Mobile Hero Redesign Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the mobile hero's simple aurora glow with a WebGL mesh gradient, flowing SVG lines, cinematic CSS entrance, glowing CTAs, and noise texture — creating a premium, Stripe/Linear-caliber experience.

**Architecture:** A new `MeshGradient` client component handles the WebGL canvas (with CSS fallback). The hero section is modified to swap the aurora layer for MeshGradient + SVG lines on mobile, replace Motion entrance with CSS keyframes on mobile only, and restyle mobile CTAs. Desktop is completely untouched.

**Tech Stack:** Next.js 16 (App Router), React 19, Tailwind CSS 4, raw WebGL (no Three.js), CSS @keyframes, inline SVG

**Spec:** `docs/superpowers/specs/2026-03-22-mobile-hero-redesign-design.md`

---

## Chunk 1: MeshGradient Component

### Task 1: Create MeshGradient component

**Files:**
- Create: `src/components/ui/mesh-gradient.tsx`

- [ ] **Step 1: Create the MeshGradient component with WebGL shader**

Create `src/components/ui/mesh-gradient.tsx` as a `"use client"` component. This is the core of the redesign — a self-contained WebGL canvas that renders an animated mesh gradient.

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;

// Simplex noise helpers
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x_) - 0.5;
  vec3 ox = floor(x_ + 0.5);
  vec3 a0 = x_ - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 3; i++) {
    value += amplitude * snoise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = u_time * 0.15;

  // Sinusoidal UV warping for organic flow
  vec2 warpedUV = uv;
  warpedUV.x += sin(uv.y * 3.0 + t) * 0.15;
  warpedUV.y += cos(uv.x * 3.0 + t * 0.8) * 0.15;

  float n1 = fbm(warpedUV * 2.0 + t * 0.3);
  float n2 = fbm(warpedUV * 2.5 - t * 0.2 + 5.0);

  // Blend four colors based on noise
  float blend1 = smoothstep(-0.3, 0.3, n1);
  float blend2 = smoothstep(-0.2, 0.4, n2);

  vec3 color = mix(
    mix(u_color0, u_color1, blend1),
    mix(u_color2, u_color3, blend2),
    smoothstep(-0.1, 0.5, n1 + n2 - 0.3)
  );

  // Vignette for edge softness
  float vignette = 1.0 - smoothstep(0.4, 1.2, length(uv - 0.5) * 1.5);
  color *= (0.6 + 0.4 * vignette);

  gl_FragColor = vec4(color, 1.0);
}`;

const COLORS = {
  color0: [0.024, 0.714, 0.831], // #06b6d4 cyan
  color1: [0.227, 0.227, 1.0],   // #3a3aff electric blue
  color2: [0.545, 0.361, 0.965], // #8b5cf6 purple
  color3: [0.431, 0.765, 0.957], // #6ec3f4 light blue
} as const;

const CANVAS_SIZE = 64;

function CssFallback() {
  return (
    <div
      className="mesh-gradient-fallback absolute inset-0"
      aria-hidden="true"
      style={{
        background: [
          `radial-gradient(ellipse 80% 60% at 30% 40%, rgba(6,182,212,0.35) 0%, transparent 70%)`,
          `radial-gradient(ellipse 70% 50% at 70% 60%, rgba(58,58,255,0.25) 0%, transparent 70%)`,
          `radial-gradient(ellipse 60% 70% at 50% 30%, rgba(139,92,246,0.25) 0%, transparent 70%)`,
          `radial-gradient(ellipse 80% 50% at 40% 70%, rgba(110,195,244,0.2) 0%, transparent 70%)`,
        ].join(", "),
        backgroundSize: "200% 200%",
        animation: "meshFallbackDrift 20s ease-in-out infinite alternate",
      }}
    />
  );
}

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Check reduced motion preference
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Compile shaders
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uColor0 = gl.getUniformLocation(program, "u_color0");
    const uColor1 = gl.getUniformLocation(program, "u_color1");
    const uColor2 = gl.getUniformLocation(program, "u_color2");
    const uColor3 = gl.getUniformLocation(program, "u_color3");

    gl.uniform2f(uRes, CANVAS_SIZE, CANVAS_SIZE);
    gl.uniform3fv(uColor0, COLORS.color0);
    gl.uniform3fv(uColor1, COLORS.color1);
    gl.uniform3fv(uColor2, COLORS.color2);
    gl.uniform3fv(uColor3, COLORS.color3);
    gl.viewport(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // IntersectionObserver to pause when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Render loop
    let animationFrameId: number;
    const startTime = performance.now();

    function render() {
      if (isVisible && gl) {
        const elapsed = (performance.now() - startTime) / 1000;
        gl.uniform1f(uTime, elapsed);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    // Render first frame always (even with reduced motion)
    gl.uniform1f(uTime, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (!reducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }

    // Handle context loss
    const handleContextLost = (e: Event) => { e.preventDefault(); };
    canvas.addEventListener("webglcontextlost", handleContextLost);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, []);

  if (!webglSupported) {
    return <CssFallback />;
  }

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ imageRendering: "auto" }}
    />
  );
}
```

- [ ] **Step 2: Verify the component compiles**

Run: `cd /Users/daodilyas/Desktop/selgenettside && npx next build --no-lint 2>&1 | head -30`
Expected: No TypeScript errors related to `mesh-gradient.tsx`

- [ ] **Step 3: Commit**

```bash
git add src/components/ui/mesh-gradient.tsx
git commit -m "feat: add MeshGradient WebGL component for mobile hero"
```

---

## Chunk 2: CSS Animations in globals.css

### Task 2: Add mobile hero keyframes and update hero-shimmer

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Replace the mobile `.hero-shimmer` override and add new keyframes**

In `src/app/globals.css`, replace the mobile hero-shimmer media query (lines 144-150) with the new cyan-blue-purple gradient, and add all new keyframe definitions after the existing aurora-drift block (after line 182).

Replace the mobile media query at lines 144-150:
```css
@media (max-width: 1023px) {
  .hero-shimmer {
    background-image: linear-gradient(135deg, #f1f5f9, #06b6d4 40%, #3a3aff 60%, #8b5cf6);
    background-size: 200% 200%;
    animation: gradientTextShift 4s ease-in-out infinite alternate;
    text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }
}
```

Add after line 182 (after the aurora reduced-motion block):
```css
/* ── Mobile Hero Animations ── */

@keyframes heroFadeUp {
  from {
    opacity: 0;
    transform: translateY(var(--hero-translate, 12px));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientTextShift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@keyframes ctaGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(6, 182, 212, 0.3), 0 0 40px rgba(6, 182, 212, 0.1);
  }
  50% {
    box-shadow: 0 0 25px rgba(6, 182, 212, 0.4), 0 0 50px rgba(6, 182, 212, 0.15);
  }
}

@keyframes svgLineDrift1 {
  0% {
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 0.08;
  }
  50% {
    transform: translateX(15px) translateY(-10px) rotate(1.5deg);
    opacity: 0.12;
  }
  100% {
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 0.08;
  }
}

@keyframes svgLineDrift2 {
  0% {
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 0.06;
  }
  50% {
    transform: translateX(-10px) translateY(8px) rotate(-1deg);
    opacity: 0.1;
  }
  100% {
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 0.06;
  }
}

@keyframes svgLineDrift3 {
  0% {
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 0.05;
  }
  50% {
    transform: translateX(8px) translateY(12px) rotate(0.8deg);
    opacity: 0.09;
  }
  100% {
    transform: translateX(0) translateY(0) rotate(0deg);
    opacity: 0.05;
  }
}

@keyframes meshFallbackDrift {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@media (max-width: 1023px) {
  .hero-entrance-canvas {
    animation: heroFadeUp 400ms ease-out both;
    --hero-translate: 0px;
  }
  .hero-entrance-eyebrow {
    animation: heroFadeUp 350ms ease-out 150ms both;
    --hero-translate: 12px;
  }
  .hero-entrance-word-1 { animation: heroFadeUp 350ms ease-out 300ms both; --hero-translate: 16px; }
  .hero-entrance-word-2 { animation: heroFadeUp 350ms ease-out 380ms both; --hero-translate: 16px; }
  .hero-entrance-word-3 { animation: heroFadeUp 350ms ease-out 460ms both; --hero-translate: 16px; }
  .hero-entrance-word-4 { animation: heroFadeUp 350ms ease-out 540ms both; --hero-translate: 16px; }
  .hero-entrance-word-5 { animation: heroFadeUp 350ms ease-out 620ms both; --hero-translate: 16px; }
  .hero-entrance-sub { animation: heroFadeUp 300ms ease-out 750ms both; --hero-translate: 12px; }
  .hero-entrance-cta { animation: heroFadeUp 300ms ease-out 950ms both; --hero-translate: 12px; }
}

@media (prefers-reduced-motion: reduce) {
  .hero-entrance-canvas,
  .hero-entrance-eyebrow,
  .hero-entrance-word-1,
  .hero-entrance-word-2,
  .hero-entrance-word-3,
  .hero-entrance-word-4,
  .hero-entrance-word-5,
  .hero-entrance-sub,
  .hero-entrance-cta {
    animation: none !important;
    opacity: 1 !important;
  }
  .hero-shimmer {
    animation: none !important;
  }
}
```

- [ ] **Step 2: Verify CSS parses correctly**

Run: `cd /Users/daodilyas/Desktop/selgenettside && npx next build --no-lint 2>&1 | head -30`
Expected: No CSS parse errors

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "feat: add mobile hero CSS keyframes and update shimmer palette"
```

---

## Chunk 3: Hero Section Integration

### Task 3: Integrate everything into hero-section.tsx

**Files:**
- Modify: `src/components/sections/hero-section.tsx`

This is the main integration task. We need to:
1. Import `MeshGradient`
2. Replace the aurora glow layer with `MeshGradient` + noise texture + SVG lines (mobile only)
3. Replace Motion entrance with CSS classes on mobile (keep Motion for desktop)
4. Replace mobile CTAs with glowing style (keep rainbow buttons on desktop)

- [ ] **Step 1: Update imports**

Add at the top of hero-section.tsx:
```tsx
import { MeshGradient } from "@/components/ui/mesh-gradient";
```

- [ ] **Step 2: Replace the aurora glow layer (lines 53-64) with MeshGradient + noise + SVG lines**

Replace the aurora glow `<div>` (lines 53-64) with:

```tsx
      {/* Layer 0.5: WebGL mesh gradient + noise + SVG lines (mobile only) */}
      <div className="hero-entrance-canvas pointer-events-none absolute inset-0 z-[1] lg:hidden" aria-hidden="true">
        <MeshGradient />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "128px 128px",
            opacity: 0.03,
          }}
        />

        {/* Flowing SVG lines */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="heroLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#8b5cf6" />
            </linearGradient>
          </defs>
          <path
            d="M-20,200 Q100,120 200,250 T420,180"
            stroke="url(#heroLineGrad)"
            strokeWidth="0.8"
            style={{ animation: "svgLineDrift1 8s ease-in-out infinite" }}
          />
          <path
            d="M-20,400 Q150,340 250,450 T420,380"
            stroke="url(#heroLineGrad)"
            strokeWidth="0.6"
            style={{ animation: "svgLineDrift2 10s ease-in-out 2s infinite" }}
          />
          <path
            d="M-20,600 Q80,550 200,620 T420,570"
            stroke="url(#heroLineGrad)"
            strokeWidth="0.5"
            style={{ animation: "svgLineDrift3 9s ease-in-out 4s infinite" }}
          />
        </svg>
      </div>
```

- [ ] **Step 3: Replace mobile text content block with CSS entrance classes**

Replace the mobile `<motion.div>` block (lines 87-155) with a version that uses CSS entrance classes on mobile instead of Motion variants. The parallax wrapper stays as a `motion.div` — only the children get CSS classes.

```tsx
          {/* Mobile hero — CSS entrance + parallax */}
          <motion.div
            className="mb-8 -mt-16 lg:hidden"
            style={
              prefersReducedMotion
                ? undefined
                : { y: parallaxY, opacity: parallaxOpacity }
            }
          >
            <p className="hero-entrance-eyebrow mb-8 text-xs font-semibold tracking-[0.2em] text-[var(--color-dark-muted)]">
              {HERO.eyebrow}
            </p>

            <h1 className="hero-shimmer bg-clip-text text-[1.85rem] font-black leading-[1.1] tracking-tight text-transparent min-[375px]:text-4xl sm:text-5xl">
              {["IDWEB", "BYGGER", "DIN", "NYE", "NETTSIDE"].map(
                (word, i) => (
                  <span
                    key={word}
                    className={`hero-entrance-word-${i + 1} inline-block${i < 4 ? " mr-[0.3em]" : ""}`}
                  >
                    {word}
                  </span>
                ),
              )}
            </h1>

            <p className="hero-entrance-sub mx-auto mt-5 max-w-md text-base leading-relaxed text-[var(--color-dark-muted)]">
              {HERO.subheadline}
            </p>

            {/* Mobile CTAs — glowing primary, ghost secondary */}
            <div className="hero-entrance-cta mt-14 flex flex-row items-center justify-center gap-3">
              <Link
                href="/referanser"
                className="rounded-xl bg-gradient-to-r from-[#06b6d4] to-[#3a3aff] px-5 py-3 text-sm font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.3),0_0_40px_rgba(6,182,212,0.1)]"
                style={{ animation: "ctaGlow 3s ease-in-out infinite" }}
              >
                {HERO.primaryCta}
              </Link>
              <Link
                href="/kontakt"
                className="rounded-xl border border-white/12 px-5 py-3 text-sm font-medium text-[rgba(241,245,249,0.8)]"
              >
                {HERO.secondaryCta}
              </Link>
            </div>
          </motion.div>
```

- [ ] **Step 4: Remove unused Motion variants (if no longer used)**

The `headlineContainer`, `headlineWord`, and `fadeSlideUp` variants (lines 12-35) are no longer used on mobile, but they may still be used on desktop. Check if the desktop section uses them — currently it does NOT (desktop CTAs at lines 157-172 don't use these variants). Since they're only used by the mobile block which is now CSS-based, remove them entirely. Also remove the unused `RAINBOW_BUTTON_CLASSES` import if mobile was the only consumer — but desktop CTAs still use it, so keep that import.

Delete lines 12-35 (the three Motion variant objects: `headlineContainer`, `headlineWord`, `fadeSlideUp`).

- [ ] **Step 5: Verify the build compiles**

Run: `cd /Users/daodilyas/Desktop/selgenettside && npx next build --no-lint 2>&1 | head -30`
Expected: Successful compilation with no errors

- [ ] **Step 6: Verify desktop is unchanged**

Start the dev server and check the desktop hero at viewport width >= 1024px. The Spline 3D scene, desktop CTAs with rainbow buttons, and desktop shimmer animation should all be identical to before.

- [ ] **Step 7: Verify mobile hero renders correctly**

Check the mobile hero at viewport width < 1024px:
- WebGL mesh gradient renders with cyan/blue/purple colors
- SVG flowing lines are visible at low opacity
- Noise texture overlay adds subtle grain
- Entrance animation plays: canvas fades in → eyebrow → headline words stagger → subtext → CTAs
- Primary CTA has cyan-blue gradient with pulsing glow
- Secondary CTA is ghost style (border only)
- Headline text has animated gradient fill (cyan→blue→purple shifting)
- Scroll parallax still works (content fades/translates on scroll)

- [ ] **Step 8: Commit**

```bash
git add src/components/sections/hero-section.tsx
git commit -m "feat: integrate WebGL mesh gradient and cinematic entrance into mobile hero"
```

---

## Chunk 4: Cleanup and Polish

### Task 4: Verify no dead CSS and final visual check

**Note:** The `aurora-drift` keyframe, `.aurora-glow-layer` class, and aurora CSS variables (`--color-aurora-teal`, `--color-aurora-gold`, `--aurora-noise-opacity`) are still used by `aurora-background.tsx` and `sticky-scroll-reveal.tsx`. Do NOT remove them. The hero section no longer references `aurora-glow-layer` in its JSX (handled in Chunk 3), but the CSS stays for other consumers.

- [ ] **Step 1: Verify no dead CSS was introduced**

Run: `grep -r "aurora-glow-layer\|aurora-drift\|aurora-teal\|aurora-gold\|aurora-noise" src/ --include="*.tsx" --include="*.ts" -l`
Expected: `aurora-background.tsx` and `sticky-scroll-reveal.tsx` still reference these — confirming they must stay.

- [ ] **Step 2: Final build and visual check**

Run: `cd /Users/daodilyas/Desktop/selgenettside && npx next build --no-lint 2>&1 | head -30`
Expected: Clean build

Do a final visual check on both mobile and desktop viewports to confirm nothing is broken.

### Task 5: Test prefers-reduced-motion

- [ ] **Step 1: Test reduced motion mode**

In browser DevTools, toggle `prefers-reduced-motion: reduce` and verify:
- WebGL canvas shows static gradient (no animation)
- All entrance animations are instant (no stagger)
- Gradient text is static (no shifting)
- CTA glow pulse is static
- SVG lines are static
- Desktop shimmer is static (existing behavior)

- [ ] **Step 2: Test WebGL fallback**

Temporarily modify `mesh-gradient.tsx` to force the CSS fallback:
```tsx
// In the useEffect, temporarily add:
setWebglSupported(false);
return;
```

Verify the CSS radial gradient fallback renders and drifts slowly. Then revert the change.

- [ ] **Step 3: Final commit with all files verified**

If any fixes were needed during testing, commit them:
```bash
git add -A
git commit -m "fix: polish mobile hero animations and edge cases"
```
