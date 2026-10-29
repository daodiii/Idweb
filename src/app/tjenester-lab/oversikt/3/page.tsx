import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { BookButton, ServiceShell } from "@/components/tjenester/service-parts";
import { NeedPicker } from "@/components/tjenester-lab/need-picker";
import { HEAD, SECTION } from "@/components/tjenester-lab/oversikt-content";

export const metadata: Metadata = { title: "Tjenester, mockup 3: Hva trenger dere", robots: { index: false, follow: false } };

/** Mockup 3 «Hva trenger dere»: a wide headline, then tick what fits and the matching services light up. */
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

      <section className="ovm3-pick" aria-labelledby="ov-h">
        <div className="wrap">
          <div className="sp-sh">
            <h2 id="ov-h">
              Sju tjenester, én <Marker>leverandør</Marker>.
            </h2>
            <p>{SECTION.lede}</p>
          </div>
          <NeedPicker />
        </div>
      </section>

      <QuoteSection />
    </ServiceShell>
  );
}
