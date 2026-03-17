# Service Page Redesign — Bold Dark Bento Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign all 6 service detail pages with a Bold Dark Bento aesthetic, 8-section conversion flow, and per-service custom visuals.

**Architecture:** Update data model first (types + content), then build components bottom-up (new → rewritten → minor updates), assemble the page, delete old files. Each task produces a working commit.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, lucide-react (already installed), motion library (already installed)

**Spec:** `docs/superpowers/specs/2026-03-17-service-page-redesign-design.md`

---

## Chunk 1: Foundation — Types & Data Model

### Task 1: Update TypeScript interfaces

**Files:**
- Modify: `src/types/index.ts`

- [ ] **Step 1: Add PainPoint interface and update Service + ServiceFeature**

Add `PainPoint` interface. Update `Service` to add `categoryTag`, `painPoints`, `processSteps`, `faq`, `trustStats` (all required). Remove `extraSection?`. Update `ServiceFeature`: replace `icon: string` with `iconName: string`. Remove `ServiceExtraItem` and `ServiceExtraSection` types.

```typescript
// NEW — add after BlogSection
export interface PainPoint {
  title: string;
  description: string;
}

// UPDATED ServiceFeature — replace icon with iconName
export interface ServiceFeature {
  iconName: string; // Lucide icon name, e.g., "smartphone", "zap"
  title: string;
  description: string;
}

// UPDATED Service — add new fields, remove extraSection
export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  categoryTag: string;
  features: string[];
  detailedFeatures: ServiceFeature[];
  painPoints: PainPoint[];
  processSteps: ProcessStep[];
  faq: FAQ[];
  trustStats: TrustSignal[];
}

// DELETE: ServiceExtraItem interface
// DELETE: ServiceExtraSection interface
```

- [ ] **Step 2: Do NOT commit yet**

Types will not compile until services.ts data is updated in Tasks 2–4. Continue directly to Task 2. The types and data will be committed together after Task 4 completes.

---

### Task 2: Update services.ts data — nettside + nettbutikk

**Files:**
- Modify: `src/lib/content/services.ts`

- [ ] **Step 1: Update nettside service entry**

Replace emoji `icon` with `iconName` on all `detailedFeatures`. Add `categoryTag`, `painPoints`, `processSteps`, `faq`, `trustStats`. Remove `extraSection`.

```typescript
{
  id: "nettside",
  title: "Skreddersydd nettside",
  shortDescription: "En profesjonell nettside designet for å tiltrekke kunder og bygge tillit til merkevaren din.",
  longDescription: "Hver bedrift er unik, og nettsiden din bør gjenspeile det. Vi designer og utvikler skreddersydde nettsider fra bunnen av — ingen ferdigmaler, ingen kompromisser. Hver side bygges med fokus på hastighet, søkemotoroptimalisering og brukervennlighet. Resultatet er en nettside som ikke bare ser bra ut, men som faktisk konverterer besøkende til kunder.",
  categoryTag: "Nettsider",
  features: [
    "Responsivt design som fungerer på mobil, nettbrett og desktop",
    "Optimalisert for hastighet — lastetider under 2 sekunder",
    "SEO-vennlig struktur fra dag én",
    "Innebygd kontaktskjema og handlingsknapper",
    "Enkel administrasjon — du kan oppdatere innhold selv",
    "SSL-sertifikat og sikkerhetstiltak inkludert",
  ],
  detailedFeatures: [
    { iconName: "smartphone", title: "Responsivt design", description: "Fungerer perfekt på mobil, nettbrett og desktop" },
    { iconName: "zap", title: "Lynrask hastighet", description: "Optimalisert for lastetider under 2 sekunder" },
    { iconName: "search", title: "SEO-vennlig", description: "Søkemotoroptimalisert struktur fra dag én" },
    { iconName: "mail", title: "Kontaktskjema", description: "Innebygde handlingsknapper som konverterer" },
    { iconName: "settings", title: "Enkel administrasjon", description: "Oppdater innhold selv uten teknisk kunnskap" },
    { iconName: "lock", title: "SSL og sikkerhet", description: "Sertifikat og sikkerhetstiltak inkludert" },
  ],
  painPoints: [
    { title: "Lav konverteringsrate", description: "Besøkende forlater nettsiden uten å ta kontakt fordi designet ikke skaper tillit" },
    { title: "Treg nettside", description: "Ferdigmaler er tunge, laster sakte og frustrerer brukerne" },
    { title: "Dårlig på mobil", description: "Over 70 % av trafikken er mobil — fungerer nettsiden din der?" },
  ],
  processSteps: [
    { step: 1, title: "Analyse", description: "Vi kartlegger mål, målgruppe og konkurrenter" },
    { step: 2, title: "Design", description: "Visuell prototype du kan gi tilbakemelding på" },
    { step: 3, title: "Utvikling", description: "Vi bygger, tester og optimaliserer" },
    { step: 4, title: "Lansering", description: "Go live med opplæring og 30 dagers support" },
  ],
  faq: [
    { question: "Hvor lang tid tar det å lage en nettside?", answer: "En typisk bedriftsnettside tar 3–5 uker fra oppstart til lansering, avhengig av omfang og tilbakemeldingstid." },
    { question: "Hva koster en skreddersydd nettside?", answer: "Prisen avhenger av omfang og funksjonalitet. En enkel bedriftsnettside starter fra kr 15 000. Vi gir alltid et uforpliktende tilbud først." },
    { question: "Kan jeg oppdatere innholdet selv?", answer: "Ja, vi bygger nettsiden slik at du enkelt kan endre tekst, bilder og sider selv — uten teknisk kunnskap." },
    { question: "Hva med hosting og domene?", answer: "Vi hjelper deg med å sette opp hosting og koble til domenet ditt. Alt er inkludert i leveransen." },
  ],
  trustStats: [
    { value: 50, suffix: "+", label: "nettsider levert" },
    { value: 4.9, suffix: "", label: "kundetilfredshet", decimals: 1 },
    { value: 2, suffix: "s", label: "gjennomsnittlig lastetid" },
  ],
}
```

