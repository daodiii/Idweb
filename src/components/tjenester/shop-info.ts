/** The four places in the shop's admin, used by the annotated dashboard. */
export const REGIONS = [
  { n: 1, t: "Varer", p: "Legg inn nye varer med bilde, navn, pris og antall. De ligger i butikken med en gang." },
  { n: 2, t: "Lager", p: "Endre pris og antall når dere vil. Utsolgte varer blir merket med en gang." },
  { n: 3, t: "Ordrer", p: "Alle ordrene ligger samlet ett sted, og dere får beskjed om hver nye ordre." },
  { n: 4, t: "Frakt og betaling", p: "Dere velger fraktvalgene. Vi setter opp betalingen før butikken åpner." },
] as const;
