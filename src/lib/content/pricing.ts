export const PRICING_PAGE = {
  headline: "Ærlige priser, ingen overraskelser",
  subheadline:
    "Jeg tror på transparens. Her er en oversikt over hva mine tjenester koster. Alle priser er veiledende — ta kontakt for et skreddersydd tilbud.",
} as const;

export const PACKAGES = [
  {
    id: "starter",
    name: "Starter",
    subtitle: "For deg som trenger en enkel, profesjonell nettside",
    price: "fra 15 000 kr",
    monthly: "fra 490 kr/mnd",
    monthlyNote: "for hosting og vedlikehold",
    description:
      "En solid bedriftsnettside med alt du trenger for å bli funnet og tiltrekke kunder. Perfekt for håndverkere, konsulenter og små tjenesteytere.",
    features: [
      "Inntil 5 sider (forside, om oss, tjenester, kontakt, personvern)",
      "Responsivt design — fungerer på mobil, nettbrett og desktop",
      "Grunnleggende SEO-optimalisering",
      "Kontaktskjema med e-postvarsling",
      "SSL-sertifikat og sikkerhet",
      "Opplæring i administrasjon",
      "Google Analytics-oppsett",
      "Levert innen 2–4 uker",
    ],
    highlight: false,
  },
  {
    id: "profesjonell",
    name: "Profesjonell",
    subtitle: "Mest populær — for bedrifter som vil vokse",
    price: "fra 35 000 kr",
    monthly: "fra 990 kr/mnd",
    monthlyNote: "for hosting, vedlikehold og SEO",
    description:
      "En komplett nettside med avansert design, utvidet funksjonalitet og løpende SEO-optimalisering. For bedrifter der nettsiden er en viktig kilde til nye kunder.",
    features: [
      "Alt i Starter, pluss:",
      "Inntil 15 sider med skreddersydd design",
      "Blogg for innholdspublisering",
      "Avansert SEO med søkeordanalyse",
      "Integrasjon med Google Business Profile",
      "Animasjoner og interaktive elementer",
      "Bildegalleri eller prosjektportefølje",
      "Månedlig SEO-rapport",
      "Prioritert support",
      "Levert innen 4–6 uker",
    ],
    highlight: true,
  },
  {
    id: "premium",
    name: "Premium",
    subtitle: "For bedrifter med høye ambisjoner",
    price: "fra 65 000 kr",
    monthly: "fra 1 990 kr/mnd",
    monthlyNote: "for hosting, vedlikehold, SEO og support",
    description:
      "En skreddersydd løsning med avansert funksjonalitet, integrasjoner og dedikert oppfølging. For bedrifter som vil ha det beste.",
    features: [
      "Alt i Profesjonell, pluss:",
      "Ubegrenset antall sider",
      "Avanserte integrasjoner (CRM, booking, betaling)",
      "Flerspråklig støtte",
      "A/B-testing og konverteringsoptimalisering",
      "Dedikert kontaktperson",
      "Kvartalsvis strategimøte",
      "Ytelsesovervåking og optimalisering",
      "Prioritert support med responstid under 4 timer",
      "Levert innen 6–10 uker",
    ],
    highlight: false,
  },
] as const;

export const NETTBUTIKK_PACKAGE = {
  name: "Nettbutikk",
  subtitle: "Start salget på nett",
  price: "fra 30 000 kr",
  monthly: "fra 990 kr/mnd",
  monthlyNote: "for hosting, vedlikehold og support",
  description:
    "En komplett nettbutikk med betalingsintegrasjon, frakt og lagerstyring. Alt du trenger for å selge produkter eller tjenester på nett.",
  features: [
    "Skreddersydd nettbutikkdesign",
    "Integrasjon med Vipps, Klarna og kortbetaling",
    "Fraktintegrasjon med Posten/Bring",
    "Produktadministrasjon og lagerstyring",
    "Automatiske ordrebekreftelser",
    "Responsivt design optimalisert for mobilhandel",
    "Grunnleggende SEO for produktsider",
    "Opplæring i produktadministrasjon",
    "SSL-sertifikat og sikkerhetstiltak",
  ],
} as const;

export const ADDON_SERVICES = [
  {
    name: "SEO-pakke",
    price: "fra 5 000 kr/mnd",
    description:
      "Løpende søkemotoroptimalisering med søkeordanalyse, innholdsoptimalisering, lenkebygging og månedlig rapportering.",
  },
  {
    name: "Google Ads-administrasjon",
    price: "fra 3 000 kr/mnd + annonsebudsjett",
    description:
      "Oppsett og løpende optimalisering av Google Ads-kampanjer for å drive målrettet trafikk til nettsiden din.",
  },
  {
    name: "Innholdsproduksjon",
    price: "fra 2 500 kr per artikkel",
    description:
      "SEO-optimaliserte bloggartikler og nettsideinnhold skrevet for din bransje og målgruppe.",
  },
  {
    name: "Grafisk design",
    price: "fra 8 000 kr",
    description:
      "Logodesign, visuell identitet og grafisk materiell. Inkluderer flere konseptforslag og revideringsrunder.",
  },
  {
    name: "Sosiale medier-oppsett",
    price: "fra 5 000 kr",
    description:
      "Oppsett og optimalisering av bedriftsprofiler på Facebook, Instagram og LinkedIn med visuelt innhold og strategi.",
  },
] as const;

export const PRICING_FAQ = [
  {
    question: "Er prisene inkludert mva.?",
    answer:
      "Nei, alle oppgitte priser er ekskludert mva. (25 %). Totalprisen inkludert mva. oppgis alltid i tilbudet.",
  },
  {
    question: "Hva er inkludert i de månedlige kostnadene?",
    answer:
      "Månedlige kostnader dekker hosting på norske servere, daglige sikkerhetskopier, programvareoppdateringer, sikkerhetsovervåking og support. Avhengig av pakken kan det også inkludere SEO-rapportering og innholdsendringer.",
  },
  {
    question: "Er det bindingstid?",
    answer:
      "Nei, jeg har ingen bindingstid på noen av tjenestene mine. Driftsavtaler kan sies opp med én måneds varsel. Nettsiden er din — du eier alt innhold, design og kode.",
  },
  {
    question: "Hva om prosjektet mitt ikke passer inn i en pakke?",
    answer:
      "Pakkene er utgangspunkter — alle prosjekter skreddersys til dine behov. Ta kontakt for et tilpasset tilbud med nøyaktig pris basert på hva du trenger.",
  },
  {
    question: "Hvordan er betalingsmodellen?",
    answer:
      "Prosjektbeløpet deles vanligvis i tre: 30 % ved oppstart, 40 % ved godkjent design, og 30 % ved lansering. Driftsavtaler faktureres månedlig.",
  },
] as const;

export const PRICING_CTA = {
  headline: "Usikker på hvilken pakke som passer?",
  description:
    "Ta kontakt for en uforpliktende samtale. Jeg hjelper deg med å finne riktig løsning basert på dine behov og budsjett — helt gratis.",
  buttonText: "Få et skreddersydd tilbud",
} as const;
