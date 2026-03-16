"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { LaptopFrame, PhoneFrame } from "@/components/ui/device-frame";
import { FEATURED_PORTFOLIO_IDS } from "@/lib/content/homepage";
import { getSiteById } from "@/lib/content/portfolio-sites";

export function PortfolioShowcase() {
  const featuredSites = FEATURED_PORTFOLIO_IDS.map(getSiteById).filter(Boolean);

  return (
    <section className="bg-[var(--color-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-center text-3xl font-bold text-[var(--color-text)] sm:text-4xl">
            Prosjekter jeg har levert
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-[var(--color-text-muted)]">
            Hver nettside er skreddersydd for kundens behov og bransje.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {featuredSites.map((site, index) => {
            if (!site) return null;
            return (
              <motion.div
                key={site.id}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="mb-4 flex items-end gap-3">
                  <LaptopFrame
                    imageSrc={site.images.desktop}
                    imageAlt={`${site.name} — desktop`}
                    className="w-[200px] flex-shrink-0"
                  />
                  <PhoneFrame
                    imageSrc={site.images.mobile}
                    imageAlt={`${site.name} — mobil`}
                    className="w-[60px] flex-shrink-0"
                  />
                </div>
                <h3 className="text-lg font-bold text-[var(--color-text)]">
                  {site.name}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                  {site.domain}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/referanser"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-accent-hover)] hover:underline"
          >
            Se alle referanser <MoveRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
