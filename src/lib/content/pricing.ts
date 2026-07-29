export const PRICING_PAGE = {
  headline: "Prisen settes etter omfang",
  subheadline:
    "Vi setter fastpris før vi starter, og den står. Ta kontakt for et uforpliktende tilbud.",
} as const;

export const PACKAGES = [
  {
    id: "enkel",
    name: "Enkel",
    subtitle: "For deg som trenger en enkel, profesjonell nettside",
    scope: "Inntil 3 sider",
    meta: "Levert på 2 uker",
    description:
      "En solid bedriftsnettside med alt du trenger for å bli funnet på nett. Perfekt for nyoppstartede bedrifter, håndverkere og konsulenter.",
    features: [
      "Forside, tjenester og kontakt",
      "Responsivt design — mobil, nettbrett og desktop",
      "Grunnleggende SEO-oppsett",
      "Kontaktskjema med e-postvarsling",
      "SSL-sertifikat og GDPR-tilpasning",
      "Google Analytics-oppsett",
    ],
    highlight: false,
  },
  {
    id: "standard",
    name: "Standard",
    subtitle: "Mest populær — for bedrifter som vil vokse",
    scope: "Inntil 5 sider",
    meta: "Levert på 3 uker",
    description:
      "En komplett nettside med skreddersydd design, blogg og avansert SEO. For bedrifter der nettsiden er en viktig kilde til nye kunder.",
    features: [
      "Alt i Enkel, pluss:",
      "Skreddersydd design på hver side",
      "Avansert SEO med søkeordanalyse og schema markup",
      "Google Business Profile-oppsett",
      "Animasjoner og interaktive elementer",
      "Ytelsesoptimalisering (Core Web Vitals)",
    ],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "For bedrifter med høye ambisjoner",
    scope: "Inntil 10 sider",
    meta: "Levert på 4–6 uker",
    description:
      "En skreddersydd løsning med utvidet funksjonalitet og dedikert oppfølging. For bedrifter som trenger mer enn en standard nettside.",
    features: [
      "Alt i Standard, pluss:",
      "Flerspråklig støtte (norsk/engelsk)",
      "Avanserte kontaktskjemaer med betinget logikk",
      "Tilgjengelighetstilpasning (WCAG)",
      "Prioritert support med rask responstid",
      "Kvartalsvis ytelsesrapport",
    ],
    highlight: false,
  },
] as const;

