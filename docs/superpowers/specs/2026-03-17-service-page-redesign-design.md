# Service Page Redesign — Bold Dark Bento

**Date:** 2026-03-17
**Status:** Approved
**Scope:** All 6 service detail pages (`/tjenester/[slug]`)

## Summary

Complete visual redesign of all 6 service detail pages (nettside, nettbutikk, seo, markedsforing, vedlikehold, design). The current pages use a flat, repetitive layout with emoji icons and placeholder geometric shapes. The redesign adopts a **Bold Dark Bento** aesthetic with an **8-section conversion flow** and **per-service customization**.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Visual direction | Bold Dark Bento | High-contrast, tech-forward, agency-appropriate |
| Section count | 8-section conversion flow | Full sales funnel: hook → agitate → solve → prove → close |
| Service differentiation | Per-service custom visuals | Each page gets unique visual elements tailored to that service |
| Icons | Lucide React SVGs | Replace all emoji icons with proper SVG icons |
| Color rhythm | Alternating dark/light sections | Creates visual cadence and prevents monotony |

## Brand Constants (unchanged)

- **Accent:** `#F4CE14` (gold), hover: `#D4B200`
- **Dark palette:** `--color-dark-bg: #0F172A`, `--color-dark-bg-alt: #1E293B`
- **Light palette:** `--color-bg: #F5F7F8`, `--color-bg-alt: #E8EBEC`
- **Text:** `#45474B` (light mode), `#F1F5F9` (dark mode)
- **Fonts:** Crimson Pro (headings), Outfit (body), JetBrains Mono (code)

## Page Assembly Order

The `[slug]/page.tsx` renders these 8 sections in this exact order:

```tsx
<main>
  <ServiceHero service={service} />
  <ServicePainPoints service={service} />
  <ServiceBentoFeatures features={service.detailedFeatures} />
  <ServiceCustomSection service={service} />
  <ServiceProcess steps={service.processSteps} />
  <ServiceTestimonial testimonial={TESTIMONIALS[SERVICE_TESTIMONIAL_MAP[slug] ?? 0]} />
  <ServiceFaq faq={service.faq} />
  <ServiceCta />
</main>
```

## Section Architecture (8 sections per page)

### Section 1: Dark Hero
- **Background:** Dark slate gradient (`#0F172A` → `#1E293B`)
- **Layout:** Centered, with subtle radial gold glow at top
- **Elements:**
  - Service category pill/tag from `service.categoryTag` (e.g., "Nettsider", "SEO") with gold border
  - Large Crimson Pro title from `service.title` (4xl–6xl, font-weight 800)
  - Subtitle from `service.shortDescription` in muted text
  - Gold CTA button: "Få et uforpliktende tilbud"
  - Trust stats bar from `service.trustStats` (3 metrics with count-up animation): separated by subtle border-top
- **Animation:** Stats count up on scroll-into-view
- **Note:** Absorbs the current `service-trust-bar.tsx` — that component is no longer needed separately

### Section 2: Pain Points / Problem Agitation
- **Background:** Light (`#F5F7F8`)
- **Layout:** Centered heading + vertical list of 3 pain-point cards
- **Elements:**
  - Heading: "Hvorfor trenger du [service.title.toLowerCase()]?"
  - Explanatory paragraph (repurposed from `service.longDescription`)
  - 3 cards from `service.painPoints` with red dot indicator, bold title, muted description
  - White card background with border
- **Content:** Service-specific pain points (unique per service)
- **Note:** Replaces `service-story.tsx`. Delete `service-story.tsx` after creating this component. The `longDescription` field is retained on the data model and used here as the explanatory paragraph.

### Section 3: Bento Feature Grid
- **Background:** Dark slate gradient (full-width rounded panel)
- **Layout:** 3-column bento grid with asymmetric sizing (2+1, 1+1, 1+2 pattern)
- **Elements:**
  - Section heading: "Dette inkluderer"
  - 6 glassmorphism cards with:
    - Lucide SVG icon in gold-tinted square container (rendered via dynamic `icons[feature.iconName]`)
    - Bold title
    - Muted description
  - Card variants: `bg-white/6 border-white/8` and `bg-[accent]/8 border-[accent]/15`
  - Hover: `scale-[1.02]` with smooth transition
