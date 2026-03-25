"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getConsent } from "@/components/ui/cookie-consent";

const GA_ID = "G-P0ZMB9YLTK";

/**
 * Loads Google Analytics only when the user has consented to "all" cookies.
 * Listens for the custom "cookie-consent" event dispatched by CookieConsent.
 */
export function GoogleAnalytics() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    // Check existing consent on mount
    if (getConsent() === "all") {
      setAllowed(true);
    }

    // Listen for new consent choices
    function onConsent(e: Event) {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "all") {
        setAllowed(true);
      }
    }

    window.addEventListener("cookie-consent", onConsent);
    return () => window.removeEventListener("cookie-consent", onConsent);
  }, []);

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
