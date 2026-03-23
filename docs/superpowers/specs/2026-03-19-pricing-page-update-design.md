# Pricing Page Update — Design Spec

## Summary

Update the pricing page to reflect competitive market-researched pricing, add a dedicated maintenance packages section, trim add-on services to only those deliverable via Claude Code, and remove the Nettbutikk section.

## Changes Overview

### 1. Website Build Packages (update data in `PACKAGES`)

New IDs: `enkel`, `standard`, `premium` (replacing `starter`, `profesjonell`, `premium`).

#### Enkel
- **id:** `"enkel"`
- **name:** `"Enkel"`
- **subtitle:** `"For deg som trenger en enkel, profesjonell nettside"`
- **price:** `"12 990 kr"`
- **monthly:** `"490 kr/mnd"`
- **monthlyNote:** `"for hosting"`
- **description:** `"En solid bedriftsnettside med alt du trenger for å bli funnet på nett. Perfekt for nyoppstartede bedrifter, håndverkere og konsulenter."`
- **highlight:** `false`
- **features:**
  - Inntil 3 sider (forside, tjenester, kontakt)
  - Responsivt design — mobil, nettbrett og desktop
  - Grunnleggende SEO-oppsett
  - Kontaktskjema med e-postvarsling
  - SSL-sertifikat og GDPR-tilpasning
  - Google Analytics-oppsett
  - Levert innen 1–2 uker

#### Standard (highlighted)
- **id:** `"standard"`
- **name:** `"Standard"`
- **subtitle:** `"Mest populær — for bedrifter som vil vokse"`
- **price:** `"19 990 kr"`
- **monthly:** `"790 kr/mnd"`
- **monthlyNote:** `"for hosting og vedlikehold"`
- **description:** `"En komplett nettside med skreddersydd design, blogg og avansert SEO. For bedrifter der nettsiden er en viktig kilde til nye kunder."`
- **highlight:** `true`
- **features:**
  - Alt i Enkel, pluss:
  - Inntil 5 sider med skreddersydd design
  - Avansert SEO med søkeordanalyse og schema markup
  - Google Business Profile-oppsett
  - Animasjoner og interaktive elementer
  - Ytelsesoptimalisering (Core Web Vitals)
  - Levert innen 2–4 uker

#### Premium
- **id:** `"premium"`
- **name:** `"Premium"`
- **subtitle:** `"For bedrifter med høye ambisjoner"`
- **price:** `"29 990 kr"`
- **monthly:** `"990 kr/mnd"`
- **monthlyNote:** `"for hosting, vedlikehold og support"`
- **description:** `"En skreddersydd løsning med avansert funksjonalitet, integrasjoner og dedikert oppfølging. For bedrifter som vil ha det beste."`
- **highlight:** `false`
- **features:**
  - Alt i Standard, pluss:
  - Inntil 10 sider
  - Avansert funksjonalitet (booking, CRM-integrasjon)
  - A/B-testing og konverteringsoptimalisering
  - Tilgjengelighetstilpasning (WCAG)
  - Prioritert support med rask responstid
  - Kvartalsvis ytelsesrapport
  - Levert innen 4–6 uker

### 2. NEW: Vedlikeholdspakker Section

#### Data shape (`MAINTENANCE_PACKAGES`)

```ts
type MaintenancePackage = {
  id: string;
  name: string;
  price: string;        // e.g. "790 kr/mnd"
  description: string;
  features: string[];
  highlight: boolean;
};
```

#### Layout

Three cards in a horizontal row (`lg:grid-cols-3`), same card style as build packages but placed in a `bg-[var(--color-bg-alt)]` section. Middle tier (Standard) is highlighted with accent border/dark-bg treatment matching the build package highlight pattern.

#### Data

**Basis:**
- **id:** `"vedlikehold-basis"`
- **name:** `"Basis"`
- **price:** `"790 kr/mnd"`
- **description:** `"Grunnleggende drift for nettsider som trenger trygg hosting og jevnlige oppdateringer."`
- **highlight:** `false`
- **features:**
  - Hosting på norske servere
  - SSL-sertifikat inkludert
  - Daglige sikkerhetskopier
  - Sikkerhets- og programvareoppdateringer
  - 1 innholdsendring per måned
  - E-postsupport

**Standard (highlighted):**
- **id:** `"vedlikehold-standard"`
- **name:** `"Standard"`
- **price:** `"1 490 kr/mnd"`
- **description:** `"For bedrifter som vil holde nettsiden oppdatert og overvåket uten bekymringer."`
- **highlight:** `true`
- **features:**
  - Alt i Basis, pluss:
  - Inntil 3 innholdsendringer per måned
  - Ytelsesovervåking og optimalisering
  - Oppetidskontroll med varsling
  - Månedlig sikkerhetsrapport
  - Prioritert e-postsupport

**Profesjonell:**
- **id:** `"vedlikehold-profesjonell"`
- **name:** `"Profesjonell"`
- **price:** `"2 490 kr/mnd"`
- **description:** `"Komplett vedlikehold med ubegrensede endringer og dedikert oppfølging."`
- **highlight:** `false`
- **features:**
  - Alt i Standard, pluss:
  - Ubegrensede små endringer (tekst, bilder, layout)
  - Prioritert support med rask responstid
  - Månedlig ytelsesrapport med forbedringsforslag
  - Kvartalsvis SEO-helsesjekk

