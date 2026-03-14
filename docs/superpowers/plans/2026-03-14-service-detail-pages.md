# Service Detail Pages Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build 6 individual service detail pages at `/tjenester/[slug]` with story-driven layouts, glassmorphism bento feature grids, and per-service unique sections.

**Architecture:** Dynamic route with `generateStaticParams` serves all 6 pages from a shared set of section components. Data lives in `services.ts` with new `detailedFeatures` and `extraSection` fields alongside the existing `features: string[]` (no breaking changes). Existing overview page and homepage bento cards updated to link to detail pages.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 5, Tailwind CSS 4, `next/link` for navigation, `motion/react` not needed (static display).

**Spec:** `docs/superpowers/specs/2026-03-14-service-detail-pages-design.md`

---

## Chunk 1: Data Layer

### Task 1: Extend Types

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Add new interfaces to types file**

Add these interfaces after the existing `Service` interface (keep the existing `Service` interface intact, just add new types and extend):

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
  value?: string;
}

export interface ServiceExtraSection {
  type: 'checklist' | 'integrations' | 'process' | 'platforms' | 'stats' | 'deliverables';
  headline: string;
  items: ServiceExtraItem[];
}
```

Then update the existing `Service` interface to add new fields while keeping `features: string[]`:

```typescript
export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  features: string[];
  detailedFeatures: ServiceFeature[];
  extraSection?: ServiceExtraSection;
}
```

- [ ] **Step 2: Add `detailedFeatures` and `extraSection` to the "nettside" service in `src/lib/content/services.ts`**

Each feature string gets split into `{ icon, title, description }`. Add the extraSection for this service (type: `'checklist'`). Example for the first service:

```typescript
{
  id: "nettside",
  title: "Skreddersydd nettside",
  shortDescription: "En profesjonell nettside designet for å tiltrekke kunder og bygge tillit til merkevaren din.",
  longDescription: "Hver bedrift er unik, og nettsiden din bør gjenspeile det. Vi designer og utvikler skreddersydde nettsider fra bunnen av — ingen ferdigmaler, ingen kompromisser. Hver side bygges med fokus på hastighet, søkemotoroptimalisering og brukervennlighet. Resultatet er en nettside som ikke bare ser bra ut, men som faktisk konverterer besøkende til kunder. Vi bruker moderne teknologi som sikrer at nettsiden laster raskt, fungerer perfekt på alle enheter og er enkel å administrere selv etter lansering.",
  features: [
    "Responsivt design som fungerer på mobil, nettbrett og desktop",
    "Optimalisert for hastighet — lastetider under 2 sekunder",
    "SEO-vennlig struktur fra dag én",
    "Innebygd kontaktskjema og handlingsknapper",
    "Enkel administrasjon — du kan oppdatere innhold selv",
    "SSL-sertifikat og sikkerhetstiltak inkludert",
  ],
  detailedFeatures: [
    { icon: "📱", title: "Responsivt design", description: "Fungerer perfekt på mobil, nettbrett og desktop" },
    { icon: "⚡", title: "Lynrask hastighet", description: "Optimalisert for lastetider under 2 sekunder" },
    { icon: "🔍", title: "SEO-vennlig", description: "Søkemotoroptimalisert struktur fra dag én" },
    { icon: "✉️", title: "Kontaktskjema", description: "Innebygde handlingsknapper som konverterer" },
    { icon: "🛠️", title: "Enkel administrasjon", description: "Oppdater innhold selv uten teknisk kunnskap" },
    { icon: "🔒", title: "SSL og sikkerhet", description: "Sertifikat og sikkerhetstiltak inkludert" },
  ],
  extraSection: {
    type: "checklist",
    headline: "Dette får du levert",
    items: [
      { label: "Skreddersydd design", detail: "Unikt design tilpasset din merkevare" },
      { label: "Mobiloptimalisering", detail: "Responsivt på alle skjermstørrelser" },
      { label: "SEO-grunnlag", detail: "Teknisk oppsett for synlighet i Google" },
      { label: "Kontaktskjema", detail: "Ferdig integrert med e-postvarsling" },
      { label: "Opplæring", detail: "Vi lærer deg å oppdatere innhold selv" },
      { label: "30 dagers support", detail: "Gratis support etter lansering" },
    ],
  },
},
```

- [ ] **Step 2: Add `detailedFeatures` and `extraSection` to "nettbutikk"**

```typescript
detailedFeatures: [
  { icon: "💳", title: "Sømløs betaling", description: "Vipps, Klarna og kortbetaling integrert" },
  { icon: "📦", title: "Lagerstyring", description: "Automatisert lagerstyring og ordrehåndtering" },
  { icon: "🔎", title: "Produktsøk", description: "Filtrering, søk og kategorier for enkel navigering" },
  { icon: "🚚", title: "Fraktkalkulator", description: "Integrasjon med Posten og Bring" },
  { icon: "📱", title: "Mobilhandel", description: "Responsivt design optimalisert for mobilkjøp" },
  { icon: "📊", title: "Salgsrapporter", description: "Statistikk over salg og kundeadferd" },
],
extraSection: {
  type: "integrations",
  headline: "Sømløs betaling med kjente løsninger",
  items: [
    { label: "Vipps", detail: "Norges mest brukte betalingsløsning", icon: "📲" },
    { label: "Klarna", detail: "Delbetaling og faktura for økt konvertering", icon: "💳" },
    { label: "Visa / Mastercard", detail: "Internasjonal kortbetaling", icon: "💎" },
    { label: "Apple Pay / Google Pay", detail: "Mobilbetaling med ett trykk", icon: "📱" },
  ],
},
```

- [ ] **Step 3: Add `detailedFeatures` and `extraSection` to "seo"**

```typescript
detailedFeatures: [
  { icon: "🔑", title: "Søkeordanalyse", description: "Finn de riktige søkeordene for din bransje" },
  { icon: "⚙️", title: "Teknisk SEO", description: "Hastighet, strukturerte data og XML-sitemap" },
  { icon: "📝", title: "Innholdsoptimalisering", description: "Relevante søkeord i tekst og metadata" },
  { icon: "📍", title: "Lokal SEO", description: "Google Business Profile-optimalisering" },
  { icon: "🔗", title: "Lenkebygging", description: "Kvalitetslenker fra relevante norske nettsider" },
  { icon: "📈", title: "Månedlig rapportering", description: "Synlige resultater med detaljerte rapporter" },
],
extraSection: {
  type: "process",
  headline: "Slik jobber vi med SEO",
  items: [
    { label: "Analyse", detail: "Vi kartlegger søkeord, konkurrenter og teknisk status", value: "1" },
    { label: "Optimalisering", detail: "Vi forbedrer innhold, struktur og tekniske faktorer", value: "2" },
    { label: "Resultater", detail: "Månedlig rapportering med målbar fremgang", value: "3" },
  ],
},
```

- [ ] **Step 4: Add `detailedFeatures` and `extraSection` to "markedsforing"**

```typescript
detailedFeatures: [
  { icon: "🎯", title: "Google Ads", description: "Søkeannonser, display og remarketing" },
  { icon: "📘", title: "Facebook-annonsering", description: "Målrettet annonsering på Facebook" },
  { icon: "📸", title: "Instagram-annonsering", description: "Visuell annonsering til riktig målgruppe" },
  { icon: "🧪", title: "A/B-testing", description: "Test annonser for best mulig resultat" },
  { icon: "📊", title: "Konverteringssporing", description: "ROI-rapportering og måling" },
  { icon: "🔄", title: "Løpende optimalisering", description: "Kampanjer justeres kontinuerlig" },
],
extraSection: {
  type: "platforms",
  headline: "Vi annonserer der kundene dine er",
  items: [
    { label: "Google Ads", detail: "Søkeannonser, display og remarketing med målbar ROI", icon: "🎯" },
    { label: "Meta / Facebook", detail: "Målgruppesegmentering og retargeting på verdens største plattform", icon: "📘" },
    { label: "Instagram", detail: "Visuell annonsering som bygger merkevare og engasjement", icon: "📸" },
  ],
},
```

- [ ] **Step 5: Add `detailedFeatures` and `extraSection` to "vedlikehold"**

```typescript
detailedFeatures: [
  { icon: "💾", title: "Daglige sikkerhetskopier", description: "Automatisk backup med enkel gjenoppretting" },
  { icon: "🛡️", title: "Sikkerhetsovervåking", description: "Brannmur og trusselovervåking døgnet rundt" },
  { icon: "🔄", title: "Programvareoppdateringer", description: "Kompatibilitetstesting og oppdateringer" },
  { icon: "✅", title: "99,9 % oppetid", description: "Garantert tilgjengelighet for besøkende" },
  { icon: "📝", title: "Innholdsendringer", description: "Mindre endringer inkludert i avtalen" },
  { icon: "🚀", title: "Prioritert support", description: "Rask responstid når du trenger hjelp" },
],
extraSection: {
  type: "stats",
  headline: "Tall som gir trygghet",
  items: [
    { label: "Oppetidsgaranti", value: "99.9%", detail: "Nettsiden din er alltid tilgjengelig" },
    { label: "Daglige sikkerhetskopier", value: "365", detail: "Automatisk backup hver eneste dag" },
    { label: "Responstid", value: "<2t", detail: "Vi svarer innen to timer på hverdager" },
  ],
},
```

- [ ] **Step 6: Add `detailedFeatures` and `extraSection` to "design"**

```typescript
detailedFeatures: [
  { icon: "🎨", title: "Logodesign", description: "Flere konseptforslag å velge mellom" },
  { icon: "🎨", title: "Fargepalett", description: "Gjennomtenkt fargegrunnlag for merkevaren" },
  { icon: "🔤", title: "Typografi", description: "Skriftvalg som kommuniserer riktig tone" },
  { icon: "📖", title: "Merkevaremanual", description: "Retningslinjer for konsistent bruk" },
  { icon: "🖼️", title: "Trykkmateriell", description: "Visittkort, brevpapir og mer" },
  { icon: "📱", title: "Sosiale medier", description: "Grafisk materiell for alle plattformer" },
],
extraSection: {
  type: "deliverables",
  headline: "En komplett visuell identitet",
  items: [
    { label: "Logo", detail: "Primær, sekundær og ikon-variant", icon: "🎨" },
    { label: "Farger", detail: "Primær, sekundær og aksentfarger", value: "#F4CE14,#45474B,#E8EBEC" },
    { label: "Typografi", detail: "Overskrifter og brødtekst", value: "DM Serif Display,DM Sans" },
    { label: "Merkevaremanual", detail: "PDF med retningslinjer for bruk", icon: "📖" },
  ],
},
```

- [ ] **Step 8: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -20`
Expected: No errors (all services now have `detailedFeatures` and types are in place).

