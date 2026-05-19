# White-section spec-sheet redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply a unified "technical spec-sheet" visual treatment to the five white sections of the homepage (portfolio, services, blog, FAQ, CTA), giving them a coherent counter-voice to the recently-redesigned dark sections.

**Architecture:** Each section is restyled in-place — no new component files. A new mono font (Geist Mono) is added to the global font stack and used exclusively on white-section chrome (filenames, status pills, metadata). The dark sections are untouched. Implementation lives on a feature branch with one atomic commit per section, so any individual section is revertable via `git revert`.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, `next/font/google` for Geist Mono, Motion (Framer Motion successor) for view-triggered animations.

**Spec:** `docs/superpowers/specs/2026-05-19-white-sections-spec-sheet-design.md`

---

## Chunk 0: Setup

### Task 0: Feature branch

**Files:** none — git only.

- [ ] **Step 1: Confirm working tree is clean of staged work**

```bash
git status
```
Expected: untracked files OK; no staged or modified files in tracked paths beyond the spec doc just written.

- [ ] **Step 2: Stage and commit the spec doc on main**

```bash
git add docs/superpowers/specs/2026-05-19-white-sections-spec-sheet-design.md
git commit -m "docs: spec for white-section spec-sheet redesign"
```

- [ ] **Step 3: Create and check out feature branch**

```bash
git checkout -b redesign/white-sections-spec-sheet
```
Expected: `Switched to a new branch 'redesign/white-sections-spec-sheet'`

- [ ] **Step 4: Confirm branch**

```bash
git branch --show-current
```
Expected: `redesign/white-sections-spec-sheet`

---

## Chunk 1: Geist Mono wiring

### Task 1: Add Geist Mono to layout.tsx

**Files:**
- Modify: `src/app/layout.tsx` (imports + font config + body className)

- [ ] **Step 1: Read current layout.tsx**

Open `src/app/layout.tsx` and locate (a) the `next/font/google` import line, (b) the existing font const declarations, (c) the `<html>` or `<body>` element where the font CSS variables are applied.

- [ ] **Step 2: Update the font import**

Change the existing line:
```typescript
import { Outfit, JetBrains_Mono } from "next/font/google";
```
To:
```typescript
import { Outfit, JetBrains_Mono, Geist_Mono } from "next/font/google";
```

- [ ] **Step 3: Add the Geist Mono config**

Below the existing `JetBrains_Mono` const (currently named `code`), add:
```typescript
const monoAlt = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});
```

- [ ] **Step 4: Apply the variable to the root element**

Find the `<html>` (or `<body>`) tag where the font className strings are concatenated. Append `monoAlt.variable` to the existing list. Example pattern (yours may differ slightly):

Before:
```tsx
<html lang="nb" className={`${heading.variable} ${body.variable} ${code.variable}`}>
```
After:
```tsx
<html lang="nb" className={`${heading.variable} ${body.variable} ${code.variable} ${monoAlt.variable}`}>
```

- [ ] **Step 5: Verify the dev server still starts and Geist Mono loads**

```bash
npm run dev
```
Expected: no font loading errors. Open the browser to localhost:3000, open DevTools → Computed → `font-family` on any element, then in the console:
```js
getComputedStyle(document.documentElement).getPropertyValue('--font-geist-mono')
```
Expected: a non-empty string starting with `'__Geist_Mono_` or similar.

- [ ] **Step 6: Stop the dev server**

Ctrl-C the dev server. We'll restart it after globals.css is updated.

### Task 2: Register the Tailwind token in globals.css

**Files:**
- Modify: `src/app/globals.css` (inside the `@theme inline` block)

- [ ] **Step 1: Locate the @theme inline block**

Open `src/app/globals.css` and find the `@theme inline { ... }` block (around line 40–60). It currently maps `--font-sans`, `--font-serif`, `--font-mono` etc.

- [ ] **Step 2: Add the new token**

Inside the `@theme inline` block, after the existing `--font-mono` line, add:
```css
  --font-mono-alt: var(--font-geist-mono);
```

This exposes the new font as `font-mono-alt` in Tailwind utility syntax.

- [ ] **Step 3: Restart dev server and verify**

```bash
npm run dev
```
Open the homepage. In the browser console:
```js
getComputedStyle(document.documentElement).getPropertyValue('--font-mono-alt')
```
Expected: a non-empty Geist Mono font family string.

- [ ] **Step 4: Build and typecheck**

```bash
npm run build
```
Expected: build succeeds with zero TS errors.

- [ ] **Step 5: Commit**

```bash
git add src/app/layout.tsx src/app/globals.css
git commit -m "feat: add Geist Mono for white-section spec-sheet chrome"
```

---

## Chunk 2: Portfolio → Deployments

