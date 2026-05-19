# White-section redesign — Spec-Sheet motif

**Status:** Draft (awaiting user approval)
**Date:** 2026-05-19
**Branch:** `redesign/white-sections-spec-sheet` (to be created)

## Goal

Apply the same creative bar to the landing-page white sections that the recently-shipped dark sections have, while giving the whites a coherent counter-voice. Dark sections demonstrate flashy capability ("look at this wizardry"); whites should demonstrate professional craftsmanship ("look at this discipline"). The result is a page that alternates between two visual worlds talking to each other rather than five solo "wow" moments back-to-back.

## Motif: Technical spec-sheet

The whites read like documentation pages from a well-built engineering team — Sanity, Vercel, Stripe-docs adjacent. Each section uses the same vocabulary:

- **Mono everywhere** as supporting chrome — filenames, status pills, dimensional ticks, metadata, footnotes
- **Hairline rules** (`1px` `var(--color-border)`) as section dividers with measurement ticks
- **Numbered sections** (`§01`, `§02`…) or filename-style labels (`portfolio.tsx`)
- **Exposed metadata** — read-times, deploy dates, line counts, status dots
- **Yellow accent dialed way down** vs. dark sections — used as single-pixel rails, dot accents, status pills, never as broad-stroke underline
- **Headlines stay in the same serif** as dark sections (continuity); mono carries the new vocabulary

The dark sections keep their existing serif headlines + mono kicker labels. The whites add a heavier mono presence and the spec-sheet chrome.

## Reversibility

Per user requirement: **everything must be revertible if any section lands wrong**.

Implementation strategy:
1. Work on a new branch `redesign/white-sections-spec-sheet` (no direct work on `main`).
2. **One commit per section.** Sections are independent files; each commit touches a single component plus its tokens-of-use. A bad section reverts cleanly without affecting the others.
3. The Geist Mono wiring is a separate first commit. If we abandon the whole redesign, that commit can stay or revert — it doesn't hurt either way.
4. No data-shape changes to `homepage.ts`, `portfolio.ts`, or `portfolio-sites.ts`. New static text needed for spec-sheet chrome lives inside each component for now. If the redesign is kept, we lift it to the content files in a follow-up.

Verification: after each commit, `git revert <sha>` produces the previous-design state with no orphaned imports.

## Typography

Add **Geist Mono** (Google Fonts) alongside the existing stack. Wired the same way other fonts are loaded — `next/font/google` in `layout.tsx`, exposed as a CSS variable in `globals.css`, registered as a Tailwind `font-mono-alt` token in `@theme inline`.

Usage rules:
- **Geist Mono** (NEW) — all white-section spec-sheet chrome: filenames, metadata, status pills, dimensional ticks, footnotes, console-style elements. Exposed as `--font-geist-mono` CSS variable; available in Tailwind as `font-mono-alt` (or similar token).
- **JetBrains Mono** (existing, `--font-code` / `--font-mono`) — kept for dark sections' eyebrow labels and any code blocks. Not used on white sections to keep the two visual worlds distinct.
- **Existing serif** (Outfit-paired display face) — section headlines, lead copy, FAQ questions. Unchanged.
- **Existing sans body** — long-form descriptions, button text. Unchanged.

Weight choices: Geist Mono 400 for ambient chrome, 500 for emphasized chrome (status pills, active tab), 600 sparingly.

## Per-section concepts

Each concept is described as: **the metaphor** → **what the user sees** → **interactions** → **fallback / reduced-motion behavior**.

### 1. `portfolio-showcase.tsx` → **"Deployments"**

**Metaphor:** Each portfolio item is a row in a `vercel deploy` log.

**What the user sees:**
- Section header (left): mono kicker `~/portfolio · 5 deployments shown` · serif headline (kept) · serif subheadline (kept)
- A list of 5 rows, each row laid out as a horizontal record:
  - Status dot (green pulse) `Ready`
  - `clients/<id>` in mono (e.g. `clients/ringebu-tannlegesenter`)
  - Industry in mono muted (e.g. `helse · tannlege`)
  - Live domain in mono with hover underline (e.g. `ringebutannlegesenter.no`)
  - Hairline rule between rows
