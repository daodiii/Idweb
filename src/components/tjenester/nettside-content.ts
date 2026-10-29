/**
 * Copy for the «Skreddersydd nettside» page. Taken from the earlier page and tightened; the facts about how IDweb builds are unchanged. Fjellbakst is a made-up bakery, labelled as an example.
 */
import type { FAQ } from "@/types";

export const STEPS = [
  { title: "Samtale", text: "Vi går gjennom bedriften, kundene og hva siden skal få folk til å gjøre." },
  { title: "Tilbud", text: "Hver side, hva som står på den, og en fast pris. Dere sier ja eller nei." },
  { title: "Design", text: "Dere ser tegningene og en prototype og sier hva dere mener, før vi bygger." },
  { title: "Bygging og lansering", text: "Vi bygger, tester og setter siden ut. Dere eier alt." },
] as const;

export const OFFER_PAGES = [
  ["Forside", "Åpent nå og dagens bakst, etter klokka"],
  ["Brød", "Brødene, og hva som er i dem"],
  ["Kaker", "Skjema for kakebestilling"],
  ["Om oss", "Bakerne og steinovnen"],
  ["Kontakt", "Kart, adresse og åpningstider"],
] as const;

export const GOOGLE = [
  ["Egen tittel og beskrivelse på hver side", "Det er teksten som vises i søkeresultatet."],
  ["Kart over alle sidene til Google", "Det lages av koden, så nye sider kommer med av seg selv."],
  ["Delebilde", "Det som vises når noen deler lenken."],
  ["Skriftene lastes fra deres eget domene", "Siden spør ikke andre tjenester om noe for å vise teksten."],
] as const;

export const DRAW = [
  ["Bare der det passer", "Tegninger er et valg. Mange sider trenger bare gode bilder og god skrift."],
  ["Tegnet for deres sted og fag", "Ikke hentet fra en bildebank, og skarpe på alle skjermer."],
  ["Bevegelse som tåler å bli sett mange ganger", "Har noen bedt telefonen om mindre bevegelse, står tegningene stille."],
] as const;

export const FAQS: readonly FAQ[] = [
  { question: "Hvorfor ikke bare bruke en mal?", answer: "En mal er laget for å passe alle, og derfor ligner sidene som bygges på den hverandre. Når mange nettsider nå lages med de samme verktøyene, blir en side som er laget for dere lettere å huske." },
  { question: "Hva er Next.js, og hvorfor er det bedre for Google?", answer: "Next.js er rammeverket vi bygger sidene i. Hver side lages ferdig på serveren, så Google kan lese all teksten uten å kjøre kode først. Det gir et godt utgangspunkt, men ingen garanti for plassering." },
  { question: "Hva koster en nettside?", answer: "Det kommer an på hvor mange sider dere trenger og hva som skal være på dem. Dere får et uforpliktende tilbud med fast pris før vi starter." },
  { question: "Kan vi endre siden selv?", answer: "Det går an, men det krever at dere kan jobbe i koden, med GitHub. Vi har ikke et enklere redigeringsverktøy i dag. Med driftsavtale sender dere en melding, så gjør vi endringen." },
  { question: "Vi har ikke gode bilder. Går det likevel?", answer: "Ja. Vi bruker bildene dere har, og der dere mangler bilder, kan vi tegne." },
  { question: "Må siden ha tegninger og animasjon?", answer: "Nei. En side kan like gjerne bygge på bilder og skrift. Tegninger og animasjon legger vi til der det gjør siden bedre." },
  { question: "Blir siden treg av animasjonene?", answer: "Vi lager dem med tegninger i koden, ikke tunge videoer. Har noen bedt telefonen om mindre bevegelse, står de stille." },
];

/** The four clients shown as work; ids match the card classes in a-klar-calm.css (wk-mk, wk-trio, wk-kong, wk-ringebu). */
export const CLIENTS = [
  { id: "iqra", name: "Iqra Senter", line: "Lærings- og aktivitetssenter i Oslo" },
  { id: "kong", name: "Kongsvinger Tannhelse", line: "Tannlege i Kongsvinger" },
  { id: "mk", name: "MK Auto", line: "Bruktbilforhandler i Oslo" },
  { id: "ringebu", name: "Ringebu Tannlegesenter", line: "Tannlegesenter i Ringebu" },
] as const;

export type ClientId = (typeof CLIENTS)[number]["id"];
