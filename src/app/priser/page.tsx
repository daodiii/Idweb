import Link from "next/link";
import type { Metadata } from "next";
import {
  PRICING_PAGE,
  PACKAGES,
  NETTBUTIKK_PACKAGE,
  ADDON_SERVICES,
  PRICING_FAQ,
  PRICING_CTA,
} from "@/lib/content/pricing";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

export const metadata: Metadata = {
  title: "Priser — Hva koster nettside, nettbutikk og SEO? | IDweb",
  description:
    "Se våre priser for nettsider, nettbutikker, SEO og digital markedsføring. Ingen skjulte kostnader, ingen bindingstid. Få et skreddersydd tilbud.",
};

export default function PriserPage() {
  return (
    <main>
      {/* Hero */}
      <section className="light-section-warm px-6 py-28 text-center sm:py-36">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            {PRICING_PAGE.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-[var(--color-text-muted)]">
            {PRICING_PAGE.subheadline}
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="px-6 pb-28">
        <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-3 lg:gap-10">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              className={`flex flex-col overflow-hidden rounded-3xl ${
                pkg.highlight
                  ? "border-2 border-[var(--color-accent)] bg-[var(--color-dark-bg)] shadow-2xl shadow-[var(--color-accent)]/20 lg:-my-6"
                  : "bg-white shadow-lg shadow-black/[0.05]"
              }`}
            >
              {pkg.highlight && (
                <div className="bg-[var(--color-accent)] py-2.5 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-dark-bg)]">
                  Mest populær
                </div>
              )}
              <div className={pkg.highlight ? "p-8 lg:py-10" : "p-8"}>
                <h2 className={`text-2xl font-bold ${pkg.highlight ? "text-[var(--color-dark-text)]" : ""}`}>
                  {pkg.name}
                </h2>
                <p className={`mt-1 text-sm ${pkg.highlight ? "text-[var(--color-dark-muted)]" : "text-[var(--color-text-muted)]"}`}>
                  {pkg.subtitle}
                </p>
                <div className="mt-6">
                  <span className={`font-bold tabular-nums ${pkg.highlight ? "text-5xl text-[var(--color-accent)]" : "text-3xl"}`}>
                    {pkg.price}
                  </span>
                  <p className={`mt-1 text-sm ${pkg.highlight ? "text-[var(--color-dark-muted)]" : "text-[var(--color-text-muted)]"}`}>
                    + {pkg.monthly} {pkg.monthlyNote}
                  </p>
                </div>
                <p className={`mt-4 ${pkg.highlight ? "text-[var(--color-dark-muted)]" : "text-[var(--color-text-muted)]"}`}>
                  {pkg.description}
                </p>
                <ul className="mt-6 flex-1 space-y-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2 text-sm ${pkg.highlight ? "text-[var(--color-dark-text)]" : "text-[var(--color-text-muted)]"}`}
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
      </section>

      {/* Nettbutikk Package */}
      <section className="bg-[var(--color-bg-alt)] px-6 py-28 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-10 lg:flex-row">
            <div className="flex-1">
              <h2 className="text-3xl font-bold">
                {NETTBUTIKK_PACKAGE.name}
              </h2>
              <p className="mt-1 text-[var(--color-text-muted)]">
                {NETTBUTIKK_PACKAGE.subtitle}
              </p>
              <div className="mt-6">
                <span className="text-3xl font-bold">
                  {NETTBUTIKK_PACKAGE.price}
                </span>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  + {NETTBUTIKK_PACKAGE.monthly}{" "}
                  {NETTBUTIKK_PACKAGE.monthlyNote}
                </p>
              </div>
              <p className="mt-4 text-[var(--color-text-muted)]">
                {NETTBUTIKK_PACKAGE.description}
              </p>
              <Link
                href="/kontakt"
                className={`${RAINBOW_BUTTON_CLASSES} mt-8 px-8 py-3 font-semibold`}
              >
                Få tilbud på nettbutikk
              </Link>
            </div>
            <div className="flex-1">
              <ul className="space-y-3">
                {NETTBUTIKK_PACKAGE.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-[var(--color-text-muted)]"
                  >
                    <span className="mt-0.5 text-[var(--color-accent)]">
                      &#10003;
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Add-on Services */}
      <section className="light-section-warm-alt px-6 py-28 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            Tilleggstjenester
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-lg font-light text-[var(--color-text-muted)]">
            Utvid med tjenester som gir nettsiden din ekstra slagkraft.
          </p>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ADDON_SERVICES.map((service) => (
              <div
                key={service.name}
                className="rounded-2xl bg-white p-7 shadow-md shadow-black/[0.04]"
              >
                <h3 className="font-bold">{service.name}</h3>
                <p className="mt-1 text-sm font-semibold text-[var(--color-accent)]">
                  {service.price}
                </p>
                <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing FAQ */}
      <section className="bg-[var(--color-bg-alt)] px-6 py-28 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl">
            Spørsmål om priser
          </h2>
          <div className="mt-12 space-y-8">
            {PRICING_FAQ.map((faq, index) => (
              <div
                key={index}
                className="border-b border-[var(--color-border)] pb-6"
              >
                <h3 className="font-bold">{faq.question}</h3>
                <p className="mt-2 text-[var(--color-text-muted)]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="light-section-warm px-6 py-28 sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{PRICING_CTA.headline}</h2>
          <p className="mt-5 text-lg font-light text-[var(--color-text-muted)]">
            {PRICING_CTA.description}
          </p>
          <Link
            href="/kontakt"
            className={`${RAINBOW_BUTTON_CLASSES} mt-8 px-8 py-3 text-lg font-semibold`}
          >
            {PRICING_CTA.buttonText}
          </Link>
        </div>
      </section>
    </main>
  );
}
