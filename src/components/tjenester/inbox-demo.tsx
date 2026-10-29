"use client";

import { useState } from "react";
import { MAILS } from "@/components/tjenester/timebestilling-content";

const SENDER = { kunden: "Bjølsen Fysioterapi", dere: "IDweb" } as const;
const RECIPIENT = { kunden: "Ida Larsen", dere: "post@bjolsenfysio.no" } as const;

/**
 * «Innboksen»: the four e-mails as an inbox you can click through. The list is on the left, the open message on the right,
 * and under it why it is sent and when. Starts on the first e-mail, so the section reads without a click.
 */
export function InboxDemo() {
  const [cur, setCur] = useState(0);
  const m = MAILS[cur];
  return (
    <div className="ib-field">
      <div className="ib-win">
        <div className="ib-bar" aria-hidden="true">
          <i />
          <i />
          <i />
          <span>Innboks</span>
        </div>
        <div className="ib-body">
          <ul className="ib-list" aria-label="De fire e-postene">
            {MAILS.map((x, i) => (
              <li key={x.id}>
                <button type="button" onClick={() => setCur(i)} aria-pressed={i === cur} className={i === cur ? "on" : undefined}>
                  <span className="ib-row">
                    <b>{SENDER[x.who]}</b>
                    <span className="tb-when">{x.when}</span>
                  </span>
                  <span className="ib-subj">{x.subject}</span>
                  <span className="ib-to">Til {x.who === "kunden" ? "Ida" : "klinikken"}</span>
                </button>
              </li>
            ))}
          </ul>
          <article className="ib-pane" key={m.id} aria-live="polite">
            <h4>{m.subject}</h4>
            <dl>
              <div>
                <dt>Fra</dt>
                <dd>{SENDER[m.who]}</dd>
              </div>
              <div>
                <dt>Til</dt>
                <dd>{RECIPIENT[m.who]}</dd>
              </div>
            </dl>
            {m.lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
            {m.attach && <span className="tb-attach">{m.attach}</span>}
            {m.who === "dere" && <p className="ib-foot">Sendt automatisk av IDweb.</p>}
            <div className="ib-why">
              <small>Hvorfor og når</small>
              {m.why}
            </div>
          </article>
        </div>
      </div>
      <p className="ib-hint">Trykk på en e-post for å åpne den.</p>
    </div>
  );
}