- [ ] **Step 2: Update nettbutikk service entry**

Same pattern: replace emoji icons with `iconName`, add `categoryTag`, `painPoints`, `processSteps`, `faq`, `trustStats`, remove `extraSection`.

```typescript
{
  id: "nettbutikk",
  title: "Nettbutikk",
  shortDescription: "Start salget på nett med en brukervennlig nettbutikk som kundene dine elsker å handle i.",
  longDescription: "Netthandel vokser hvert eneste år i Norge, og en profesjonell nettbutikk er nøkkelen til å ta del i den veksten. Vi bygger nettbutikker med sømløs brukeropplevelse — fra produktvisning til utsjekk og betaling.",
  categoryTag: "Nettbutikk",
  features: [/* keep existing */],
  detailedFeatures: [
    { iconName: "credit-card", title: "Sømløs betaling", description: "Vipps, Klarna og kortbetaling integrert" },
    { iconName: "package", title: "Lagerstyring", description: "Automatisert lagerstyring og ordrehåndtering" },
    { iconName: "search", title: "Produktsøk", description: "Filtrering, søk og kategorier for enkel navigering" },
    { iconName: "truck", title: "Fraktkalkulator", description: "Integrasjon med Posten og Bring" },
    { iconName: "smartphone", title: "Mobilhandel", description: "Responsivt design optimalisert for mobilkjøp" },
    { iconName: "chart-bar", title: "Salgsrapporter", description: "Statistikk over salg og kundeadferd" },
  ],
  painPoints: [
    { title: "Tapt salg", description: "Kunder handler hos konkurrentene fordi du ikke er tilgjengelig på nett" },
    { title: "Komplisert utsjekk", description: "Mange nettbutikker mister kunder i utsjekkprosessen — vår er optimalisert" },
    { title: "Vanskelig administrasjon", description: "Produktoppdateringer, lager og ordrer bør være enkelt — ikke frustrerende" },
  ],
  processSteps: [
    { step: 1, title: "Kartlegging", description: "Produkter, betalingsløsninger og fraktbehov" },
    { step: 2, title: "Design", description: "Brukervennlig butikkdesign med fokus på konvertering" },
    { step: 3, title: "Integrasjon", description: "Betaling, frakt og lagerstyring kobles sammen" },
    { step: 4, title: "Lansering", description: "Testing, opplæring og go live" },
  ],
  faq: [
    { question: "Hvilke betalingsløsninger støttes?", answer: "Vi integrerer Vipps, Klarna, kortbetaling (Visa/Mastercard), Apple Pay og Google Pay — alt som trengs for norske kunder." },
    { question: "Kan jeg administrere produkter selv?", answer: "Ja, du får et enkelt administrasjonspanel der du kan legge til, endre og fjerne produkter, priser og bilder." },
    { question: "Hva med frakt og logistikk?", answer: "Vi integrerer med Posten og Bring slik at fraktkostnader beregnes automatisk basert på vekt og destinasjon." },
  ],
  trustStats: [
    { value: 20, suffix: "+", label: "nettbutikker lansert" },
    { value: 98, suffix: "%", label: "oppetid garantert" },
    { value: 35, suffix: "%", label: "økt konvertering snitt" },
  ],
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/content/services.ts
git commit -m "feat: add nettside + nettbutikk service data for Bold Dark Bento"
```

---

### Task 3: Update services.ts data — seo + markedsforing

**Files:**
- Modify: `src/lib/content/services.ts`

- [ ] **Step 1: Update seo service entry**

