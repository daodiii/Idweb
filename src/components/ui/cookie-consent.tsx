"use client";

import { useState, useEffect, useCallback } from "react";

const CONSENT_KEY = "idweb-cookie-consent";

export type ConsentChoice = "all" | "necessary" | null;

/** Read consent from localStorage (returns null if no choice made yet). */
export function getConsent(): ConsentChoice {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "all" || stored === "necessary") return stored;
  return null;
}

export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Only show if no consent choice has been made
    const consent = getConsent();
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = useCallback((choice: "all" | "necessary") => {
    localStorage.setItem(CONSENT_KEY, choice);

    // Dispatch a custom event so GoogleAnalytics component can react
    window.dispatchEvent(new CustomEvent("cookie-consent", { detail: choice }));

    // Animate out
    setExiting(true);
    setTimeout(() => setVisible(false), 400);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Informasjonskapsler"
      aria-describedby="cookie-desc"
      className={`fixed inset-x-0 bottom-0 z-[90] px-3 pb-3 sm:px-6 sm:pb-4 ${
        exiting ? "animate-cookie-exit" : "animate-cookie-enter"
      }`}
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-white/[0.08] bg-[#0a0a0a]/90 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-xl">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Text */}
          <p
            id="cookie-desc"
            className="min-w-0 flex-1 text-xs leading-snug text-[#CBD5E1] sm:text-sm"
          >
            Informasjonskapsler for trafikk og opplevelse.{" "}
            <a
              href="/personvern"
              className="text-[#F4CE14] underline decoration-[#F4CE14]/30 underline-offset-2 transition-colors hover:decoration-[#F4CE14]"
            >
              Les mer
            </a>
          </p>

          {/* Buttons */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => handleChoice("necessary")}
              className="rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-[#CBD5E1] transition-all hover:border-white/[0.16] hover:bg-white/[0.08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4CE14] sm:px-4 sm:py-2 sm:text-sm"
            >
              Avvis
            </button>
            <button
              type="button"
              onClick={() => handleChoice("all")}
              className="rounded-lg bg-[#F4CE14] px-3 py-1.5 text-xs font-semibold text-[#0a0a0a] transition-all hover:bg-[#D4B200] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4CE14] sm:px-4 sm:py-2 sm:text-sm"
            >
              Godta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
