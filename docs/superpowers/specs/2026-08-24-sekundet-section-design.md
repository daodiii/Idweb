# Sekundet — full-stack-seksjon på forsiden

**Dato:** 2026-08-24 · **Status:** godkjent (valgt av Dao etter 9 mockup-retninger)
**Mockup-referanse:** scratchpad `sekundet.html`, artifact `claude.ai/code/artifact/b87b436e-1ba0-4858-8cbe-d2dbe1e3571f`

## Hva

En scroll-scrubbet seksjon som viser at IDweb bygger hele kjeden (full stack) —
fortalt som **ett sekund av virkelig tid, strukket ut over hele scrollen**.
Kl. 21:47:03,120 trykker en kunde «Bestill med Vipps». Leseren scrubber
millisekunder på en gigantisk mono-klokke og følger den ene bestillingen
gjennom seks stasjoner:

| # | Stasjon | ms | Kort viser |
|---|---------|----|------------|
| 0 | Telefonen | 0 | Papirhvitt bestillingsskjema, knapp frosset i trykket tilstand |
| 1 | Serveren | +180 | Mono-logg: POST /api/bestilling · auth ok · validering ok |
| 2 | Databasen | +320 | INSERT-rad + «konfliktsjekk: ingen overlapp» |
| 3 | Vipps | +600 | 900,00 kr · reservert · ref |
| 4 | SMS-en | +900 | Bekreftelsesboble, «levert 21:47:04» |
| 5 | Panelet ditt | +1 240 | Mini-panel: teller 19 (+1), raden landet |

Finale: **«1,24 s. Fra tommel til kvittering.»** Ærlighetslinje nederst:
*Demodata · tidene er typiske, ikke målt.* Kunden navngis ikke (Marte Lundeby
er fiktiv); forretningskonteksten er et medlemssenter i Oslo.

## Hvorfor akkurat denne

- **Fortelling, ikke dekorasjon.** Én hovedperson gjennom hele maskinen —
  full stack forklart så en tannlege forstår det, uten å si «full stack».
- **Tidsdilatasjonen er grepet.** Ingen konkurrent har en scrubbebar
  transaksjonsfilm; klokka er både scroll-indikator og poeng.
- **To-verden-språket.** Telefonen er det eneste papir-objektet (kundens
  verden); resten er void (maskinens verden). Matcher Monument-designet.

## Plassering

`src/app/page.tsx`, mellom `ProjectsCarousel` (3) og `SpecDuel` (4):
karusellen viser fasadene, Sekundet viser maskinen bak dem. Lazy-loaded som
de andre below-fold-seksjonene.

## Teknisk

- `src/components/sections/sekundet.tsx` («use client», named export `Sekundet`)
- Innhold i `src/lib/content/sekundet.ts` (stasjoner, kort-copy, tider)
- Husmønstre: `useScroll` + sticky `h-[560vh]`-runway (som manifesto-fill),
  `useAnimationFrame` for canvas-wiren (som projects-carousel),
  `useReducedMotion`. Tokens fra `@/lib/motion`.
- Kortbytter: CSS-transitions (ikke keyframes) — scrubbing bakover skal gå i
  revers uten hopp. Kun transform/opacity. Utgang raskere enn inngang.
- Klokka skriver kun DOM når sifrene endres.
- Canvas: eksplisitt `width/height: 100%` (replaced element), DPR-cap 2,
  tegner wire + ticks + latenslabler + komet + dokk-pulser.
- Engine-guards (lærdom fra mockup-fasen): IntersectionObserver + `document.hidden`
  med **restart ved retur til fanen** (IO re-fyrer ikke), og ingen avhengighet
  av WAAPI `onfinish` (upålitelig under throttling).

## Mobil (<880px) og prefers-reduced-motion

Filmen blir et stående fotoessay: klokka statisk på sluttverdien, alle seks
stasjonskortene stablet langs en gul linje med ms-merker, intro + finale som
vanlig tekst. Ingen sticky, ingen canvas, ingen auto-bevegelse.

## Ikke med (bevisst)

- Ingen mellomtekst i venstrefeltet mellom intro og finale (filmfokus).
- Ingen lyd, ingen auto-avspilling — alt er knyttet til scrollen.
- Priser nevnes ikke (jf. prisfjerningen); 900 kr er kundens kjøp, ikke vårt.
