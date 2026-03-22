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
  TEAM_SECTION,
  APPROACH,
  ABOUT_CTA,
  TEAM_MEMBERS,
  MILESTONES,
} from "@/lib/content/about";
import { TRUST_SIGNALS } from "@/lib/content/homepage";

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
    <div>
      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {ABOUT_PAGE.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
            {ABOUT_PAGE.subheadline}
          </p>

          {/* Trust signals */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
            {TRUST_SIGNALS.map((signal) => (
              <div key={signal.label} className="text-center">
                <p className="font-serif text-3xl font-black text-[var(--color-accent)]">
                  {signal.decimals
                    ? signal.value.toFixed(signal.decimals)
                    : signal.value}
                  {signal.suffix}
                </p>
                <p className="text-sm text-[var(--color-text-muted)]">
                  {signal.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold">{STORY.heading}</h2>
          {STORY.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mt-6 leading-relaxed text-[var(--color-text-muted)]"
            >
              {paragraph}
            </p>
          ))}

          {/* Milestones timeline */}
          <div className="mt-12 flex flex-wrap items-center gap-4 sm:gap-6">
            {MILESTONES.map((m, i) => (
              <div key={m.year} className="flex items-center gap-2 sm:gap-3">
                <div className="text-center">
                  <span className="block font-serif text-2xl font-black text-[var(--color-accent)]">
                    {m.year}
                  </span>
                  <span className="text-xs text-[var(--color-text-muted)]">
                    {m.label}
                  </span>
                </div>
                {i < MILESTONES.length - 1 && (
                  <span
                    className="hidden text-lg text-[var(--color-border)] sm:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-[var(--color-bg-alt)] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-3xl font-bold">{VALUES.heading}</h2>
          <div className="mt-16 grid gap-8 sm:grid-cols-2">
            {VALUES.items.map((value) => {
              const Icon = VALUE_ICONS[value.icon];
              return (
                <div
                  key={value.title}
                  className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-8"
                >
                  {Icon && (
                    <Icon className="mb-4 h-8 w-8 text-[var(--color-accent)]" />
                  )}
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="mt-3 text-[var(--color-text-muted)]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold">{APPROACH.heading}</h2>
          {APPROACH.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mt-6 leading-relaxed text-[var(--color-text-muted)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-[var(--color-bg-alt)] px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">{TEAM_SECTION.heading}</h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            {TEAM_SECTION.description}
          </p>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TEAM_MEMBERS.map((member) => (
              <div
                key={member.name}
                className="flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-8 text-center"
              >
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--color-accent)] text-2xl font-bold text-[var(--color-dark-bg)]">
                  {member.initials}
                </div>
                <h3 className="mt-4 text-lg font-bold">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
                  {member.role}
                </p>
                <p className="mt-3 text-sm text-[var(--color-text-muted)]">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">{ABOUT_CTA.headline}</h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            {ABOUT_CTA.description}
          </p>
          <Link
            href="/kontakt"
            className="mt-8 inline-block rounded-lg bg-[var(--color-accent)] px-8 py-3 text-lg font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-accent-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
          >
            {ABOUT_CTA.buttonText}
          </Link>
        </div>
      </section>
    </div>
  );
}
