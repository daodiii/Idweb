"use client";

import { useSyncExternalStore } from "react";

/**
 * PREVIEW ONLY, remove before merge: switches the homepage between the current calm look and the proposed «ny» look
 * (client colour fields, a bigger hero, one full-width moment; a-klar-look-ny.css). The choice lives in ?look=ny and
 * on <html data-look>, set before paint by LOOK_SCRIPT so the page does not flash the other look.
 */
export const LOOK_SCRIPT = `try{if(new URLSearchParams(location.search).get("look")==="ny")document.documentElement.dataset.look="ny"}catch(e){}`;

const EVENT = "idweb-look";
const subscribe = (fn: () => void) => {
  window.addEventListener(EVENT, fn);
  return () => window.removeEventListener(EVENT, fn);
};
const isNy = () => document.documentElement.dataset.look === "ny";

export function LookSwitch() {
  const ny = useSyncExternalStore(subscribe, isNy, () => false);

  const pick = (next: boolean) => {
    const html = document.documentElement;
    if (next) html.dataset.look = "ny";
    else delete html.dataset.look;
    const url = new URL(location.href);
    if (next) url.searchParams.set("look", "ny");
    else url.searchParams.delete("look");
    history.replaceState(null, "", url);
    window.dispatchEvent(new Event(EVENT));
  };

  return (
    <div className="look-switch" role="group" aria-label="Forhåndsvisning av utseende">
      <button type="button" aria-pressed={!ny} onClick={() => pick(false)}>
        Nå
      </button>
      <button type="button" aria-pressed={ny} onClick={() => pick(true)}>
        Ny
      </button>
    </div>
  );
}
