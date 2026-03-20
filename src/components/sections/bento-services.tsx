"use client";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {

    name: "Nettsider",
    description:
      "Profesjonelle, raske nettsider som representerer merkevaren din og tiltrekker nye kunder gjennom søkemotorer.",
    href: "/tjenester/nettside",
    cta: "Les mer",
    background: (
      <img
        width={800}
        height={450}
        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&auto=format"
        alt=""
        className="absolute -top-20 -right-20 w-[80%] opacity-20 transition-opacity duration-300 group-hover:opacity-30"
      />
    ),
    className:
      "lg:col-start-1 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {

    name: "SEO-optimalisering",
    description:
      "Bli funnet av kundene dine. Vi sørger for at bedriften din rangerer høyt i Google-søk.",
    href: "/tjenester/seo",
    cta: "Les mer",
    background: (
      <img
        width={800}
        height={450}
        src="https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=800&q=80&auto=format"
        alt=""
        className="absolute -top-20 -right-20 w-[70%] opacity-20 transition-opacity duration-300 group-hover:opacity-30"
      />
    ),
    className:
      "lg:col-start-3 lg:col-end-4 lg:row-start-1 lg:row-end-2",
  },
  {

    name: "Drift og vedlikehold",
    description:
      "Løpende oppdateringer, sikkerhetskopier og support slik at nettsiden alltid er trygg og oppdatert.",
    href: "/tjenester/vedlikehold",
    cta: "Les mer",
    background: (
      <img
        width={800}
        height={450}
        src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80&auto=format"
        alt=""
        className="absolute -top-20 -right-20 w-[70%] opacity-20 transition-opacity duration-300 group-hover:opacity-30"
      />
    ),
    className:
      "lg:col-start-1 lg:col-end-2 lg:row-start-2 lg:row-end-3",
  },
  {

    name: "Grafisk design",
    description:
      "Visuell identitet, logodesign og grafisk materiell som skiller deg fra konkurrentene.",
    href: "/tjenester/design",
    cta: "Les mer",
    background: (
      <img
        width={800}
        height={450}
        src="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&auto=format"
        alt=""
        className="absolute -top-20 -right-20 w-[80%] opacity-20 transition-opacity duration-300 group-hover:opacity-30"
      />
    ),
    className:
      "lg:col-start-2 lg:col-end-4 lg:row-start-2 lg:row-end-3",
  },
];

export function BentoServices() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-3xl font-bold text-pretty sm:text-4xl">
          Alt du trenger for å lykkes på nett
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-muted)]">
          Vi tilbyr helhetlige digitale tjenester — fra design og utvikling til
          SEO og løpende vedlikehold.
        </p>
        <div className="mt-16">
          <BentoGrid className="lg:grid-rows-2">
            {features.map((feature, index) => (
              <BentoCard key={feature.name} {...feature} index={index} />
            ))}
          </BentoGrid>
        </div>
      </div>
    </section>
  );
}
