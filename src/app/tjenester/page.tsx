import type { Metadata } from "next";
import { Marker } from "@/components/home/marker";
import { QuoteSection } from "@/components/home/quote-section";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { NeedPicker } from "@/components/tjenester/need-picker";
import { HEAD, SECTION } from "@/components/tjenester/oversikt-content";
import { BookButton, ServiceShell } from "@/components/tjenester/service-parts";
import { SEO } from "@/lib/content/seo";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({ title: SEO.services.title, description: SEO.services.description, path: "/tjenester" });

const CRUMBS = [
  { name: "Hjem", href: "/" },
  { name: "Tjenester", href: "/tjenester" },
];

/**
 * The overview of the seven services, in the calm system. Tick what fits and the matching services light up while the rest step back;
 * each service is shown by a crop of its own page's picture. Ends on the homepage's quote request.
 */
export default function TjenesterPage() {
  return (
    <ServiceShell>
      <BreadcrumbJsonLd items={CRUMBS} />
      <section className="sp-hero" aria-labelledby="sp-h1">
        <div className="wrap">
          <nav className="crumbs sp-crumbs" aria-label="Brødsmuler">
            <ol>
              <li aria-current="page">Tjenester</li>
            </ol>
          </nav>
          <div className="ovp-head">
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

      <section className="ovp-pick" aria-labelledby="ov-h">
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