### Task 3: Rewrite portfolio-showcase as a deployment log

**Files:**
- Modify: `src/components/sections/portfolio-showcase.tsx` (full rewrite of the component body)

- [ ] **Step 1: Read existing component to capture the current section-header pattern**

The current file uses an AnimateIn-wrapped kicker + serif headline. We KEEP that pattern at the top of the new component (continuity of the kicker style). Read `src/components/sections/portfolio-showcase.tsx` for reference.

- [ ] **Step 2: Verify PORTFOLIO_SITES exposes domain + industry**

```bash
grep -nE "domain:|industry:" src/lib/content/portfolio-sites.ts | head -20
```
Expected: each PORTFOLIO_SITES entry has a `domain` field. Industry comes from `PROJECTS` in `src/lib/content/portfolio.ts` — we'll merge by `id`.

- [ ] **Step 3: Replace the component body**

Overwrite `src/components/sections/portfolio-showcase.tsx` with:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { PORTFOLIO_SITES } from "@/lib/content/portfolio-sites";
import { PROJECTS } from "@/lib/content/portfolio";

const EASE = "cubic-bezier(0.23,1,0.32,1)";

const DEPLOYMENTS = PORTFOLIO_SITES.map((site) => {
  const project = PROJECTS.find((p) => p.id === site.id);
  return {
    id: site.id,
    client: site.name,
    domain: site.domain,
    industry: project?.industry ?? "",
    screenshot: site.images.desktop,
  };
});

