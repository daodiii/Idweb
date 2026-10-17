import Link from "next/link";
import { michroma, montserrat, schibsted } from "@/lib/home/fonts";
import { MobileMenu, type NavLink } from "@/components/home/mobile-menu";

const LINKS: readonly NavLink[] = [
  {
    href: "/#tjenester",
    label: "Tjenester",
    children: [
      { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
      { href: "/tjenester/timebestilling", label: "Timebestilling" },
      { href: "/tjenester/nettbutikk", label: "Nettbutikk" },
      { href: "/tjenester/ai-chatbot", label: "AI-chatbot" },
      { href: "/tjenester/seo", label: "SEO og AI-synlighet" },
      { href: "/tjenester/vedlikehold", label: "Drift og vedlikehold" },
      { href: "/tjenester/kundeportal", label: "Kundeportal" },
    ],
  },
  { href: "/#prosess", label: "Slik jobber vi" },
  { href: "/referanser", label: "Kundecaser" },
  { href: "/om-oss", label: "Om oss" },
];

/** Sticky header: the booking button stays in reach on every scroll position; links fold into a menu below 820 px. */
export function HomeHeader() {
  return (
    <div className={`ka hdr ${schibsted.variable} ${michroma.variable} ${montserrat.variable}`}>
      <a href="#main-content" className="skip">
        Hopp til innholdet
      </a>
      <header className="top">
        <div className="wrap">
          <Link href="/" className="logo" aria-label="IDweb, til forsiden">
            {/* eslint-disable-next-line @next/next/no-img-element -- small brand mark, already optimised */}
            <img src="/images/idweb-mark-160.webp" alt="" width={53} height={42} />
            {/* the full lockup from IDweb's logo (idweb-logo-dark-1600): chrome «IDWEB» with the tagline on two lines beneath */}
            <span className="logo-word" aria-hidden="true">
              <svg className="logo-wm" viewBox="0 0 196 40" overflow="visible">
                <defs>
                  <linearGradient id="idweb-chrome" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#9AA1A9" />
                    <stop offset=".4" stopColor="#555C64" />
                    <stop offset=".58" stopColor="#22262C" />
                    <stop offset="1" stopColor="#5E656D" />
                  </linearGradient>
                </defs>
                <text x="98" y="33" textAnchor="middle" fill="url(#idweb-chrome)" stroke="url(#idweb-chrome)" strokeWidth="2.4" strokeLinejoin="round">
                  IDWEB
                </text>
              </svg>
              <small>
                Webbyrå og
                <br />
                systemutvikler
              </small>
            </span>
          </Link>
          <nav className="navlinks" aria-label="Hovedmeny">
            {LINKS.map((l) =>
              l.children ? (
                <div key={l.href} className="hasmenu">
                  <Link href={l.href}>{l.label}</Link>
                  <div className="dropdown">
                    {l.children.map((c) => (
                      <Link key={c.href} href={c.href}>
                        {c.label}
                      </Link>
                    ))}
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
    </div>
  );
}
