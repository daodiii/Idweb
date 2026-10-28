export interface NavLink {
  href: string;
  label: string;
  /** One line about the page, shown in the wide dropdown and in the menu. */
  text?: string;
  /** Sub-pages, shown in a dropdown on desktop and as a list under the link in the menu. */
  children?: readonly NavLink[];
}

/** The main navigation: the header row, its dropdown and the full-screen menu all read this one list. */
export const LINKS: readonly NavLink[] = [
  {
    href: "/#tjenester",
    label: "Tjenester",
    children: [
      { href: "/tjenester/nettside", label: "Skreddersydd nettside", text: "Skreddersydd fra bunnen og rask på mobil." },
      { href: "/tjenester/timebestilling", label: "Timebestilling", text: "Kundene bestiller time selv, når det passer dem." },
      { href: "/tjenester/nettbutikk", label: "Nettbutikk", text: "Selg varene på nett, med betaling og frakt." },
      { href: "/tjenester/ai-chatbot", label: "AI-chatbot", text: "Svarer på spørsmål på nettsiden, døgnet rundt." },
      { href: "/tjenester/seo", label: "SEO og AI-synlighet", text: "Bli funnet på Google og i svar fra ChatGPT." },
      { href: "/tjenester/vedlikehold", label: "Drift og vedlikehold", text: "Vi holder siden oppe, oppdatert og trygg." },
      { href: "/tjenester/kundeportal", label: "Kundeportal", text: "Henvendelser og kunder samlet bak én innlogging." },
      { href: "/tjenester", label: "Alle tjenester" },
    ],
  },
  { href: "/#prosess", label: "Slik jobber vi" },
  { href: "/referanser", label: "Kundecaser" },
  { href: "/om-oss", label: "Om oss" },
];
