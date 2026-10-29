/**
 * Copy for the «Tjenester» overview mockups. Headline, lede and section text are the live overview's; the one line per service is the
 * one the menu already uses (lib/home/nav-links.ts). The three phases are the order in the lede: the site, the systems behind it,
 * and the running of it afterwards.
 */
import { LINKS } from "@/lib/home/nav-links";
import { SERVICE_PAGES, type ServicePageSlug } from "@/components/tjenester/pages";

export const HEAD = {
  title: "Alt bedriften trenger på nett, fra én leverandør.",
  lede: "Nettsiden, systemene bak og driften etterpå. Vi tar oss av hele prosessen, så du kan fokusere på det du gjør best.",
};

export const SECTION = {
  title: "Sju tjenester, én leverandør.",
  lede: "Du snakker direkte med den som bygger. Ingen mellomledd, og prisen er avtalt før vi starter.",
};

export const CTA = {
  title: "Usikker på hva du trenger? Vi finner ut av det sammen.",
  text: "Fortell oss kort hva du driver med, så foreslår vi en plan som passer budsjettet og målene dine.",
};

const LINES: Record<string, string> = Object.fromEntries((LINKS[0].children ?? []).filter((c) => c.text).map((c) => [c.href.replace("/tjenester/", ""), c.text as string]));

export type Service = { slug: ServicePageSlug; name: string; line: string; href: string };

export const SERVICES: readonly Service[] = (Object.keys(SERVICE_PAGES) as ServicePageSlug[]).map((slug) => ({
  slug,
  name: SERVICE_PAGES[slug].name,
  line: LINES[slug] ?? SERVICE_PAGES[slug].description,
  href: `/tjenester/${slug}`,
}));

export const PHASES = [
  { n: "1", title: "Nettsiden", lede: "Alt starter med en side som er laget for akkurat dere.", slugs: ["nettside"] },
  { n: "2", title: "Systemene bak", lede: "Det som tar imot kundene, selger og samler henvendelsene.", slugs: ["timebestilling", "nettbutikk", "ai-chatbot", "kundeportal"] },
  { n: "3", title: "Etter lansering", lede: "At siden blir funnet, og at den holdes oppe, oppdatert og trygg.", slugs: ["seo", "vedlikehold"] },
] as const satisfies readonly { n: string; title: string; lede: string; slugs: readonly ServicePageSlug[] }[];

export const NEEDS: readonly { slug: ServicePageSlug; q: string }[] = [
  { slug: "nettside", q: "En nettside som er laget for oss" },
  { slug: "timebestilling", q: "Kundene skal bestille time selv" },
  { slug: "nettbutikk", q: "Vi vil selge på nett" },
  { slug: "ai-chatbot", q: "Kundene spør om det samme hele tiden" },
  { slug: "seo", q: "Vi vil bli funnet på Google" },
  { slug: "vedlikehold", q: "Vi vil slippe å tenke på siden" },
  { slug: "kundeportal", q: "Vi vil ha alle henvendelsene på ett sted" },
];

export const SLUG_TINT: Record<ServicePageSlug, string> = {
  nettside: "#DCE9F1",
  timebestilling: "#DFECE3",
  nettbutikk: "#F4E1DF",
  "ai-chatbot": "#E9ECF7",
  seo: "#DCECE9",
  vedlikehold: "#FCEBDB",
  kundeportal: "#DCE9F1",
};
