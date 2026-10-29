"use client";

import { useState } from "react";
import { CodeCard, GoogleCard } from "@/components/tjenester-lab/seo-parts";
import { REGIONS, type Region } from "@/components/tjenester-lab/seo-content";

/**
 * The code and the search result side by side. Choose one of three things (type, address, opening hours) and the line in the
 * code and the line in the result that it controls light up together. Starts on the opening hours, so it reads without a click.
 */
export function AnnotatedHit() {
  const [cur, setCur] = useState<Region>("apent");
  return (
    <div className="ah">
      <div className="ah-pair">
        <CodeCard lit={cur} />
        <GoogleCard lit={cur} />
      </div>
      <ol className="ah-legend">
        {REGIONS.map((r, i) => (
          <li key={r.id}>
            <button type="button" aria-pressed={cur === r.id} className={cur === r.id ? "on" : undefined} onClick={() => setCur(r.id)} onMouseEnter={() => setCur(r.id)} onFocus={() => setCur(r.id)}>
              <span className="ah-n">{i + 1}</span>
              <span>
                <b>{r.t}</b>
                <span className="ah-p">{r.p}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
