/**
 * Copy for the «Timebestilling» page. Taken from the live page (the e-mail texts are the ones the example sends) and
 * tightened. Bjølsen Fysioterapi and Ida Larsen are made-up and always labelled as an example.
 */
import type { FAQ } from "@/types";

export const DAYS = [
  ["Man", "3"],
  ["Tir", "4"],
  ["Ons", "5"],
  ["Tor", "6"],
  ["Fre", "7"],
] as const;

export const SLOTS = ["09:00", "10:30", "12:00", "13:30", "15:00", "16:30"] as const;

export type Mail = {
  id: "bekreftelse" | "ny" | "paminnelse" | "avbestilt";
  who: "kunden" | "dere";
  label: string;
  when: string;
  subject: string;
  lines: readonly string[];
  attach?: string;
  why: string;
};

export const MAILS: readonly Mail[] = [
  {
    id: "bekreftelse",
    who: "kunden",
    label: "Bekreftelse",
    when: "Med en gang",
    subject: "Timen din hos Bjølsen Fysioterapi er bekreftet",
    lines: ["Hei Ida,", "Timen din er bekreftet. Kalenderinvitasjonen ligger vedlagt."],
    attach: "time.ics",
    why: "Kunden får timen i kalenderen sin, med bedriftens navn som avsender.",
  },
  {
    id: "ny",
    who: "dere",
    label: "Ny booking til dere",
    when: "Innen fem minutter",
    subject: "Ny booking: Ida Larsen",
    lines: ["Navn, telefon og e-post, og en lenke til portalen."],
    why: "Dere får beskjed om hver nye time. Den ligger også i innboksen i portalen.",
  },
  {
    id: "paminnelse",
    who: "kunden",
    label: "Påminnelse",
    when: "Når timen er mindre enn et døgn unna",
    subject: "Påminnelse: Første konsultasjon tirsdag 10.30",
    lines: ["Hei Ida,", "Dette er en påminnelse om timen din."],
    why: "Én påminnelse per time, og bare hvis timen ble bestilt minst et døgn før.",
  },
  {
    id: "avbestilt",
    who: "kunden",
    label: "Hvis dere avbestiller",
    when: "Når dere trykker «Avbestill»",
    subject: "Timen din hos Bjølsen Fysioterapi er avbestilt",
    lines: ["Hei Ida,", "Timen din er avbestilt. Vil du ha en ny time, svar på denne e-posten."],
    why: "Kunden får beskjed med en gang. Kalenderhendelsen sletter kunden selv.",
  },
];

export const BOOKINGS = [
  ["Ida Larsen", "Første konsultasjon", "Tir 10:30"],
  ["Jon Berg", "Oppfølging", "Tir 13:30"],
  ["Sara Nilsen", "Første konsultasjon", "Ons 09:00"],
] as const;

export const FAQS: readonly FAQ[] = [
  { question: "Hva koster timebestilling?", answer: "Dere får pris før vi starter. Timebestillingen er en modul i kundeportalen vår." },
  { question: "Virker den på nettsiden vi har i dag?", answer: "Ja. Bestillingen legges inn på siden dere har, også om vi ikke har laget den." },
  { question: "Kan kunden avbestille selv?", answer: "Kunden svarer på bekreftelsen eller påminnelsen, og dere avbestiller i portalen. Da får kunden en e-post om at timen er avbestilt." },
  { question: "Hva med dobbeltbooking?", answer: "Tider som er tatt eller stengt, vises ikke. Og trykker to kunder på samme tid samtidig, stopper databasen den andre." },
  { question: "Hva med spam og roboter?", answer: "Skjemaet har en usynlig felle for roboter, og det er en grense for hvor mange bestillinger som kan sendes fra samme sted på kort tid. Kundene slipper å klikke på bilder av trafikklys." },
];
