"use client";

import { useState } from "react";
import { REGIONS } from "@/components/tjenester/shop-info";
import { UiNewProduct, UiOrders, UiShipping, UiStock } from "@/components/tjenester/shop-ui";

const NAV = ["Varer", "Lager", "Ordrer", "Frakt"] as const;

/**
 * The shop's admin on one screen, with four numbered places. The list on the right says what each is for; choosing one (or
 * hovering it) lights that place and dims the rest. Starts on the first, so it reads without a click.
 */
export function DashboardAnnotated() {
  const [cur, setCur] = useState(1);
  const region = (n: number, node: React.ReactNode) => (
    <div className="db-r" data-r={n}>
      <button type="button" className="db-pin" onClick={() => setCur(n)} aria-label={`Vis ${REGIONS[n - 1].t}`}>
        {n}
      </button>
      {node}
    </div>
  );
  return (
    <div className="db-wrap">
      <div className="db" data-cur={cur}>
        <div className="db-side" aria-hidden="true">
          <b>Butikken</b>
          {NAV.map((n, i) => (
            <span key={n} className={cur === [1, 2, 3, 4][i] ? "on" : undefined}>
              {n}
            </span>
          ))}
        </div>
        <div className="db-main">
          {region(1, <UiNewProduct />)}
          {region(2, <UiStock />)}
          {region(3, <UiOrders />)}
          {region(4, <UiShipping />)}
        </div>
      </div>
      <ol className="db-legend">
        {REGIONS.map((r) => (
          <li key={r.n}>
            <button type="button" className={cur === r.n ? "on" : undefined} aria-pressed={cur === r.n} onClick={() => setCur(r.n)} onMouseEnter={() => setCur(r.n)} onFocus={() => setCur(r.n)}>
              <span className="db-n">{r.n}</span>
              <span>
                <b>{r.t}</b>
                <span className="db-p">{r.p}</span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
