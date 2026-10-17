"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-footer";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { GoogleAnalytics } from "@/components/ui/google-analytics";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStudio = pathname.startsWith("/studio");

  if (isStudio) {
    return <>{children}</>;
  }

  // The homepage has moved to the A · Klar design; the other pages keep the old header and footer until they follow.
  // The seven service pages and the client cases (/referanser/<kunde>) are on A · Klar too.
  const isHome =
    pathname === "/" ||
    /^\/tjenester\/(nettside|timebestilling|nettbutikk|ai-chatbot|seo|vedlikehold|kundeportal)\/?$/.test(pathname) ||
    pathname.startsWith("/referanser/");

  return (
    <>
      {isHome ? <HomeHeader /> : <Navbar />}
      <main id="main-content">{children}</main>
      {isHome ? <HomeFooter /> : <Footer />}
      <CookieConsent variant={isHome ? "klar" : "monument"} />
      <GoogleAnalytics />
    </>
  );
}
