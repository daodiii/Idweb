export const PORTFOLIO_PAGE = {
  headline: "Prosjekter vi er stolte av",
  subheadline:
    "Her er et utvalg av nettsidene vi har levert til norske bedrifter. Hvert prosjekt er skreddersydd for kundens behov, bransje og målgruppe.",
} as const;

export const PROJECTS = [
  {
    id: "solberg-interior",
    client: "Solberg Interiør AS",
    industry: "Interiørdesign",
    title: "Moderne nettside med visuelt galleri",
    description:
      "Solberg Interiør trengte en nettside som viste frem arbeidet deres på en visuell og inspirerende måte. Vi designet en bildefokusert nettside med prosjektgalleri, kundeomtaler og integrert kontaktskjema. Resultatet ble en elegant side som økte antall henvendelser med 45 prosent den første måneden.",
    services: ["Skreddersydd design", "Responsiv utvikling", "SEO-optimalisering", "Bildegalleri"],
    results: [
      "45 % økning i henvendelser",
      "Lastetid under 1,5 sekunder",
      "Topp 3 i Google for lokale søk",
    ],
  },
  {
    id: "haugen-elektro",
    client: "Haugen Elektro",
    industry: "Elektrikertjenester",
    title: "Bedriftsnettside med online bestilling",
    description:
      "Haugen Elektro hadde en utdatert nettside som ikke fungerte på mobil. Vi bygget en ny, mobiloptimalisert side med tydelig tjenesteliste, prisindikasjon og et bookingskjema som lar kunder bestille befaring direkte. Den nye siden har doblet antall forespørsler via nettet.",
    services: ["Redesign", "Mobiloptimalisering", "Bookingskjema", "Google Business"],
    results: [
      "100 % økning i nettforespørsler",
      "Google-rangering fra side 3 til side 1",
      "Mobiltrafikk økt med 80 %",
    ],
  },
  {
    id: "nordfjord-bakeri",
    client: "Nordfjord Bakeri",
    industry: "Mat og bakeri",
    title: "Nettbutikk med forhåndsbestilling",
    description:
      "Nordfjord Bakeri ønsket å tilby forhåndsbestilling av spesialbrød og kaker online. Vi bygget en nettbutikk med produktkatalog, bestillingssystem med datovelger, og integrasjon med Vipps. Kunder kan nå bestille spesialvarer med levering til utvalgte hentepunkter.",
    services: ["Nettbutikk", "Bestillingssystem", "Vipps-integrasjon", "Produktfotografering"],
    results: [
      "30 % av spesialbestillinger via nett",
      "Redusert telefontid med 60 %",
      "50+ ukentlige nettbestillinger",
    ],
  },
  {
    id: "kristiansen-regnskap",
    client: "Kristiansen Regnskap",
    industry: "Regnskap og rådgivning",
    title: "Profesjonell nettside med kundepanel",
    description:
      "Kristiansen Regnskap trengte en nettside som kommuniserte profesjonalitet og tillit. Vi laget en ren, informasjonsrik side med detaljerte tjenestebeskrivelser, teamprofilering og en sikker kundeportal for dokumentdeling. Nettsiden har blitt en nøkkelressurs for å tiltrekke nye kunder.",
    services: ["Skreddersydd design", "Kundeportal", "SSL-sikkerhet", "Innholdsproduksjon"],
    results: [
      "35 % økning i nye kundehenvendelser",
      "Kundeportalen brukes av 90 % av kundene",
      "Tid spart: 10+ timer/uke på dokumenthåndtering",
    ],
  },
  {
    id: "berge-tannklinikk",
    client: "Berge Tannklinikk",
    industry: "Helse og tannlege",
    title: "Tillitvekkende nettside med timebestilling",
    description:
      "For en tannklinikk er tillit alt. Vi designet en rolig, profesjonell nettside med fokus på teamet, behandlingene og pasientopplevelsen. Integrert online timebestilling lar nye pasienter booke time døgnet rundt. Klinikken har merket en tydelig økning i nye pasienter siden lansering.",
    services: ["Helsedesign", "Online timebestilling", "Responsivt design", "Lokal SEO"],
    results: [
      "60 % av nye timer booket online",
      "25 % flere nye pasienter",
      "5.0 Google-rangering vedlikeholdt",
    ],
  },
  {
    id: "fjellsport-as",
    client: "Fjellsport AS",
    industry: "Sport og friluftsliv",
    title: "Nettbutikk med 500+ produkter",
    description:
      "Fjellsport AS gikk fra fysisk butikk til omni-kanal med en stor nettbutikk. Vi bygget en performant nettbutikk med avansert filtrering, størrelsesguider, lagerstyring synkronisert med butikken, og integrasjon med Klarna, Vipps og Bring. Nettbutikken sto for 40 prosent av omsetningen etter første år.",
    services: ["Nettbutikk", "Lagerstyring", "Betalingsintegrasjon", "Fraktintegrasjon"],
    results: [
      "40 % av total omsetning fra nett etter 12 mnd",
      "Gjennomsnittlig ordrestørrelse: 1 200 kr",
      "Returrate under 5 %",
    ],
  },
] as const;

export const PORTFOLIO_CTA = {
  headline: "Vil du se prosjektet ditt her?",
  description:
    "Hvert prosjekt starter med en samtale. Fortell oss om bedriften din og hva du ønsker å oppnå, så viser vi deg hva vi kan gjøre.",
  buttonText: "Start ditt prosjekt",
} as const;

export const CLIENT_LOGOS_SECTION = {
  heading: "Stolt samarbeidspartner for norske bedrifter",
  description:
    "Fra lokale håndverkere til nasjonale merkevarer — vi har hjulpet bedrifter i alle størrelser med å lykkes digitalt.",
} as const;
