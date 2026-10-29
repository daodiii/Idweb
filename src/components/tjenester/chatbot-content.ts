/**
 * Copy for the «AI-chatbot» page, from the earlier page and tightened. The «what it does not do» half of the live list is
 * said the other way round, as what we make sure it does. The business in the examples is not named and not made up: it is
 * «bedriften deres», and the sample answers are written in advance, as on the live page.
 */
import type { FAQ } from "@/types";

export const PROMISES = ["Sier alltid at den er en AI", "Svarer ut fra fakta om bedriften", "Tar imot nummer når den står fast"] as const;

export type Fact = { id: "apen" | "pris" | "adresse" | "parkering"; k: string; v: string };

export const FACTS: readonly Fact[] = [
  { id: "apen", k: "Åpent", v: "Man–fre 08–16" },
  { id: "pris", k: "Pris", v: "Fra 500 kr" },
  { id: "adresse", k: "Adresse", v: "Gateveien 1" },
  { id: "parkering", k: "Parkering", v: "Gratis bak huset" },
];

export type QA = { id: string; q: string; a: string; facts: readonly Fact["id"][] };

export const GREETING = "Hei! Jeg er en AI-assistent for bedriften. Jeg svarer ut fra det de har lagt inn om seg selv.";

export const QAS: readonly QA[] = [
  { id: "apen", q: "Når har dere åpent?", a: "Vi har åpent mandag til fredag 08–16. Lørdag og søndag er det stengt.", facts: ["apen"] },
  { id: "pris", q: "Hva koster det?", a: "Det starter på 500 kr. Vil du ha et nøyaktig tilbud, kan jeg ta imot nummeret ditt, så ringer vi deg.", facts: ["pris"] },
  { id: "sted", q: "Hvor holder dere til?", a: "Vi holder til i Gateveien 1. Det er gratis parkering bak huset.", facts: ["adresse", "parkering"] },
  { id: "ukjent", q: "Kan jeg få en time i morgen kl. 10?", a: "Det kan jeg ikke svare sikkert på. Vil du legge igjen nummeret, så ringer vi deg tilbake?", facts: [] },
];

export const TRAIN = [
  { t: "Vi lager et utkast fra nettsiden deres", p: "Priser, åpningstider og tjenester fra sidene dere allerede har." },
  { t: "Vi leser gjennom og godkjenner", p: "Vi leser gjennom alt før noe går ut, og retter det som er feil." },
  { t: "Assistenten svarer ut fra det", p: "Den legges inn med én linje kode, også på sider vi ikke har laget." },
] as const;

export const TRUST = [
  ["Den sier at den er en AI", "Det skrives inn av systemet i første melding, så den kan ikke la være."],
  ["Den svarer ut fra fakta om bedriften", "Priser, åpningstider og tjenester, lest gjennom av oss."],
  ["Den sier fra når den ikke vet", "Den tilbyr å ta imot navn og nummer i stedet for å gjette, så dere kan ringe kunden tilbake."],
  ["Den bekrefter bare timer som er lagt inn", "Har dere timebestilling fra oss, finner den ledige timer og gjentar tid og tjeneste før den setter dem opp. Den venter på et ja først."],
  ["Endringer og avbestillinger tar dere", "Vil kunden endre eller avbestille en time, ber den kunden ta kontakt med dere direkte."],
] as const;

export const INBOX = [
  ["Ring tilbake", "Vil ha svar på en akutt-time", "I går 23.49"],
  ["Ny time", "Undersøkelse tirsdag 10.30", "I går 08.03"],
] as const;

export const CHECK = "Hver samtale gås gjennom automatisk når den er ferdig, blant annet for å se at assistenten aldri har sagt at en time er satt opp når den ikke er det.";

export const FAQS: readonly FAQ[] = [
  { question: "Hva koster en AI-chatbot?", answer: "Dere får en fast månedspris før dere bestemmer dere. Prisen avhenger blant annet av om den også skal sette opp timer." },
  { question: "Virker den på nettsiden vi har i dag?", answer: "Ja. Den legges inn med én linje kode, også på sider vi ikke har laget." },
  { question: "Hva skjer når den ikke vet svaret?", answer: "Den er satt opp til å si det, og tilby å ta imot navn og nummer i stedet for å gjette. Da havner kunden i innboksen deres." },
  { question: "Hvem ser samtalene?", answer: "Kunder som legger igjen nummer eller bestiller time, havner i innboksen deres, og dere får en e-post om hver av dem. Alle samtalene lagres også, slik at de kan sjekkes etterpå." },
  { question: "Kan vi endre det den vet?", answer: "Ja. Send oss nye priser, åpningstider eller tjenester, så oppdaterer vi det assistenten vet." },
];
