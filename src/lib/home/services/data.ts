/**
 * The six services in the homepage services section. Each one is illustrated by an animated example for a fictional
 * client; the client names are labelled as examples wherever they appear. Four are canvas scenes (scenes.ts), and
 * two are live demos of the customer's phone beside what happens by itself (demos.ts).
 */

export type SceneKey = "web" | "portal" | "seo" | "ops";
export type DemoKey = "booking" | "shop";
export type ServiceKey = SceneKey | DemoKey;

export type CanvasService = {
  k: ServiceKey;
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
    k: "booking",
    title: "Timebestilling",
    tab: "Timebestilling",
    client: "Kvist Sykkelverksted",
    color: "#1E2A6E",
    text: "Kundene velger tid selv, og kalenderen holder styr på resten. Bekreftelse og påminnelse går ut av seg selv.",
    items: ["Kalenderen oppdateres uten dobbeltbooking", "Bekreftelse på e-post med kalenderinvitasjon", "Påminnelse dagen før timen"],
    more: "Les om timebestilling",
    href: "/tjenester/timebestilling",
  },
  {
    k: "shop",
    title: "Nettbutikk",
    tab: "Nettbutikk",
    client: "Kvist Sykkelverksted",
    color: "#1E2A6E",
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
