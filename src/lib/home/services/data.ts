/**
 * The five services in the homepage services section. Each one is illustrated by an animated scene
 * built for a fictional example client; the client names are labelled as examples wherever they appear.
 */

export type SceneKey = "web" | "portal" | "shop" | "seo" | "ops";

export type CanvasService = {
  k: SceneKey;
  title: string;
  tab: string;
  client: string;
  color: string;
  text: string;
  items: string[];
  more: string;
  href: string;
};

export const SERVICES: CanvasService[] = [
  {
    k: "web",
    title: "Nettside",
    tab: "Nettside",
    client: "Nordvik Arkitekter",
    color: "#183B4A",
    text: "Skreddersydd fra bunnen og rask på mobil. Små endringer ordner vi for dere.",
    items: ["Eget design for hver bedrift", "Rask på mobil", "Vi ordner endringene for dere", "Universell utforming"],
    more: "Les om nettsider",
    href: "/tjenester/nettside",
  },
  {
    k: "portal",
    title: "Kundeportaler og systemer",
    tab: "Kundeportal",
    client: "Bjølsen Fysioterapi",
    color: "#5B3B8C",
    text: "Innlogging, adminpanel og automatikk bygd rundt måten dere jobber på.",
    items: ["Innlogging for kunder og ansatte", "Adminpanel for det dere styrer selv", "Automatiske e-poster og påminnelser"],
    more: "Snakk med oss om en portal",
    href: "/#kontakt",
  },
  {
    k: "shop",
    title: "Nettbutikk",
    tab: "Nettbutikk",
    client: "Krus & Kar",
    color: "#C98A2B",
    text: "En butikk laget for varene deres, der betaling og frakt henger sammen.",
    items: ["Betaling og frakt i én flyt", "Ordrebekreftelse til kunden på e-post", "Beskjed til dere om hver ordre"],
    more: "Les om nettbutikk",
    href: "/tjenester/nettbutikk",
  },
  {
    k: "seo",
    title: "SEO og synlighet i AI",
    tab: "Synlighet",
    client: "Lia Tannklinikk",
    color: "#0B7285",
    text: "Innhold og strukturerte data som gjør det lett for Google, kart og AI-søk å forstå hva dere gjør.",
    items: ["Adresse og åpningstider Google kan lese", "Klar for kart og AI-søk", "Innhold som svarer på det kundene spør om"],
    more: "Les om SEO og AI",
    href: "/tjenester/seo",
  },
  {
    k: "ops",
    title: "Drift og vedlikehold",
    tab: "Drift",
    client: "Vang Bakeri",
    color: "#E3A72F",
    text: "Oppdateringer, sikkerhetskopier og små endringer når dere sender en melding.",
    items: ["Oppdateringer og sikkerhetskopier", "Endringer når dere sender en melding", "Ingen bindingstid"],
    more: "Les om drift",
    href: "/tjenester/vedlikehold",
  },
];
