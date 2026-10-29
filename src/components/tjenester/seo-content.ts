/**
 * Copy for the «SEO og AI-synlighet» page, from the earlier page and tightened. No made-up business: the example is «bedriften din»
 * with sample values, and the «Det vi ikke lover» list is said as one plain statement instead of a list.
 */
import type { FAQ } from "@/types";

export const PROMISES = ["Strukturerte data som passer bedriften", "Omtaleforespørsel etter hver jobb", "Ingen løfter om plass én"] as const;

export type Kind = "tannlege" | "rorlegger" | "bakeri";

export const KINDS: Record<Kind, { label: string; schema: string }> = {
  tannlege: { label: "Tannlege", schema: "Dentist" },
  rorlegger: { label: "Rørlegger", schema: "Plumber" },
  bakeri: { label: "Bakeri", schema: "Bakery" },
};

export type Region = "type" | "adresse" | "apent";

export const REGIONS: readonly { id: Region; t: string; p: string }[] = [
  { id: "type", t: "Type bedrift", p: "Google får vite om dere er en tannlege, en rørlegger eller et bakeri, og ikke bare at dere har en nettside." },
  { id: "adresse", t: "Adresse", p: "Gate, postnummer og sted står i en form Google kan lese, så dere vises på riktig sted." },
  { id: "apent", t: "Åpningstider", p: "Om det er åpent akkurat nå, regnes ut fra åpningstidene i koden. Google bestemmer selv hvordan treffet ser ut." },
];

export const REVIEW_RULES = [
  ["Sendes når jobben er merket ferdig", "Etter så mange dager dere velger, vanligvis 2, kl. 09.00."],
  ["Én forespørsel per jobb", "Den samme jobben gir aldri to e-poster."],
  ["Høyst én e-post per kunde på 30 dager", "Selv om kunden har hatt flere jobber."],
  ["Bare til kunder dere har lov å skrive til", "Kunder dere har et kundeforhold til, eller som har sagt ja."],
  ["Avmelding i hver e-post", "Ett klikk, og kunden får ikke flere."],
  ["Et tak på e-poster per dag", "50 per bedrift som standard, så de ikke havner i søppelposten."],
] as const;

export const FAQS: readonly FAQ[] = [
  { question: "Hvor lang tid tar det før vi ser resultater?", answer: "Det varierer. Google må lese siden på nytt og bygge tillit over tid, så regn med uker, ikke dager. Ingen kan love en bestemt plassering." },
  { question: "Hva koster det?", answer: "Dere får pris før vi starter, og prisen står i avtalen." },
  { question: "Må vi ha kundeportalen for omtalene?", answer: "Ja. Forespørselen sendes fra portalen når en jobb er merket ferdig der." },
  { question: "Hjelper dette i ChatGPT og andre AI-søk?", answer: "Strukturerte data og tydelig tekst gjør fakta om bedriften lette å lese for alle maskiner. Hva AI-tjenestene svarer, bestemmer de selv." },
  { question: "Kan dere se på en side andre har laget?", answer: "Ja. Send oss adressen, så ser vi hva Google leser i dag og sier hva vi kan gjøre." },
];
