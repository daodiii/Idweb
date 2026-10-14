import Link from "next/link";
import { schibsted } from "@/lib/home/fonts";
import { MobileMenu, type NavLink } from "@/components/home/mobile-menu";

const LINKS: readonly NavLink[] = [
  { href: "/#tjenester", label: "Tjenester" },
  { href: "/#prosess", label: "Slik jobber vi" },
  { href: "/referanser", label: "Referanser" },
  { href: "/om-oss", label: "Om oss" },
];

/** Sticky header: the booking button stays in reach on every scroll position; links fold into a menu below 820 px. */
export function HomeHeader() {
  return (
    <div className={`ka hdr ${schibsted.variable}`}>
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
            <Link href="/#kontakt" className="btn dark">
              Book en gratis prat
            </Link>
            <MobileMenu links={LINKS} />
          </div>
        </div>
      </header>
    </div>
  );
}
