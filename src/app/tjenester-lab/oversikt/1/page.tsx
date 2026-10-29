import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { BookButton, ServiceShell } from "@/components/tjenester/service-parts";
import { ServiceCard } from "@/components/tjenester-lab/service-card";
import { HEAD, SECTION, SERVICES } from "@/components/tjenester-lab/oversikt-content";

export const metadata: Metadata = { title: "Tjenester, mockup 1: Sju kort", robots: { index: false, follow: false } };

/** Mockup 1 «Sju kort»: a wide headline, then the seven services as cards in a grid, each with its own picture. */
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
        </div>
      </section>

      <section className="sp-sec" aria-labelledby="ov-h">
        <div className="wrap">
          <div className="sp-sh">
            <h2 id="ov-h">
              Sju tjenester, én <Marker>leverandør</Marker>.
            </h2>
            <p>{SECTION.lede}</p>
          </div>
          <div className="ov-bento ovm1-grid">
            {SERVICES.map((s) => (
              <ServiceCard key={s.slug} s={s} />
            ))}
          </div>
        </div>
      </section>

      <QuoteSection />
    </ServiceShell>
  );
}
