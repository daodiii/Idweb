/**
 * Copy for the «Drift og vedlikehold» mockups, from the live page and tightened. No made-up business: the example is «bedriften din»,
 * and the month is an example month. The live «Det som ikke er med» list is not used; the one fact that matters is said in the change demo and in one sentence.
 */
import type { FAQ } from "@/types";

export const PROMISES = ["Sikkerhetskopi hver natt", "Oppdateringer testet først", "Ingen bindingstid"] as const;

export type NightKind = "backup" | "update" | "fix" | "cert";

/** Example month: which nights had something more than the backup. Day numbers run 1 to 31. */
export const SPECIAL: Record<number, NightKind> = { 8: "update", 15: "fix", 22: "update", 27: "cert" };

export const FIRST_WEEKDAY = 3; // the month starts on a Thursday (Monday = 0)

export const KIND_LABEL: Record<NightKind, string> = {
  backup: "Sikkerhetskopi",
  update: "Oppdatering",
  fix: "Feil funnet og rettet",
  cert: "Sertifikat fornyet",
};

export const NIGHT_LINES: Record<NightKind, readonly (readonly [string, string])[]> = {
  backup: [["03.00", "Sikkerhetskopi tatt"]],
  update: [["03.00", "Sikkerhetskopi tatt"], ["03.10", "Testkopi bygget og sjekket"], ["03.20", "Ny versjon ute"]],
  fix: [["03.00", "Sikkerhetskopi tatt"], ["03.12", "Feil funnet av sjekkene"], ["03.25", "Feil rettet"]],
  cert: [["03.00", "Sikkerhetskopi tatt"], ["03.30", "Sertifikatet fornyet av seg selv"]],
};

export const REPORT = [
  ["31", "Sikkerhetskopier"],
  ["2", "Oppdateringer, testet først"],
  ["1", "Feil funnet og rettet"],
  ["Fornyet", "Sertifikat"],
] as const;

export const INCLUDED = [
  ["Ingen bindingstid", "Avtalen kan sies opp med én måneds varsel."],
  ["Koden og innholdet er deres", "Hvis dere sier opp, hjelper vi dere å flytte siden dit dere vil."],
  ["Små endringer er med", "Tekst, bilder og åpningstider. Send en melding, så gjør vi det."],
] as const;

export type Change = { id: string; q: string; a: string; big?: boolean };

export const CHANGES: readonly Change[] = [
  { id: "hours", q: "Bytt åpningstidene", a: "Gjort. Åpningstidene er endret på siden." },
  { id: "image", q: "Bytt et bilde", a: "Gjort. Det nye bildet ligger på siden." },
  { id: "staff", q: "Legg til en ansatt", a: "Gjort. Den nye ansatte står på siden." },
  { id: "page", q: "Vi vil ha en ny side", a: "Det er større enn en liten endring. Dere får pris først, og vi starter ikke før dere har sagt ja.", big: true },
];

export const HONEST = "Ingen kan love at en nettside aldri får feil. Vi lover å følge med, rette det vi har bygd og si fra om hva som skjedde. Det er det dere betaler for hver måned.";

export const FAQS: readonly FAQ[] = [
  { question: "Hva koster drift og vedlikehold?", answer: "Fra 790 kr i måneden eks. mva for en vanlig bedriftsside. Har siden nettbutikk, timebestilling eller kundeportal, får dere en fast månedspris før dere bestemmer dere." },
  { question: "Er det bindingstid?", answer: "Nei. Avtalen kan sies opp med én måneds varsel." },
  { question: "Hva regnes som en liten endring?", answer: "Ting som går fort: bytte en tekst eller et bilde, endre åpningstider, legge til en ansatt eller et produkt. Er det større, som en ny side, får dere pris før vi gjør noe." },
  { question: "Kan dere ta over en side andre har laget?", answer: "Vi ser gjerne på den. Først går vi gjennom siden, så får dere vite om vi kan drifte den og hva det koster." },
  { question: "Hva skjer med siden hvis vi sier opp?", answer: "Siden er deres, med koden og alt innholdet. Vi hjelper dere å flytte den dit dere vil." },
];
