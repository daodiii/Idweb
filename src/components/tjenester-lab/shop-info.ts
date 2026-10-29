/** The information the nettbutikk page gives, from the live page and tightened. No made-up shop. */
export const ROLES = [
  {
    id: "kunden",
    label: "Kunden",
    lede: "Handler på mobilen eller PC, uten å måtte lage bruker først.",
    steps: [
      { t: "Finner varen", p: "Hver vare har sin egen side, med bilde, pris og hvor mange som er igjen.", ui: "product" },
      { t: "Velger frakt", p: "Kunden ser fraktprisen før betaling, for eksempel sending i posten, henting hos dere eller fri frakt over et beløp.", ui: "checkout" },
      { t: "Betaler", p: "Få steg fra handlekurv til betalt, laget for mobilen.", ui: "checkout" },
      { t: "Får beskjed", p: "Når dere har sendt ordren, får kunden en e-post.", ui: "sent" },
    ],
  },
  {
    id: "dere",
    label: "Dere",
    lede: "Dere driver butikken selv, uten å måtte kunne noe om kode.",
    steps: [
      { t: "Legger inn varer", p: "Bilde, navn, pris og hvor mange dere har. Når dere trykker på knappen, ligger varen i butikken.", ui: "new" },
      { t: "Styrer lageret", p: "Endrer pris og antall når dere vil. Butikken viser hvor mange som er igjen, og merker varen som utsolgt når den siste er solgt.", ui: "stock" },
      { t: "Får beskjed om ordrer", p: "Alle ordrene ligger samlet ett sted, og dere får beskjed om hver nye ordre.", ui: "orders" },
      { t: "Pakker og sender", p: "Dere merker ordren som sendt, så får kunden beskjed.", ui: "detail" },
    ],
  },
  {
    id: "vi",
    label: "Vi",
    lede: "Vi lager butikken og setter opp alt som må på plass før dere åpner.",
    steps: [
      { t: "Designer butikken", p: "Skreddersydd etter varene, bildene og fargene deres. Ingen ferdig mal.", ui: "checklist" },
      { t: "Setter opp betaling", p: "Betalingen er på plass før butikken åpner.", ui: "checklist" },
      { t: "Setter opp frakt", p: "Med de fraktvalgene dere vil tilby.", ui: "shipping" },
      { t: "Tester et helt kjøp", p: "Fra handlekurv til bekreftelse på e-post, før lansering.", ui: "checklist" },
    ],
  },
] as const;

export type RoleId = (typeof ROLES)[number]["id"];

/** Four things in the shop's admin, used by the annotated dashboard. */
export const REGIONS = [
  { n: 1, t: "Varer", p: "Legg inn nye varer med bilde, navn, pris og antall. De ligger i butikken med en gang." },
  { n: 2, t: "Lager", p: "Endre pris og antall når dere vil. Utsolgte varer blir merket med en gang." },
  { n: 3, t: "Ordrer", p: "Alle ordrene ligger samlet ett sted, og dere får beskjed om hver nye ordre." },
  { n: 4, t: "Frakt og betaling", p: "Dere velger fraktvalgene. Vi setter opp betalingen før butikken åpner." },
] as const;
