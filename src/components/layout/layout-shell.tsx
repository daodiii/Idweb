"use client";

import { usePathname } from "next/navigation";
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

  return (
    <>
      <HomeHeader />
      <main id="main-content">{children}</main>
      <HomeFooter />
      <CookieConsent />
      <GoogleAnalytics />
    </>
  );
}