- **Icons:** Must use `lucide-react` package — NO emojis

### Section 4: Service-Specific Custom Section
- **Background:** Light (`#F5F7F8`)
- **Rendering:** Switch on `service.id` to select the correct sub-component:

```tsx
function ServiceCustomSection({ service }: { service: Service }) {
  switch (service.id) {
    case "nettside": return <NettsideShowcase />;
    case "nettbutikk": return <NettbutikkPayments />;
    case "seo": return <SeoRanking />;
    case "markedsforing": return <MarkedsforingPlatforms />;
    case "vedlikehold": return <VedlikeholdStats />;
    case "design": return <DesignSpecimen />;
  }
}
```

- **Content varies by service:**

| Service | Sub-component | Description | Data source |
|---------|--------------|-------------|-------------|
| nettside | `NettsideShowcase` | Laptop + tablet + phone CSS mockups (no images needed) | Hardcoded in component |
| nettbutikk | `NettbutikkPayments` | Payment provider logos as inline SVGs from Simple Icons + mini checkout flow mockup | SVGs embedded in component |
| seo | `SeoRanking` | CSS-animated bar chart showing ranking improvement + keyword stat counters | Hardcoded stats |
| markedsforing | `MarkedsforingPlatforms` | Google Ads, Meta, Instagram as styled cards with SVG logos + ROI metrics | SVGs embedded in component |
| vedlikehold | `VedlikeholdStats` | 99.9% uptime, 365 backups, <2h response — count-up animated | Reuses `service.trustStats` |
| design | `DesignSpecimen` | Color swatch circles + typography specimen (Crimson Pro / Outfit preview) + 3 logo variant boxes | CSS-only, no external assets |

