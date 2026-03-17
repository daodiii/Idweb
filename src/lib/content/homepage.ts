import type { Testimonial, ProcessStep, TrustSignal, ComparisonCard } from "@/types";
import type { PortfolioSiteId } from "@/types";

export const HERO = {
  eyebrow: "5 PROSJEKTER \u00b7 5 FORN\u00d8YDE KUNDER \u00b7 100% TILFREDSHET",
  headline: "Din nettside skal",
  headlineHighlight: "jobbe for deg",
  headlineEnd: "\u2014 ikke mot deg",
  subheadline:
    "Bygget med moderne teknologi. Optimalisert for Google. Designet for \u00e5 konvertere bes\u00f8kende til kunder.",
  primaryCta: "Se mine prosjekter",
  secondaryCta: "F\u00e5 et tilbud",
} as const;

export const TRUST_SIGNALS: TrustSignal[] = [
  { value: 5, suffix: "", label: "Prosjekter levert" },
  { value: 100, suffix: "%", label: "Kundetilfredshet" },
  { value: 5, suffix: "/5", label: "Google-vurdering" },
];

export const TRUST_LOCATION = "Basert i Drammen" as const;

export const FEATURED_PORTFOLIO_IDS: PortfolioSiteId[] = [
  "vocura",
  "brobekk",
  "centerrahma",
];

export const PORTFOLIO_STATS: Partial<Record<PortfolioSiteId, { pagespeed: string; result: string }>> = {
  vocura: { pagespeed: "98/100", result: "+60% bookinger" },
  brobekk: { pagespeed: "96/100", result: "+45% henvendelser" },
  centerrahma: { pagespeed: "97/100", result: "+80% besøkende" },
};

export const SERVICES_OVERVIEW = [
  {
    id: "nettside",
    title: "Nettsider",
    description:
      "Profesjonelle, raske nettsider som representerer merkevaren din og tiltrekker nye kunder gjennom s\u00f8kemotorer.",
  },
  {
    id: "nettbutikk",
    title: "Nettbutikk",
    description:
      "Brukervennlige nettbutikker med sikker betaling, enkel administrasjon og h\u00f8y konverteringsrate.",
  },
  {
    id: "seo",
    title: "SEO-optimalisering",
    description:
      "Bli funnet av kundene dine. Vi s\u00f8rger for at bedriften din rangerer h\u00f8yt i Google-s\u00f8k.",
  },
  {
    id: "markedsforing",
    title: "Digital markedsf\u00f8ring",
    description:
      "M\u00e5lrettet annonsering p\u00e5 Google og sosiale medier som gir m\u00e5lbar avkastning p\u00e5 investeringen.",
  },
  {
    id: "vedlikehold",
    title: "Drift og vedlikehold",
    description:
      "L\u00f8pende oppdateringer, sikkerhetskopier og support slik at nettsiden alltid er trygg og oppdatert.",
  },
  {
    id: "design",
    title: "Grafisk design",
    description:
      "Visuell identitet, logodesign og grafisk materiell som skiller deg fra konkurrentene.",
  },
] as const;

export const PROBLEM_CARDS = [
  {
    icon: "Gauge",
    title: "Treg lasting = tapte kunder",
    stat: "53%",
    statLabel: "forlater en side som bruker mer enn 3 sekunder p\u00e5 \u00e5 laste",
  },
  {
    icon: "SearchX",
    title: "Usynlig p\u00e5 Google",
    stat: "75%",
    statLabel: "klikker aldri forbi f\u00f8rste side i s\u00f8keresultatene",
  },
  {
    icon: "CalendarX",
    title: "Ser ut som 2015",
    stat: "94%",
    statLabel: "av f\u00f8rsteinntrykket handler om design og troverdighet",
  },
] as const;

export const COMPARISON_GRID: ComparisonCard[] = [
  // Row 1
  { type: "byrå", icon: "🧱", title: "WordPress + plugins", description: "Tunge ferdigløsninger som bremser ytelse og sikkerhet", accent: "#ef4444" },
  { type: "idweb", icon: "⚡", title: "Next.js — fra bunnen av", description: "Moderne rammeverk, lynrask og skalerbar", accent: "#22c55e" },
  { type: "byrå", stat: "3-5", unit: "s", title: "Treg lastetid", description: "Besøkende forlater siden før den laster", accent: "#ef4444" },
  // Row 2
  { type: "idweb", icon: "💬", title: "Direkte til utvikleren", description: "Ingen mellomledd — du snakker med den som bygger", accent: "#fbbf24" },
  { type: "idweb", stat: "<1", unit: "s", title: "Lastetid", description: "Mens typiske sider bruker 3–5 sekunder", accent: "#38bdf8" },
  { type: "idweb", stat: "98", unit: "/100", title: "PageSpeed-score", description: "Typiske byrå-sider scorer 40–60", accent: "#a855f7" },
  // Row 3
  { type: "byrå", icon: "🤵", title: "Snakker med en selger", description: "Mellomledd som ikke kjenner koden", accent: "#ef4444" },
  { type: "idweb", icon: "🎨", title: "100 % skreddersydd", description: "Designet kun for din bedrift — ingen maler", accent: "#f97316" },
  { type: "byrå", icon: "📋", title: "Ferdigmaler", description: "Tilpasset «litt» — ser ut som alle andre", accent: "#ef4444" },
];

