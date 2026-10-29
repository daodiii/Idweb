import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { RevealOnView } from "@/components/tjenester/reveal-on-view";
import { BookButton, ServiceShell } from "@/components/tjenester/service-parts";
import { ServiceRow } from "@/components/tjenester-lab/service-card";
import { HEAD, PHASES, SECTION, SERVICES } from "@/components/tjenester-lab/oversikt-content";

export const metadata: Metadata = { title: "Tjenester, mockup 2: Tre faser", robots: { index: false, follow: false } };

/** Mockup 2 «Tre faser»: the lede's own order (the site, the systems behind it, the running afterwards) as a map on the orange stroke, then each phase with its services. */
export default function Page() {
  return (
    <ServiceShell>
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap">
          <nav className="crumbs sp-crumbs" aria-label="Brødsmuler">
            <ol>
              <li aria-current="page">Tjenester</li>
            </ol>
          </nav>
          <div className="ovm1-head">
            <h1 id="sp-h1">
              Alt bedriften trenger på nett, fra <Marker>én</Marker> leverandør.
            </h1>
            <div>
              <p className="sp-lede">{HEAD.lede}</p>
              <div className="sp-acts">
                <BookButton>Få et uforpliktende tilbud</BookButton>
              </div>
            </div>
          </div>
          <RevealOnView className="sps-track ovm2-map">
            <svg className="sps-line" viewBox="0 0 1200 24" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M2 13C90 6 170 18 300 11S470 4 600 12s250 8 380 2 190 4 218-2" />
            </svg>
            <ol className="sps-list">
              {PHASES.map((p, i) => (
                <li key={p.n} style={{ "--i": i } as CSSProperties}>
                  <span className="sps-node">{p.n}</span>
                  <h3>{p.title}</h3>
                  <p>{p.lede}</p>
                  <ul className="ovm2-links">
                    {p.slugs.map((slug) => {
                      const s = SERVICES.find((x) => x.slug === slug)!;
                      return (
                        <li key={slug}>
                          <Link href={s.href}>{s.name}</Link>
                        </li>
                      );
                    })}
                  </ul>
                </li>
              ))}
            </ol>
          </RevealOnView>
        </div>
      </section>

      <section className="sp-sec sp-line" aria-labelledby="ov-h">
        <div className="wrap">
          <div className="sp-sh">
            <h2 id="ov-h">
              Sju tjenester, én <Marker>leverandør</Marker>.
            </h2>
            <p>{SECTION.lede}</p>
          </div>
          <div className="ovm2-phases">
            {PHASES.map((p) => (
              <div key={p.n} className="ovm2-phase">
                <div className="ovm2-phase-head">
                  <span aria-hidden="true">{p.n}</span>
                  <h3>{p.title}</h3>
                  <p>{p.lede}</p>
                </div>
                <div className="ovm2-rows">
                  {p.slugs.map((slug) => (
                    <ServiceRow key={slug} s={SERVICES.find((x) => x.slug === slug)!} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <QuoteSection />
    </ServiceShell>
  );
}