```typescript
{
  id: "seo",
  title: "SEO-optimalisering",
  shortDescription: "Bli funnet av kundene dine når de søker på Google etter tjenestene du tilbyr.",
  longDescription: "Det hjelper lite med en flott nettside hvis ingen finner den. Søkemotoroptimalisering sørger for at bedriften din dukker opp når potensielle kunder søker etter det du tilbyr. Vi jobber med både teknisk SEO, innholdsoptimalisering og lokal SEO for å gi deg varige resultater.",
  categoryTag: "SEO",
  features: [/* keep existing */],
  detailedFeatures: [
    { iconName: "key", title: "Søkeordanalyse", description: "Finn de riktige søkeordene for din bransje" },
    { iconName: "cog", title: "Teknisk SEO", description: "Hastighet, strukturerte data og XML-sitemap" },
    { iconName: "file-text", title: "Innholdsoptimalisering", description: "Relevante søkeord i tekst og metadata" },
    { iconName: "map-pin", title: "Lokal SEO", description: "Google Business Profile-optimalisering" },
    { iconName: "link", title: "Lenkebygging", description: "Kvalitetslenker fra relevante norske nettsider" },
    { iconName: "trending-up", title: "Månedlig rapportering", description: "Synlige resultater med detaljerte rapporter" },
  ],
  painPoints: [
    { title: "Usynlig på Google", description: "Potensielle kunder finner konkurrentene dine — men ikke deg" },
    { title: "Bortkastet annonsepenger", description: "Du betaler for annonser fordi organisk trafikk er for lav" },
    { title: "Ingen strategi", description: "Innhold publiseres uten søkeordanalyse eller plan" },
  ],
  processSteps: [
    { step: 1, title: "Analyse", description: "Søkeord, konkurrenter og teknisk status" },
    { step: 2, title: "Optimalisering", description: "Innhold, struktur og tekniske faktorer" },
    { step: 3, title: "Lenkebygging", description: "Kvalitetslenker fra relevante nettsider" },
    { step: 4, title: "Rapportering", description: "Månedlig rapport med målbar fremgang" },
  ],
  faq: [
    { question: "Hvor lang tid tar det å se resultater?", answer: "SEO er en langsiktig investering. De fleste ser merkbar forbedring etter 3–6 måneder, men noen endringer gir effekt allerede etter uker." },
    { question: "Garanterer dere førsteplass på Google?", answer: "Ingen kan garantere en spesifikk plassering — Google endrer algoritmene kontinuerlig. Vi garanterer solid, etisk arbeid som gir varige resultater." },
    { question: "Hva koster SEO-optimalisering?", answer: "Vi tilbyr månedlige pakker fra kr 5 000. Prisen avhenger av konkurranse i din bransje og omfanget av arbeidet." },
  ],
  trustStats: [
    { value: 150, suffix: "%", label: "økt organisk trafikk snitt" },
    { value: 40, suffix: "+", label: "bedrifter rangert på side 1" },
    { value: 12, suffix: "+", label: "måneders erfaring" },
  ],
}
```

- [ ] **Step 2: Update markedsforing service entry**

```typescript
{
  id: "markedsforing",
  title: "Digital markedsføring",
  shortDescription: "Målrettet annonsering på Google og sosiale medier som gir deg flere kunder og målbar avkastning.",
  longDescription: "Digital markedsføring handler om å nå de riktige menneskene med den riktige beskjeden til riktig tid. Vi hjelper deg med å sette opp og optimalisere kampanjer på Google Ads, Facebook, Instagram og andre relevante plattformer.",
  categoryTag: "Markedsføring",
  features: [/* keep existing */],
  detailedFeatures: [
    { iconName: "target", title: "Google Ads", description: "Søkeannonser, display og remarketing" },
    { iconName: "megaphone", title: "Facebook-annonsering", description: "Målrettet annonsering på Facebook" },
    { iconName: "camera", title: "Instagram-annonsering", description: "Visuell annonsering til riktig målgruppe" },
    { iconName: "flask-conical", title: "A/B-testing", description: "Test annonser for best mulig resultat" },
    { iconName: "chart-bar", title: "Konverteringssporing", description: "ROI-rapportering og måling" },
    { iconName: "refresh-cw", title: "Løpende optimalisering", description: "Kampanjer justeres kontinuerlig" },
  ],
  painPoints: [
    { title: "Lav avkastning på annonser", description: "Du bruker penger på annonsering uten å se konkrete resultater" },
    { title: "Feil målgruppe", description: "Annonsene dine vises til folk som aldri vil bli kunder" },
    { title: "Ingen oppfølging", description: "Kampanjer settes opp og glemmes — uten løpende optimalisering" },
  ],
  processSteps: [
    { step: 1, title: "Strategi", description: "Målgruppe, budsjett og kanalvalg" },
    { step: 2, title: "Oppsett", description: "Annonser, sporing og landingssider" },
    { step: 3, title: "Optimalisering", description: "A/B-testing og løpende justering" },
    { step: 4, title: "Rapportering", description: "Månedlig ROI-rapport med innsikt" },
  ],
  faq: [
    { question: "Hvor mye bør jeg bruke på annonsering?", answer: "Det avhenger av bransje og mål. Vi anbefaler å starte med minimum kr 5 000–10 000 per måned i annonsebudsjett, pluss honorar for styring." },
    { question: "Hvilke plattformer anbefaler dere?", answer: "Det avhenger av målgruppen din. Google Ads fungerer best for kjøpsklare kunder, mens Facebook/Instagram er sterke for merkevarebygging og retargeting." },
    { question: "Hvor raskt ser jeg resultater?", answer: "Med betalte annonser kan du se trafikk og henvendelser allerede fra dag én. Optimaliseringen gir bedre resultater over tid." },
  ],
  trustStats: [
    { value: 300, suffix: "%", label: "gjennomsnittlig ROI" },
    { value: 25, suffix: "+", label: "aktive kampanjer" },
    { value: 2, suffix: "M+", label: "kroner forvaltet" },
  ],
}
```

