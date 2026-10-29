"use client";

import { useState } from "react";
import { EntryRow, PortalFrame } from "@/components/tjenester-lab/portal-parts";
import type { Entry } from "@/components/tjenester-lab/kundeportal-content";

const SOURCES = [
  { id: "chat", t: "En kunde skriver i chatten", p: "Den legger igjen nummeret sitt.", status: "CHAT", what: "Ville ha pris på en jobb", contact: "400 00 002" },
  { id: "book", t: "En kunde bestiller time", p: "På nettsiden, uten å logge inn.", status: "BOOKET", what: "Time i dag kl. 14.00", contact: "kunde@eksempel.no" },
] as const;

/**
 * «Alle henvendelsene på ett sted»: press one of the two buttons to send a customer in, and the entry lands in the same inbox. Mark
 * it as done, and if the business has reviews, an e-mail about a review is planned for two days later. Starts with one entry in.
 */
export function FlowDemo() {
  const [n, setN] = useState(1);
  const [entries, setEntries] = useState<(Entry & { fresh?: boolean })[]>([{ id: "1", name: "Kunde A", status: "BOOKET", what: "Time i dag kl. 14.00", contact: "kunde-a@eksempel.no" }]);
  const [done, setDone] = useState<string[]>([]);
  const [reviews, setReviews] = useState(true);

  function send(s: (typeof SOURCES)[number]) {
    const id = String(n + 1);
    setN(n + 1);
    setEntries((es) => [{ id, name: `Kunde ${String.fromCharCode(64 + n + 1)}`, status: s.status, what: s.what, contact: s.contact, fresh: true }, ...es].slice(0, 4));
  }
  const toggleDone = (id: string) => setDone((d) => (d.includes(id) ? d.filter((x) => x !== id) : [...d, id]));
  const anyDone = entries.some((e) => done.includes(e.id));

  return (
    <div className="fd">
      <div className="fd-src">
        {SOURCES.map((s) => (
          <button key={s.id} type="button" onClick={() => send(s)}>
            <b>{s.t}</b>
            <span>{s.p}</span>
            <i aria-hidden="true">Send inn →</i>
          </button>
        ))}
        <label className={`fd-rev${reviews ? " on" : ""}`}>
          <input type="checkbox" checked={reviews} onChange={() => setReviews((r) => !r)} />
          <i aria-hidden="true" />
          Vi har Omtaler
        </label>
      </div>
      <div className="fd-in" aria-live="polite">
        <PortalFrame have={reviews ? ["chat", "booking", "omtaler"] : ["chat", "booking"]} active="innboks">
          <div className="pt-inbox">
            <p className="pt-lede">Når noen tar kontakt, havner de her.</p>
            {entries.map((e) => (
              <EntryRow key={e.id} e={e} isNew={e.fresh} done={done.includes(e.id)} onDone={() => toggleDone(e.id)} />
            ))}
            {reviews && anyDone && <p className="pt-review">Kunden får en e-post om en omtale 2 dager etter at jobben er merket ferdig, kl. 09.00.</p>}
          </div>
        </PortalFrame>
      </div>
    </div>
  );
}
