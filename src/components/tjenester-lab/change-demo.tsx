"use client";

import { useState } from "react";
import { SitePreview, Thread } from "@/components/tjenester-lab/mnt-parts";
import { CHANGES } from "@/components/tjenester-lab/vedlikehold-content";

/**
 * «Trenger dere en endring?»: choose a message and see what we answer and what the site shows. Small changes are done; a big one
 * gets a price first. Starts on the first, so it reads without a click. The answers are written in advance.
 */
export function ChangeDemo() {
  const [cur, setCur] = useState(0);
  const c = CHANGES[cur];
  return (
    <div className="mc">
      <div className="mc-chips" role="group" aria-label="Velg en melding">
        {CHANGES.map((x, i) => (
          <button key={x.id} type="button" aria-pressed={i === cur} className={i === cur ? "on" : undefined} onClick={() => setCur(i)}>
            {x.q}
          </button>
        ))}
      </div>
      <div className="mc-body" aria-live="polite">
        <div className="mc-in" key={c.id}>
          <Thread messages={[{ from: "me", text: c.q }, { from: "bot", text: c.a }]} />
          <SitePreview kind={c.id} />
        </div>
      </div>
    </div>
  );
}
