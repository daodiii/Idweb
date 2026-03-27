import type { Testimonial, ProcessStep, TrustSignal, ComparisonCard } from "@/types";
import type { PortfolioSiteId } from "@/types";

export const HERO = {
  brand: "IDWEB",
  headline: "BYGGER DIN NYE NETTSIDE",
  subheadline:
    "Bygget med moderne teknologi. Optimalisert for Google. Designet for \u00e5 konvertere bes\u00f8kende til kunder.",
  primaryCta: "Se mine prosjekter",
  secondaryCta: "F\u00e5 et tilbud",
} as const;

export const TRUST_SIGNALS: TrustSignal[] = [
  { value: 5, suffix: "/5", label: "Google-vurdering" },
  { value: 100, suffix: "%", label: "Kundetilfredshet" },
  { value: 0, suffix: "", label: "Bindingstid" },
];

export const TRUST_LOCATION = "Basert i Drammen" as const;

export const FEATURED_PORTFOLIO_IDS: PortfolioSiteId[] = [
  "centerrahma",
];

export const PORTFOLIO_STATS: Partial<Record<PortfolioSiteId, { pagespeed: string; result: string }>> = {
  vocura: { pagespeed: "95/100", result: "Moderne helsenettside" },
  brobekk: { pagespeed: "92/100", result: "Lokal SEO-optimalisert" },
  centerrahma: { pagespeed: "93/100", result: "Profesjonell fellesskapsside" },
  iqra: { pagespeed: "90/100", result: "Oversiktlig informasjonsside" },
};

export const SERVICES_OVERVIEW = [
  {
    id: "nettside",
    title: "Nettsider",
    description:
      "Profesjonelle, raske nettsider som representerer merkevaren din og tiltrekker nye kunder gjennom s\u00f8kemotorer.",
  },
  {
    id: "seo",
    title: "SEO-optimalisering",
    description:
      "Bli funnet av kundene dine når de søker på Google etter tjenestene du tilbyr.",
  },
  {
    id: "vedlikehold",
    title: "Drift og vedlikehold",
    description:
      "L\u00f8pende oppdateringer, sikkerhetskopier og support slik at nettsiden alltid er trygg og oppdatert.",
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
  { type: "idweb", stat: "90", unit: "+", title: "PageSpeed-score", description: "Typiske byrå-sider scorer 40–60", accent: "#a855f7" },
  // Row 3
  { type: "byrå", icon: "🤵", title: "Snakker med en selger", description: "Mellomledd som ikke kjenner koden", accent: "#ef4444" },
  { type: "idweb", icon: "🎨", title: "100 % skreddersydd", description: "Designet kun for din bedrift — ingen maler", accent: "#f97316" },
  { type: "byrå", icon: "📋", title: "Ferdigmaler", description: "Tilpasset «litt» — ser ut som alle andre", accent: "#ef4444" },
];

export const FAQ_TEASER_ITEMS = [
  {
    question: "Hvor lang tid tar det \u00e5 lage en nettside?",
    answer:
      "Leveringstiden avhenger av hvilken pakke du velger. Starter-pakken leveres p\u00e5 ca. 2 uker, Standard-pakken tar ca. 3 uker, og st\u00f8rre eller premium-l\u00f8sninger leveres p\u00e5 ca. 6 uker.",
  },
  {
    question: "Hva om jeg allerede har en nettside?",
    answer:
      "Jeg tilbyr både redesign av eksisterende nettsider og optimalisering av ytelse, SEO og brukeropplevelse. Du får en ærlig vurdering av hva som gir best resultat.",
  },
  {
    question: "Hva koster vedlikehold?",
    answer:
      "Driftsavtaler starter fra 690 kr/mnd og dekker hosting, sikkerhetskopier, oppdateringer og support. Ingen bindingstid \u2014 du kan si opp n\u00e5r som helst.",
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
      "Alt starter med en uforpliktende samtale der jeg kartlegger behovene dine, målgruppen din og hva du ønsker å oppnå. Du forteller — jeg lytter.",
  },
  {
    step: 2,
    title: "Design og utvikling",
    description:
      "Basert på det jeg har lært, lager jeg et skreddersydd design og utvikler nettsiden med fokus på hastighet, SEO og brukervennlighet. Du godkjenner underveis.",
  },
  {
    step: 3,
    title: "Lansering og oppf\u00f8lging",
    description:
      "Når du er fornøyd, lanserer jeg nettsiden. Men jeg stopper ikke der — jeg tilbyr løpende vedlikehold, oppdateringer og support slik at siden alltid presterer optimalt.",
  },
];

// TODO: Replace with real client testimonials as you collect them.
// For now, this array is empty — the testimonial sections will need
// a conditional check or fallback in the components that consume this.
export const TESTIMONIALS: Testimonial[] = [];

export const FINAL_CTA = {
  headline: "Klar for en nettside som faktisk leverer?",
  description:
    "Fortell meg om prosjektet ditt, så sender jeg et uforpliktende tilbud innen 24 timer. Ingen skjulte kostnader, ingen bindingstid.",
  buttonText: "Send foresp\u00f8rsel",
  secondaryText: "Eller ring meg direkte: 984 06 164",
} as const;

export const SOCIAL_PROOF = {
  heading: "Stolt samarbeidspartner for norske bedrifter",
  description:
    "Fra lokale håndverkere til etablerte bedrifter — jeg har hjulpet bedrifter med å lykkes på nett.",
} as const;

export const SERVICE_TESTIMONIAL_MAP: Record<string, number> = {
  nettside: 0,
  seo: 0,
  vedlikehold: 0,
};
