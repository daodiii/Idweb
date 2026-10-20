"use client";

import { openCookieSettings } from "@/components/ui/cookie-consent";

/** «Informasjonskapsler»: opens the cookie choice again so a visitor can change or withdraw consent. */
export function CookieSettingsButton({ className, children = "Informasjonskapsler" }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={openCookieSettings}>
      {children}
    </button>
  );
}
