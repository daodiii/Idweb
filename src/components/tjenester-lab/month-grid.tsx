"use client";

import { useState } from "react";
import { NightLog } from "@/components/tjenester-lab/mnt-parts";
import { FIRST_WEEKDAY, KIND_LABEL, SPECIAL, type NightKind } from "@/components/tjenester-lab/vedlikehold-content";

const DAYS = ["Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"];

/**
 * «En måned med drift»: every night of an example month. Choose a night and the log for it shows. Most nights are only the
 * backup; a few have an update, a fix or a renewed certificate. Starts on an update night, so it reads without a click.
 */
export function MonthGrid() {
  const [sel, setSel] = useState(8);
  const kind: NightKind = SPECIAL[sel] ?? "backup";
  return (
    <div className="mg">
      <div className="mg-cal">
        <div className="mg-head" aria-hidden="true">
          {DAYS.map((d) => (
            <span key={d}>{d}</span>
          ))}
        </div>
        <div className="mg-days" role="group" aria-label="Velg en natt">
          {Array.from({ length: FIRST_WEEKDAY }, (_, i) => (
            <span key={`b${i}`} aria-hidden="true" />
          ))}
          {Array.from({ length: 31 }, (_, i) => {
            const d = i + 1;
            const k: NightKind = SPECIAL[d] ?? "backup";
            return (
              <button key={d} type="button" aria-pressed={sel === d} className={`mg-day ${k}${sel === d ? " on" : ""}`} onClick={() => setSel(d)}>
                {d}
                <i aria-hidden="true" />
              </button>
            );
          })}
        </div>
        <ul className="mg-legend">
          {(Object.keys(KIND_LABEL) as NightKind[]).map((k) => (
            <li key={k} className={k}>
              <i /> {KIND_LABEL[k]}
            </li>
          ))}
        </ul>
      </div>
      <div className="mg-log" aria-live="polite">
        <div className="mg-in" key={sel}>
          <NightLog kind={kind} title={`Natt til ${sel}.`} />
          <p className="mg-note">{kind === "backup" ? "En vanlig natt: sikkerhetskopien tas, og ingenting annet trengs." : `${KIND_LABEL[kind]}. Alt står i loggen, og i månedsrapporten.`}</p>
        </div>
      </div>
    </div>
  );
}