- One row is "active" by default (the first); active row's left rail is yellow.
- Right-side panel shows the active row's screenshot (using existing `desktop` image from `PORTFOLIO_SITES`) with a thin browser-chrome frame (URL bar shows the live domain).
- Mobile fallback: drops the right-panel preview; rows stack with the screenshot below as a small thumbnail.

**Interactions:**
- Hover on a row → row's left rail animates yellow, the right-panel preview cross-fades to that row's screenshot (300ms, EASE).
- Click on a row → navigates to `/referanser#<id>`.
- "See all deployments →" CTA below the list, kept as the existing pattern.

**Reduced-motion / mobile:**
- `prefers-reduced-motion` → no cross-fade, the preview swaps instantly.
- Mobile (<lg) → drop the side preview; rows render as compact cards with a small inline thumbnail.

**Honest-data note:** the row metadata uses only **real** facts: client name, industry (from `PORTFOLIO_SITES.industry` via `PROJECTS`), live domain. **No fabricated Lighthouse scores or LCP values.** If we want metric callouts later we run PageSpeed Insights once and bake in real numbers, but for v1 the row is name/industry/domain + status — already enough density.

### 2. `service-feature-steps.tsx` → **"Modules"**

**Metaphor:** Three services are three importable modules in an IDE inspector.

**What the user sees:**
- Section header: mono kicker `~/services · 3 modules` · serif headline · serif subheadline
- Two-column layout:
  - **Left rail (~30%)**: vertical tab list of three modules. Each tab is: `<Service.Nettsider />` in mono, with a one-line serif description below in muted color. Active tab has a yellow vertical bar on its left edge.
  - **Right panel (~70%)**: active module's content. Inside the panel:
    - Top bar: mono filename `services/nettsider.tsx` + status pill `live`
    - Body: a `Props` table (what you bring — e.g. "bedriftsnavn", "innhold", "frist") and an `Output` table (what we deliver — e.g. "ferdig nettside", "SEO-grunnstruktur", "CMS-tilgang"). Mono keys, serif values.
    - Demo: the existing service hero image cropped into the panel.
- Mobile fallback: left rail collapses to horizontal chips at the top; right panel becomes full-width below.

**Interactions:**
- Click a tab → active state moves, content cross-fades (EASE, 350ms), left-rail underline slides between tabs.
- **No autoplay.** The current 4000ms autorotate is replaced by user-driven interaction — "professional" defaults to user-controlled.
- Hover on a tab → tab text shifts color subtly (mono dim → mono regular).

**Reduced-motion:**
- `prefers-reduced-motion` → cross-fade becomes instant swap; left-rail underline becomes a static jump.

**Content note:** `Props` and `Output` tables are short — 3 rows each. Content lives inline in the component for v1; can be lifted to `homepage.ts` `SERVICES_OVERVIEW` if approved.

### 3. `blog-articles.tsx` → **"Index"**

**Metaphor:** A printed `README.md` table-of-contents of recent articles.

**What the user sees:**
- Section header: mono kicker `~/blogg · 3 of 12 articles` · serif headline · subheadline
- A list of 3 rows. Each row:
  - Far-left: mono section number `§01`
  - Center-left: mono filename `hva-koster-en-nettside.mdx`
  - Center-right: serif post title
  - Right: mono metadata `4 min read · prising`
  - Hairline rule between rows.
- No big card images. The current Unsplash-driven cards are replaced by a typographic index.
- Below the list: serif "Les flere artikler →" link.

**Interactions:**
- Hover on a row → row's serif title shifts to underlined; a small thumbnail (40×40 round-corner) of the post's cover slides in from the right edge with 250ms EASE, sitting in the otherwise-empty margin.
- Click → goes to the post.

**Reduced-motion:**
- `prefers-reduced-motion` → thumbnail appears instantly (no slide), no underline animation.

