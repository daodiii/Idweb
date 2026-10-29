"use client";

import { useState } from "react";
import { CodeCard, GoogleCard } from "@/components/tjenester-lab/seo-parts";
import { KINDS, type Kind } from "@/components/tjenester-lab/seo-content";

/**
 * «Velg bransje»: choose the kind of business and whether it is open, and the code and the search result change together. It shows
 * that the facts are written once, in the code, and the rest is worked out from them. Starts on the first, so it reads without a click.
 */
export function TypeBuilder() {
  const [kind, setKind] = useState<Kind>("tannlege");
  const [open, setOpen] = useState(true);
  return (
    <div className="tbd">
      <div className="tbd-controls">
        <div className="tbd-tabs" role="group" aria-label="Velg bransje">
          {(Object.keys(KINDS) as Kind[]).map((k) => (
            <button key={k} type="button" aria-pressed={k === kind} className={k === kind ? "on" : undefined} onClick={() => setKind(k)}>
              {KINDS[k].label}
            </button>
          ))}
        </div>
        <button type="button" role="switch" aria-checked={open} className={`tbd-switch${open ? " on" : ""}`} onClick={() => setOpen((o) => !o)}>
          <i />
          <span>{open ? "Det er åpent nå" : "Det er stengt nå"}</span>
        </button>
      </div>
      <div className="ah-pair" key={`${kind}`}>
        <CodeCard kind={kind} />
        <GoogleCard kind={kind} open={open} />
      </div>
      <p className="tbd-note">Bedriften og tallene er eksempler. Om det er åpent, regnes ut fra åpningstidene i koden akkurat nå, og Google bestemmer selv hvordan treffet ser ut.</p>
    </div>
  );
}
