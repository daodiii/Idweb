# Service Detail Pages — Design Spec

## Overview
Create 6 individual service detail pages at `/tjenester/[slug]` using a Next.js dynamic route, each with a story-driven layout, glassmorphism bento feature grid, and per-service unique sections. The existing `/tjenester` overview page and homepage bento cards link to each detail page.

## Pages
| Route | Service ID | Title |
|-------|-----------|-------|
| `/tjenester/nettside` | `nettside` | Skreddersydd nettside |
| `/tjenester/nettbutikk` | `nettbutikk` | Nettbutikk |
| `/tjenester/seo` | `seo` | SEO-optimalisering |
| `/tjenester/markedsforing` | `markedsforing` | Digital markedsføring |
| `/tjenester/vedlikehold` | `vedlikehold` | Drift og vedlikehold |
| `/tjenester/design` | `design` | Grafisk design og merkevarebygging |

## Shared Page Template

All 6 pages share this section structure:

### 1. Hero Section
- Service title in DM Serif Display, large (`text-4xl sm:text-5xl`)
- Short tagline (from `shortDescription` — `heroTagline` not needed, reuse existing field)
- Primary CTA: use a styled `Link` from `next/link` (not the `Button` component, which only wraps `<button>`) pointing to `/kontakt`
- Subtle background treatment: gradient from `var(--color-bg)` to `var(--color-bg-alt)` with a radial accent glow

### 2. Story Block
- Two-column layout (`lg:flex-row`)
- Left: `longDescription` text, framed as a value proposition. No content expansion needed — the existing text is sufficient
- Right: Decorative CSS-only visual element — geometric gradient shapes using `var(--color-accent)`, `var(--color-text)`, `var(--color-bg-alt)`. Mark with `aria-hidden="true"`
- Use the existing `Section` component from `src/components/ui/section.tsx` as the wrapper for consistent padding/max-width

### 3. Bento Feature Grid (Glassmorphism)

**This is a standalone component — do NOT reuse `BentoGrid`/`BentoCard` from `src/components/ui/bento-grid.tsx`.** The existing bento components have motion animations, hover CTAs, and a dot-grid pattern designed for the homepage service overview cards. The glassmorphism service feature cards are structurally different (static display cards with icons, no hrefs, no hover CTA reveal). Building a separate `ServiceBentoFeatures` component avoids overcomplicating the existing one.

- 6 features displayed in an asymmetric bento layout
- **Background panel behind the grid:** A dark gradient panel (`bg-gradient-to-br from-[var(--color-text)] to-[#2a2c2f]`) so the glassmorphism blur is visible. Without a colored background, the glass effect would be invisible on the light site theme.
- **Glassmorphism styling on each card:**
  - `backdrop-blur-xl` (`backdrop-filter: blur(16px)`)
  - Semi-transparent backgrounds that show against the dark panel:
    - **Light glass cards**: `bg-white/15` with `border border-white/20` — frosted white on dark
    - **Accent glass cards**: `bg-[#F4CE14]/25` with `border border-[#F4CE14]/30` — golden tint
    - **Dark glass cards**: `bg-black/30` with `border border-white/10` — deep frost, white text
  - Slight shadow: `shadow-lg shadow-black/10`
- Each card contains: emoji icon, bold title (`font-semibold`), one-line description
- Grid layout: asymmetric — some cards span 2 columns for visual interest
- Responsive: `grid-cols-1` mobile, `grid-cols-2` tablet, `grid-cols-3` desktop
- **Accessibility:** Ensure all text on glass cards meets WCAG 2.1 AA contrast (4.5:1 minimum). On the dark panel background, white text on `bg-white/15` cards passes; dark text on `bg-[#F4CE14]/25` cards should use `text-white` for contrast. The bento grid uses semantic HTML (`<ul>` / `<li>`) — no ARIA roles needed since cards are not interactive.

### 4. Per-Service Unique Section
Each page gets one extra section between the bento grid and the CTA. Use the `Section` wrapper component.

