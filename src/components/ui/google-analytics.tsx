"use client";

import { useEffect, useSyncExternalStore } from "react";
import Script from "next/script";
import { getConsent } from "@/components/ui/cookie-consent";

const GA_ID = "G-P0ZMB9YLTK";

function subscribe(onChange: () => void) {
  window.addEventListener("cookie-consent", onChange);
  return () => window.removeEventListener("cookie-consent", onChange);
}

/** Removes Google Analytics' own cookies (_ga, _ga_<id>) on this domain and its parent. */
function clearGaCookies() {
  const host = location.hostname.replace(/^www\./, "");
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (!name.startsWith("_ga")) continue;
    for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}

/**
 * Loads Google Analytics only when the user has consented to "all" cookies, and follows the choice if it changes
 * («Informasjonskapsler» in the footer): withdrawing turns tracking off for the page and removes GA's cookies.
 */
export function GoogleAnalytics() {
  const allowed = useSyncExternalStore(subscribe, () => getConsent() === "all", () => false);

  useEffect(() => {
    (window as unknown as Record<string, boolean>)[`ga-disable-${GA_ID}`] = !allowed;
    if (!allowed) clearGaCookies();
  }, [allowed]);

  if (!allowed) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
      </Script>
    </>
  );
}