#### Section text
- **Heading:** `"Vedlikehold og drift"`
- **Subheading:** `"Har du allerede en nettside? Vi holder den oppdatert, sikker og rask — så du kan fokusere på bedriften din."`

Note on naming: "Standard" appears in both build packages and maintenance packages. This is intentional — they are in separate sections with different contexts (one-time build vs. monthly service). The maintenance section heading "Vedlikehold og drift" makes the context clear.

### 3. Tilleggstjenester (trimmed)

Remove: Google Ads, Grafisk design, Sosiale medier.

#### Updated data shape

```ts
type AddonService = {
  name: string;
  price: string;           // primary price display
  monthlyPrice?: string;   // optional secondary monthly price
  description: string;
};
```

The `description` field contains a single sentence describing the service. Feature details are part of the description prose, not a separate array — keeping the current card layout compact.

If `monthlyPrice` is present, render it below `price` as a secondary line: `"eller {monthlyPrice}"`.

#### Data

1. **SEO-pakke**
   - price: `"fra 4 990 kr"`
   - monthlyPrice: `"fra 2 990 kr/mnd"`
   - description: `"Teknisk SEO-audit med meta-tagger, schema markup, søkeordanalyse og handlingsplan. Velg månedlig pakke for løpende optimalisering og rapportering."`

2. **Ytelsesoptimalisering**
   - price: `"fra 3 990 kr"`
   - monthlyPrice: (none)
   - description: `"Forbedring av Core Web Vitals, bildeoptimalisering, lazy loading og hastighetsoptimalisering for bedre brukeropplevelse og Google-rangering."`

3. **Google Analytics og sporing**
   - price: `"fra 2 990 kr"`
   - monthlyPrice: (none)
   - description: `"Komplett GA4-oppsett med konverteringssporing, hendelsesmåling og dashboard — så du ser nøyaktig hva som fungerer."`

4. **Innholdsproduksjon**
   - price: `"fra 1 500 kr per side"`
   - monthlyPrice: (none)
   - description: `"Nye sider, bloggartikler, tekstoppdateringer og bildebytte. SEO-optimalisert innhold tilpasset din bransje."`

5. **Tilgjengelighet (WCAG)**
   - price: `"fra 3 990 kr"`
   - monthlyPrice: (none)
   - description: `"Tilgjengelighetsaudit og utbedring — tastaturnavigasjon, skjermleser-støtte og kontrastforbedringer for å nå alle brukere."`

### 4. Remove Nettbutikk Section

- Delete `NETTBUTIKK_PACKAGE` export from `pricing.ts`
- Remove the nettbutikk section from `page.tsx` (lines ~97-143)
- Remove the `NETTBUTIKK_PACKAGE` import from `page.tsx`

### 5. FAQ Updates

Full replacement text for each FAQ item:

1. **"Er prisene inkludert mva.?"**
   → `"Nei, alle oppgitte priser er ekskludert mva. (25 %). Totalprisen inkludert mva. oppgis alltid i tilbudet."`
   (No change needed)

2. **"Hva er inkludert i de månedlige kostnadene?"**
   → `"Alle nettsidepakker inkluderer månedlig hosting. Utover det tilbyr vi separate vedlikeholdspakker fra 790 kr/mnd som dekker sikkerhetskopier, oppdateringer, support og innholdsendringer. Se våre vedlikeholdspakker lenger opp på siden for detaljer."`

3. **"Er det bindingstid?"**
   → `"Nei, vi har ingen bindingstid. Vedlikeholdsavtaler kan sies opp med én måneds varsel. Nettsiden er din — du eier alt innhold, design og kode."`
   (Minor simplification)

4. **"Hva om prosjektet mitt ikke passer inn i en pakke?"**
   → `"Pakkene er utgangspunkter — alle prosjekter skreddersys til dine behov. Ta kontakt for et tilpasset tilbud med nøyaktig pris basert på hva du trenger."`
   (No change needed)

5. **"Hvordan er betalingsmodellen?"**
   → `"Nettsider faktureres i to deler: 50 % ved oppstart og 50 % ved lansering. Vedlikeholdsavtaler og tilleggstjenester faktureres månedlig."`

### 6. Metadata Update

Update the page `<Metadata>`:
- **title:** `"Priser — Nettsider, vedlikehold og SEO | IDweb"`
- **description:** `"Se våre priser for nettsider, vedlikehold, SEO og tilleggstjenester. Faste priser, ingen bindingstid. Få et skreddersydd tilbud."`

(Removes "nettbutikker" reference)

### 7. Hero & CTA

Keep as-is. No changes needed.

## Files to Modify

1. `src/lib/content/pricing.ts` — update `PACKAGES`, add `MAINTENANCE_PACKAGES`, remove `NETTBUTIKK_PACKAGE`, update `ADDON_SERVICES` shape and data, update `PRICING_FAQ`
2. `src/app/priser/page.tsx` — add maintenance section, remove nettbutikk section and import, update metadata

## Design Notes

- "eks. mva." is communicated via the FAQ section (same as current approach), not on individual cards
- Maintenance section uses `bg-[var(--color-bg-alt)]` background
- Maintenance cards reuse the same card component pattern as build packages
- Standard maintenance tier highlighted with accent border/dark-bg to encourage middle tier
- Add-on cards with `monthlyPrice` show it as a secondary line below the primary price
