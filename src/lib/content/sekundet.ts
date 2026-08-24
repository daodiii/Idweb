/**
 * Content for «Sekundet» — the full-stack section on the home page.
 * One booking followed through the whole chain, told as a single second
 * of real time (21:47:03,120 → 21:47:04,360) scrubbed by scroll.
 *
 * All data is demo data. The customer name is fictitious; the business
 * context is the members' centre build. Times are typical, not measured —
 * the section says so on screen.
 */

export interface SekundetStation {
  /** Station id — drives which card layout renders. */
  id: "telefon" | "server" | "database" | "vipps" | "sms" | "panel";
  /** Big label on the card bar and under the wire. */
  name: string;
  /** Milliseconds after the tap, shown on ticks and card bars. */
  ms: number;
}

export const SEKUNDET_STATIONS: SekundetStation[] = [
  { id: "telefon", name: "Telefonen", ms: 0 },
  { id: "server", name: "Serveren", ms: 180 },
  { id: "database", name: "Databasen", ms: 320 },
  { id: "vipps", name: "Vipps", ms: 600 },
  { id: "sms", name: "SMS-en", ms: 900 },
  { id: "panel", name: "Panelet ditt", ms: 1240 },
];

export const SEKUNDET = {
  /** Clock starts at 21:47:03,120; the whole scroll covers 1 240 ms. */
  startMs: 3120,
  totalMs: 1240,
  clockPrefix: "21:47:",

  intro: {
    headline: ["Kunden din trykker", "Bestill", "."],
    sub: "Klokka er 21:47. Dere har stengt for lengst. Dette er det neste sekundet.",
  },

  finale: {
    headline: "Vi bygger backend også.",
    sub: "Database, innlogging, betaling, varsling og admin-panel. Ikke bare nettsiden foran — hele systemet bak.",
  },

  honesty: "Demodata · tidene er typiske, ikke målt",

  cards: {
    telefon: {
      time: "21:47:03",
      what: "Sal B",
      when: "torsdag 18:00–20:00",
      price: "900 kr",
      button: "Bestill med Vipps",
    },
    server: {
      lines: [
        { text: "→ POST /api/bestilling", tone: "accent" as const },
        { text: "auth      Marte Lundeby", ok: true },
        { text: "validering sal_b · tor 18:00", ok: true },
      ],
    },
    database: {
      insert: { label: "INSERT", row: "4128 · sal_b · tor 18:00–20:00", took: "2,1 ms" },
      check: "konfliktsjekk: ingen overlapp",
    },
    vipps: {
      amount: "900,00",
      unit: "kr",
      status: "reservert",
      ref: "ref V-88412 · fanges av webhook",
    },
    sms: {
      bubble: "Hei Marte! Sal B er bekreftet torsdag 18:00–20:00. Velkommen.",
      delivered: "levert 21:47:04",
    },
    panel: {
      statLabel: "Bookinger i uken",
      statValue: "19",
      statDelta: "+1",
      row: { who: "Marte Lundeby", what: "Romleie — kveld", sum: "900 kr" },
    },
  },
} as const;
