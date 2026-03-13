import type { Testimonial, ProcessStep, TrustSignal } from "@/types";

export const HERO = {
  headline: "Din neste nettside blir",
  rotatingWords: [
    "profesjonell",
    "moderne",
    "unik",
    "rask",
    "imponerende",
  ],
  subheadline:
    "Vi designer og utvikler skreddersydde nettsider som hjelper norske bedrifter å vokse. Fra idé til lansering — vi tar oss av alt det digitale.",
  badge: "Se hva vi har levert",
  primaryCta: "Få et uforpliktende tilbud",
  secondaryCta: "Book en samtale",
} as const;

export const TRUST_SIGNALS: TrustSignal[] = [
  { value: 10, suffix: "+", label: "Års erfaring" },
  { value: 200, suffix: "+", label: "Leverte prosjekter" },
  { value: 98, suffix: "%", label: "Kundetilfredshet" },
  { value: 5.0, suffix: "", label: "Google-vurdering", decimals: 1 },
];

export const SERVICES_OVERVIEW = [
  {
    id: "nettside",
    title: "Nettsider",
    description:
      "Profesjonelle, raske nettsider som representerer merkevaren din og tiltrekker nye kunder gjennom søkemotorer.",
  },
  {
    id: "nettbutikk",
    title: "Nettbutikk",
    description:
      "Brukervennlige nettbutikker med sikker betaling, enkel administrasjon og høy konverteringsrate.",
  },
  {
    id: "seo",
    title: "SEO-optimalisering",
    description:
      "Bli funnet av kundene dine. Vi sørger for at bedriften din rangerer høyt i Google-søk.",
  },
  {
    id: "markedsforing",
    title: "Digital markedsføring",
    description:
      "Målrettet annonsering på Google og sosiale medier som gir målbar avkastning på investeringen.",
  },
  {
    id: "vedlikehold",
    title: "Drift og vedlikehold",
    description:
      "Løpende oppdateringer, sikkerhetskopier og support slik at nettsiden alltid er trygg og oppdatert.",
  },
  {
    id: "design",
    title: "Grafisk design",
    description:
      "Visuell identitet, logodesign og grafisk materiell som skiller deg fra konkurrentene.",
  },
] as const;

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Vi blir kjent",
    description:
      "Vi starter med en uforpliktende samtale der vi kartlegger behovene dine, målgruppen din og hva du ønsker å oppnå. Du forteller — vi lytter.",
  },
  {
    step: 2,
    title: "Vi designer og utvikler",
    description:
      "Basert på det vi har lært, lager vi et skreddersydd design og utvikler nettsiden med fokus på hastighet, SEO og brukervennlighet. Du godkjenner underveis.",
  },
  {
    step: 3,
    title: "Vi lanserer og følger opp",
    description:
      "Når du er fornøyd, lanserer vi nettsiden. Men vi stopper ikke der — vi tilbyr løpende vedlikehold, oppdateringer og support slik at siden alltid presterer optimalt.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Marte Solberg",
    company: "Solberg Interiør AS",
    role: "Daglig leder",
    quote:
      "Selgenettside forstod umiddelbart hva vi trengte. Nettsiden ble levert raskere enn forventet, og vi merket økning i henvendelser allerede den første måneden. Profesjonelle fra start til slutt.",
  },
  {
    name: "Erik Haugen",
    company: "Haugen Elektro",
    role: "Eier",
    quote:
      "Vi hadde en gammel nettside som knapt fungerte på mobil. Etter at Selgenettside bygde den nye siden vår, har vi doblet antall forespørsler via nettet. Best av alt — de tar seg av alt det tekniske etterpå også.",
  },
  {
    name: "Linda Kristiansen",
    company: "Kristiansen Regnskap",
    role: "Partner",
    quote:
      "Endelig en nettside som speiler kvaliteten vi leverer til kundene våre. Selgenettside var tålmodige, kreative og leverte et resultat som overgikk forventningene. Anbefales på det sterkeste.",
  },
  {
    name: "Jonas Berge",
    company: "Berge Tannklinikk",
    role: "Klinikkleder",
    quote:
      "Vi trengte en nettside som bygget tillit hos nye pasienter. Selgenettside leverte akkurat det — en moderne, rask og profesjonell side med enkel timebestilling. Antall nye pasienter har økt merkbart.",
  },
];

export const FINAL_CTA = {
  headline: "Klar for en nettside som faktisk leverer resultater?",
  description:
    "Fortell oss om prosjektet ditt, så sender vi et uforpliktende tilbud innen 24 timer. Ingen skjulte kostnader, ingen bindingstid.",
  buttonText: "Start prosjektet ditt i dag",
  secondaryText: "Eller ring oss direkte: 123 45 678",
} as const;

export const SOCIAL_PROOF = {
  heading: "Stolt samarbeidspartner for norske bedrifter",
  description:
    "Fra lokale håndverkere til nasjonale merkevarer — vi har hjulpet over 200 bedrifter med å lykkes på nett.",
} as const;
