"use client";

import { FeatureSteps } from "@/components/ui/feature-section";

const serviceFeatures = [
  {
    step: "Nettsider",
    title: "Skreddersydd nettside",
    content:
      "Profesjonelle, raske nettsider som representerer merkevaren din og tiltrekker nye kunder.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80&fit=crop",
    href: "/tjenester/nettside",
  },
  {
    step: "Nettbutikk",
    title: "Nettbutikk",
    content:
      "Brukervennlige nettbutikker med sikker betaling, enkel administrasjon og høy konverteringsrate.",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&q=80&fit=crop",
    href: "/tjenester/nettbutikk",
  },
  {
    step: "SEO",
    title: "SEO-optimalisering",
    content:
      "Bli funnet av kundene dine når de søker på Google etter tjenestene du tilbyr.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop",
    href: "/tjenester/seo",
  },
  {
    step: "Markedsføring",
    title: "Digital markedsføring",
    content:
      "Målrettet annonsering på Google og sosiale medier som gir målbar avkastning.",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&q=80&fit=crop",
    href: "/tjenester/markedsforing",
  },
  {
    step: "Vedlikehold",
    title: "Drift og vedlikehold",
    content:
      "Løpende oppdateringer, sikkerhetskopier og support — nettsiden din er alltid trygg og oppdatert.",
    image: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=1200&q=80&fit=crop",
    href: "/tjenester/vedlikehold",
  },
  {
    step: "Design",
    title: "Grafisk design og merkevarebygging",
    content:
      "Visuell identitet, logodesign og grafisk materiell som skiller deg fra konkurrentene.",
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80&fit=crop",
    href: "/tjenester/design",
  },
];

export function ServiceFeatureSteps() {
  return (
    <section className="px-6 py-24">
      <p className="text-center text-xs font-medium uppercase tracking-wider text-[var(--color-text-muted)]">
        Våre tjenester
      </p>
      <FeatureSteps
        features={serviceFeatures}
        title="Tjenester som driver vekst"
        autoPlayInterval={4000}
        className="!pt-2"
      />
    </section>
  );
}