export const MAINTENANCE_PACKAGES = [
  {
    id: "vedlikehold-basis",
    name: "Basis",
    scope: "1 endring/mnd",
    meta: "Support på e-post",
    description:
      "Grunnleggende drift for nettsider som trenger trygg hosting og jevnlige oppdateringer.",
    features: [
      "Hosting på norske servere",
      "SSL-sertifikat inkludert",
      "Daglige sikkerhetskopier",
      "Sikkerhets- og programvareoppdateringer",
    ],
    highlight: false,
  },
  {
    id: "vedlikehold-standard",
    name: "Standard",
    scope: "3 endringer/mnd",
    meta: "Prioritert e-postsupport",
    description:
      "For bedrifter som vil holde nettsiden oppdatert og overvåket uten bekymringer.",
    features: [
      "Alt i Basis, pluss:",
      "Ytelsesovervåking og optimalisering",
      "Oppetidskontroll med varsling",
      "Månedlig sikkerhetsrapport",
    ],
    highlight: true,
  },
  {
    id: "vedlikehold-profesjonell",
    name: "Profesjonell",
    scope: "Ubegrensede endringer",
    meta: "Månedlig rapport",
    description:
      "Komplett vedlikehold med ubegrensede endringer og dedikert oppfølging.",
    features: [
      "Alt i Standard, pluss:",
      "Små endringer i tekst, bilder og layout",
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
    scope: "Inntil 20 søkeord",
    meta: "Månedlig rapport",
    description:
      "Kom i gang med SEO. Teknisk audit, søkeordanalyse og månedlig rapportering.",
    features: [
      "Teknisk SEO-audit",
      "Månedlig innholdsoptimalisering",
      "Google Search Console-oppsett",
    ],
    highlight: false,
  },
  {
    id: "seo-vekst",
    name: "SEO Vekst",
    scope: "Inntil 50 søkeord",
    meta: "2 artikler i måneden",
    description:
      "For bedrifter som vil dominere lokale søk og øke organisk trafikk konsekvent.",
    features: [
      "Alt i SEO Basis, pluss:",
      "Lokal SEO og Google Business-optimalisering",
      "Konkurrentanalyse",
      "Ukentlig rangering-tracking",
    ],
    highlight: true,
  },
  {
    id: "seo-dominance",
    name: "SEO Dominance",
    scope: "Ubegrensede søkeord",
    meta: "4+ artikler i måneden",
    description:
      "Komplett SEO-dominans med aggressiv innholdsstrategi og dedikert SEO-rådgivning.",
    features: [
      "Alt i SEO Vekst, pluss:",
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
    description:
      "Forbedring av Core Web Vitals, bildeoptimalisering, lazy loading og hastighetsoptimalisering for bedre brukeropplevelse og Google-rangering.",
  },
  {
    name: "Google Analytics og sporing",
    description:
      "Komplett GA4-oppsett med konverteringssporing, hendelsesmåling og dashboard — så du ser nøyaktig hva som fungerer.",
  },
  {
    name: "Innholdsproduksjon",
    description:
      "Nye sider, bloggartikler, tekstoppdateringer og bildebytte. SEO-optimalisert innhold tilpasset din bransje.",
  },
  {
    name: "Tilgjengelighet (WCAG)",
    description:
      "Tilgjengelighetsaudit og utbedring — tastaturnavigasjon, skjermleser-støtte og kontrastforbedringer for å nå alle brukere.",
  },
] as const;

/** The three steps from first contact to a fixed price. Replaces the old hero price stats. */
export const PRICING_STEPS = [
  {
    step: "01",
    title: "Kort samtale",
    description:
      "Vi tar en prat om hva bedriften trenger, hvor mange sider det er snakk om og hva siden skal gjøre for deg.",
  },
  {
    step: "02",
    title: "Tilbud på e-post",
    description:
      "Du får et skriftlig tilbud med omfang, leveringstid og fastpris. Helt uforpliktende.",
  },
  {
    step: "03",
    title: "Fastpris før start",
    description:
      "Sier du ja, står prisen. Kommer det ønsker underveis som endrer omfanget, avtaler vi det på forhånd.",
  },
] as const;

export const PRICING_FAQ = [
  {
    question: "Hvorfor står det ingen priser på nettsiden?",
    answer:
      "Fordi to nettsider sjelden koster det samme. Antall sider, funksjoner og hvor mye innhold vi lager fra bunnen av gjør stor forskjell. I stedet for å sette et tall som uansett må justeres, gir vi deg et tilbud som faktisk stemmer med det du trenger. Du får det på e-post, og det er uforpliktende.",
  },
  {
    question: "Hva koster en nettside hos dere?",
    answer:
      "Det avhenger av omfanget. En enkel bedriftsnettside med tre sider ligger et helt annet sted enn en nettbutikk med hundre produkter. Ta kontakt, så får du et konkret tall for akkurat ditt prosjekt — vanligvis innen én virkedag.",
  },
  {
    question: "Er tilbudet bindende?",
    answer:
      "Nei. Du får tilbudet skriftlig og kan tenke på det så lenge du vil. Sier du nei, koster det ingenting. Sier du ja, er prisen i tilbudet den du betaler.",
  },
  {
    question: "Kommer det MVA i tillegg?",
    answer:
      "Tilbudet du får er uten MVA. IDweb er per i dag ikke MVA-registrert. Dersom MVA-registrering gjennomføres, vil MVA tilkomme i henhold til gjeldende satser.",
  },
  {
    question: "Er det bindingstid?",
    answer:
      "Nei, vi har ingen bindingstid på vanlige vedlikeholdsavtaler — disse kan sies opp med én måneds varsel. Nettside + Drift-abonnementet har 12 måneders bindingstid. Nettsiden er din — du eier alt innhold, design og kode.",
  },
  {
    question: "Hvordan er betalingsmodellen?",
    answer:
      "Nettsider faktureres i to deler: halvparten ved oppstart og halvparten ved lansering. Vedlikeholdsavtaler, SEO og tilleggstjenester faktureres månedlig.",
  },
  {
    question: "Hva om prosjektet mitt ikke passer inn i en pakke?",
    answer:
      "Pakkene er utgangspunkter — alle prosjekter skreddersys til dine behov. Ta kontakt, så lager vi et tilbud på nøyaktig det du trenger.",
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
  buttonText: "Ta kontakt for et uforpliktende tilbud",
} as const;