**Mobile fallback:**
- Thumbnails always visible (not hover-revealed) at small size next to the row.
- Section numbers and filenames stack above the title.

**Why this is better than current:** removes generic Unsplash photography (a key AI-slop signal); makes the section feel like a curated index rather than a card grid; aligns with the "we write — read our docs" voice.

### 4. `faq-teaser.tsx` → **"Specs"**

**Metaphor:** Each FAQ is a spec entry in a documentation page.

**What the user sees:**
- Section header: mono kicker `~/faq · 4 entries` · serif headline · subheadline
- Each FAQ item:
  - Closed state: mono prefix `Q.01 — ` in muted color, then question in serif. Right edge: a mono `+` toggle.
  - Open state: question stays, then a documented answer below in body sans, with mono `→` arrows for any bullet points. At the bottom of the answer, an optional footnote-style cross-link: `[ref] Les mer: tegn-paa-ny-nettside.mdx →` — linking the answer to a related blog post when one exists.
  - Hairline rules between items, with small dimensional ticks at section ends.
- Bottom: serif "Se alle ofte stilte spørsmål →" link.

**Interactions:**
- Click question → answer slides open (existing AnimatePresence height animation, kept), `+` rotates to `−`.
- Cross-link `[ref]` is a real anchor to the blog post.

**Reduced-motion:**
- Existing FAQ accordion already respects reduced-motion via Motion library; preserved.

**Content note:** The cross-links are valuable. We add an optional `relatedPostSlug` field to `FAQ_TEASER_ITEMS` (not breaking — optional). Where unset, the `[ref]` row is omitted. I'll seed 2–3 of the 4 with real cross-links to the existing blog posts.

### 5. `cta-section.tsx` → **"Ship it"**

**Metaphor:** The contact form looks like the final step of a deploy pipeline.

**What the user sees:**
- Background: keeps the yellow `--color-accent`. The dot-grid and radial glows are softened (lower opacity) so the spec-sheet chrome reads cleanly.
- Header: mono `~/contact · new project` + serif headline (kept) + serif description (kept).
- Form area: rendered as a "config object" being filled. The visible chrome:
  - Top bar with mono filename `new-project.json` + status pill `draft`
  - Below: the existing `ContactForm` fields, but labels become mono key-style — `navn:`, `epost:`, `prosjekt:`, `melding:`. Inputs styled with hairline bottom rule, no boxed borders (so it reads more "data being entered" than "form").
  - Submit button: `→ Send forespørsel` with a tiny status dot to its left. On submit, status pill transitions `draft → submitted` (color flip yellow → green), copy flips to `→ Sendt`. (No JS rewrite — uses the existing ContactForm success state, just restyled.)
- Bottom margin: tiny mono footer `secondaryText` content (unchanged copy, restyled).

**Interactions:**
- Field focus → label color brightens, hairline bottom rule turns yellow with a 250ms width animation (left→right).
- Submit → existing form behavior. Visual flip on success state.

**Reduced-motion:**
- `prefers-reduced-motion` → field-focus rule appears instantly; status pill transitions instantly.

**What this preserves:** All existing form logic. We're restyling the chrome and labels — not rewiring the submission, validation, or success handling.

## Easing & motion primitives

Reuse exactly what the dark sections use:
- **Primary easing:** `cubic-bezier(0.23, 1, 0.32, 1)` (the EASE constant)
- **Stagger increments:** 50ms between items in lists, 70ms between hero words
- **Reveal duration:** 0.6s for section-entrance fades, 0.3–0.35s for hover state changes
- **`prefersReducedMotion` check:** every animated component imports and respects it (matches process-section.tsx pattern)
- **Transform/opacity only:** no layout-thrash properties animated. Heights animate via Motion's `AnimatePresence` only where it already works (FAQ accordion).
- **No mouse-tracking on whites.** The dark hero's mouse-reactive grid is THE flashy mechanic; whites are deliberately quieter. The only "live" feel on whites is the active-row preview on portfolio.

## Yellow accent — discipline rules