- **Asset strategy:** All logos (Vipps, Klarna, Google, Meta, etc.) rendered as inline SVGs sourced from [Simple Icons](https://simpleicons.org/). No image files needed. Device frames are pure CSS.
- **Note:** The existing `ServiceExtraSection` type and `extraSection` field on `Service` are **removed**. The custom section renders based on `service.id`, not a type field.

### Section 5: Process Steps
- **Background:** Dark slate gradient
- **Layout:** Horizontal 4-step timeline with arrow connectors
- **Elements:**
  - Section heading: "Slik jobber vi"
  - 4 step cards in glassmorphism containers, data from `service.processSteps`
  - Numbered circle using `step.step` (gold for first/last, muted for middle)
  - Step title + description
  - Arrow connectors (`→`) between steps in gold
- **Mobile:** Stacks vertically with vertical line connector
- **Reuses existing `ProcessStep` type** (already has `step: number`)

### Section 6: Testimonial
- **Background:** Light (`#F5F7F8`)
- **Layout:** Centered blockquote
- **Elements:**
  - "Kundeomtale" label in gold, uppercase, tracked
  - Large decorative quotation mark in gold (15% opacity)
  - Italic quote text (xl–2xl)
  - Author: avatar + name + title/company
  - 5-star rating in gold
  - Link: "Se alle referanser →"
- **Content:** Maps from existing `SERVICE_TESTIMONIAL_MAP`
- **Note:** Minor styling update only — component already works

### Section 7: FAQ Accordion (NEW)
- **Background:** Dark slate gradient
- **Layout:** Centered max-w-3xl, vertical accordion
- **Elements:**
  - Section heading: "Vanlige spørsmål"
  - 3–5 expandable question items per service from `service.faq`
  - Collapsed: glassmorphism card with question + gold `+` icon
  - Expanded: gold-tinted background, question in gold, `−` icon, answer text
  - Smooth height animation on expand/collapse
- **Client component** (needs `"use client"` for interactivity)
- **FAQ content:** Written as part of the `services.ts` data update task. Each service gets 3–4 questions covering: pricing, timeline, what's included, and ongoing support. Content written in Norwegian.

### Section 8: Final CTA
- **Background:** Light (`#F5F7F8`)
- **Layout:** Centered
- **Elements:**
  - Heading: "Klar for å komme i gang?"
  - Subtitle paragraph
  - Two buttons: Gold primary "Book en gratis samtale" + outlined secondary "Se alle tjenester"
- **Note:** Minor styling update only — component already works

## Data Model Changes

### Updated `Service` interface:
```typescript
export interface Service {
  id: string;
  title: string;
  shortDescription: string;       // → Hero subtitle
  longDescription: string;         // → Pain Points explanatory paragraph
  categoryTag: string;             // NEW — "Nettsider", "SEO", etc.
  features: string[];              // Kept for backwards compat (not rendered in new design)
  detailedFeatures: ServiceFeature[];
  painPoints: PainPoint[];         // NEW — 3 per service
  processSteps: ProcessStep[];     // NEW — reuses existing ProcessStep type
  faq: FAQ[];                      // NEW — reuses existing FAQ type, 3-4 per service
  trustStats: TrustSignal[];       // NEW — reuses existing TrustSignal type, 3 per service
  // REMOVED: extraSection — no longer needed, custom sections use service.id switch
}
```

All new fields are **required**. Content for all 6 services must be complete before the build succeeds.

### New `PainPoint` interface:
```typescript
export interface PainPoint {
  title: string;
  description: string;
}
```

### Updated `ServiceFeature` interface:
```typescript
export interface ServiceFeature {
  iconName: string;   // Lucide icon name, e.g., "smartphone", "zap", "search"
  title: string;
  description: string;
  // REMOVED: icon: string (emoji)
}
```

### Lucide icon mapping (all 36 features):

| Service | Feature | Emoji (old) | iconName (new) |
|---------|---------|-------------|----------------|
| nettside | Responsivt design | 📱 | `smartphone` |
| nettside | Lynrask hastighet | ⚡ | `zap` |
| nettside | SEO-vennlig | 🔍 | `search` |
| nettside | Kontaktskjema | ✉️ | `mail` |
| nettside | Enkel administrasjon | 🛠️ | `settings` |
| nettside | SSL og sikkerhet | 🔒 | `lock` |
| nettbutikk | Sømløs betaling | 💳 | `credit-card` |
| nettbutikk | Lagerstyring | 📦 | `package` |
| nettbutikk | Produktsøk | 🔎 | `search` |
| nettbutikk | Fraktkalkulator | 🚚 | `truck` |
| nettbutikk | Mobilhandel | 📱 | `smartphone` |
| nettbutikk | Salgsrapporter | 📊 | `chart-bar` |
| seo | Søkeordanalyse | 🔑 | `key` |
| seo | Teknisk SEO | ⚙️ | `cog` |
| seo | Innholdsoptimalisering | 📝 | `file-text` |
| seo | Lokal SEO | 📍 | `map-pin` |
| seo | Lenkebygging | 🔗 | `link` |
| seo | Månedlig rapportering | 📈 | `trending-up` |
| markedsforing | Google Ads | 🎯 | `target` |
| markedsforing | Facebook-annonsering | 📘 | `megaphone` |
| markedsforing | Instagram-annonsering | 📸 | `camera` |
| markedsforing | A/B-testing | 🧪 | `flask-conical` |
| markedsforing | Konverteringssporing | 📊 | `chart-bar` |
| markedsforing | Løpende optimalisering | 🔄 | `refresh-cw` |
| vedlikehold | Daglige sikkerhetskopier | 💾 | `hard-drive` |
| vedlikehold | Sikkerhetsovervåking | 🛡️ | `shield` |
| vedlikehold | Programvareoppdateringer | 🔄 | `refresh-cw` |
| vedlikehold | 99,9 % oppetid | ✅ | `circle-check` |
| vedlikehold | Innholdsendringer | 📝 | `file-text` |
| vedlikehold | Prioritert support | 🚀 | `headphones` |
| design | Logodesign | 🎨 | `palette` |
| design | Fargepalett | 🎨 | `pipette` |
| design | Typografi | 🔤 | `type` |
| design | Merkevaremanual | 📖 | `book-open` |
| design | Trykkmateriell | 🖼️ | `image` |
| design | Sosiale medier | 📱 | `share-2` |

### `ServiceExtraItem` icon migration:
The `ServiceExtraItem.icon` field (used in extra sections) is **removed** along with the entire `extraSection` system. The custom section sub-components use hardcoded inline SVGs instead.

### Types to remove:
- `ServiceExtraItem` — no longer used
- `ServiceExtraSection` — no longer used
- Remove `extraSection?` from `Service`

## Component Changes

| Component | Action | Notes |
|-----------|--------|-------|
| `service-hero.tsx` | **Rewrite** | Dark bg, centered, category tag, trust stats (absorbs `service-trust-bar.tsx`) |
| `service-trust-bar.tsx` | **Delete** | Absorbed into new `service-hero.tsx` |
| `service-story.tsx` | **Delete** | Replaced by `service-pain-points.tsx` |
| NEW: `service-pain-points.tsx` | **Create** | Light bg, pain point cards, uses `longDescription` + `painPoints` |
| `service-bento-features.tsx` | **Rewrite** | Lucide icons via `iconName`, fix card variants |
| `service-extra-section.tsx` | **Delete + Replace** → `service-custom-section.tsx` | Switch on `service.id`, 6 inline sub-components |
| `service-cta.tsx` | **Minor update** | Already close to target, minor styling tweaks |
| `service-testimonial.tsx` | **Minor update** | Adjust background to light `#F5F7F8` |
| NEW: `service-process.tsx` | **Create** | Horizontal timeline with step cards |
| NEW: `service-faq.tsx` | **Create** | Client component, accordion with expand/collapse |
| `[slug]/page.tsx` | **Update** | New 8-section order per Page Assembly Order above |
| `services.ts` | **Update** | Add all new fields, remove `extraSection`, write FAQ content |
| `types/index.ts` | **Update** | Update `Service`, update `ServiceFeature`, remove extra section types |

### Files to delete:
- `src/components/sections/service-trust-bar.tsx`
- `src/components/sections/service-story.tsx`
- `src/components/sections/service-extra-section.tsx`

### `service-feature-steps.tsx` — NOT affected
This is a homepage component for the service listing. It is not part of this redesign.

## Dependencies

- `lucide-react` — SVG icon library (check if already installed, install if not)

## Animation Strategy

- **Count-up stats:** Use Intersection Observer to trigger count-up animation when trust stats enter viewport. Use the existing `useCountUp` hook pattern or a lightweight custom hook.
- **Scroll reveal:** Staggered fade-in-up for bento cards and process steps using Intersection Observer.
- **FAQ accordion:** CSS `grid-template-rows: 0fr → 1fr` transition for smooth height animation.
- **Hover states:** `scale-[1.02]` on bento cards, color transitions on buttons (150–300ms).
- **`prefers-reduced-motion`:** All animations respect this media query.

## Accessibility

- All Lucide icons get `aria-hidden="true"` (decorative)
- FAQ accordion uses `<button>` triggers with `aria-expanded`
- Pain point red dots are decorative (`aria-hidden="true"`), text carries meaning
- Star ratings use `aria-label` for screen readers
- Color contrast: all text meets WCAG AA (4.5:1 minimum)
- Focus-visible outlines on all interactive elements

## Responsive Breakpoints

- **Mobile (375px):** Single column throughout, process steps stack vertically, bento grid → 1 column
- **Tablet (768px):** Bento grid → 2 columns, process steps → 2×2 grid
- **Desktop (1024px+):** Full 3-column bento, horizontal process timeline

## Out of Scope

- Homepage changes
- Pricing page
- Service listing page (`/tjenester`)
- Navigation changes
- New photography/imagery (all visuals are CSS-only or inline SVGs)
