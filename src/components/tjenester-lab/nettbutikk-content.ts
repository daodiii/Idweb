/**
 * Copy for the «Nettbutikk» mockups, from the live page and tightened. Krus & Kar is a made-up shop; the photos are
 * from Wikimedia Commons and the WordPress Photo Directory and keep their credits (CREDITS).
 */
import type { FAQ } from "@/types";

export type Product = { id: "pensel" | "stjerne" | "prikk"; name: string; price: number; stock: number; img: string };

export const PRODUCTS: readonly Product[] = [
  { id: "pensel", name: "Krus med penselstrøk", price: 395, stock: 3, img: "/images/tjenester/nettbutikk/krus-pensel.webp" },
  { id: "stjerne", name: "Stjernekrus", price: 425, stock: 2, img: "/images/tjenester/nettbutikk/krus-stjerne.webp" },
  { id: "prikk", name: "Tekopp med prikker", price: 365, stock: 1, img: "/images/tjenester/nettbutikk/kopp-prikk.webp" },
];

export const PROMISES = ["Skreddersydd, ingen ferdig mal", "Betaling og frakt på plass", "Dere legger inn varene selv"] as const;

export const WE_DO = [
  ["Designer og lager butikken", "Skreddersydd etter varene, bildene og fargene deres"],
  ["Setter opp betaling og frakt", "Med de fraktvalgene dere vil tilby"],
  ["Lager kassen for mobilen", "Få steg fra handlekurv til betalt"],
  ["Tester et helt kjøp før lansering", "Fra handlekurv til bekreftelse på e-post"],
] as const;

export const YOU_DO = [
  ["Legger inn nye varer", "Endrer priser og antall på lager når dere vil"],
  ["Får beskjed om nye ordrer", "Alle ordrene ligger samlet ett sted"],
  ["Pakker og sender", "Merker ordren som sendt, så får kunden beskjed"],
] as const;

export const SHOPS = [
  { id: "keramikk", label: "Keramikk", name: "Krus & Kar", line: "Små serier, få av hver. Butikken viser hvor mange som er igjen.", img: "/images/tjenester/nettbutikk/krus-pensel.webp", bg: "#F4E1DF" },
  { id: "bakeri", label: "Bakeri", name: "Bakeri", line: "Bestill brød og kaker til den dagen dere henter.", img: "/images/tjenester/nettbutikk/brod.webp", bg: "#DCE9F1" },
  { id: "garn", label: "Garn", name: "Garnbutikk", line: "Mange farger av hver sort, med fargen som bildet viser.", img: "/images/tjenester/nettbutikk/garn.webp", bg: "#DFECE3" },
] as const;

export const RELATED = [
  ["Bli funnet i Google", "Hver vare får sin egen side, med navn, bilde og beskrivelse.", "/tjenester/seo", "Les om SEO og AI-synlighet"],
  ["Passet på etter lansering", "Vi oppdaterer, tar sikkerhetskopi og retter feil, til fast månedspris.", "/tjenester/vedlikehold", "Les om drift og vedlikehold"],
  ["Svar på spørsmål hele døgnet", "En AI-chatbot kan svare kundene på spørsmål om frakt og levering.", "/tjenester/ai-chatbot", "Les om AI-chatbot"],
] as const;

export const CREDITS =
  "Krus & Kar er et tenkt eksempel. Bildene er fra Wikimedia Commons og WordPress Photo Directory: kruset med penselstrøk av Alina Kakshapati (CC0), stjernekruset av Liinbean (CC BY-SA 4.0), tekoppen av Fotandi (CC BY-SA 4.0), garnet av Pschemp (CC BY-SA 3.0) og brødet av Agelaia (CC BY 4.0). Noen av bildene er beskåret.";

export const FAQS: readonly FAQ[] = [
  { question: "Hva koster en nettbutikk?", answer: "Det kommer an på hvor mange varer dere har og hva butikken skal kunne. Dere får fast pris før vi starter." },
  { question: "Bruker dere en ferdig mal?", answer: "Nei. Vi lager hver nettbutikk selv, slik vi lager nettsidene, så den ser ut og virker slik dere trenger." },
  { question: "Kan vi legge inn varene selv?", answer: "Ja. Dere legger inn nye varer, endrer priser og antall på lager, og ser ordrene når de kommer inn." },
  { question: "Hvordan betaler kundene?", answer: "Vi setter opp betalingen før butikken åpner, og tester et helt kjøp fra handlekurv til bekreftelse på e-post." },
  { question: "Hvordan fungerer frakten?", answer: "Dere velger hvilke fraktvalg kundene får, for eksempel sending i posten, henting hos dere eller fri frakt over et beløp. Kunden ser fraktprisen før betaling." },
  { question: "Blir varene funnet i Google?", answer: "Hver vare får sin egen side med navn, bilde og beskrivelse som Google kan lese. Vil dere ha mer, har vi en egen tjeneste for SEO og AI-synlighet." },
  { question: "Hvem passer på butikken etter lansering?", answer: "Det gjør vi, om dere vil. Med drift og vedlikehold fra oss får butikken en fast månedspris, og dere får vite prisen før dere bestemmer dere." },
];
