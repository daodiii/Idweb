"use client";

import { usePathname } from "next/navigation";
import { HomeHeader } from "@/components/home/home-header";
import { HomeFooter } from "@/components/home/home-footer";
import { SiteMenu } from "@/components/home/site-menu";
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
      {/* the page shell is what the site menu shrinks and slides aside (site-menu.css) */}
      <div className="page-shell">
        <div className="page-inner">
          <HomeHeader />
          <main id="main-content">{children}</main>
          <HomeFooter />
        </div>
      </div>
      <SiteMenu />
      <CookieConsent />
      <GoogleAnalytics />
    </>
  );
}
