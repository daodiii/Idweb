"use client";

import { useEffect, useSyncExternalStore } from "react";

type Face = "schibsted" | "jakarta";

const FACES: Face[] = ["schibsted", "jakarta"];
const CHANGE = "fsw:change";

// The address is the source of truth: ?font=jakarta picks Plus Jakarta Sans, anything else Schibsted.
const readFace = (): Face => (new URLSearchParams(window.location.search).get("font") === "jakarta" ? "jakarta" : "schibsted");
const subscribe = (onChange: () => void) => {
  window.addEventListener(CHANGE, onChange);
  return () => window.removeEventListener(CHANGE, onChange);
};

/**
 * Temporary comparison switch for the calm homepage (docs/specs/calm-homepage.md, Part 1). It sets data-font on <html>,
 * and a-klar-calm.css swaps the homepage face. Hidden in production; removed with the losing face before merge.
 */
export function FontSwitch() {
  const face = useSyncExternalStore(subscribe, readFace, () => null);

  useEffect(() => {
    if (face) document.documentElement.dataset.font = face;
  }, [face]);

  if (process.env.NEXT_PUBLIC_VERCEL_ENV === "production" || !face) return null;

  const pick = (next: Face) => {
    const url = new URL(window.location.href);
    url.searchParams.set("font", next);
    window.history.replaceState(null, "", url);
    window.dispatchEvent(new Event(CHANGE));
  };

  return (
    <div className="fsw" role="group" aria-label="Sammenlign skrift">
      {FACES.map((f) => (
        <button key={f} type="button" aria-pressed={face === f} onClick={() => pick(f)}>
          {f === "schibsted" ? "Schibsted Grotesk" : "Plus Jakarta Sans"}
        </button>
      ))}
    </div>
  );
}