- [ ] **Step 9: Commit types and services data together**

Both files must be committed together so the project compiles at every commit:

```bash
git add src/types/index.ts src/lib/content/services.ts
git commit -m "feat: add ServiceFeature types and detailedFeatures data for all 6 services"
```

---

### Task 2: Add SEO Metadata

**Files:**
- Modify: `src/lib/content/seo.ts`

- [ ] **Step 1: Add SERVICE_SEO export to seo.ts**

Add after the existing `SEO` export:

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

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -10`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/lib/content/seo.ts
git commit -m "feat: add per-service SEO metadata for detail pages"
```

---

## Chunk 2: Section Components

### Task 3: ServiceHero Component

**Files:**
- Create: `src/components/sections/service-hero.tsx`

- [ ] **Step 1: Create the service hero component**

```tsx
import Link from "next/link";
import type { Service } from "@/types";

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 py-24 text-center sm:py-32">
      {/* Radial accent glow — inline style needed for complex multi-stop radial gradient not expressible in Tailwind */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(244, 206, 20, 0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Gradient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-bg-alt)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {service.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-muted)] sm:text-xl">
          {service.shortDescription}
        </p>
        <Link
          href="/kontakt"
          className="mt-10 inline-block rounded-lg bg-[var(--color-accent)] px-8 py-3.5 text-lg font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-accent-hover)]"
        >
          Få et uforpliktende tilbud
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -10`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/service-hero.tsx
git commit -m "feat: add ServiceHero component for service detail pages"
```

---

### Task 4: ServiceStory Component

**Files:**
- Create: `src/components/sections/service-story.tsx`

- [ ] **Step 1: Create the service story component**

```tsx
import type { Service } from "@/types";
import { Section } from "@/components/ui/section";

