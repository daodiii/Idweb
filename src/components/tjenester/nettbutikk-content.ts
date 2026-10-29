/** Copy for the «Nettbutikk» page, from the earlier page and tightened. */
import type { FAQ } from "@/types";

export const PROMISES = ["Skreddersydd, ingen ferdig mal", "Betaling og frakt på plass", "Dere legger inn varene selv"] as const;

export const RELATED = [
  ["Bli funnet i Google", "Hver vare får sin egen side, med navn, bilde og beskrivelse.", "/tjenester/seo", "Les om SEO og AI-synlighet"],
  ["Passet på etter lansering", "Vi oppdaterer, tar sikkerhetskopi og retter feil, til fast månedspris.", "/tjenester/vedlikehold", "Les om drift og vedlikehold"],
  ["Svar på spørsmål hele døgnet", "En AI-chatbot kan svare kundene på spørsmål om frakt og levering.", "/tjenester/ai-chatbot", "Les om AI-chatbot"],
] as const;

export const FAQS: readonly FAQ[] = [
  { question: "Hva koster en nettbutikk?", answer: "Det kommer an på hvor mange varer dere har og hva butikken skal kunne. Dere får fast pris før vi starter." },
  { question: "Bruker dere en ferdig mal?", answer: "Nei. Vi lager hver nettbutikk selv, slik vi lager nettsidene, så den ser ut og virker slik dere trenger." },
  { question: "Kan vi legge inn varene selv?", answer: "Ja. Dere legger inn nye varer, endrer priser og antall på lager, og ser ordrene når de kommer inn." },
  { question: "Hvordan betaler kundene?", answer: "Vi setter opp betalingen før butikken åpner, og tester et helt kjøp fra handlekurv til bekreftelse på e-post." },
  { question: "Hvordan fungerer frakten?", answer: "Dere velger hvilke fraktvalg kundene får, for eksempel sending i posten, henting hos dere eller fri frakt over et beløp. Kunden ser fraktprisen før betaling." },
  { question: "Blir varene funnet i Google?", answer: "Hver vare får sin egen side med navn, bilde og beskrivelse som Google kan lese. Vil dere ha mer, har vi en egen tjeneste for SEO og AI-synlighet." },
  { question: "Hvem passer på butikken etter lansering?", answer: "Det gjør vi, om dere vil. Med drift og vedlikehold fra oss får butikken en fast månedspris, og dere får vite prisen før dere bestemmer dere." },
];