| Service | Extra Section |
|---------|--------------|
| **Skreddersydd nettside** | "What you get" checklist — a styled vertical checklist of deliverables with accent-colored check icons |
| **Nettbutikk** | Payment integrations — row of integration names/badges (Vipps, Klarna, Visa, Mastercard) with "Sømløs betaling" headline |
| **SEO-optimalisering** | 3-step process timeline — horizontal numbered steps: Analyse → Optimalisering → Resultater, each with a short description |
| **Digital markedsføring** | Platform showcase — row of platform names (Google Ads, Meta/Facebook, Instagram) with brief text about each |
| **Drift og vedlikehold** | Uptime stat highlight — large "99.9%" number with "oppetidsgaranti" label, plus key stat cards |
| **Grafisk design** | Deliverables preview — visual mock showing logo placeholder, color palette swatches, and typography sample |

### 5. CTA Section
- Background: `var(--color-bg-alt)`
- Headline: "Klar for å komme i gang?"
- Short description paragraph
- Dual links: Primary styled link ("Book en gratis samtale" → `/kontakt`) + Secondary ghost styled link ("Se alle tjenester" → `/tjenester`). Use styled `Link` elements, not the `Button` component.

## Data Model Changes

Extend types in `src/types/index.ts`. **Keep the old `features: string[]` field** and add the new structured features alongside it to avoid breaking the overview page:

```typescript
export interface ServiceFeature {
  icon: string;
  title: string;
  description: string;
}

export interface ServiceExtraItem {
  label: string;
  detail?: string;
  icon?: string;
  value?: string;  // For stats: "99.9%", for colors: hex values
}

export interface ServiceExtraSection {
  type: 'checklist' | 'integrations' | 'process' | 'platforms' | 'stats' | 'deliverables';
  headline: string;
  items: ServiceExtraItem[];
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];                    // Keep for overview page compatibility
  detailedFeatures: ServiceFeature[];    // New: for detail page bento grid
  extraSection?: ServiceExtraSection;
}
```

This avoids a breaking change — the overview page at `/tjenester` continues to use `features: string[]` unchanged.

## File Structure

```
src/app/tjenester/
├── page.tsx                    # Overview page (updated with links)
└── [slug]/
    └── page.tsx                # Dynamic route with generateStaticParams

src/components/sections/
├── service-hero.tsx            # Shared hero component
├── service-story.tsx           # Story block with decorative visual
├── service-bento-features.tsx  # Glassmorphism bento grid (standalone, not reusing BentoGrid)
├── service-extra-section.tsx   # Renders per-service unique section by type
└── service-cta.tsx             # Bottom CTA section

src/lib/content/
└── services.ts                 # Updated with detailedFeatures + extraSection data
```

## Dynamic Route

