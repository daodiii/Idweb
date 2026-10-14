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

  // Pages already on the A · Klar design get its header and footer; the rest keep the old ones until they follow.
  const isKlar = KLAR_ROUTES.some((r) => (r.endsWith("/*") ? pathname.startsWith(r.slice(0, -1)) : pathname === r));

  return (
    <>
      {isKlar ? <HomeHeader /> : <Navbar />}
      <main id="main-content">{children}</main>
      {isKlar ? <HomeFooter /> : <Footer />}
      <CookieConsent variant={isKlar ? "klar" : "monument"} />
      <GoogleAnalytics />
    </>
  );
}

/** Routes that have moved to A · Klar; "/x/*" means everything under /x. Goes away once every page has. */
const KLAR_ROUTES = ["/", "/tjenester", "/tjenester/*", "/webbyra-oslo"];