interface ServiceStoryProps {
  service: Service;
}

export function ServiceStory({ service }: ServiceStoryProps) {
  return (
    <Section>
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Text column */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Hvorfor {service.title.toLowerCase()}?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
            {service.longDescription}
          </p>
        </div>

        {/* Decorative visual */}
        <div className="flex-1" aria-hidden="true">
          <div className="relative mx-auto aspect-square max-w-sm">
            {/* Layered geometric shapes */}
            <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-20" />
            <div className="absolute inset-8 rounded-2xl border-2 border-[var(--color-accent)] opacity-30" />
            <div className="absolute inset-12 rounded-xl bg-gradient-to-tr from-[var(--color-text)] to-[var(--color-bg-alt)] opacity-10" />
            <div className="absolute inset-16 rounded-lg bg-[var(--color-accent)] opacity-15" />
            {/* Center circle */}
            <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-40" />
          </div>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -10`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/service-story.tsx
git commit -m "feat: add ServiceStory component with decorative visual"
```

---

### Task 5: ServiceBentoFeatures Component (Glassmorphism)

**Files:**
- Create: `src/components/sections/service-bento-features.tsx`

- [ ] **Step 1: Create the glassmorphism bento features component**

This is the core visual component. Standalone — does NOT reuse `BentoGrid`/`BentoCard`.

```tsx
import type { ServiceFeature } from "@/types";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";

interface ServiceBentoFeaturesProps {
  features: ServiceFeature[];
}

const cardVariants = [
  "bg-white/15 border-white/20 text-white",          // light glass
  "bg-[#F4CE14]/25 border-[#F4CE14]/30 text-white",  // accent glass
  "bg-black/30 border-white/10 text-white",           // dark glass
  "bg-white/15 border-white/20 text-white",           // light glass
  "bg-[#F4CE14]/25 border-[#F4CE14]/30 text-white",  // accent glass
  "bg-black/30 border-white/10 text-white",           // dark glass
];

const gridPlacements = [
  "col-span-1 md:col-span-2",  // feature 0: wide
  "col-span-1",                 // feature 1
  "col-span-1",                 // feature 2
  "col-span-1",                 // feature 3
  "col-span-1",                 // feature 4
  "col-span-1 md:col-span-2",  // feature 5: wide
];

export function ServiceBentoFeatures({ features }: ServiceBentoFeaturesProps) {
  return (
    <Section>
      <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
        Dette inkluderer
      </h2>

      {/* Dark panel for glassmorphism visibility */}
      <div className="rounded-3xl bg-gradient-to-br from-[var(--color-text)] to-[#2a2c2f] p-6 sm:p-10">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <li
              key={feature.title}
              className={cn(
                "rounded-2xl border p-6 backdrop-blur-xl shadow-lg shadow-black/10",
                "transition-transform duration-200 hover:scale-[1.02]",
                cardVariants[i % cardVariants.length],
                gridPlacements[i % gridPlacements.length]
              )}
            >
              <span className="text-3xl" role="img" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm opacity-80">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -10`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/service-bento-features.tsx
git commit -m "feat: add glassmorphism ServiceBentoFeatures component"
```

---

### Task 6: ServiceExtraSection Component

**Files:**
- Create: `src/components/sections/service-extra-section.tsx`

- [ ] **Step 1: Create the extra section component**

This renders different layouts based on `section.type`:

```tsx
import type { ServiceExtraSection as ServiceExtraSectionType } from "@/types";
import { Section } from "@/components/ui/section";

interface ServiceExtraSectionProps {
  section: ServiceExtraSectionType;
}

function Checklist({ section }: ServiceExtraSectionProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <ul className="space-y-4">
        {section.items.map((item) => (
          <li key={item.label} className="flex items-start gap-4">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-[var(--color-text)]">
              ✓
            </span>
            <div>
              <p className="font-semibold">{item.label}</p>
              {item.detail && (
                <p className="text-sm text-[var(--color-text-muted)]">{item.detail}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Integrations({ section }: ServiceExtraSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {section.items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center"
        >
          {item.icon && (
            <span className="text-3xl" role="img" aria-hidden="true">{item.icon}</span>
          )}
          <p className="font-semibold">{item.label}</p>
          {item.detail && (
            <p className="text-xs text-[var(--color-text-muted)]">{item.detail}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function Process({ section }: ServiceExtraSectionProps) {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-0">
      {section.items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-4 sm:flex-1 sm:flex-col sm:gap-3 sm:text-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xl font-bold text-[var(--color-text)]">
            {item.value ?? i + 1}
          </div>
          <div>
            <p className="font-semibold">{item.label}</p>
            {item.detail && (
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.detail}</p>
            )}
          </div>
          {/* Connector line between steps */}
          {i < section.items.length - 1 && (
            <div className="hidden h-0.5 flex-1 bg-[var(--color-border)] sm:block" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

function Platforms({ section }: ServiceExtraSectionProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {section.items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6"
        >
          {item.icon && (
            <span className="text-2xl" role="img" aria-hidden="true">{item.icon}</span>
          )}
          <h3 className="mt-3 text-lg font-semibold">{item.label}</h3>
          {item.detail && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.detail}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function Stats({ section }: ServiceExtraSectionProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {section.items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-8 text-center"
        >
          {item.value && (
            <span className="text-4xl font-bold text-[var(--color-accent)] sm:text-5xl">
              {item.value}
            </span>
          )}
          <p className="mt-2 text-lg font-semibold">{item.label}</p>
          {item.detail && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.detail}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function Deliverables({ section }: ServiceExtraSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {section.items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6"
        >
          {item.icon && (
            <span className="text-2xl" role="img" aria-hidden="true">{item.icon}</span>
          )}
          {item.value && /^#[0-9A-Fa-f]/.test(item.value) && (
            <div className="mt-2 flex gap-2">
              {item.value.split(",").map((color) => (
                <div
                  key={color}
                  className="h-8 w-8 rounded-full border border-white/20"
                  style={{ backgroundColor: color }}
                  aria-label={`Farge: ${color}`}
                />
              ))}
            </div>
          )}
          <p className="mt-3 font-semibold">{item.label}</p>
          {item.detail && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.detail}</p>
          )}
        </div>
      ))}
    </div>
  );
}

const renderers: Record<ServiceExtraSectionType["type"], React.FC<ServiceExtraSectionProps>> = {
  checklist: Checklist,
  integrations: Integrations,
  process: Process,
  platforms: Platforms,
  stats: Stats,
  deliverables: Deliverables,
};

export function ServiceExtraSection({ section }: ServiceExtraSectionProps) {
  const Renderer = renderers[section.type];

  return (
    <Section>
      <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl">
        {section.headline}
      </h2>
      <Renderer section={section} />
    </Section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -10`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/service-extra-section.tsx
git commit -m "feat: add ServiceExtraSection with 6 layout variants"
```

---

### Task 7: ServiceCta Component

**Files:**
- Create: `src/components/sections/service-cta.tsx`

- [ ] **Step 1: Create the service CTA component**

```tsx
import Link from "next/link";
import { Section } from "@/components/ui/section";

export function ServiceCta() {
  return (
    <Section className="bg-[var(--color-bg-alt)]">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Klar for å komme i gang?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-text-muted)]">
          Bestill en gratis og uforpliktende samtale, så hjelper vi deg med å finne den riktige løsningen for bedriften din.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/kontakt"
            className="rounded-lg bg-[var(--color-accent)] px-8 py-3.5 text-lg font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            Book en gratis samtale
          </Link>
          <Link
            href="/tjenester"
            className="rounded-lg border border-[var(--color-border)] px-8 py-3.5 text-lg font-semibold transition-colors hover:bg-[var(--color-bg)]"
          >
            Se alle tjenester
          </Link>
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -10`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/service-cta.tsx
git commit -m "feat: add ServiceCta component with dual CTA links"
```

---

## Chunk 3: Page Route & Link Updates

### Task 8: Dynamic Route Page

**Files:**
- Create: `src/app/tjenester/[slug]/page.tsx`

- [ ] **Step 1: Create the dynamic route page**

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

export async function generateStaticParams() {
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

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -10`
Expected: No errors.

- [ ] **Step 3: Verify the dev server renders a page**

Run: `curl -s -o /dev/null -w "%{http_code}" http://localhost:3000/tjenester/nettside`
Expected: `200`

- [ ] **Step 4: Commit**

```bash
git add src/app/tjenester/\\[slug\\]/page.tsx
git commit -m "feat: add dynamic route for service detail pages"
```

---

### Task 9: Update Overview Page Links

**Files:**
- Modify: `src/app/tjenester/page.tsx`

- [ ] **Step 1: Add "Les mer" link to each service block**

In `src/app/tjenester/page.tsx`, the page already imports `Link` from `next/link`. Inside the `.map()` loop, each service has two columns: a text column (left, `<div className="flex-1">` with `h2`, `p`, `p`) and a features column (right, `<div className="flex-1">` with `h3` and `ul`).

Add a "Les mer →" link at the bottom of the **left text column** (after the `longDescription` paragraph, before the closing `</div>`):

```tsx
{/* After the longDescription <p> in the left column */}
<Link
  href={`/tjenester/${service.id}`}
  className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
>
  Les mer →
</Link>
```

This keeps the link as a text element within the content flow rather than wrapping the entire block (which would cause accessibility issues with nested interactive elements).

- [ ] **Step 2: Verify the overview page renders with links**

Run: `npx tsc --noEmit 2>&1 | head -10`
Expected: No errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/tjenester/page.tsx
git commit -m "feat: add links to service detail pages from overview"
```

---

### Task 10: Update Homepage Bento Card Links

**Files:**
- Modify: `src/components/sections/bento-services.tsx`
- Modify: `src/components/ui/bento-grid.tsx`

- [ ] **Step 1: Update bento-services.tsx href values**

Change all 6 `href` values from anchor links to route links:

| Before | After |
|--------|-------|
| `/tjenester#nettside` | `/tjenester/nettside` |
| `/tjenester#nettbutikk` | `/tjenester/nettbutikk` |
| `/tjenester#seo` | `/tjenester/seo` |
| `/tjenester#markedsforing` | `/tjenester/markedsforing` |
| `/tjenester#vedlikehold` | `/tjenester/vedlikehold` |
| `/tjenester#design` | `/tjenester/design` |

- [ ] **Step 2: Update BentoCard to use next/link**

In `src/components/ui/bento-grid.tsx`, add `import Link from "next/link";` and change the `<a>` tag on line 89 to `<Link>`:

```tsx
// Before:
<a href={href} className="pointer-events-auto inline-flex ...">

// After:
<Link href={href} className="pointer-events-auto inline-flex ...">
```

Also close with `</Link>` instead of `</a>`.

- [ ] **Step 3: Verify TypeScript compiles**

Run: `npx tsc --noEmit 2>&1 | head -10`
Expected: No errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/bento-services.tsx src/components/ui/bento-grid.tsx
git commit -m "feat: update bento card links to service detail pages"
```

---

### Task 11: Build Verification

- [ ] **Step 1: Run full build**

Run: `npm run build 2>&1 | tail -30`
Expected: Build succeeds. All 6 service detail pages are statically generated.

- [ ] **Step 2: Verify all 6 routes exist in build output**

Look for these routes in the build output:
- `/tjenester/nettside`
- `/tjenester/nettbutikk`
- `/tjenester/seo`
- `/tjenester/markedsforing`
- `/tjenester/vedlikehold`
- `/tjenester/design`

- [ ] **Step 3: Visual check**

Start the dev server and manually visit each page to verify:
- Hero section renders with correct title and tagline
- Story block shows description text and decorative visual
- Bento grid shows 6 glassmorphism cards on dark panel
- Extra section renders the correct variant per service
- CTA section has two working links
- Page is responsive on mobile viewport

- [ ] **Step 4: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: address build issues in service detail pages"
```
