/**
 * The five services shown on the homepage canvas («Lerretet»). Each one is illustrated by an animated scene
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
    text: "Skreddersydd fra bunnen, rask på mobil og enkel å oppdatere selv.",
    items: ["Design laget for dere, ikke en mal", "Rask på mobil", "Tekst og bilder dere endrer selv", "Universell utforming"],
    more: "Les om nettsider",
    href: "/tjenester/nettside",
  },
  {
    k: "portal",
    title: "Kundeportaler og systemer",
    tab: "Kundeportal",
    client: "Bjølsen Fysioterapi",
    color: "#5B3B8C",
    text: "Innlogging, adminpanel og automatikk bygd for akkurat deres arbeidsflyt.",
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
    text: "Betaling, lager og frakt som henger sammen, uten tunge tillegg.",
    items: ["Betaling og frakt som henger sammen", "Lager som oppdateres selv", "Kvitteringer og pakksedler"],
    more: "Les om nettbutikk",
    href: "/tjenester/nettbutikk",
  },
  {
    k: "seo",
    title: "SEO og synlighet i AI",
    tab: "Synlighet",
    client: "Lia Tannklinikk",
    color: "#0B7285",
    text: "Strukturerte data og innhold som Google, kartene og ChatGPT forstår.",
    items: ["Strukturerte data Google forstår", "Synlig i kart og AI-svar", "Innhold som svarer på det kundene spør om"],
    more: "Les om SEO og AI",
    href: "/tjenester/seo",
  },
  {
    k: "ops",
    title: "Drift og vedlikehold",
    tab: "Drift",
    client: "Vang Bakeri",
    color: "#E3A72F",
    text: "Oppdateringer, backup og småendringer når dere sender en melding.",
    items: ["Oppdateringer og sikkerhetskopier", "Endringer når dere sender en melding", "Ingen bindingstid"],
    more: "Les om drift",
    href: "/tjenester/vedlikehold",
  },
];

/** Where each frame sits on the canvas (world units), and the design notes pinned between them. */
export const FRAME_POS = [
  { x: 40, y: 64 },
  { x: 760, y: 24 },
  { x: 1480, y: 84 },
  { x: 330, y: 610 },
  { x: 1040, y: 640 },
];
export const CANVAS_NOTES = [
  { x: 20, y: 640, t: "Nordvik ønsket fjordfarger og store bilder." },
  { x: 1740, y: 660, t: "Krus & Kar: bare kurv og betaling, ingen tunge tillegg." },
  { x: 20, y: 860, t: "Lia: kundene spør om akutt-timer, så det står øverst." },
];
