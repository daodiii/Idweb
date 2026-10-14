import type { Testimonial, ProcessStep, TrustSignal } from "@/types";
import type { PortfolioSiteId } from "@/types";

export const HERO = {
  brand: "IDWEB",
  headline: "WEBUTVIKLING OG NETTSIDER I OSLO",
  subheadline:
    "Skreddersydde nettsider for bedrifter i Oslo og hele Norge. Bygget med moderne teknologi, optimalisert for Google og designet for \u00e5 konvertere bes\u00f8kende til kunder.",
  primaryCta: "Se våre prosjekter",
  secondaryCta: "F\u00e5 et tilbud",
} as const;

export const TRUST_SIGNALS: TrustSignal[] = [
  { value: 5, suffix: "/5", label: "Google-vurdering" },
  { value: 100, suffix: "%", label: "Kundetilfredshet" },
  { value: 0, suffix: "", label: "Bindingstid" },
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

export const FAQ_TEASER_ITEMS = [
  {
    question: "Hvor lang tid tar det \u00e5 lage en nettside?",
    answer:
      "Leveringstiden avhenger av omfanget. En enkel bedriftsnettside tar som regel rundt 2 uker. St\u00f8rre sider med flere undersider og funksjoner tar 4\u20136 uker.",
  },
  {
    question: "Hva om jeg allerede har en nettside?",
    answer:
      "Vi tilbyr både redesign av eksisterende nettsider og optimalisering av ytelse, SEO og brukeropplevelse. Du får en ærlig vurdering av hva som gir best resultat.",
  },
  {
    question: "Hva koster vedlikehold?",
    answer:
      "Driftsavtaler dekker hosting, sikkerhetskopier, oppdateringer og support. Ingen bindingstid \u2014 du kan si opp n\u00e5r som helst. Ta kontakt for et uforpliktende tilbud.",
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
      "Alt starter med en uforpliktende samtale der vi kartlegger behovene dine, målgruppen din og hva du ønsker å oppnå. Du forteller — vi lytter.",
  },
  {
    step: 2,
    title: "Design og utvikling",
    description:
      "Basert på det vi har lært, lager vi et skreddersydd design og utvikler nettsiden med fokus på hastighet, SEO og brukervennlighet. Du godkjenner underveis.",
  },
  {
    step: 3,
    title: "Lansering og oppf\u00f8lging",
    description:
      "Når du er fornøyd, lanserer vi nettsiden. Men vi stopper ikke der — vi tilbyr løpende vedlikehold, oppdateringer og support slik at siden alltid presterer optimalt.",
  },
];

// TODO: Replace with real client testimonials as you collect them.
// For now, this array is empty — the testimonial sections will need
// a conditional check or fallback in the components that consume this.
export const TESTIMONIALS: Testimonial[] = [];

export const FINAL_CTA = {
  headline: "Klar for en nettside som faktisk leverer?",
  description:
    "Fortell oss om prosjektet ditt, så sender vi et uforpliktende tilbud innen 24 timer. Ingen skjulte kostnader, ingen bindingstid.",
  buttonText: "Send foresp\u00f8rsel",
  secondaryText: "Eller ring oss direkte: 984 06 164",
} as const;

export const SERVICE_TESTIMONIAL_MAP: Record<string, number> = {
  nettside: 0,
  seo: 0,
  vedlikehold: 0,
};
