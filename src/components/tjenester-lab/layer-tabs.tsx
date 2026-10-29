"use client";

import { useState } from "react";
import { CodeCard } from "@/components/tjenester-lab/seo-parts";

const TABS = [
  { id: "ser", t: "Det kundene ser", p: "Siden slik den ser ut på mobil og PC." },
  { id: "far", t: "Det Google får", p: "Teksten, tittelen og beskrivelsen med en gang, og fakta om bedriften i en form maskiner kan lese." },
  { id: "kode", t: "Koden vi skriver", p: "Next.js lager hver side ferdig på serveren, med de strukturerte dataene i koden." },
] as const;

const FACTS = [
  ["Type", "Tannlege (Dentist)"],
  ["Navn", "Bedriften din"],
  ["Adresse", "Gateveien 1, Oslo"],
  ["Åpningstider", "Man–fre 08.00–16.00"],
  ["Tittel", "Bedriften din | Tannlege i Oslo"],
] as const;

/** The same business three ways: as the customer sees it, as Google receives it, and as the code we write. */
export function LayerTabs() {
  const [cur, setCur] = useState<(typeof TABS)[number]["id"]>("ser");
  const tab = TABS.find((t) => t.id === cur)!;
  return (
    <div className="lt">
      <div className="lt-tabs" role="group" aria-label="Tre måter å se samme side på">
        {TABS.map((t) => (
          <button key={t.id} type="button" aria-pressed={t.id === cur} className={t.id === cur ? "on" : undefined} onClick={() => setCur(t.id)}>
            {t.t}
          </button>
        ))}
      </div>
      <p className="lt-note" aria-live="polite">
        {tab.p}
      </p>
      <div className="lt-pane" key={cur}>
        {cur === "ser" && (
          <div className="lt-site" aria-hidden="true">
            <div className="lt-site-top">
              <i />
              <i />
              <i />
              <span>bedriften-din.no</span>
            </div>
            <b>Bedriften din</b>
            <i style={{ width: "60%" }} />
            <i style={{ width: "42%" }} />
            <div className="lt-site-grid">
              <div>
                <small>Åpningstider</small>
                <span>Man–fre 08–16</span>
              </div>
              <div>
                <small>Finn oss</small>
                <span>Gateveien 1, Oslo</span>
              </div>
            </div>
          </div>
        )}
        {cur === "far" && (
          <dl className="lt-facts">
            {FACTS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        )}
        {cur === "kode" && <CodeCard />}
      </div>
    </div>
  );
}
