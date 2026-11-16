import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";

export const SERVICE_PAGES = {
  nettside: {
    name: "Skreddersydd nettside",
    title: "Skreddersydd nettside i Oslo",
    description: "Nettsider tegnet og bygget for akkurat din bedrift, uten maler. Moderne design som varer, raskt og bra for Google.",
  },
  timebestilling: {
    name: "Timebestilling",
    title: "Timebestilling på nettsiden",
    description: "Kundene velger behandling, dag og klokkeslett selv. Bekreftelse, påminnelse og kalender går av seg selv, uten dobbeltbooking.",
  },
  nettbutikk: {
    name: "Nettbutikk",
    title: "Nettbutikk bygget rundt varene deres",
    description: "En skreddersydd nettbutikk med ordre, lagerstatus og beskjed til kunden når varen er sendt. Betaling og frakt henger sammen i én flyt.",
  },
  "ai-chatbot": {
    name: "AI-chatbot",
    title: "AI-chatbot for nettsiden",
    description: "En chatbot som svarer på spørsmål, tar imot henvendelser og setter opp timer, og som sier fra til et menneske når den ikke vet.",
  },
  seo: {
    name: "SEO og AI-synlighet",
    title: "SEO og AI-synlighet for bedrifter",
    description: "Bli funnet på Google og i AI-søk. Riktig struktur, strukturerte data og omtaler som gjør bedriften lett å finne.",
  },
  vedlikehold: {
    name: "Drift og vedlikehold",
    title: "Drift og vedlikehold av nettside",
    description: "Vi passer på nettsiden etter lansering: oppdateringer, backup, overvåking og små endringer når dere sender en melding. Fra 790 kr/mnd eks. mva.",
  },
  kundeportal: {
    name: "Kundeportal",
    title: "Kundeportal for bedrifter",
    description: "Henvendelser, bookinger, chat og omtaler samlet på ett sted, laget for slik dere jobber. Med innlogging for kunder og ansatte.",
  },
} as const;

export type ServicePageSlug = keyof typeof SERVICE_PAGES;

export function serviceMetadata(slug: ServicePageSlug): Metadata {
  const { title, description } = SERVICE_PAGES[slug];
  return pageMetadata({ title, description, path: `/tjenester/${slug}` });
}
