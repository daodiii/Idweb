import Link from "next/link";
import type { Metadata } from "next";
import {
  PORTFOLIO_PAGE,
  PROJECTS,
  PORTFOLIO_CTA,
} from "@/lib/content/portfolio";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";
import Image from "next/image";
import { getSiteById } from "@/lib/content/portfolio-sites";
import { AuroraBackground } from "@/components/ui/aurora-background";
import type { PortfolioSiteId } from "@/types";

export const metadata: Metadata = {
  title: "Referanser — Se nettsidene vi har levert | IDweb",
  description:
    "Se utvalgte prosjekter vi har levert til norske bedrifter. Skreddersydde nettsider, nettbutikker og digitale løsninger med målbare resultater.",
  keywords: [
    "webdesign referanser",
    "nettside portefølje",
    "webdesign eksempler",
    "nettside prosjekter oslo",
  ],
  alternates: {
    canonical: "/referanser",
  },
};

export default function ReferanserPage() {
  return (
    <div className="text-[var(--color-dark-text)]">
      {/* Hero */}
      <AuroraBackground variant="top-center" intensity={0.12} className="px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {PORTFOLIO_PAGE.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-dark-muted)]">
            {PORTFOLIO_PAGE.subheadline}
          </p>
        </div>
      </AuroraBackground>

      {/* Projects */}
      {PROJECTS.map((project, index) => {
        const variants: Array<"top-left" | "top-right" | "bottom-left" | "bottom-right"> = [
          "top-right", "bottom-left", "top-left", "bottom-right",
        ];
        const site = getSiteById(project.id as PortfolioSiteId);
        const showcaseImages = site?.images.showcase ?? [];
        const heroImage = site?.images.heroImage ?? site?.images.full;

        return (
          <AuroraBackground
            key={project.id}
            variant={variants[index % variants.length]}
            intensity={0.16}
            showStarfield={index === 0}
            className={`px-6 ${index === 0 ? "pt-8 pb-10" : index === PROJECTS.length - 1 ? "pt-10 pb-24" : "py-10"}`}
          >
            <div className="mx-auto max-w-6xl">
              {/* Project header — industry tag + title */}
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-wider text-[var(--color-accent)]">
                  {project.industry}
                </p>
                <h2 className="mt-2 text-3xl font-bold sm:text-4xl">{project.title}</h2>
                <p className="mt-1 text-lg text-[var(--color-dark-muted)]">
                  {project.client}
                </p>
              </div>

              {/* Large hero screenshot — full width */}
              {heroImage && (
                <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl shadow-black/40">
                  <Image
                    src={heroImage}
                    alt={`Fullside skjermbilde av ${site?.name ?? project.client}`}
                    width={1440}
                    height={900}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 768px) 100vw, 1152px"
                    priority={index === 0}
                  />
                </div>
              )}

              {/* Supporting screenshots — horizontal scroll on mobile, adaptive grid on desktop */}
              {showcaseImages.length > 0 && (
                <div className={`mt-6 flex gap-4 overflow-x-auto pb-2 sm:grid sm:overflow-visible sm:pb-0 ${
                  showcaseImages.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"
                }`}>
                  {showcaseImages.map((src, i) => (
                    <div
                      key={src}
                      className="min-w-[70%] flex-shrink-0 overflow-hidden rounded-xl border border-white/10 shadow-lg shadow-black/25 sm:min-w-0"
                    >
                      <Image
                        src={src}
                        alt={`${site?.name ?? project.client} — skjermbilde ${i + 1}`}
                        width={960}
                        height={600}
                        className="h-auto w-full object-cover"
                        sizes={showcaseImages.length === 4 ? "(max-width: 640px) 70vw, 25vw" : "(max-width: 640px) 70vw, 33vw"}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* Project details — description + wide Tjenester/Resultater box */}
              <div className="mt-6">
                <p className="text-lg leading-relaxed text-[var(--color-dark-muted)]">
                  {project.description}
                </p>

                {/* Wide glass box — Tjenester left, Resultater right */}
                <div className="mt-5 grid gap-6 rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-xl shadow-black/25 backdrop-blur-md sm:grid-cols-2">
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text)]">
                      Tjenester
                    </h3>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {project.services.map((service) => (
                        <span
                          key={service}
                          className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1 text-sm text-[var(--color-dark-muted)] backdrop-blur-sm"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text)]">
                      Resultater
                    </h3>
                    <ul className="mt-3 space-y-2">
                      {project.results.map((result) => (
                        <li
                          key={result}
                          className="flex items-start gap-2 text-sm text-[var(--color-dark-muted)]"
                        >
                          <span className="mt-0.5 text-[var(--color-accent)]">&#10003;</span>
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Divider between projects */}
              {index < PROJECTS.length - 1 && (
                <div className="mt-10 border-t border-white/[0.06]" />
              )}
            </div>
          </AuroraBackground>
        );
      })}

      {/* CTA */}
      <AuroraBackground variant="bottom-center" intensity={0.12} className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">{PORTFOLIO_CTA.headline}</h2>
          <p className="mt-4 text-lg text-[var(--color-dark-muted)]">
            {PORTFOLIO_CTA.description}
          </p>
          <Link
            href="/kontakt"
            className={`${RAINBOW_BUTTON_CLASSES} mt-8 px-8 py-3 text-lg font-semibold text-black`}
          >
            {PORTFOLIO_CTA.buttonText}
          </Link>
        </div>
      </AuroraBackground>
    </div>
  );
}
