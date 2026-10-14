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

/** `klar` is the A · Klar look used on the redesigned homepage; `monument` is the original look for the other pages. */
export function CookieConsent({ variant = "monument" }: { variant?: "monument" | "klar" }) {
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

  if (variant === "klar") {
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

  return (
    <div
      role="dialog"
      aria-label="Informasjonskapsler"
      aria-describedby="cookie-desc"
      className={`fixed inset-x-0 bottom-0 z-[90] ${
        exiting ? "animate-cookie-exit" : "animate-cookie-enter"
      }`}
    >
      <div className="border-t border-[#F4CE14]/30 bg-[#0a0a0a]/95 shadow-[0_-20px_40px_-22px_rgba(0,0,0,0.6)]">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <div className="min-w-0 flex-1">
            <p className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-6 bg-[#F4CE14]/70" />
              Informasjonskapsler
            </p>
            <p
              id="cookie-desc"
              className="mt-3 max-w-[62ch] text-sm leading-relaxed text-white/75"
            >
              Vi bruker informasjonskapsler for trafikk og opplevelse.{" "}
              <a
                href="/personvern"
                className="text-[#F4CE14] underline decoration-[#F4CE14]/30 underline-offset-2 transition-colors hover:decoration-[#F4CE14]"
              >
                Les mer
              </a>
            </p>
          </div>

          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => handleChoice("necessary")}
              className="inline-flex items-center justify-center rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white/85 transition-[border-color,background-color,color,transform] duration-150 hover:border-white/30 hover:bg-white/[0.04] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4CE14] active:scale-[0.97]"
              style={{ transitionTimingFunction: ease }}
            >
              Avvis
            </button>
            <button
              type="button"
              onClick={() => handleChoice("all")}
              className="inline-flex items-center justify-center rounded-xl bg-[#F4CE14] px-5 py-3 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F4CE14] active:scale-[0.97]"
              style={{ transitionTimingFunction: ease }}
            >
              Godta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