The dark sections deploy yellow at high intensity (broad underlines, glows, divider lines). On whites, yellow is rationed:

- ✅ Single-pixel vertical rails on active items
- ✅ Status pills (deployed, live)
- ✅ Field-focus underline animation
- ✅ Inline footnote/reference markers
- ❌ No broad-stroke underlines spanning whole headlines
- ❌ No radial glows / mesh gradients (except the existing CTA section's softened background)
- ❌ No yellow large-area fills (except CTA section background, kept)

This is the "highlighter mark, not paint stripe" rule.

## Files touched

**New:**
- (none — no new files; all changes are in-place restyles of existing components)

**Modified:**
- `src/app/layout.tsx` — load `Geist_Mono` via `next/font/google` (alongside the existing `Outfit` + `JetBrains_Mono` imports); expose its CSS variable on `<html>`.
- `src/app/globals.css` — register a new `--font-geist-mono` variable in `@theme inline` so Tailwind can address it as a `font-mono-alt` token.
- `src/components/sections/portfolio-showcase.tsx` — full rewrite of internals (FeatureCarousel removed, replaced by Deployments list).
- `src/components/sections/service-feature-steps.tsx` — full rewrite of internals (FeatureSteps carousel replaced by tab+module pattern).
- `src/components/sections/blog-articles.tsx` — full rewrite of internals (masonry → index list).
- `src/components/sections/faq-teaser.tsx` — restyle (keep AnimatePresence behavior, change chrome + add cross-link affordance).
- `src/components/sections/cta-section.tsx` — restyle (keep ContactForm, change wrapping chrome and labels).
- `src/lib/content/homepage.ts` — add optional `relatedPostSlug?: string` field to `FAQ_TEASER_ITEMS` items.

**Decision deferred to implementation:**
- `src/components/ui/contact-form.tsx` — only touch if the "config object" label styling can't be achieved via wrapper-level className overrides. Preference: leave the form component untouched and restyle from the wrapping section.

**NOT touched:**
- Dark sections (`hero-section.tsx`, `comparison-bento.tsx`, `process-section.tsx`, `pricing-preview.tsx`) — user explicitly wants them kept as-is.
- `client-logos.tsx`, `social-proof-bar.tsx`, etc. — out of scope.

## Acceptance criteria

After all 5 sections are landed:

1. ✅ `npm run build` passes with zero TypeScript errors.
2. ✅ Each section renders correctly at 320px, 768px, 1024px, 1440px viewports.
3. ✅ `prefers-reduced-motion: reduce` disables all transforms; content remains usable.
4. ✅ Keyboard navigation works for all interactive elements (portfolio rows, service tabs, FAQ toggles, form fields).
5. ✅ Each section is independently revertible — `git revert <sha>` of any one section's commit leaves the others working.
6. ✅ No fabricated metrics, scores, or social-proof numbers appear anywhere on the page.
7. ✅ Lighthouse Performance score on the homepage stays within 2 points of current baseline.
8. ✅ Web Interface Guidelines audit pass (`web-design-guidelines` skill) — final design pass before declaring done.

## Out of scope (explicit YAGNI)

- Lighthouse / LCP / PSI badges on portfolio rows — defer until we want to maintain real numbers.
- Animated "log streaming" effect on portfolio (typewriter rows revealing one by one) — overkill for the scroll; static rows with hover state is enough.
- Theming the existing `ContactForm` deep internals — only chrome around it.
- Lifting service Props/Output content to `homepage.ts` for v1 — keep inline; lift in follow-up if approved.
- Adding a 12-col grid overlay (visible-on-hover guides) — would be Phase 1 editorial motif (option A); we chose B.

## Verification protocol

After all sections land, before declaring done:

1. `npm run build` + zero TS errors.
2. `preview_start` + walk each section at desktop and mobile widths.
3. `preview_screenshot` each section, dark/light context preserved.
4. Run `web-design-guidelines` skill against the final pages.
5. Quick keyboard-only walk of the page to confirm focus order and visible focus rings.
6. Confirm with the user via screenshots before merging to `main`.
