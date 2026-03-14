import Link from "next/link";
import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { SERVICES_PAGE, SERVICES, SERVICES_CTA } from "@/lib/content/services";

export const metadata: Metadata = {
  title: SEO.services.title,
  description: SEO.services.description,
  keywords: SEO.services.keywords,
};

export default function TjenesterPage() {
  return (
    <main>
      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {SERVICES_PAGE.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
            {SERVICES_PAGE.subheadline}
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl space-y-20">
          {SERVICES.map((service, index) => (
            <div
              key={service.id}
              id={service.id}
              className={`flex flex-col gap-12 lg:flex-row ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <h2 className="text-3xl font-bold">{service.title}</h2>
                <p className="mt-2 text-[var(--color-text-muted)]">
                  {service.shortDescription}
                </p>
                <p className="mt-6">{service.longDescription}</p>
                <Link
                  href={`/tjenester/${service.id}`}
                  className="mt-6 inline-flex items-center gap-2 font-semibold text-[var(--color-accent)] transition-colors hover:text-[var(--color-accent-hover)]"
                >
                  Les mer →
                </Link>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">Dette inkluderer:</h3>
                <ul className="mt-4 space-y-3">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-[var(--color-text-muted)]"
                    >
                      <span className="mt-1 text-[var(--color-accent)]">
                        &#10003;
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-bg-alt)] px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">{SERVICES_CTA.headline}</h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            {SERVICES_CTA.description}
          </p>
          <Link
            href="/kontakt"
            className="mt-8 inline-block rounded-lg bg-[var(--color-accent)] px-8 py-3 text-lg font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            {SERVICES_CTA.buttonText}
          </Link>
        </div>
      </section>
    </main>
  );
}
