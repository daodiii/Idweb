import Link from "next/link";
import type { Metadata } from "next";
import {
  PRICING_PAGE,
  PACKAGES,
  MAINTENANCE_PACKAGES,
  ADDON_SERVICES,
  PRICING_FAQ,
  PRICING_CTA,
} from "@/lib/content/pricing";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: "Priser — Nettsider, vedlikehold og SEO",
  description:
    "Se våre faste priser for nettsider, vedlikehold, SEO og tilleggstjenester. Ingen bindingstid, ingen skjulte kostnader. Fra kr 8 990. Få et skreddersydd tilbud.",
  keywords: [
    "nettside pris",
    "hva koster nettside",
    "webdesign pris",
    "seo pris",
    "nettside pris oslo",
    "vedlikehold pris",
    "billig nettside norge",
    "nettside kostnad",
    "pris hjemmeside bedrift",
    "webdesign pris norge",
  ],
  alternates: {
    canonical: "/priser",
  },
};

export default function PriserPage() {
  return (
    <div className="bg-[var(--color-dark-bg)]">
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Priser", href: "/priser" },
        ]}
      />
      <FaqJsonLd faqs={PRICING_FAQ} />
      {/* Hero */}
      <AuroraBackground variant="top-center" intensity={0.25}>
        <div className="px-6 py-28 text-center sm:py-36">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
              Priser
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-dark-text)] sm:text-5xl lg:text-6xl">
              {PRICING_PAGE.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-[var(--color-dark-muted)]">
              {PRICING_PAGE.subheadline}
            </p>
          </div>
        </div>
      </AuroraBackground>

      {/* Build Packages */}
      <AuroraBackground variant="center" intensity={0.15} showStarfield={false}>
        <div className="px-6 py-24 sm:py-28">
          <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-3 lg:gap-10">
            {PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className={`flex flex-col overflow-hidden rounded-3xl transition-all duration-300 ${
                  pkg.highlight
                    ? "border-2 border-[var(--color-accent)] bg-[var(--color-dark-bg-alt)] shadow-2xl shadow-[var(--color-accent)]/20 lg:-my-6"
                    : "border border-white/[0.06] bg-[var(--color-dark-glass)] backdrop-blur-sm hover:border-white/[0.12]"
                }`}
              >
                {pkg.highlight && (
                  <div className="bg-[var(--color-accent)] py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-dark-bg)]">
                    Mest populær
                  </div>
                )}
                <div className={pkg.highlight ? "p-8 lg:py-10" : "p-8"}>
                  <h2 className="text-2xl font-bold text-[var(--color-dark-text)]">
                    {pkg.name}
                  </h2>
                  <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
                    {pkg.subtitle}
                  </p>
                  <div className="mt-6">
                    <span className={`font-bold tabular-nums ${pkg.highlight ? "text-5xl text-[var(--color-accent)]" : "text-3xl text-[var(--color-dark-text)]"}`}>
                      {pkg.price}
                    </span>
                    <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
                      + {pkg.monthly} {pkg.monthlyNote}
                    </p>
                  </div>
                  <p className="mt-4 text-[var(--color-dark-muted)]">
                    {pkg.description}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-[var(--color-dark-text)]"
                      >
                        <span className="mt-0.5 text-[var(--color-accent)]">
                          &#10003;
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/kontakt"
                    className={`${RAINBOW_BUTTON_CLASSES} mt-8 block text-center font-semibold ${
                      pkg.highlight ? "px-6 py-4 text-base" : "px-6 py-3"
                    }`}
                  >
                    Få tilbud
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AuroraBackground>

      {/* Maintenance Packages */}
      <AuroraBackground variant="bottom-left" intensity={0.2}>
        <div className="px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
                Vedlikehold
              </p>
              <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-dark-text)] sm:text-5xl">
                Vedlikehold og drift
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg font-light text-[var(--color-dark-muted)]">
                Har du allerede en nettside? Vi holder den oppdatert, sikker og rask
                — så du kan fokusere på bedriften din.
              </p>
            </div>
            <div className="mt-14 grid items-start gap-8 lg:grid-cols-3 lg:gap-10">
              {MAINTENANCE_PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`flex flex-col overflow-hidden rounded-3xl transition-all duration-300 ${
                    pkg.highlight
                      ? "border-2 border-[var(--color-accent)] bg-[var(--color-dark-bg-alt)] shadow-2xl shadow-[var(--color-accent)]/20 lg:-my-6"
                      : "border border-white/[0.06] bg-[var(--color-dark-glass)] backdrop-blur-sm hover:border-white/[0.12]"
                  }`}
                >
                  {pkg.highlight && (
                    <div className="bg-[var(--color-accent)] py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-dark-bg)]">
                      Mest populær
                    </div>
                  )}
                  <div className={pkg.highlight ? "p-8 lg:py-10" : "p-8"}>
                    <h3 className="text-2xl font-bold text-[var(--color-dark-text)]">
                      {pkg.name}
                    </h3>
                    <div className="mt-4">
                      <span className={`font-bold tabular-nums ${pkg.highlight ? "text-5xl text-[var(--color-accent)]" : "text-3xl text-[var(--color-dark-text)]"}`}>
                        {pkg.price}
                      </span>
                    </div>
                    <p className="mt-4 text-[var(--color-dark-muted)]">
                      {pkg.description}
                    </p>
                    <ul className="mt-6 flex-1 space-y-3">
                      {pkg.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-sm text-[var(--color-dark-text)]"
                        >
                          <span className="mt-0.5 text-[var(--color-accent)]">
                            &#10003;
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Link
                      href="/kontakt"
                      className={`${RAINBOW_BUTTON_CLASSES} mt-8 block text-center font-semibold ${
                        pkg.highlight ? "px-6 py-4 text-base" : "px-6 py-3"
                      }`}
                    >
                      Kom i gang
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* Add-on Services */}
      <AuroraBackground variant="top-right" intensity={0.15} showStarfield={false}>
        <div className="px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
                Tillegg
              </p>
              <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-dark-text)] sm:text-5xl">
                Tilleggstjenester
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg font-light text-[var(--color-dark-muted)]">
                Utvid med tjenester som gir nettsiden din ekstra slagkraft.
              </p>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {ADDON_SERVICES.map((service) => (
                <div
                  key={service.name}
                  className="group rounded-2xl border border-white/[0.06] bg-[var(--color-dark-glass)] p-7 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)]/20 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
                >
                  <h3 className="font-bold text-[var(--color-dark-text)]">
                    {service.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-accent)]">
                    {service.price}
                  </p>
                  {"monthlyPrice" in service && service.monthlyPrice && (
                    <p className="mt-0.5 text-sm text-[var(--color-dark-muted)]">
                      eller {service.monthlyPrice}
                    </p>
                  )}
                  <p className="mt-3 text-sm text-[var(--color-dark-muted)]">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* Pricing FAQ */}
      <AuroraBackground variant="center" intensity={0.12} showStarfield={false}>
        <div className="px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
                FAQ
              </p>
              <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-dark-text)] sm:text-5xl">
                Spørsmål om priser
              </h2>
            </div>
            <div className="mt-12 space-y-6">
              {PRICING_FAQ.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-white/[0.06] bg-[var(--color-dark-glass)] p-6 backdrop-blur-sm"
                >
                  <h3 className="font-bold text-[var(--color-dark-text)]">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-[var(--color-dark-muted)]">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </AuroraBackground>

      {/* CTA */}
      <AuroraBackground variant="bottom-center" intensity={0.25}>
        <div className="px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-4xl font-extrabold tracking-tight text-[var(--color-dark-text)] sm:text-5xl">
              {PRICING_CTA.headline}
            </h2>
            <p className="mt-5 text-lg font-light text-[var(--color-dark-muted)]">
              {PRICING_CTA.description}
            </p>
            <Link
              href="/kontakt"
              className={`${RAINBOW_BUTTON_CLASSES} mt-8 px-8 py-3 text-lg font-semibold`}
            >
              {PRICING_CTA.buttonText}
            </Link>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}