export const FAQ_TEASER_ITEMS = [
  {
    question: "Hvor lang tid tar det \u00e5 lage en nettside?",
    answer:
      "En standard bedriftsnettside tar vanligvis 3\u20136 uker fra oppstart til lansering. Enklere prosjekter kan leveres raskere, mens st\u00f8rre skreddersydde l\u00f8sninger kan ta 6\u201310 uker.",
  },
  {
    question: "Hva om jeg allerede har en nettside?",
    answer:
      "Vi tilbyr b\u00e5de redesign av eksisterende nettsider og optimalisering av ytelse, SEO og brukeropplevelse. Vi gir deg en \u00e6rlig vurdering av hva som gir best resultat.",
  },
  {
    question: "Hva koster vedlikehold?",
    answer:
      "Driftsavtaler starter fra 490 kr/mnd og dekker hosting, sikkerhetskopier, oppdateringer og support. Ingen bindingstid \u2014 du kan si opp n\u00e5r som helst.",
  },
  {
    question: "Trenger jeg virkelig en skreddersydd nettside?",
    answer:
      "Maler kan fungere som et utgangspunkt, men en skreddersydd nettside gir deg bedre ytelse, unikt design og full kontroll. Det er en investering som betaler seg gjennom flere kunder.",
  },
] as const;

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: 1,
    title: "Gratis samtale",
    description:
      "Vi starter med en uforpliktende samtale der vi kartlegger behovene dine, m\u00e5lgruppen din og hva du \u00f8nsker \u00e5 oppn\u00e5. Du forteller \u2014 vi lytter.",
  },
  {
    step: 2,
    title: "Design og utvikling",
    description:
      "Basert p\u00e5 det vi har l\u00e6rt, lager vi et skreddersydd design og utvikler nettsiden med fokus p\u00e5 hastighet, SEO og brukervennlighet. Du godkjenner underveis.",
  },
  {
    step: 3,
    title: "Lansering og oppf\u00f8lging",
    description:
      "N\u00e5r du er forn\u00f8yd, lanserer vi nettsiden. Men vi stopper ikke der \u2014 vi tilbyr l\u00f8pende vedlikehold, oppdateringer og support slik at siden alltid presterer optimalt.",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    author: {
      name: "Marte Solberg",
      handle: "Daglig leder",
      company: "Solberg Interi\u00f8r AS",
      avatar: "",
      rating: 5,
    },
    text: "IDweb forstod umiddelbart hva jeg trengte. Nettsiden ble levert raskere enn forventet, og jeg merket \u00f8kning i henvendelser allerede den f\u00f8rste m\u00e5neden. Profesjonelt fra start til slutt.",
  },
  {
    author: {
      name: "Erik Haugen",
      handle: "Eier",
      company: "Haugen Elektro",
      avatar: "",
      rating: 5,
    },
    text: "Jeg hadde en gammel nettside som knapt fungerte p\u00e5 mobil. Etter at IDweb bygde den nye siden min, har jeg doblet antall foresp\u00f8rsler via nettet. Best av alt \u2014 han tar seg av alt det tekniske etterp\u00e5 ogs\u00e5.",
  },
  {
    author: {
      name: "Linda Kristiansen",
      handle: "Partner",
      company: "Kristiansen Regnskap",
      avatar: "",
      rating: 5,
    },
    text: "Endelig en nettside som speiler kvaliteten jeg leverer til kundene mine. IDweb var t\u00e5lmodig, kreativ og leverte et resultat som overgikk forventningene. Anbefales p\u00e5 det sterkeste.",
  },
];

export const FINAL_CTA = {
  headline: "Klar for en nettside som faktisk leverer?",
  description:
    "Fortell meg om prosjektet ditt, s\u00e5 sender vi et uforpliktende tilbud innen 24 timer. Ingen skjulte kostnader, ingen bindingstid.",
  buttonText: "Send foresp\u00f8rsel",
  secondaryText: "Eller ring meg direkte: 123 45 678",
} as const;

export const SOCIAL_PROOF = {
  heading: "Stolt samarbeidspartner for norske bedrifter",
  description:
    "Fra lokale h\u00e5ndverkere til etablerte bedrifter \u2014 vi har hjulpet bedrifter med \u00e5 lykkes p\u00e5 nett.",
} as const;

export const SERVICE_TESTIMONIAL_MAP: Record<string, number> = {
  nettside: 0,
  nettbutikk: 2,
  seo: 1,
  markedsforing: 1,
  vedlikehold: 0,
  design: 2,
};
