import Link from "next/link";
import { MobileMenu } from "@/components/layout/mobile-menu";

export interface NavLink {
  href: string;
  label: string;
}

const LINKS: readonly NavLink[] = [
  { href: "/tjenester", label: "Tjenester" },
  { href: "/#prosess", label: "Slik jobber vi" },
  { href: "/referanser", label: "Referanser" },
  { href: "/om-oss", label: "Om oss" },
];

/** Site header (A · Klar): logo, main links, contact button; the links fold into a menu below 820 px. */
export function Navbar() {
  return (
    <div className="ka">
      <a href="#main-content" className="skip">
        Hopp til innholdet
      </a>
      <header className="top">
        <div className="wrap">
          <Link href="/" className="logo" aria-label="IDweb, til forsiden">
            {/* eslint-disable-next-line @next/next/no-img-element -- small brand mark, already optimised */}
            <img src="/images/idweb-mark-160.webp" alt="" width={53} height={42} />
            IDweb
          </Link>
          <nav className="navlinks" aria-label="Hovedmeny">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="top-end">
            <Link href="/kontakt" className="btn dark">
              Book en gratis prat
            </Link>
            <MobileMenu links={LINKS} />
          </div>
        </div>
      </header>
    </div>
  );
}