- [ ] **Step 3: Commit**

```bash
git add src/lib/content/services.ts
git commit -m "feat: add seo + markedsforing service data for Bold Dark Bento"
```

---

### Task 4: Update services.ts data — vedlikehold + design

**Files:**
- Modify: `src/lib/content/services.ts`

- [ ] **Step 1: Update vedlikehold service entry**

```typescript
{
  id: "vedlikehold",
  title: "Drift og vedlikehold",
  shortDescription: "Sov godt om natten. Vi holder nettsiden din trygg, oppdatert og rask — hver eneste dag.",
  longDescription: "En nettside er ikke et engangsprosjekt — den trenger løpende vedlikehold for å fungere optimalt. Vi tilbyr driftsavtaler som dekker alt fra sikkerhetsoppdateringer og backup til ytelsesovervåking og innholdsendringer.",
  categoryTag: "Vedlikehold",
  features: [/* keep existing */],
  detailedFeatures: [
    { iconName: "hard-drive", title: "Daglige sikkerhetskopier", description: "Automatisk backup med enkel gjenoppretting" },
    { iconName: "shield", title: "Sikkerhetsovervåking", description: "Brannmur og trusselovervåking døgnet rundt" },
    { iconName: "refresh-cw", title: "Programvareoppdateringer", description: "Kompatibilitetstesting og oppdateringer" },
    { iconName: "circle-check", title: "99,9 % oppetid", description: "Garantert tilgjengelighet for besøkende" },
    { iconName: "file-text", title: "Innholdsendringer", description: "Mindre endringer inkludert i avtalen" },
    { iconName: "headphones", title: "Prioritert support", description: "Rask responstid når du trenger hjelp" },
  ],
  painPoints: [
    { title: "Hacket nettside", description: "Uten oppdateringer er nettsiden sårbar for angrep og nedetid" },
    { title: "Treg ytelse over tid", description: "Nettsider blir tregere uten løpende optimalisering og opprydding" },
    { title: "Ingen backup", description: "Hvis noe går galt, risikerer du å miste alt innhold og data" },
  ],
  processSteps: [
    { step: 1, title: "Oppstart", description: "Vi tar over drift og gjør en helsesjekk" },
    { step: 2, title: "Overvåking", description: "Døgnkontinuerlig oppetids- og sikkerhetsovervåking" },
    { step: 3, title: "Vedlikehold", description: "Daglige backups, oppdateringer og feilretting" },
    { step: 4, title: "Rapportering", description: "Månedlig statusrapport til deg" },
  ],
  faq: [
    { question: "Hva dekker en driftsavtale?", answer: "Daglige sikkerhetskopier, sikkerhetsovervåking, programvareoppdateringer, oppetidsgaranti og prioritert support. Mindre innholdsendringer er også inkludert." },
    { question: "Hva koster vedlikehold?", answer: "Driftsavtaler starter fra kr 1 500 per måned, avhengig av nettsidens størrelse og kompleksitet." },
    { question: "Kan jeg si opp avtalen?", answer: "Ja, avtalen kan sies opp med én måneds varsel. Ingen bindingstid." },
  ],
  trustStats: [
    { value: 99.9, suffix: "%", label: "oppetidsgaranti", decimals: 1 },
    { value: 365, suffix: "", label: "daglige sikkerhetskopier" },
    { value: 2, suffix: "t", label: "maks responstid" },
  ],
}
```

- [ ] **Step 2: Update design service entry**