Use a single `[slug]/page.tsx` with `generateStaticParams` instead of 6 separate page files:

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/content/services";
import { SERVICE_SEO } from "@/lib/content/seo";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServiceStory } from "@/components/sections/service-story";
import { ServiceBentoFeatures } from "@/components/sections/service-bento-features";
import { ServiceExtraSection } from "@/components/sections/service-extra-section";
import { ServiceCta } from "@/components/sections/service-cta";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.id }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const seo = SERVICE_SEO[slug];
  if (!seo) return {};
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.id === slug);
  if (!service) notFound();

  return (
    <main>
      <ServiceHero service={service} />
      <ServiceStory service={service} />
      <ServiceBentoFeatures features={service.detailedFeatures} />
      {service.extraSection && <ServiceExtraSection section={service.extraSection} />}
      <ServiceCta />
    </main>
  );
}
```

## SEO Metadata

Add `SERVICE_SEO` as a new separate export in `seo.ts` (alongside the existing `SEO` object). Generate dynamic metadata in `[slug]/page.tsx` using `generateMetadata` (see code sample above):

```typescript
export const SERVICE_SEO: Record<string, { title: string; description: string; keywords: string[] }> = {
  nettside: {
    title: "Skreddersydd nettside — Profesjonell webdesign | Selgenettside",
    description: "Vi designer og utvikler skreddersydde nettsider med fokus på hastighet, SEO og konvertering. Responsivt design, SSL og enkel administrasjon inkludert.",
    keywords: ["skreddersydd nettside", "webdesign", "responsivt design", "nettside bedrift", "profesjonell nettside"],
  },
  nettbutikk: {
    title: "Nettbutikk — Brukervennlig netthandel med Vipps og Klarna | Selgenettside",
    description: "Start salget på nett med en profesjonell nettbutikk. Integrasjon med Vipps, Klarna, lagerstyring og mobiloptimalisert handleopplevelse.",
    keywords: ["nettbutikk", "netthandel", "vipps nettbutikk", "klarna nettbutikk", "lage nettbutikk"],
  },
  seo: {
    title: "SEO-optimalisering — Bli synlig i Google | Selgenettside",
    description: "Profesjonell søkemotoroptimalisering for norske bedrifter. Teknisk SEO, innholdsoptimalisering, lokal SEO og månedlig rapportering.",
    keywords: ["seo optimalisering", "søkemotoroptimalisering", "google rangering", "lokal seo", "seo norge"],
  },
  markedsforing: {
    title: "Digital markedsføring — Google Ads og sosiale medier | Selgenettside",
    description: "Målrettet digital markedsføring på Google Ads, Facebook og Instagram. Datadrevet annonsering med målbar avkastning for norske bedrifter.",
    keywords: ["digital markedsføring", "google ads", "facebook annonsering", "instagram markedsføring", "online markedsføring"],
  },
  vedlikehold: {
    title: "Drift og vedlikehold — Trygg og oppdatert nettside | Selgenettside",
    description: "Løpende vedlikehold, sikkerhetskopier, oppdateringer og 99.9% oppetidsgaranti. Vi holder nettsiden din trygg og rask hver eneste dag.",
    keywords: ["vedlikehold nettside", "drift nettside", "nettside support", "sikkerhetskopiering", "nettside oppdatering"],
  },
  design: {
    title: "Grafisk design og merkevarebygging — Visuell identitet | Selgenettside",
    description: "Profesjonell logodesign, fargepalett, typografi og merkevaremanual. Vi bygger en gjenkjennelig visuell identitet for bedriften din.",
    keywords: ["grafisk design", "logodesign", "merkevarebygging", "visuell identitet", "grafisk profil"],
  },
};
```

## Overview Page Update
- Each service block on `/tjenester` wraps in a `Link` to `/tjenester/[id]`
- Add a subtle hover effect and a "Les mer →" indicator
- Keep the existing layout structure
- Update feature rendering to handle the unchanged `string[]` type (no changes needed since we kept it)

## Homepage Bento Card Link Update
- Update `src/components/sections/bento-services.tsx`: change all `href` values from `/tjenester#[id]` to `/tjenester/[id]`
- Also update the `BentoCard` component in `src/components/ui/bento-grid.tsx`: change the `<a>` tag (line 89) to a `<Link>` from `next/link` for proper client-side navigation
- This ensures homepage cards link directly to the new detail pages

## Dark Mode Note
The site currently has no dark mode CSS variable block in `globals.css`. The glassmorphism bento grid is designed for light mode only (dark panel with light glass cards). If dark mode variables are added later, the bento grid will need a separate adaptation pass — the dark panel background uses `var(--color-text)` which would invert, and the glass card opacity values would need adjustment. This is acceptable for now.

## Styling Notes
- Fonts: DM Serif Display for headings, DM Sans for body (already configured)
- Colors: use existing CSS variables throughout
- Use `Section` wrapper component for consistent spacing on story block, extra section, and CTA
- All pages must be fully responsive (mobile-first)
- Decorative visuals in the story block must have `aria-hidden="true"`
