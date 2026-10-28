import Link from "next/link";
import { schibsted } from "@/lib/home/fonts";
import { IdwebMark } from "@/components/home/idweb-mark";
import { MenuButton } from "@/components/home/menu-button";
import { LINKS } from "@/lib/home/nav-links";
import { HeaderAutohide } from "@/components/home/header-autohide";
import "@/styles/header-menu.css";

/**
 * Sticky header: the links fold away below 820 px; the hamburger opens the site menu (site-menu.tsx) on every screen size. On the calm homepage it slides away while scrolling down and
 * returns on the way up (HeaderAutohide); on other pages it stays in place.
 */
export function HomeHeader() {
  return (
    <div className={`ka hdr ${schibsted.variable}`}>
      <a href="#main-content" className="skip">
        Hopp til innholdet
      </a>
      <header className="top">
        <div className="wrap">
          <Link href="/" className="logo" aria-label="IDweb, til forsiden">
            <IdwebMark id="hd" className="logo-mark" />
            <span className="logo-word" aria-hidden="true">
              <b>ID</b>web
            </span>
          </Link>
          <nav className="navlinks" aria-label="Hovedmeny">
            {LINKS.map((l) =>
              l.children ? (
                <div key={l.href} className="hasmenu">
                  <Link href={l.href}>{l.label}</Link>
                  <div className="dropdown">
                    {/* the descriptions and the contact card show only in the homepage's wide menu (header-menu.css) */}
                    {l.children.map((c) => (
                      <Link key={c.href} href={c.href}>
                        <span className="dd-t">{c.label}</span>
                        {c.text && <small className="dd-d">{c.text}</small>}
                      </Link>
                    ))}
                    <Link href="/#kontakt" className="dd-cta">
                      <b>Usikker på hva dere trenger?</b>
                      <span>Book en gratis prat</span>
                    </Link>
                  </div>
                </div>
              ) : (
                <Link key={l.href} href={l.href}>
                  {l.label}
                </Link>
              ),
            )}
          </nav>
          <div className="top-end">
            <Link href="/#kontakt" className="btn dark book">
              Book en gratis prat
            </Link>
            <MenuButton />
          </div>
        </div>
      </header>
      <HeaderAutohide />
    </div>
  );
}
