"use client";

import { useState, useEffect, useCallback } from "react";
import { schibsted } from "@/lib/home/fonts";

const CONSENT_KEY = "idweb-cookie-consent";

export type ConsentChoice = "all" | "necessary" | null;

/** Read consent from localStorage (returns null if no choice made yet). */
export function getConsent(): ConsentChoice {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(CONSENT_KEY);
  if (stored === "all" || stored === "necessary") return stored;
  return null;
}

/** Cookie choice card, bottom right (A · Klar). */
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

  const ease = "cubic-bezier(0.23,1,0.32,1)";

  return (
    <div
      role="dialog"
      aria-label="Informasjonskapsler"
      aria-describedby="cookie-desc"
      className={`${schibsted.variable} fixed inset-x-4 bottom-4 z-[90] font-[family-name:var(--font-schibsted)] sm:inset-x-auto sm:right-6 sm:bottom-6 sm:w-[380px] ${
        exiting ? "animate-cookie-exit" : "animate-cookie-enter"
      }`}
    >
      <div className="rounded-2xl border border-[#E6E8EC] bg-white p-5 text-[#14161B] shadow-[0_1px_2px_rgba(20,22,27,0.06),0_24px_48px_-20px_rgba(30,42,110,0.35)]">
        <p className="text-[15px] font-semibold">Informasjonskapsler</p>
        <p id="cookie-desc" className="mt-1.5 text-sm leading-relaxed text-[#4A505B]">
          Vi bruker informasjonskapsler for å se hvordan siden blir brukt. Du velger selv.{" "}
          <a
            href="/personvern"
            className="font-medium text-[#2447D6] underline decoration-[#2447D6]/30 underline-offset-2 transition-colors hover:decoration-[#2447D6]"
          >
            Les mer
          </a>
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => handleChoice("necessary")}
            className="h-11 rounded-full border border-[#D9DCE2] text-sm font-semibold text-[#14161B] transition-[background-color,transform] duration-150 hover:bg-[#F6F7F9] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2447D6] active:scale-[0.97]"
            style={{ transitionTimingFunction: ease }}
          >
            Avvis
          </button>
          <button
            type="button"
            onClick={() => handleChoice("all")}
            className="h-11 rounded-full bg-[#2447D6] text-sm font-semibold text-white transition-[background-color,transform] duration-150 hover:bg-[#1D3BBA] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2447D6] active:scale-[0.97]"
            style={{ transitionTimingFunction: ease }}
          >
            Godta
          </button>
        </div>
      </div>
    </div>
  );
}
