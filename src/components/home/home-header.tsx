import Link from "next/link";
import { schibsted } from "@/lib/home/fonts";
import { IdwebMark } from "@/components/home/idweb-mark";
import { MobileMenu, type NavLink } from "@/components/home/mobile-menu";
import { HeaderAutohide } from "@/components/home/header-autohide";
import "@/styles/header-menu.css";

const LINKS: readonly NavLink[] = [
  {
    href: "/#tjenester",
    label: "Tjenester",
    children: [
      { href: "/tjenester/nettside", label: "Skreddersydd nettside", text: "Skreddersydd fra bunnen og rask på mobil." },
      { href: "/tjenester/timebestilling", label: "Timebestilling", text: "Kundene bestiller time selv, når det passer dem." },
      { href: "/tjenester/nettbutikk", label: "Nettbutikk", text: "Selg varene på nett, med betaling og frakt." },
      { href: "/tjenester/ai-chatbot", label: "AI-chatbot", text: "Svarer på spørsmål på nettsiden, døgnet rundt." },
      { href: "/tjenester/seo", label: "SEO og AI-synlighet", text: "Bli funnet på Google og i svar fra ChatGPT." },
      { href: "/tjenester/vedlikehold", label: "Drift og vedlikehold", text: "Vi holder siden oppe, oppdatert og trygg." },
      { href: "/tjenester/kundeportal", label: "Kundeportal", text: "Henvendelser og kunder samlet bak én innlogging." },
      { href: "/tjenester", label: "Alle tjenester" },
    ],
  },
  { href: "/#prosess", label: "Slik jobber vi" },
  { href: "/referanser", label: "Kundecaser" },
  { href: "/om-oss", label: "Om oss" },
];

/**
 * Sticky header: links fold into a menu below 820 px. On the calm homepage it slides away while scrolling down and
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
            <MobileMenu links={LINKS} />
          </div>
        </div>
      </header>
      <HeaderAutohide />
    </div>
  );
}
