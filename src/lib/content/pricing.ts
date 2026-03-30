export const PRICING_PAGE = {
  headline: "Ærlige priser, ingen overraskelser",
  subheadline:
    "Her er en oversikt over hva våre tjenester koster. Alle priser er veiledende — ta kontakt for et skreddersydd tilbud.",
} as const;

export const PACKAGES = [
  {
    id: "enkel",
    name: "Enkel",
    subtitle: "For deg som trenger en enkel, profesjonell nettside",
    price: "15 000 kr",
    monthly: "890 kr/mnd",
    monthlyNote: "for hosting og vedlikehold",
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
    price: "23 000 kr",
    monthly: "1 290 kr/mnd",
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
    price: "40 000 kr",
    monthly: "1 990 kr/mnd",
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
    price: "890 kr/mnd",
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
    price: "1 290 kr/mnd",
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
    price: "1 990 kr/mnd",
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

export const SEO_PACKAGES = [
  {
    id: "seo-basis",
    name: "SEO Basis",
    monthlyPrice: "4 990 kr",
    annualPrice: "3 500 kr",
    annualSavings: 30,
    description:
      "Kom i gang med SEO. Teknisk audit, søkeordanalyse og månedlig rapportering.",
    features: [
      "Teknisk SEO-audit",
      "Søkeordanalyse (inntil 20 søkeord)",
      "Månedlig innholdsoptimalisering",
      "Google Search Console-oppsett",
      "Månedlig SEO-rapport",
    ],
    highlight: false,
  },
  {
    id: "seo-vekst",
    name: "SEO Vekst",
    monthlyPrice: "7 990 kr",
    annualPrice: "6 000 kr",
    annualSavings: 25,
    description:
      "For bedrifter som vil dominere lokale søk og øke organisk trafikk konsekvent.",
    features: [
      "Alt i SEO Basis, pluss:",
      "Søkeordanalyse (inntil 50 søkeord)",
      "Lokal SEO og Google Business-optimalisering",
      "2 SEO-optimaliserte artikler per måned",
      "Konkurrentanalyse",
      "Ukentlig rangering-tracking",
    ],
    highlight: true,
  },
  {
    id: "seo-dominance",
    name: "SEO Dominance",
    monthlyPrice: "12 990 kr",
    annualPrice: "10 000 kr",
    annualSavings: 23,
    description:
      "Komplett SEO-dominans med aggressiv innholdsstrategi og dedikert SEO-rådgivning.",
    features: [
      "Alt i SEO Vekst, pluss:",
      "Ubegrenset søkeordanalyse",
      "4+ SEO-artikler per måned",
      "Backlink-bygging og outreach",
      "Dedikert SEO-rådgiver",
      "Ukentlig statusmøte",
    ],
    highlight: false,
  },
] as const;

export const NETTSIDE_DRIFT = {
  id: "nettside-drift",
  name: "Nettside + Drift",
  price: "3 490 kr/mnd",
  minMonths: 12,
  tagline: "Alt inkludert. Ingen startkostnad.",
  description:
    "Få en skreddersydd nettside uten oppdragskostnad. Vi bygger, drifter og vedlikeholder — du betaler en fast månedspris.",
  features: [
    "Skreddersydd nettside (Standard-pakke verdi)",
    "Hosting på norske servere",
    "SSL-sertifikat og GDPR-tilpasning",
    "Månedlige sikkerhetsoppdateringer",
    "Inntil 3 innholdsendringer per måned",
    "Grunnleggende SEO-oppsett",
    "Prioritert support",
    "Kvartalsvis ytelsesrapport",
  ],
  note: "Bindingstid 12 måneder. Etter første år kan avtalen sies opp med 1 måneds varsel.",
} as const;

export const ADDON_SERVICES = [
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
      "Alle nettsidepakker inkluderer månedlig hosting. Utover det tilbyr vi separate vedlikeholdspakker fra 890 kr/mnd som dekker sikkerhetskopier, oppdateringer, support og innholdsendringer. Se vedlikeholdspakkene lenger opp på siden for detaljer.",
  },
  {
    question: "Er det bindingstid?",
    answer:
      "Nei, vi har ingen bindingstid på vanlige vedlikeholdsavtaler — disse kan sies opp med én måneds varsel. Nettside + Drift-abonnementet har 12 måneders bindingstid. Nettsiden er din — du eier alt innhold, design og kode.",
  },
  {
    question: "Hva om prosjektet mitt ikke passer inn i en pakke?",
    answer:
      "Pakkene er utgangspunkter — alle prosjekter skreddersys til dine behov. Ta kontakt for et tilpasset tilbud med nøyaktig pris basert på hva du trenger.",
  },
  {
    question: "Hvordan er betalingsmodellen?",
    answer:
      "Nettsider faktureres i to deler: 50 % ved oppstart og 50 % ved lansering. Vedlikeholdsavtaler og tilleggstjenester faktureres månedlig. SEO-pakker kan betales månedlig eller årlig — velger du årlig sparer du opptil 30 %.",
  },
  {
    question: "Hva er forskjellen mellom Vedlikehold og Nettside + Drift?",
    answer:
      "Vedlikeholdsavtaler er for deg som allerede har en nettside og trenger løpende drift og support. Nettside + Drift er for deg som ønsker en helt ny nettside uten høy startkostnad — vi bygger og drifter alt, du betaler en fast månedspris.",
  },
] as const;

export const PRICING_CTA = {
  headline: "Usikker på hvilken pakke som passer?",
  description:
    "Ta kontakt for en uforpliktende samtale. Vi hjelper deg med å finne riktig løsning basert på dine behov og budsjett — helt gratis.",
  buttonText: "Få et skreddersydd tilbud",
} as const;
