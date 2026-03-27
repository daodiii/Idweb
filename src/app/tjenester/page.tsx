import Link from "next/link";
import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { ArrowRight } from "lucide-react";
import { PaletteBackground } from "@/components/ui/palette-background";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: SEO.services.title,
  description: SEO.services.description,
  keywords: SEO.services.keywords,
  alternates: {
    canonical: "/tjenester",
  },
};

const SERVICES = [
  {
    slug: "nettside",
    title: "Skreddersydd nettside",
    description:
      "Profesjonell, mobiloptimalisert nettside designet for å tiltrekke kunder og styrke merkevaren din.",
    features: ["Responsivt design", "SEO-optimalisert", "Rask lastetid", "SSL-sertifikat"],
  },
  {
    slug: "seo",
    title: "SEO-optimalisering",
    description:
      "Bli synlig i Google og tiltrekk flere kunder med profesjonell søkemotoroptimalisering.",
    features: ["Teknisk SEO", "Innholdsoptimalisering", "Lokal SEO", "Månedlig rapportering"],
  },
  {
    slug: "vedlikehold",
    title: "Drift og vedlikehold",
    description:
      "Hold nettsiden din trygg, rask og oppdatert med pålitelig norsk hosting og support.",
    features: ["Sikkerhetskopier", "Oppdateringer", "Norsk hosting", "Prioritert support"],
  },
];

export default function TjenesterPage() {
  return (
    <PaletteBackground palette="stille-spenning" as="div" speed={120} intensity={0.6}>
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Tjenester", href: "/tjenester" },
        ]}
      />

      {/* Hero */}
      <section className="px-6 py-28 text-center sm:py-36">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-[var(--color-accent)]">
            Tjenester
          </p>
          <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--color-dark-text)] sm:text-4xl lg:text-5xl">
            Alt du trenger for å lykkes på nett
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light text-[var(--color-dark-muted)] sm:text-lg">
            Fra design og utvikling til SEO og vedlikehold — vi tar oss av hele
            prosessen slik at du kan fokusere på det du gjør best.
          </p>
        </div>
      </section>

      {/* Services grid */}
      <section className="px-6 py-16 sm:py-24">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/tjenester/${service.slug}`}
              className="group rounded-2xl border border-white/[0.06] bg-[var(--color-dark-glass)] p-8 backdrop-blur-sm transition-all hover:border-[var(--color-accent)]/30 hover:bg-white/[0.06]"
            >
              <h2 className="text-xl font-bold tracking-[-0.01em] text-[var(--color-dark-text)] group-hover:text-[var(--color-accent)] transition-colors">
                {service.title}
              </h2>
              <p className="mt-3 text-sm font-light leading-relaxed text-[var(--color-dark-muted)]">
                {service.description}
              </p>
              <ul className="mt-6 space-y-2">
                {service.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center gap-2 text-sm text-[var(--color-dark-muted)]"
                  >
                    <span className="text-[var(--color-accent)]">&bull;</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-[var(--color-accent)]">
                Les mer
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24 text-center">
        <p className="text-base font-light text-[var(--color-dark-muted)] sm:text-lg">
          Usikker på hva du trenger?
        </p>
        <Link
          href="/kontakt"
          className={`${RAINBOW_BUTTON_CLASSES} mt-6 inline-flex gap-2 px-8 py-3 text-base font-semibold`}
        >
          Få et uforpliktende tilbud
        </Link>
      </section>
    </PaletteBackground>
  );
}
