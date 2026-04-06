export const PORTFOLIO_PAGE = {
  headline: "Prosjekter vi har bygget",
  subheadline:
    "Her er et utvalg av nettsidene vi har designet og utviklet. Hvert prosjekt er skreddersydd med moderne teknologi, optimalisert for hastighet og søkemotorer.",
} as const;

export const PROJECTS = [
  {
    id: "centerrahma",
    client: "Center Rahma",
    industry: "Trossamfunn og fellesskap",
    title: "Moderne nettside for et trossamfunn",
    description:
      "Center Rahma trengte en nettside som kommuniserte profesjonalitet og tillit. Vi bygget en moderne, visuelt tiltalende side med tjenesteoversikt, betalingssystem for donasjoner og kontaktskjema for medlemmer. Siden har også integrasjon mot Facebook via API og viser bønnetider i sanntid hentet fra et eksternt API.",
    services: ["Skreddersydd design", "Responsiv utvikling", "SEO-optimalisering", "API-integrasjoner"],
    results: [
      "Facebook-integrasjon via API",
      "Sanntids bønnetider fra eksternt API",
      "Integrert betalingssystem for donasjoner",
      "Mobilvennlig og responsivt design",
    ],
  },
  {
    id: "vocura",
    client: "Vocura",
    industry: "Helse og velvære",
    title: "Moderne nettside for helseklinikk",
    description:
      "Vocura er en ren og profesjonell nettside som bygger tillit hos potensielle kunder. Siden har et eget backend-system med innlogging via personnummer, slik at brukere får tilgang til sin personlige side. Hero-seksjonen har en interaktiv animasjon som reagerer på musebevegelser — en detalj som gir siden et levende og moderne preg.",
    services: ["Skreddersydd design", "Backend og innlogging", "Interaktiv animasjon", "Mobiloptimalisering"],
    results: [
      "Sikkert innloggingssystem med personnummer",
      "Interaktiv hero-animasjon med musebevegelse",
      "Moderne og tillitvekkende design",
      "Lastetid under 1,5 sekunder",
    ],
  },
  {
    id: "brobekk",
    client: "Brobekk Legekontor",
    industry: "Helse og legetjenester",
    title: "Tillitvekkende nettside for legekontor",
    description:
      "Brobekk Legekontor trengte en nettside som formidlet trygghet og profesjonalitet. Vi designet en oversiktlig side med informasjon om tjenester, åpningstider og kontaktmuligheter — optimalisert for pasienter som søker etter legekontor i nærområdet.",
    services: ["Helsedesign", "Responsivt design", "Lokal SEO", "Kontaktskjema"],
    results: [
      "Optimalisert for lokale Google-søk",
      "Rask lastetid og god ytelse",
      "Responsivt på alle enheter",
    ],
  },
  {
    id: "iqra",
    client: "Iqra Senter",
    industry: "Utdanning og kultur",
    title: "Informasjonsrik nettside for kultursenter",
    description:
      "Iqra Senter trengte en nettside som viste frem aktiviteter, kurs og arrangementer på en engasjerende måte. Vi bygget en oversiktlig og moderne side med tydelig navigasjon. Et sentralt mål var å formidle verdiene som familie, tro og tradisjon — slik at besøkende umiddelbart kjenner fellesskapet og tilhørigheten senteret står for.",
    services: ["Skreddersydd design", "Responsiv utvikling", "SEO-optimalisering", "Innholdsstruktur"],
    results: [
      "Formidler kjerneverdier som familie og tradisjon",
      "Tydelig informasjonsarkitektur",
      "Engasjerende fremstilling av aktiviteter og kurs",
    ],
  },
  {
    id: "ringebu",
    client: "Ringebu Tannlegesenter",
    industry: "Helse og tannlege",
    title: "Profesjonell nettside for tannlegesenter",
    description:
      "Ringebu Tannlegesenter trengte en moderne nettside som formidlet trygghet og profesjonalitet i hjertet av Gudbrandsdalen. Vi bygget en visuelt sterk side med fullskjerm naturbilde fra lokalmiljøet, tydelig tjenesteoversikt og enkel timebestilling. Resultatet er en nettside som reflekterer klinikkens moderne utstyr og personlige omsorg.",
    services: ["Skreddersydd design", "Responsiv utvikling", "SEO-optimalisering", "Timebestilling-integrasjon"],
    results: [
      "Moderne design med lokalt naturbilde",
      "Enkel timebestilling for pasienter",
      "Optimalisert for lokale Google-søk",
      "Mobilvennlig og responsivt design",
    ],
  },
] as const;

export const PORTFOLIO_CTA = {
  headline: "Vil du ha en nettside du er fornøyd med?",
  description:
    "Hvert prosjekt starter med en samtale. Fortell oss om bedriften din og hva du ønsker å oppnå, så viser vi deg hva vi kan gjøre.",
  buttonText: "Start ditt prosjekt",
} as const;

export const CLIENT_LOGOS_SECTION = {
  heading: "Bygget for norske bedrifter",
  description:
    "Fra helseklinikker til restauranter — vi har hjulpet bedrifter med å få en profesjonell tilstedeværelse på nett.",
} as const;
