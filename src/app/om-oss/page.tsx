import Link from "next/link";
import type { Metadata } from "next";
import {
  TrendingUp,
  MessageSquare,
  Handshake,
  Star,
} from "lucide-react";
import { SEO } from "@/lib/content/seo";
import {
  ABOUT_PAGE,
  STORY,
  VALUES,
  APPROACH,
  ABOUT_CTA,
} from "@/lib/content/about";
import { TRUST_SIGNALS } from "@/lib/content/homepage";
import { PaletteBackground } from "@/components/ui/palette-background";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: SEO.about.title,
  description: SEO.about.description,
  keywords: SEO.about.keywords,
  alternates: {
    canonical: "/om-oss",
  },
};

const VALUE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  TrendingUp,
  MessageSquare,
  Handshake,
  Star,
};

export default function OmOssPage() {
  return (
    <div className="bg-[var(--color-dark-bg)]">
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Om oss", href: "/om-oss" },
        ]}
      />
      {/* Hero */}
      <PaletteBackground palette="horisonten">
        <div className="px-6 py-28 text-center sm:py-36">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
              Om oss
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-dark-text)] sm:text-5xl lg:text-6xl">
              {ABOUT_PAGE.headline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-[var(--color-dark-muted)]">
              {ABOUT_PAGE.subheadline}
            </p>

            {/* Trust signals */}
            <div className="mx-auto mt-14 grid max-w-3xl grid-cols-2 gap-6 sm:grid-cols-4">
              {TRUST_SIGNALS.map((signal) => (
                <div
                  key={signal.label}
                  className="rounded-2xl border border-white/[0.06] bg-[var(--color-dark-glass)] p-5 backdrop-blur-sm"
                >
                  <p className="font-serif text-3xl font-black text-[var(--color-accent)]">
                    {signal.decimals
                      ? signal.value.toFixed(signal.decimals)
                      : signal.value}
                    {signal.suffix}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-dark-muted)]">
                    {signal.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </PaletteBackground>

      {/* Story */}
      <PaletteBackground palette="horisonten" intensity={0.5}>
        <div className="px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
              Vår historie
            </p>
            <h2 className="text-3xl font-bold text-[var(--color-dark-text)]">
              {STORY.heading}
            </h2>
            {STORY.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mt-6 leading-relaxed text-[var(--color-dark-muted)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </PaletteBackground>

      {/* Values */}
      <PaletteBackground palette="horisonten" intensity={0.7}>
        <div className="px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
                Våre verdier
              </p>
              <h2 className="text-3xl font-bold text-[var(--color-dark-text)] sm:text-4xl">
                {VALUES.heading}
              </h2>
            </div>
            <div className="mt-16 grid gap-6 sm:grid-cols-2">
              {VALUES.items.map((value) => {
                const Icon = VALUE_ICONS[value.icon];
                return (
                  <div
                    key={value.title}
                    className="group rounded-2xl border border-white/[0.06] bg-[var(--color-dark-glass)] p-8 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)]/20 hover:shadow-lg hover:shadow-[var(--color-accent)]/5"
                  >
                    {Icon && (
                      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)]/10">
                        <Icon className="h-6 w-6 text-[var(--color-accent)]" />
                      </div>
                    )}
                    <h3 className="text-xl font-bold text-[var(--color-dark-text)]">
                      {value.title}
                    </h3>
                    <p className="mt-3 leading-relaxed text-[var(--color-dark-muted)]">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </PaletteBackground>

      {/* Approach */}
      <PaletteBackground palette="horisonten" intensity={0.4} fromDeg={180}>
        <div className="px-6 py-24 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
              Vår tilnærming
            </p>
            <h2 className="text-3xl font-bold text-[var(--color-dark-text)]">
              {APPROACH.heading}
            </h2>
            {APPROACH.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="mt-6 leading-relaxed text-[var(--color-dark-muted)]"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </PaletteBackground>

      {/* CTA */}
      <PaletteBackground palette="horisonten" intensity={0.9} fromDeg={270}>
        <div className="px-6 py-24 sm:py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-[var(--color-dark-text)] sm:text-4xl">
              {ABOUT_CTA.headline}
            </h2>
            <p className="mt-5 text-lg font-light text-[var(--color-dark-muted)]">
              {ABOUT_CTA.description}
            </p>
            <Link
              href="/kontakt"
              className={`${RAINBOW_BUTTON_CLASSES} mt-8 px-8 py-3 text-lg font-semibold`}
            >
              {ABOUT_CTA.buttonText}
            </Link>
          </div>
        </div>
      </PaletteBackground>
    </div>
  );
}
