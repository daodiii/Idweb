/**
 * Copy for the «Kundeportal» mockups, from the live page and tightened. No made-up business or people: the example is «bedriften din»,
 * the customers are «Kunde A» and «Kunde B», and the numbers are examples, as on the live page. The live «Ingen faktura i portalen» is said
 * as what the portal is for.
 */
import type { FAQ } from "@/types";

export const PROMISES = ["Én innlogging", "Bare modulene dere trenger", "Hver bedrift ser bare sine egne kunder"] as const;

export type ModuleId = "chat" | "booking" | "omtaler";

export const MODULES: readonly { id: ModuleId; label: string; lede: string; stats: readonly (readonly [string, string])[]; note: string }[] = [
  { id: "chat", label: "AI-chat", lede: "Svarer besøkende på nettsiden din hele døgnet, og sender deg dem som vil noe.", stats: [["142", "Samtaler siste 30 dager"], ["18", "Henvendelser fra chatten"]], note: "Chatten svarer kundene ut fra fakta om bedriften. Den som legger igjen nummer eller bestiller time, havner i innboksen." },
  { id: "booking", label: "Booking", lede: "Kundene bestiller time selv, og timene ligger klare her.", stats: [["37", "Timer siste 30 dager"], ["6", "Kommende timer"]], note: "Dere ser kommende timer, kan avbestille og kan stenge tid når dere skal på kurs eller ha ferie." },
  { id: "omtaler", label: "Omtaler", lede: "Fornøyde kunder får en e-post om å skrive en omtale på Google.", stats: [["24", "Forespørsler sendt"], ["2 dager", "Etter at jobben er ferdig, kl. 09.00"]], note: "Dere velger hvor mange dager etter jobben e-posten skal gå. Kunden bestemmer selv om den vil ha den." },
];

export type Entry = { id: string; name: string; status: string; what: string; contact: string };

export const ENTRIES: readonly Entry[] = [
  { id: "a", name: "Kunde A", status: "BOOKET", what: "Time i dag kl. 14.00", contact: "kunde-a@eksempel.no" },
  { id: "b", name: "Kunde B", status: "CHAT", what: "Ville ha pris på en jobb", contact: "400 00 001" },
];

export const WE_DO = [
  ["Legger inn det chatten skal vite", "Priser, åpningstider og tjenester, og åpningshilsenen."],
  ["Setter opp bookingen", "Hvilke behandlinger som kan bestilles, og når."],
  ["Kobler omtalene til Google-profilen", "Og hvor mange dager etter jobben e-posten skal gå."],
  ["Lager innloggingen deres", "Med de modulene dere har valgt."],
] as const;

export const YOU_DO = [
  ["Logger inn med e-post og passord", "Én innlogging for alle modulene dere har."],
  ["Ringer eller skriver tilbake", "Nummer og e-post kan trykkes rett fra innboksen."],
  ["Merker jobben som ferdig", "Trykket feil? «Angre ferdig» setter den tilbake."],
] as const;

export const TRUST = [
  ["Hver bedrift ser bare sine egne kunder", "Det sjekkes i databasen, ikke bare i skjermbildet."],
  ["Kunden bestemmer over e-posten", "Ved bestilling kan kunden si nei til e-post om omtaler. Boksen er ikke krysset av på forhånd."],
  ["Laget for å få og beholde kunder", "Portalen samler henvendelsene og holder orden på jobbene. Betaling holder vi utenfor."],
] as const;

export const FAQS: readonly FAQ[] = [
  { question: "Hva koster kundeportalen?", answer: "Dere får pris før vi starter, ut fra hvilke moduler dere trenger." },
  { question: "Må vi bytte nettside?", answer: "Nei. Chatten og bookingen legges inn på nettsiden dere har, også om vi ikke har laget den." },
  { question: "Hvem ser kundene våre?", answer: "Dere ser bare deres egne. IDweb har tilgang for å sette opp og drifte portalen." },
  { question: "Kan portalen sende faktura?", answer: "Nei. Portalen er laget for å få og beholde kunder, ikke for betaling." },
  { question: "Hva om vi trenger noe portalen ikke har?", answer: "Si fra. Vi bygger portalen selv, så vi ser på det og gir dere pris først." },
];