```typescript
{
  id: "design",
  title: "Grafisk design og merkevarebygging",
  shortDescription: "En sterk visuell identitet skiller deg fra konkurrentene og bygger tillit hos kundene dine.",
  longDescription: "Førsteinntrykket teller, og visuell identitet er ofte det første potensielle kunder ser. Vi designer logoer, fargepaletter, typografi og grafisk materiell som kommuniserer verdiene og personligheten til bedriften din.",
  categoryTag: "Design",
  features: [/* keep existing */],
  detailedFeatures: [
    { iconName: "palette", title: "Logodesign", description: "Flere konseptforslag å velge mellom" },
    { iconName: "pipette", title: "Fargepalett", description: "Gjennomtenkt fargegrunnlag for merkevaren" },
    { iconName: "type", title: "Typografi", description: "Skriftvalg som kommuniserer riktig tone" },
    { iconName: "book-open", title: "Merkevaremanual", description: "Retningslinjer for konsistent bruk" },
    { iconName: "image", title: "Trykkmateriell", description: "Visittkort, brevpapir og mer" },
    { iconName: "share-2", title: "Sosiale medier", description: "Grafisk materiell for alle plattformer" },
  ],
  painPoints: [
    { title: "Ingen visuell identitet", description: "Bedriften mangler en gjenkjennelig profil på tvers av kanaler" },
    { title: "Inkonsistent merkevare", description: "Logo, farger og fonter brukes ulikt — det svekker tilliten" },
    { title: "Generisk utseende", description: "Bedriften ser ut som alle andre i bransjen" },
  ],
  processSteps: [
    { step: 1, title: "Briefing", description: "Vi forstår verdier, målgruppe og visjon" },
    { step: 2, title: "Konsepter", description: "2–3 designretninger å velge mellom" },
    { step: 3, title: "Finpuss", description: "Valgt konsept videreutvikles og perfeksjoneres" },
    { step: 4, title: "Leveranse", description: "Komplett pakke med filer og merkevaremanual" },
  ],
  faq: [
    { question: "Hvor mange logoforslag får jeg?", answer: "Du får 2–3 unike konseptforslag. Etter at du velger retning, gjør vi inntil 3 runder med justeringer." },
    { question: "Hva inkluderer en merkevaremanual?", answer: "Logo i alle formater, fargepalett med koder, typografiregler, brukseksempler og retningslinjer for konsistent bruk." },
    { question: "Kan dere designe for sosiale medier?", answer: "Ja, vi lager maler og grafisk materiell tilpasset Facebook, Instagram, LinkedIn og andre plattformer." },
  ],
  trustStats: [
    { value: 30, suffix: "+", label: "merkevarer designet" },
    { value: 100, suffix: "%", label: "fornøyde kunder" },
    { value: 5, suffix: "+", label: "års erfaring" },
  ],
}
```

- [ ] **Step 3: Remove all `extraSection` blocks and add missing imports**

Update the import at the top of `services.ts`: remove `ServiceExtraSection` / `ServiceExtraItem` references. Add imports for `PainPoint`, `ProcessStep`, `FAQ`, `TrustSignal` if not already imported. Ensure the import reads:

```typescript
import type { Service } from "@/types";
```

(The `Service` type references `PainPoint`, `ProcessStep`, `FAQ`, `TrustSignal` internally — no separate imports needed.)

- [ ] **Step 4: Verify build compiles**

Run: `npx tsc --noEmit 2>&1 | head -30`
Expected: Errors only in components that reference deleted types (`service-extra-section.tsx`, etc.) — these get fixed in later tasks.

- [ ] **Step 5: Commit types + all service data together**

```bash
git add src/types/index.ts src/lib/content/services.ts
git commit -m "feat: update types and service data for Bold Dark Bento redesign"
```

---

## Chunk 2: New Components

### Task 5: Create service-pain-points.tsx

**Files:**
- Create: `src/components/sections/service-pain-points.tsx`

- [ ] **Step 1: Create the component**

Light background section. Renders heading with service title, explanatory paragraph from `longDescription`, and 3 pain-point cards with red dot indicator.

```tsx
import type { Service } from "@/types";
import { Section } from "@/components/ui/section";

interface ServicePainPointsProps {
  service: Service;
}

export function ServicePainPoints({ service }: ServicePainPointsProps) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-pretty sm:text-4xl">
          Hvorfor trenger du {service.title.toLowerCase()}?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-[var(--color-text-muted)]">
          {service.longDescription}
        </p>

        <div className="mt-12 flex flex-col gap-4">
          {service.painPoints.map((point) => (
            <div
              key={point.title}
              className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-white p-5"
            >
              <div
                className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500"
                aria-hidden="true"
              />
              <div>
                <p className="font-semibold text-[var(--color-text)]">{point.title}</p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/service-pain-points.tsx
git commit -m "feat: create ServicePainPoints component"
```

