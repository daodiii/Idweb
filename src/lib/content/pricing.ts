export const PRICING_PAGE = {
  headline: "Ærlige priser, ingen overraskelser",
  subheadline:
    "Vi tror på transparens. Her er en oversikt over hva mine tjenester koster. Alle priser er veiledende — ta kontakt for et skreddersydd tilbud.",
} as const;

export const PACKAGES = [
  {
    id: "enkel",
    name: "Enkel",
    subtitle: "For deg som trenger en enkel, profesjonell nettside",
    price: "12 990 kr",
    monthly: "490 kr/mnd",
    monthlyNote: "for hosting",
    description:
      "En solid bedriftsnettside med alt du trenger for å bli funnet på nett. Perfekt for nyoppstartede bedrifter, håndverkere og konsulenter.",
    features: [
      "Inntil 3 sider (forside, tjenester, kontakt)",
      "Responsivt design — mobil, nettbrett og desktop",
      "Grunnleggende SEO-oppsett",
      "Kontaktskjema med e-postvarsling",
      "SSL-sertifikat og GDPR-tilpasning",
      "Google Analytics-oppsett",
      "Levert innen 2 uker",
    ],
    highlight: false,
  },
  {
    id: "standard",
    name: "Standard",
    subtitle: "Mest populær — for bedrifter som vil vokse",
    price: "19 990 kr",
    monthly: "790 kr/mnd",
    monthlyNote: "for hosting og vedlikehold",
    description:
      "En komplett nettside med skreddersydd design, blogg og avansert SEO. For bedrifter der nettsiden er en viktig kilde til nye kunder.",
    features: [
      "Alt i Enkel, pluss:",
      "Inntil 5 sider med skreddersydd design",
      "Avansert SEO med søkeordanalyse og schema markup",
      "Google Business Profile-oppsett",
      "Animasjoner og interaktive elementer",
      "Ytelsesoptimalisering (Core Web Vitals)",
      "Levert innen 3 uker",
    ],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "For bedrifter med høye ambisjoner",
    price: "29 990 kr",
    monthly: "990 kr/mnd",
    monthlyNote: "for hosting, vedlikehold og support",
    description:
      "En skreddersydd løsning med utvidet funksjonalitet og dedikert oppfølging. For bedrifter som trenger mer enn en standard nettside.",
    features: [
      "Alt i Standard, pluss:",
      "Inntil 10 sider",
      "Flerspråklig støtte (norsk/engelsk)",
      "Avanserte kontaktskjemaer med betinget logikk",
      "Tilgjengelighetstilpasning (WCAG)",
      "Prioritert support med rask responstid",
      "Kvartalsvis ytelsesrapport",
      "Levert innen 4–6 uker",
    ],
    highlight: false,
  },
] as const;

export const MAINTENANCE_PACKAGES = [
  {
    id: "vedlikehold-basis",
    name: "Basis",
    price: "690 kr/mnd",
    description:
      "Grunnleggende drift for nettsider som trenger trygg hosting og jevnlige oppdateringer.",
    features: [
      "Hosting på norske servere",
      "SSL-sertifikat inkludert",
      "Daglige sikkerhetskopier",
      "Sikkerhets- og programvareoppdateringer",
      "1 innholdsendring per måned",
      "E-postsupport",
    ],
    highlight: false,
  },
  {
    id: "vedlikehold-standard",
    name: "Standard",
    price: "990 kr/mnd",
    description:
      "For bedrifter som vil holde nettsiden oppdatert og overvåket uten bekymringer.",
    features: [
      "Alt i Basis, pluss:",
      "Inntil 3 innholdsendringer per måned",
      "Ytelsesovervåking og optimalisering",
      "Oppetidskontroll med varsling",
      "Månedlig sikkerhetsrapport",
      "Prioritert e-postsupport",
    ],
    highlight: true,
  },
  {
    id: "vedlikehold-profesjonell",
    name: "Profesjonell",
    price: "1 500 kr/mnd",
    description:
      "Komplett vedlikehold med ubegrensede endringer og dedikert oppfølging.",
    features: [
      "Alt i Standard, pluss:",
      "Ubegrensede små endringer (tekst, bilder, layout)",
      "Prioritert support med rask responstid",
      "Månedlig ytelsesrapport med forbedringsforslag",
      "Kvartalsvis SEO-helsesjekk",
    ],
    highlight: false,
  },
] as const;

export const ADDON_SERVICES = [
  {
    name: "SEO-pakke",
    price: "fra 4 990 kr",
    monthlyPrice: "fra 2 990 kr/mnd",
    description:
      "Teknisk SEO-audit med meta-tagger, schema markup, søkeordanalyse og handlingsplan. Velg månedlig pakke for løpende optimalisering og rapportering.",
  },
  {
    name: "Ytelsesoptimalisering",
    price: "fra 3 990 kr",
    description:
      "Forbedring av Core Web Vitals, bildeoptimalisering, lazy loading og hastighetsoptimalisering for bedre brukeropplevelse og Google-rangering.",
  },
  {
    name: "Google Analytics og sporing",
    price: "fra 2 990 kr",
    description:
      "Komplett GA4-oppsett med konverteringssporing, hendelsesmåling og dashboard — så du ser nøyaktig hva som fungerer.",
  },
  {
    name: "Innholdsproduksjon",
    price: "fra 1 500 kr per side",
    description:
      "Nye sider, bloggartikler, tekstoppdateringer og bildebytte. SEO-optimalisert innhold tilpasset din bransje.",
  },
  {
    name: "Tilgjengelighet (WCAG)",
    price: "fra 3 990 kr",
    description:
      "Tilgjengelighetsaudit og utbedring — tastaturnavigasjon, skjermleser-støtte og kontrastforbedringer for å nå alle brukere.",
  },
] as const;

export const PRICING_FAQ = [
  {
    question: "Er prisene inkludert mva.?",
    answer:
      "Priser er oppgitt uten MVA. IDweb er per i dag ikke MVA-registrert. Dersom MVA-registrering gjennomføres, vil MVA tilkomme i henhold til gjeldende satser.",
  },
  {
    question: "Hva er inkludert i de månedlige kostnadene?",
    answer:
      "Alle nettsidepakker inkluderer månedlig hosting. Utover det tilbyr vi separate vedlikeholdspakker fra 690 kr/mnd som dekker sikkerhetskopier, oppdateringer, support og innholdsendringer. Se våre vedlikeholdspakker lenger opp på siden for detaljer.",
  },
  {
    question: "Er det bindingstid?",
    answer:
      "Nei, vi har ingen bindingstid. Vedlikeholdsavtaler kan sies opp med én måneds varsel. Nettsiden er din — du eier alt innhold, design og kode.",
  },
  {
    question: "Hva om prosjektet mitt ikke passer inn i en pakke?",
    answer:
      "Pakkene er utgangspunkter — alle prosjekter skreddersys til dine behov. Ta kontakt for et tilpasset tilbud med nøyaktig pris basert på hva du trenger.",
  },
  {
    question: "Hvordan er betalingsmodellen?",
    answer:
      "Nettsider faktureres i to deler: 50 % ved oppstart og 50 % ved lansering. Vedlikeholdsavtaler og tilleggstjenester faktureres månedlig.",
  },
] as const;

export const PRICING_CTA = {
  headline: "Usikker på hvilken pakke som passer?",
  description:
    "Ta kontakt for en uforpliktende samtale. Vi hjelper deg med å finne riktig løsning basert på dine behov og budsjett — helt gratis.",
  buttonText: "Få et skreddersydd tilbud",
} as const;
