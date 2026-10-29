"use client";

import { useState } from "react";
import { BookButton } from "@/components/tjenester/service-parts";
import { ServiceCard } from "@/components/tjenester/service-card";
import { NEEDS, SERVICES } from "@/components/tjenester/oversikt-content";
import type { ServicePageSlug } from "@/components/tjenester/pages";

/**
 * «Hva trenger dere?»: tick what fits and the matching services light up while the rest step back. Nothing is saved or sent; the button
 * leads to the quote request further down. Starts with nothing ticked, so all seven show equally.
 */
export function NeedPicker() {
  const [sel, setSel] = useState<ServicePageSlug[]>([]);
  const toggle = (s: ServicePageSlug) => setSel((a) => (a.includes(s) ? a.filter((x) => x !== s) : [...a, s]));
  return (
    <div className="np">
      <fieldset className="np-pick">
        <legend>Hva trenger dere?</legend>
        <div>
          {NEEDS.map((n) => (
            <label key={n.slug} className={sel.includes(n.slug) ? "on" : undefined}>
              <input type="checkbox" checked={sel.includes(n.slug)} onChange={() => toggle(n.slug)} />
              <i aria-hidden="true" />
              {n.q}
            </label>
          ))}
        </div>
      </fieldset>
      <p className="np-sum" aria-live="polite">
        {sel.length === 0 ? "Velg det som passer, så ser du hvilke tjenester det gjelder. Du kan velge flere." : `Du har valgt ${sel.length} ${sel.length === 1 ? "tjeneste" : "tjenester"}. Book en gratis prat, så får dere pris på akkurat disse.`}
      </p>
      {sel.length > 0 && (
        <div className="np-act">
          <BookButton />
        </div>
      )}
      <div className="ov-bento np-grid">
        {SERVICES.map((s) => (
          <ServiceCard key={s.slug} s={s} state={sel.length === 0 ? undefined : sel.includes(s.slug) ? "on" : "dim"} />
        ))}
      </div>
    </div>
  );
}
