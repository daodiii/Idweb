import Link from "next/link";
import type { Metadata } from "next";
import {
  PORTFOLIO_PAGE,
  PROJECTS,
  PORTFOLIO_CTA,
  CLIENT_LOGOS_SECTION,
} from "@/lib/content/portfolio";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";
import { getSiteById } from "@/lib/content/portfolio-sites";
import { ProjectCollage } from "@/components/ui/project-collage";
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
      {/* Hero — aurora top-center with starfield */}
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

      {/* Projects — aurora center with starfield */}
      <AuroraBackground variant="center" intensity={0.10} className="px-6 pb-24 pt-8">
        <div className="mx-auto max-w-6xl space-y-20">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col gap-10 lg:flex-row lg:items-center ${
                index % 2 !== 0 ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Project image — collage or placeholder */}
              <div className="flex-1">
                {(() => {
                  const site = getSiteById(project.id as PortfolioSiteId);
                  if (site?.images.collage?.length) {
                    return (
                      <ProjectCollage
                        images={site.images.collage}
                        projectName={site.name}
                        backgroundImage={site.images.collageBackground}
                      />
                    );
                  }
                  return (
                    <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06] p-12 shadow-lg shadow-black/20 backdrop-blur-md">
                      <div className="text-center">
                        <p className="text-sm font-medium uppercase tracking-wider text-[var(--color-dark-muted)]">
                          {project.industry}
                        </p>
                        <p className="mt-2 text-2xl font-bold">{project.client}</p>
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* Project Details — enhanced glassmorphism card */}
              <div className="flex-1 rounded-2xl border border-white/10 bg-white/[0.06] p-8 shadow-xl shadow-black/25 backdrop-blur-md transition-all duration-300 hover:border-[var(--color-accent)]/20 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-[var(--color-accent)]/10">
                <p className="text-sm font-medium uppercase tracking-wider text-[var(--color-accent)]">
                  {project.industry}
                </p>
                <h2 className="mt-2 text-2xl font-bold">{project.title}</h2>
                <p className="mt-1 text-[var(--color-dark-muted)]">
                  {project.client}
                </p>
                <p className="mt-4 leading-relaxed text-[var(--color-dark-muted)]">
                  {project.description}
                </p>

                {/* Services Used */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text)]">
                    Tjenester
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
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

                {/* Results */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text)]">
                    Resultater
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {project.results.map((result) => (
                      <li
                        key={result}
                        className="flex items-center gap-2 text-[var(--color-dark-muted)]"
                      >
                        <span className="text-[var(--color-accent)]">
                          &#10003;
                        </span>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </AuroraBackground>

      {/* Social Proof — aurora bottom-left */}
      <AuroraBackground variant="bottom-left" intensity={0.08} className="border-y border-white/[0.06] px-6 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl font-bold">{CLIENT_LOGOS_SECTION.heading}</h2>
          <p className="mt-4 text-[var(--color-dark-muted)]">
            {CLIENT_LOGOS_SECTION.description}
          </p>
        </div>
      </AuroraBackground>

      {/* CTA — aurora bottom-center */}
      <AuroraBackground variant="bottom-center" intensity={0.12} className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">{PORTFOLIO_CTA.headline}</h2>
          <p className="mt-4 text-lg text-[var(--color-dark-muted)]">
            {PORTFOLIO_CTA.description}
          </p>
          <Link
            href="/kontakt"
            className={`${RAINBOW_BUTTON_CLASSES} mt-8 px-8 py-3 text-lg font-semibold`}
          >
            {PORTFOLIO_CTA.buttonText}
          </Link>
        </div>
      </AuroraBackground>
    </div>
  );
}