---

### Task 6: Create service-process.tsx

**Files:**
- Create: `src/components/sections/service-process.tsx`

- [ ] **Step 1: Create the component**

Dark background. Horizontal 4-step timeline with arrows. Steps stack vertically on mobile.

```tsx
import type { ProcessStep } from "@/types";

interface ServiceProcessProps {
  steps: ProcessStep[];
}

export function ServiceProcess({ steps }: ServiceProcessProps) {
  const lastIndex = steps.length - 1;

  return (
    <section className="px-6 py-20 sm:py-28" style={{ background: "linear-gradient(135deg, var(--color-dark-bg), var(--color-dark-bg-alt))" }}>
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-4xl">
          Slik jobber vi
        </h2>

        {/* Desktop: horizontal */}
        <div className="hidden items-stretch gap-3 sm:flex">
          {steps.map((step, i) => (
            <div key={step.step} className="contents">
              <div
                className={`flex flex-1 flex-col items-center rounded-2xl border p-6 text-center backdrop-blur-sm ${
                  i === 0 || i === lastIndex
                    ? "border-[var(--color-accent)]/20 bg-[var(--color-accent)]/8"
                    : "border-[var(--color-dark-border)] bg-[var(--color-dark-glass)]"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                    i === 0 || i === lastIndex
                      ? "bg-[var(--color-accent)] text-[var(--color-dark-bg)]"
                      : "bg-white/10 text-[var(--color-dark-text)]"
                  }`}
                >
                  {step.step}
                </div>
                <h3 className="mt-3 font-semibold text-[var(--color-dark-text)]">{step.title}</h3>
                <p className="mt-1 text-sm text-[var(--color-dark-muted)]">{step.description}</p>
              </div>
              {i < lastIndex && (
                <div className="flex items-center text-xl text-[var(--color-accent)]" aria-hidden="true">→</div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="flex flex-col gap-4 sm:hidden">
          {steps.map((step, i) => (
            <div key={step.step}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                      i === 0 || i === lastIndex
                        ? "bg-[var(--color-accent)] text-[var(--color-dark-bg)]"
                        : "bg-white/10 text-[var(--color-dark-text)]"
                    }`}
                  >
                    {step.step}
                  </div>
                  {i < lastIndex && (
                    <div className="mt-2 h-8 w-px bg-[var(--color-accent)]/30" aria-hidden="true" />
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-[var(--color-dark-text)]">{step.title}</h3>
                  <p className="mt-1 text-sm text-[var(--color-dark-muted)]">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/service-process.tsx
git commit -m "feat: create ServiceProcess timeline component"
```

---

### Task 7: Create service-faq.tsx

**Files:**
- Create: `src/components/sections/service-faq.tsx`

- [ ] **Step 1: Create the accordion component**

Client component with dark background. Uses CSS grid-template-rows transition for smooth expand/collapse.

```tsx
"use client";

import { useState } from "react";
import type { FAQ } from "@/types";

interface ServiceFaqProps {
  faq: FAQ[];
}

export function ServiceFaq({ faq }: ServiceFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="px-6 py-20 sm:py-28"
      style={{ background: "linear-gradient(135deg, var(--color-dark-bg), var(--color-dark-bg-alt))" }}
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-4xl">
          Vanlige spørsmål
        </h2>

        <div className="flex flex-col gap-3">
          {faq.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.question}
                className={`rounded-xl border backdrop-blur-sm transition-colors duration-200 ${
                  isOpen
                    ? "border-[var(--color-accent)]/20 bg-[var(--color-accent)]/8"
                    : "border-[var(--color-dark-border)] bg-[var(--color-dark-glass)]"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between px-5 py-4 text-left cursor-pointer"
                >
                  <span
                    className={`font-semibold transition-colors duration-200 ${
                      isOpen ? "text-[var(--color-accent)]" : "text-[var(--color-dark-text)]"
                    }`}
                  >
                    {item.question}
                  </span>
                  <span
                    className="ml-4 shrink-0 text-xl text-[var(--color-accent)]"
                    aria-hidden="true"
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out motion-reduce:transition-none"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-[var(--color-dark-muted)]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/service-faq.tsx
git commit -m "feat: create ServiceFaq accordion component"
```

---

## Chunk 3: Rewritten Components

### Task 8: Rewrite service-hero.tsx

**Files:**
- Modify: `src/components/sections/service-hero.tsx`

- [ ] **Step 1: Rewrite as dark hero with category tag and trust stats**

Replace entire file. Dark background, centered layout, gold glow, category tag pill, trust stats with `CountUpStat`.

**Before writing the hero:** First update `src/components/ui/count-up-stat.tsx` to support a `decimals` prop. Change `Math.round(eased * value)` to:
```tsx
// Add decimals prop to interface
decimals?: number;
// In tick function:
const num = eased * value;
setDisplay(decimals ? parseFloat(num.toFixed(decimals)) : Math.round(num));
// In render — display decimal values:
{prefix}{decimals ? display.toFixed(decimals) : display}{suffix}
```

```tsx
"use client";

import Link from "next/link";
import type { Service } from "@/types";
import { CountUpStat } from "@/components/ui/count-up-stat";

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section
      className="relative overflow-hidden px-6 py-24 text-center sm:py-32"
      style={{ background: "linear-gradient(180deg, var(--color-dark-bg), var(--color-dark-bg-alt))" }}
    >
      {/* Radial gold glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(244, 206, 20, 0.1) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl">
        {/* Category tag */}
        <span className="inline-block rounded-full border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          {service.categoryTag}
        </span>

        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-pretty text-[var(--color-dark-text)] sm:text-5xl lg:text-6xl">
          {service.title}
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-dark-muted)] sm:text-xl">
          {service.shortDescription}
        </p>

        <Link
          href="/kontakt"
          className="mt-10 inline-block cursor-pointer rounded-lg bg-[var(--color-accent)] px-8 py-3.5 text-lg font-semibold text-[var(--color-dark-bg)] transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
        >
          Få et uforpliktende tilbud
        </Link>

        {/* Trust stats */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 border-t border-[var(--color-dark-border)] pt-8">
          {service.trustStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-extrabold tabular-nums text-[var(--color-accent)] sm:text-3xl">
                <CountUpStat
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </p>
              <p className="mt-1 text-xs text-[var(--color-dark-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/service-hero.tsx
git commit -m "feat: rewrite ServiceHero as dark hero with trust stats"
```

---

### Task 9: Rewrite service-bento-features.tsx

**Files:**
- Modify: `src/components/sections/service-bento-features.tsx`

- [ ] **Step 1: Rewrite with Lucide icons**

Replace emoji rendering with dynamic Lucide icon lookup. Keep bento grid layout with improved card variants.

```tsx
import { icons } from "lucide-react";
import type { ServiceFeature } from "@/types";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";

interface ServiceBentoFeaturesProps {
  features: ServiceFeature[];
}

const cardVariants = [
  "bg-white/6 border-white/8",
  "bg-[var(--color-accent)]/8 border-[var(--color-accent)]/15",
  "bg-white/4 border-white/6",
  "bg-white/6 border-white/8",
  "bg-[var(--color-accent)]/8 border-[var(--color-accent)]/15",
  "bg-white/4 border-white/6",
];

const gridPlacements = [
  "col-span-1 md:col-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1 md:col-span-2",
];

function LucideIcon({ name, className }: { name: string; className?: string }) {
  // Convert kebab-case to PascalCase for lucide-react's icon map
  const pascalName = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  const IconComponent = icons[pascalName as keyof typeof icons];
  if (!IconComponent) return null;
  return <IconComponent className={className} aria-hidden="true" />;
}

export function ServiceBentoFeatures({ features }: ServiceBentoFeaturesProps) {
  return (
    <Section>
      <h2 className="mb-12 text-center text-3xl font-bold text-pretty sm:text-4xl">
        Dette inkluderer
      </h2>

      <div
        className="rounded-3xl p-6 sm:p-10"
        style={{ background: "linear-gradient(135deg, var(--color-dark-bg), var(--color-dark-bg-alt))" }}
      >
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <li
              key={feature.title}
              className={cn(
                "rounded-2xl border p-6 backdrop-blur-xl shadow-lg shadow-black/10",
                "cursor-pointer transition-transform duration-200 motion-reduce:transition-none hover:scale-[1.02]",
                cardVariants[i % cardVariants.length],
                gridPlacements[i % gridPlacements.length],
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/15">
                <LucideIcon name={feature.iconName} className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[var(--color-dark-text)]">{feature.title}</h3>
              <p className="mt-1 text-sm text-[var(--color-dark-muted)]">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/service-bento-features.tsx
git commit -m "feat: rewrite ServiceBentoFeatures with Lucide SVG icons"
```

---

### Task 10: Create service-custom-section.tsx

**Files:**
- Create: `src/components/sections/service-custom-section.tsx`

- [ ] **Step 1: Create the switch component with 6 sub-components**

This is the largest new component. Contains the service.id switch and 6 inline sub-components: NettsideShowcase, NettbutikkPayments, SeoRanking, MarkedsforingPlatforms, VedlikeholdStats, DesignSpecimen.

Each sub-component uses CSS-only visuals and inline SVGs — no external images. Keep each sub-component focused (50–80 lines max).

The file renders a light-background `<Section>` with a heading and the matching sub-component. See spec Section 4 for detailed descriptions of each.

Key implementation notes:
- `NettsideShowcase`: 3 CSS device frames (laptop, tablet, phone) with gradient fills
- `NettbutikkPayments`: Grid of payment provider cards with inline SVG logos from Simple Icons
- `SeoRanking`: CSS bar chart with 5 bars at different heights, animated on scroll via CSS animation
- `MarkedsforingPlatforms`: 3 platform cards (Google, Meta, Instagram) with ROI stat counters
- `VedlikeholdStats`: 3 large stat counters using `CountUpStat` (reuses `service.trustStats` — pass as prop)
- `DesignSpecimen`: Color swatch circles + typography preview + 3 logo variant placeholder boxes

- [ ] **Step 2: Commit**

```bash
git add src/components/sections/service-custom-section.tsx
git commit -m "feat: create ServiceCustomSection with 6 per-service sub-components"
```

---

## Chunk 4: Minor Updates & Page Assembly

### Task 11: Update service-testimonial.tsx and service-cta.tsx

**Files:**
- Modify: `src/components/sections/service-testimonial.tsx`
- Modify: `src/components/sections/service-cta.tsx`

- [ ] **Step 1: Update testimonial background**

Change the `<section>` background from `bg-[var(--color-bg-alt)]` to `bg-[var(--color-bg)]` so it reads as the light (#F5F7F8) section in the alternating dark/light rhythm.

- [ ] **Step 2: Update CTA background**

Same change: ensure CTA section uses `bg-[var(--color-bg)]` not `bg-[var(--color-bg-alt)]` for consistent light treatment.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/service-testimonial.tsx src/components/sections/service-cta.tsx
git commit -m "fix: update testimonial and CTA backgrounds for dark/light rhythm"
```

---

### Task 12: Assemble the page and delete old files

**Files:**
- Modify: `src/app/tjenester/[slug]/page.tsx`
- Delete: `src/components/sections/service-trust-bar.tsx`
- Delete: `src/components/sections/service-story.tsx`
- Delete: `src/components/sections/service-extra-section.tsx`

- [ ] **Step 1: Update page.tsx with new 8-section layout**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES } from "@/lib/content/services";
import { SERVICE_SEO } from "@/lib/content/seo";
import { ServiceHero } from "@/components/sections/service-hero";
import { ServicePainPoints } from "@/components/sections/service-pain-points";
import { ServiceBentoFeatures } from "@/components/sections/service-bento-features";
import { ServiceCustomSection } from "@/components/sections/service-custom-section";
import { ServiceProcess } from "@/components/sections/service-process";
import { ServiceTestimonial } from "@/components/sections/service-testimonial";
import { ServiceFaq } from "@/components/sections/service-faq";
import { ServiceCta } from "@/components/sections/service-cta";
import { TESTIMONIALS, SERVICE_TESTIMONIAL_MAP } from "@/lib/content/homepage";

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
      <ServicePainPoints service={service} />
      <ServiceBentoFeatures features={service.detailedFeatures} />
      <ServiceCustomSection service={service} />
      <ServiceProcess steps={service.processSteps} />
      <ServiceTestimonial testimonial={TESTIMONIALS[SERVICE_TESTIMONIAL_MAP[slug] ?? 0]} />
      <ServiceFaq faq={service.faq} />
      <ServiceCta />
    </main>
  );
}
```

- [ ] **Step 2: Delete old files**

```bash
rm src/components/sections/service-trust-bar.tsx
rm src/components/sections/service-story.tsx
rm src/components/sections/service-extra-section.tsx
```

- [ ] **Step 3: Verify build**

Run: `npm run build 2>&1 | tail -20`
Expected: Build succeeds with no errors.

- [ ] **Step 4: Commit**

```bash
git add -A src/app/tjenester/[slug]/page.tsx src/components/sections/
git commit -m "feat: assemble 8-section service pages, delete old components"
```

---

## Chunk 5: Visual Verification

### Task 13: Preview and fix all 6 service pages

**Files:**
- Potentially any component from Tasks 5–12

- [ ] **Step 1: Start dev server and verify nettside page**

Run: `npm run dev`
Navigate to: `http://localhost:3000/tjenester/nettside`
Check: All 8 sections render, dark/light alternation, Lucide icons visible, no console errors.

- [ ] **Step 2: Verify remaining 5 pages**

Navigate to each:
- `/tjenester/nettbutikk`
- `/tjenester/seo`
- `/tjenester/markedsforing`
- `/tjenester/vedlikehold`
- `/tjenester/design`

Check: Custom sections render correctly per service, FAQ accordion works, stats count up.

- [ ] **Step 3: Check mobile responsive (375px)**

Verify: Bento grid → 1 column, process steps → vertical, FAQ accordion works on touch.

- [ ] **Step 4: Fix any visual issues found**

Address any layout, spacing, color, or responsive issues discovered during preview.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "fix: visual polish for service page redesign"
```