export function PortfolioShowcase() {
  const [activeId, setActiveId] = useState(DEPLOYMENTS[0]?.id ?? "");
  const active = DEPLOYMENTS.find((d) => d.id === activeId) ?? DEPLOYMENTS[0];

  return (
    <section className="light-section-warm px-6 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl">
        <AnimateIn className="mb-14 max-w-2xl">
          <p className="flex items-center gap-3 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
            ~/portfolio · {DEPLOYMENTS.length} deployments
          </p>
          <h2 className="mt-7 font-serif text-[var(--color-text)]">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[var(--color-text)]/65">
              Utvalgte
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                prosjekter
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h2>
        </AnimateIn>

        <AnimateIn>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-start">
            {/* Deploy log */}
            <ol className="border-y border-[var(--color-border)]">
              {DEPLOYMENTS.map((d) => {
                const isActive = d.id === activeId;
                return (
                  <li
                    key={d.id}
                    className="border-b border-[var(--color-border)] last:border-b-0"
                  >
                    <Link
                      href={`/referanser#${d.id}`}
                      onMouseEnter={() => setActiveId(d.id)}
                      onFocus={() => setActiveId(d.id)}
                      className="group relative flex items-center gap-4 px-1 py-5 transition-colors duration-200 hover:bg-[var(--color-text)]/[0.02] focus-visible:outline-none focus-visible:bg-[var(--color-text)]/[0.03]"
                      style={{ transitionTimingFunction: EASE }}
                    >
                      <span
                        aria-hidden
                        className={`absolute left-0 top-0 h-full w-[2px] transition-opacity duration-200 ${
                          isActive ? "bg-[#F4CE14] opacity-100" : "bg-[#F4CE14] opacity-0"
                        }`}
                        style={{ transitionTimingFunction: EASE }}
                      />
                      <span className="flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.18em] text-emerald-600">
                        <span className="relative inline-flex h-1.5 w-1.5">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </span>
                        Ready
                      </span>
                      <span className="font-[family-name:var(--font-geist-mono)] text-sm text-[var(--color-text)]">
                        clients/{d.id}
                      </span>
                      <span className="hidden font-[family-name:var(--font-geist-mono)] text-xs text-[var(--color-text-muted)] sm:inline">
                        · {d.industry}
                      </span>
                      <span className="ml-auto flex items-center gap-2">
                        <span className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--color-text-muted)] group-hover:text-[var(--color-text)] transition-colors duration-200" style={{ transitionTimingFunction: EASE }}>
                          {d.domain}
                        </span>
                        <ArrowUpRight
                          aria-hidden
                          className="h-3.5 w-3.5 text-[var(--color-text-muted)] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          style={{ transitionTimingFunction: EASE }}
                        />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>

            {/* Preview pane (desktop only) */}
            <div className="hidden lg:block">
              <div className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-white shadow-[0_30px_60px_-30px_rgba(10,10,10,0.18)]">
                <div className="flex items-center gap-2 border-b border-[var(--color-border)] bg-[var(--color-bg)] px-3 py-2">
                  <span className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/70" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]/70" />
                  </span>
                  <span className="ml-3 truncate font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--color-text-muted)]">
                    https://{active.domain}
                  </span>
                </div>
                <div className="relative aspect-[16/10] w-full bg-[var(--color-bg)]">
                  <Image
                    key={active.id}
                    src={active.screenshot}
                    alt={`${active.client} — forhåndsvisning`}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-top animate-[heroFadeUp_0.45s_cubic-bezier(0.23,1,0.32,1)_both]"
                  />
                </div>
              </div>
              <p className="mt-3 font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--color-text-muted)]">
                hover en rad for å forhåndsvise · klikk for full case study
              </p>
            </div>
          </div>
        </AnimateIn>

        <AnimateIn className="mt-14 flex justify-center" delay={0.15}>
          <Link
            href="/referanser"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a0a0a] px-7 py-4 text-sm font-bold text-[#fafaf9] shadow-[0_10px_30px_-12px_rgba(10,10,10,0.4)] transition-[transform,background-color] duration-150 hover:bg-[#1a1a1a] active:scale-[0.97]"
            style={{ transitionTimingFunction: EASE }}
          >
            Se alle prosjekter
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ transitionTimingFunction: EASE }}
            />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Build and typecheck**

```bash
npm run build
```
Expected: zero TS errors.

- [ ] **Step 5: Visual verification**

Start the dev server and verify in browser at desktop (1440px) and mobile (375px):
- Desktop: rows on left, preview pane on right, hover/focus moves the preview
- Mobile: preview pane is hidden; rows show client/industry/domain in a stack
- Active row has yellow left rail
- "Ready" status dot pulses
- Hover row → yellow rail fades in, domain text darkens, arrow appears

```bash
npm run dev
```

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/portfolio-showcase.tsx
git commit -m "feat: portfolio showcase as deployment log (white-section spec-sheet)"
```

---

## Chunk 3: Services → Modules

### Task 4: Rewrite service-feature-steps as IDE-style tabs

**Files:**
- Modify: `src/components/sections/service-feature-steps.tsx` (full rewrite)

- [ ] **Step 1: Read existing module to capture services data**

Open `src/components/sections/service-feature-steps.tsx`. Note the existing `SERVICES` array — extract its `title`, `description`, `image`, and `href` fields. We'll reuse this data shape.

- [ ] **Step 2: Define the new component**

Overwrite `src/components/sections/service-feature-steps.tsx` with:

```tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const EASE = "cubic-bezier(0.23,1,0.32,1)";

type ServiceModule = {
  id: string;
  filename: string;
  tabLabel: string;
  title: string;
  description: string;
  props: Array<{ key: string; value: string }>;
  output: Array<{ key: string; value: string }>;
  image: string;
  href: string;
};

const MODULES: ServiceModule[] = [
  {
    id: "nettsider",
    filename: "services/nettsider.tsx",
    tabLabel: "<Service.Nettsider />",
    title: "Skreddersydd nettside",
    description:
      "Vi designer og bygger nettsiden din fra grunnen av — moderne, rask og laget for å konvertere besøkende til kunder.",
    props: [
      { key: "bedriftsnavn", value: "string" },
      { key: "innhold", value: "tekst + bilder" },
      { key: "frist", value: "2–4 uker" },
    ],
    output: [
      { key: "nettside", value: "live på .no" },
      { key: "seo", value: "grunnstruktur" },
      { key: "cms", value: "valgfritt" },
    ],
    image:
      "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=1200&q=80&auto=format&fit=crop",
    href: "/tjenester/nettsider",
  },
  {
    id: "seo",
    filename: "services/seo.tsx",
    tabLabel: "<Service.SEO />",
    title: "SEO-optimalisering",
    description:
      "Vi sørger for at kundene dine finner deg på Google — gjennom teknisk SEO, innhold og lokal optimalisering.",
    props: [
      { key: "nåværende-side", value: "URL" },
      { key: "målgruppe", value: "lokalt / nasjonalt" },
      { key: "konkurranse", value: "analysert" },
    ],
    output: [
      { key: "synlighet", value: "Google side 1" },
      { key: "trafikk", value: "organisk vekst" },
      { key: "rapport", value: "månedlig" },
    ],
    image:
      "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&q=80&auto=format&fit=crop",
    href: "/tjenester/seo",
  },
  {
    id: "vedlikehold",
    filename: "services/vedlikehold.tsx",
    tabLabel: "<Service.Vedlikehold />",
    title: "Drift og vedlikehold",
    description:
      "Vi holder siden oppdatert, sikker og rask — slik at du kan fokusere på å drive bedriften din.",
    props: [
      { key: "side", value: "eksisterende" },
      { key: "responstid", value: "samme dag" },
      { key: "ønsker", value: "endringer / nytt innhold" },
    ],
    output: [
      { key: "oppdateringer", value: "løpende" },
      { key: "sikkerhet", value: "patched" },
      { key: "support", value: "e-post + tlf" },
    ],
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&q=80&auto=format&fit=crop",
    href: "/tjenester/vedlikehold",
  },
];

export function ServiceFeatureSteps() {
  const [activeId, setActiveId] = useState(MODULES[0].id);
  const active = MODULES.find((m) => m.id === activeId) ?? MODULES[0];

  return (
    <section className="light-section-warm-alt px-6 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl">
        <AnimateIn className="mb-14 max-w-2xl">
          <p className="flex items-center gap-3 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
            ~/services · {MODULES.length} modules
          </p>
          <h2 className="mt-7 font-serif text-[var(--color-text)]">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[var(--color-text)]/65">
              Det vi
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                leverer
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h2>
        </AnimateIn>

        <AnimateIn>
          <div className="grid gap-8 lg:grid-cols-[280px_1fr] lg:items-start">
            {/* Tab rail */}
            <nav
              role="tablist"
              aria-label="Tjenester"
              className="flex flex-row gap-2 overflow-x-auto border-b border-[var(--color-border)] pb-2 lg:flex-col lg:gap-0 lg:overflow-visible lg:border-b-0 lg:border-l lg:border-[var(--color-border)] lg:pb-0 lg:pl-0"
            >
              {MODULES.map((m) => {
                const isActive = m.id === activeId;
                return (
                  <button
                    key={m.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveId(m.id)}
                    className={`group relative flex-shrink-0 px-4 py-3 text-left transition-colors duration-200 lg:flex-shrink lg:py-4 ${
                      isActive ? "text-[var(--color-text)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
                    }`}
                    style={{ transitionTimingFunction: EASE }}
                  >
                    <span
                      aria-hidden
                      className={`pointer-events-none absolute transition-opacity duration-200 lg:left-[-1px] lg:top-0 lg:h-full lg:w-[2px] left-0 bottom-[-9px] h-[2px] w-full bg-[#F4CE14] ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                      style={{ transitionTimingFunction: EASE }}
                    />
                    <span className="block font-[family-name:var(--font-geist-mono)] text-sm">
                      {m.tabLabel}
                    </span>
                    <span className="mt-1 block font-serif text-xs leading-snug text-[var(--color-text-muted)] lg:max-w-[240px]">
                      {m.title}
                    </span>
                  </button>
                );
              })}
            </nav>

            {/* Active module panel */}
            <div
              key={active.id}
              role="tabpanel"
              className="overflow-hidden rounded-lg border border-[var(--color-border)] bg-white animate-[heroFadeUp_0.35s_cubic-bezier(0.23,1,0.32,1)_both]"
            >
              <div className="flex items-center gap-3 border-b border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-2.5">
                <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--color-text-muted)]">
                  {active.filename}
                </span>
                <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] text-emerald-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  live
                </span>
              </div>
              <div className="grid gap-0 md:grid-cols-[1fr_1.1fr]">
                <div className="space-y-6 p-6">
                  <div>
                    <h3 className="font-serif text-2xl font-bold tracking-[-0.02em] text-[var(--color-text)]">
                      {active.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {active.description}
                    </p>
                  </div>
                  <PropTable label="Props (du bringer)" rows={active.props} />
                  <PropTable label="Output (vi leverer)" rows={active.output} accent />
                  <Link
                    href={active.href}
                    className="group inline-flex items-center gap-1.5 font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.16em] text-[var(--color-text)] hover:text-[#0a0a0a]"
                  >
                    Les mer om {active.tabLabel}
                    <ArrowUpRight
                      aria-hidden
                      className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ transitionTimingFunction: EASE }}
                    />
                  </Link>
                </div>
                <div className="relative min-h-[280px] border-t border-[var(--color-border)] bg-[var(--color-bg)] md:border-l md:border-t-0">
                  <Image
                    src={active.image}
                    alt={active.title}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

function PropTable({
  label,
  rows,
  accent = false,
}: {
  label: string;
  rows: Array<{ key: string; value: string }>;
  accent?: boolean;
}) {
  return (
    <div>
      <p className="font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
        {label}
      </p>
      <dl className="mt-2 divide-y divide-[var(--color-border)] border-t border-[var(--color-border)]">
        {rows.map((row) => (
          <div key={row.key} className="grid grid-cols-[120px_1fr] gap-3 py-2">
            <dt className="font-[family-name:var(--font-geist-mono)] text-xs text-[var(--color-text-muted)]">
              {row.key}:
            </dt>
            <dd
              className={`font-serif text-sm ${accent ? "text-[var(--color-text)]" : "text-[var(--color-text)]"}`}
            >
              {row.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
```

- [ ] **Step 3: Build and typecheck**

```bash
npm run build
```
Expected: zero TS errors.

- [ ] **Step 4: Visual verification**

Start the dev server, visit the homepage, verify:
- Desktop: vertical tab rail on left, panel on right with two-column inner layout (props/output on left, image on right)
- Tab click switches the active panel with a fade
- Active tab has yellow left rail (desktop) or yellow bottom rail (mobile)
- "live" status pill renders with green dot
- Mobile: tab rail wraps horizontally, panel stacks below

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/service-feature-steps.tsx
git commit -m "feat: services as IDE-style module tabs (white-section spec-sheet)"
```

---

## Chunk 4: Blog → Index

### Task 5: Rewrite blog-articles as a typographic index

**Files:**
- Modify: `src/components/sections/blog-articles.tsx` (full rewrite)

- [ ] **Step 1: Inspect the blog data shape and the existing featured-posts selection**

Open `src/components/sections/blog-articles.tsx` and `src/lib/content/blog/`. Note how `FEATURED_POSTS` is derived (probably first 3 of `BLOG_POSTS`), what fields are available on each post (slug, title, excerpt, readingTime, category, coverImage), and the existing total post count.

```bash
grep -nE "slug|title|readingTime|coverImage|category" src/lib/content/blog/posts.ts 2>/dev/null | head -10 || \
grep -nE "slug|title|readingTime|coverImage|category" src/lib/content/blog/*.ts | head -20
```

- [ ] **Step 2: Replace the component body**

Overwrite `src/components/sections/blog-articles.tsx`. The exact import path for blog posts is whatever the current file uses — keep it the same. The component below assumes named exports `BLOG_POSTS` and `FEATURED_POSTS` (adjust to whatever the file imports).

```tsx
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import { BLOG_POSTS, FEATURED_POSTS } from "@/lib/content/blog";

const EASE = "cubic-bezier(0.23,1,0.32,1)";

export function BlogArticles() {
  const totalCount = BLOG_POSTS.length;
  const featuredCount = FEATURED_POSTS.length;

  return (
    <section className="bg-white px-6 py-20 sm:py-28 md:py-32">
      <div className="mx-auto max-w-6xl">
        <AnimateIn className="mb-14 max-w-2xl">
          <p className="flex items-center gap-3 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
            ~/blogg · {featuredCount} of {totalCount} articles
          </p>
          <h2 className="mt-7 font-serif text-[var(--color-text)]">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[var(--color-text)]/65">
              Fra
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                bloggen
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#F4CE14]"
                />
              </span>
              .
            </span>
          </h2>
        </AnimateIn>

        <AnimateIn>
          <ol className="border-y border-[var(--color-border)]">
            {FEATURED_POSTS.map((post, i) => (
              <li
                key={post.slug}
                className="border-b border-[var(--color-border)] last:border-b-0"
              >
                <Link
                  href={`/blogg/${post.slug}`}
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 gap-y-2 px-1 py-6 transition-colors duration-200 hover:bg-[var(--color-text)]/[0.02] sm:grid-cols-[auto_auto_1fr_auto] sm:gap-x-6"
                  style={{ transitionTimingFunction: EASE }}
                >
                  <span className="font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
                    §{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="hidden font-[family-name:var(--font-geist-mono)] text-xs text-[var(--color-text-muted)] sm:inline">
                    {post.slug}.mdx
                  </span>
                  <span className="col-start-1 col-end-[-1] sm:col-start-3 sm:col-end-4">
                    <span className="block font-serif text-xl font-bold tracking-[-0.015em] text-[var(--color-text)] transition-[text-decoration] group-hover:underline group-hover:decoration-[#F4CE14] group-hover:decoration-2 group-hover:underline-offset-4 sm:text-2xl">
                      {post.title}
                    </span>
                    {post.excerpt && (
                      <span className="mt-1 hidden text-sm leading-relaxed text-[var(--color-text-muted)] md:block">
                        {post.excerpt}
                      </span>
                    )}
                  </span>
                  <span className="col-start-2 col-end-[-1] flex items-center gap-3 justify-self-end sm:col-start-4 sm:col-end-5">
                    <span className="hidden font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.16em] text-[var(--color-text-muted)] sm:inline">
                      {post.readingTime} min
                    </span>
                    {post.coverImage && (
                      <span className="relative h-10 w-10 overflow-hidden rounded-md border border-[var(--color-border)] opacity-70 transition-opacity duration-200 group-hover:opacity-100">
                        <Image
                          src={post.coverImage}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </span>
                    )}
                    <ArrowUpRight
                      aria-hidden
                      className="h-3.5 w-3.5 text-[var(--color-text-muted)] opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      style={{ transitionTimingFunction: EASE }}
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </AnimateIn>

        <AnimateIn className="mt-10 flex justify-center" delay={0.15}>
          <Link
            href="/blogg"
            className="group inline-flex items-center gap-2 font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.18em] text-[var(--color-text)] hover:text-[#0a0a0a]"
          >
            Les flere artikler
            <ArrowUpRight
              aria-hidden
              className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              style={{ transitionTimingFunction: EASE }}
            />
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Resolve any data-shape mismatches**

If the build fails because `coverImage` or `readingTime` or `excerpt` don't exist on a post, inspect the actual shape:
```bash
grep -nE "readingTime|coverImage|excerpt" src/lib/content/blog/*.ts | head
```
Then adjust the field name in the component. If `readingTime` is e.g. `{ minutes: 4 }`, use `post.readingTime.minutes`. If `FEATURED_POSTS` isn't exported, derive it inline: `const FEATURED_POSTS = BLOG_POSTS.slice(0, 3);`.

- [ ] **Step 4: Build**

```bash
npm run build
```
Expected: zero TS errors.

- [ ] **Step 5: Visual verification**

Verify in browser:
- Three rows, each with `§01` / slug / title / reading time / thumbnail / arrow
- Hover row: yellow underline appears on title, thumbnail brightens, arrow slides in
- Mobile: thumbnails always visible, slug filename hidden, excerpt hidden, section number visible

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/blog-articles.tsx
git commit -m "feat: blog articles as typographic index (white-section spec-sheet)"
```

---

## Chunk 5: FAQ → Specs

### Task 6: Restyle faq-teaser with spec-sheet chrome and cross-links

**Files:**
- Modify: `src/lib/content/homepage.ts` (add optional `relatedPostSlug` field)
- Modify: `src/components/sections/faq-teaser.tsx` (chrome restyle, keep AnimatePresence behavior)

- [ ] **Step 1: Add optional cross-link slugs to FAQ data**

Open `src/lib/content/homepage.ts`, find `FAQ_TEASER_ITEMS`. Add an optional `relatedPostSlug?: string` to the existing items where it makes sense. Example shape after edit (adjust `relatedPostSlug` values to real blog post slugs that exist in `BLOG_POSTS` — verify with `grep -nE "slug:" src/lib/content/blog/posts.ts | head`):

```typescript
export const FAQ_TEASER_ITEMS = [
  {
    question: "Hvor lang tid tar det å lage en nettside?",
    answer: "...",
    relatedPostSlug: "tegn-paa-ny-nettside",
  },
  {
    question: "Hva koster en nettside?",
    answer: "...",
    relatedPostSlug: "hva-koster-en-nettside",
  },
  {
    question: "Hva hvis jeg allerede har en nettside?",
    answer: "...",
    // no relatedPostSlug — footnote row will not render
  },
  // ...etc
] as const;
```

If the existing `FAQ_TEASER_ITEMS` is typed via an explicit type alias, also update the alias to include `relatedPostSlug?: string`.

- [ ] **Step 2: Restyle faq-teaser.tsx**

Open `src/components/sections/faq-teaser.tsx`. Keep all existing Motion/AnimatePresence behavior (don't touch the open/close animation). Replace ONLY:
- The section header kicker (use the new `~/faq · N entries` mono format)
- The question prefix (add `Q.0N — ` mono prefix in front of the serif question)
- The hairline rules between items (use `border-b border-[var(--color-border)]` instead of any existing divider)
- The toggle icon (use `+` / `−` mono characters instead of any current icon)
- The answer body (when open, render any cross-link footnote at the bottom)

Concrete diffs:

**a)** Replace the section header kicker. Find the existing mono-kicker `<p>` near the top of the component (similar to portfolio's pattern) and update it to:
```tsx
<p className="flex items-center gap-3 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.22em] text-[var(--color-text-muted)]">
  <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]" />
  ~/faq · {FAQ_TEASER_ITEMS.length} entries
</p>
```

**b)** Inside the per-item button (the row that toggles the accordion), wrap the question with the `Q.0N — ` prefix:
```tsx
<button
  type="button"
  onClick={() => toggle(i)}
  className="flex w-full items-start gap-4 py-5 text-left"
>
  <span className="mt-1 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.18em] text-[var(--color-text-muted)]">
    Q.{String(i + 1).padStart(2, "0")}
  </span>
  <span className="flex-1 font-serif text-lg font-medium leading-snug text-[var(--color-text)] sm:text-xl">
    {item.question}
  </span>
  <span
    aria-hidden
    className={`mt-1 font-[family-name:var(--font-geist-mono)] text-xl text-[var(--color-text-muted)] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
    style={{ transitionTimingFunction: "cubic-bezier(0.23,1,0.32,1)" }}
  >
    +
  </span>
</button>
```

**c)** Replace the dividers between items with `border-b border-[var(--color-border)]` on each `<li>`, and add `border-t` to the parent `<ul>`/`<ol>` so the top edge is rendered.

**d)** Inside the open-state answer body (within the AnimatePresence motion.div), after the answer paragraph, conditionally render a footnote-style link:
```tsx
{item.relatedPostSlug && (
  <div className="mt-4 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.18em]">
    <span className="text-[var(--color-text-muted)]">[ref]</span>{" "}
    <Link
      href={`/blogg/${item.relatedPostSlug}`}
      className="text-[var(--color-text)] underline decoration-[#F4CE14] decoration-2 underline-offset-4 hover:decoration-[#D4B200]"
    >
      Les mer: {item.relatedPostSlug}.mdx →
    </Link>
  </div>
)}
```

(Ensure `import Link from "next/link";` is present at the top of the file.)

- [ ] **Step 3: Build**

```bash
npm run build
```
Expected: zero TS errors. If any TS error mentions `relatedPostSlug`, double-check that the FAQ items array's literal type allows the optional field (you may need `as const` to be loosened, or add an explicit type annotation).

- [ ] **Step 4: Visual verification**

In the browser, verify:
- Kicker reads `~/faq · 4 entries` (or however many entries exist)
- Each row shows `Q.01 — <question>` with mono prefix in a different visual register from the serif question
- Click row: `+` rotates 45° to `×`, answer slides open
- Items with `relatedPostSlug` show a `[ref] Les mer: <slug>.mdx →` row at the bottom of the open answer
- Items without `relatedPostSlug` do NOT show that row

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/faq-teaser.tsx src/lib/content/homepage.ts
git commit -m "feat: faq teaser as documented spec with cross-links (white-section spec-sheet)"
```

---

## Chunk 6: CTA → Ship it

### Task 7: Restyle cta-section as a deploy-pipeline form

**Files:**
- Modify: `src/components/sections/cta-section.tsx` (chrome restyle around existing ContactForm)

- [ ] **Step 1: Read the current section**

```bash
cat src/components/sections/cta-section.tsx
```
Note: the existing `<ContactForm variant="light" />` (or similar) is preserved. We only change the wrapping chrome and surrounding labels.

- [ ] **Step 2: Replace the component body**

Overwrite `src/components/sections/cta-section.tsx` with:

```tsx
import { AnimateIn } from "@/components/ui/animate-in";
import { ContactForm } from "@/components/ui/contact-form";
import { FINAL_CTA } from "@/lib/content/homepage";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-accent)] px-6 py-24 sm:py-32">
      {/* softened background — radial dot grid is preserved but quieter */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(10,10,10,0.5) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 -bottom-32 h-[420px] w-[420px] rounded-full bg-[#0a0a0a]/[0.12] blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl">
        <AnimateIn>
          <p className="flex items-center gap-3 font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.22em] text-[#0a0a0a]/65">
            <span aria-hidden className="inline-block h-px w-8 bg-[#0a0a0a]/40" />
            ~/contact · new project
          </p>
          <h2 className="mt-7 font-serif text-[#0a0a0a]">
            <span className="block text-[clamp(2.25rem,6vw,4.25rem)] font-black leading-[0.95] tracking-[-0.03em]">
              {FINAL_CTA.headline}
            </span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#0a0a0a]/75 sm:text-lg">
            {FINAL_CTA.description}
          </p>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <div className="mt-12 overflow-hidden rounded-xl border border-[#0a0a0a]/15 bg-[#fafaf9] shadow-[0_30px_80px_-30px_rgba(10,10,10,0.35)]">
            <div className="flex items-center gap-3 border-b border-[#0a0a0a]/10 bg-white px-4 py-2.5">
              <span className="font-[family-name:var(--font-geist-mono)] text-[11px] text-[var(--color-text-muted)]">
                new-project.json
              </span>
              <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-[#F4CE14] bg-[#F4CE14]/20 px-2 py-0.5 font-[family-name:var(--font-geist-mono)] text-[10px] uppercase tracking-[0.12em] text-[#7a5a00]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4B200]" />
                draft
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <ContactForm variant="light" />
            </div>
          </div>
        </AnimateIn>

        {FINAL_CTA.secondaryText && (
          <AnimateIn delay={0.2}>
            <p className="mt-6 text-center font-[family-name:var(--font-geist-mono)] text-[11px] uppercase tracking-[0.18em] text-[#0a0a0a]/65">
              {FINAL_CTA.secondaryText}
            </p>
          </AnimateIn>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Check the ContactForm variant prop name**

The above uses `variant="light"`. Confirm that's the prop the component supports:
```bash
grep -nE "variant|VariantProps" src/components/ui/contact-form.tsx | head
```
If the prop is named differently (e.g. `theme`, `mode`), update the JSX accordingly. If no variant prop exists, omit it.

- [ ] **Step 4: Build**

```bash
npm run build
```
Expected: zero TS errors.

- [ ] **Step 5: Visual verification**

In the browser:
- Yellow background is preserved, but dot grid and radial glow are dialed down — the form "card" reads as the focal point
- Card has a top bar: `new-project.json` filename + yellow `draft` status pill
- Form inputs render inside the card (no boxed border around the form itself — the card IS the border)
- Mobile: card stays inside the section margin, no horizontal overflow

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/cta-section.tsx
git commit -m "feat: cta as deploy-pipeline form (white-section spec-sheet)"
```

---

## Chunk 7: Final audit & verification

### Task 8: Run the web-design-guidelines audit pass

**Files:** none — read-only audit.

- [ ] **Step 1: Invoke the audit skill**

Run the `web-design-guidelines` skill on the homepage code. Specifically have it review:
- `src/components/sections/portfolio-showcase.tsx`
- `src/components/sections/service-feature-steps.tsx`
- `src/components/sections/blog-articles.tsx`
- `src/components/sections/faq-teaser.tsx`
- `src/components/sections/cta-section.tsx`

The audit should check for: accessibility (focus rings, contrast, keyboard nav), responsive integrity at 320/768/1024/1440px, motion-reduce compliance, semantic HTML, and any anti-patterns from the Web Interface Guidelines.

- [ ] **Step 2: Fix any high-priority issues inline**

If the audit surfaces issues, fix them in the corresponding section file and commit with a `fix:` prefix message. Skip nits and stylistic suggestions — fix only correctness, accessibility, or motion issues.

### Task 9: Browser verification across breakpoints

**Files:** none — visual check.

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Use preview tools to check each breakpoint**

Using `preview_start` and `preview_resize` (or equivalent), check the homepage at:
- 1440px (desktop)
- 1024px (laptop)
- 768px (tablet)
- 375px (mobile)

For each viewport, scroll through the page and confirm:
- Portfolio: rows + preview pane (desktop) vs stacked rows (mobile)
- Services: tabs vertical (desktop) vs horizontal-scroll (mobile)
- Blog: full row metadata (desktop) vs compact rows (mobile)
- FAQ: cross-links visible on open items
- CTA: card stays bounded

- [ ] **Step 3: Reduced-motion smoke test**

In Chrome DevTools, set Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`. Reload. Confirm:
- No fade/slide animations on scroll
- Tab switches are instant
- FAQ accordion opens without height animation (or with minimal one)
- Status dots don't pulse (or pulse less)

- [ ] **Step 4: Keyboard-only walk**

Tab through the homepage. Confirm focus indicators are visible on:
- Each portfolio row
- Each service tab
- Each blog row
- Each FAQ toggle
- Each form field

- [ ] **Step 5: Screenshot proof for user review**

Use `preview_screenshot` to capture each section at desktop. Save or share the screenshots with the user.

### Task 10: User sign-off and merge

- [ ] **Step 1: Show screenshots to user**

Present screenshots of the five redesigned sections. Note that each section is on its own commit.

- [ ] **Step 2: If user approves all:**

```bash
git checkout main
git merge --no-ff redesign/white-sections-spec-sheet
```

- [ ] **Step 3: If user approves some but not others:**

For sections to discard, identify their commits (`git log --oneline redesign/white-sections-spec-sheet`) and revert them on the branch BEFORE merging:
```bash
git checkout redesign/white-sections-spec-sheet
git revert <sha-of-section-to-discard>
```
Then merge.

- [ ] **Step 4: If user rejects the whole redesign:**

```bash
git checkout main
git branch -D redesign/white-sections-spec-sheet
```
(Only on user's explicit request — the branch represents real work and shouldn't be deleted by default.)

---

## Self-review notes

**Spec coverage:**
- Geist Mono wiring → Task 1, 2 ✓
- Portfolio "Deployments" → Task 3 ✓
- Services "Modules" → Task 4 ✓
- Blog "Index" → Task 5 ✓
- FAQ "Specs" + cross-links → Task 6 ✓
- CTA "Ship it" → Task 7 ✓
- One-commit-per-section reversibility → enforced by Tasks 0, 3, 4, 5, 6, 7 ✓
- web-design-guidelines audit → Task 8 ✓
- Reduced-motion + responsive verification → Task 9 ✓
- User sign-off path → Task 10 ✓

**Known unknowns the executor must resolve at runtime:**
1. The exact field shape on blog posts (`readingTime` vs `readingTime.minutes`, `coverImage` vs `cover_image`, etc.) — Task 5 Step 3 calls this out explicitly.
2. The `ContactForm` variant prop name — Task 7 Step 3 calls this out explicitly.
3. The number of FAQ items currently in the data (used to build the kicker `· N entries`) — derived at render time, no hardcoding.
4. Which blog slugs exist for FAQ cross-links — Task 6 Step 1 calls out the grep to verify.

These are correctly handled inline rather than guessed in the plan.
