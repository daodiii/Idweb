import { MapPin } from "lucide-react";
import { CountUpStat } from "@/components/ui/count-up-stat";
import { Reveal } from "@/components/ui/reveal";
import { ABOUT_PAGE } from "@/lib/content/about";
import { TRUST_LOCATION, TRUST_SIGNALS } from "@/lib/content/homepage";

export function AboutHero() {
  const words = ABOUT_PAGE.headline.split(" ");
  const lead = words.slice(0, -3).join(" ");
  const marked = words.slice(-3).join(" ");

  return (
    <section className="light-section-warm relative overflow-hidden px-6 pb-24 pt-40 sm:pb-32 sm:pt-48">
      {/* Dot grid, faded out towards the edges */}
      <div
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_50%_30%,black,transparent_70%)]"
        aria-hidden="true"
        style={{
          backgroundImage: "radial-gradient(var(--dot-color) 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div
        className="pointer-events-none absolute left-1/2 top-24 h-72 w-[42rem] -translate-x-1/2 rounded-full bg-[var(--color-accent)]/15 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl text-center">
        <Reveal>
          <p className="inline-flex items-center gap-2 rounded-full border border-[var(--color-border)] bg-white/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-text-muted)] backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" aria-hidden="true" />
            Om IDweb
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <h1 className="mt-8 text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            {lead}{" "}
            <span className="bg-[linear-gradient(transparent_62%,rgba(244,206,20,0.55)_62%)] [box-decoration-break:clone]">
              {marked}
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-[var(--color-text-muted)] sm:text-xl">
            {ABOUT_PAGE.subheadline}
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <dl className="mx-auto mt-14 grid max-w-3xl gap-4 sm:grid-cols-3">
            {TRUST_SIGNALS.map((signal) => (
              <div
                key={signal.label}
                className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-white px-6 py-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_12px_32px_-16px_rgba(15,23,42,0.12)]"
              >
                <div className="absolute inset-x-0 top-0 h-1 bg-[var(--color-accent)]" aria-hidden="true" />
                <dt className="order-2 mt-1 text-sm text-[var(--color-text-muted)]">{signal.label}</dt>
                <dd className="font-serif text-4xl font-black tracking-tight sm:text-5xl">
                  <CountUpStat value={signal.value} suffix={signal.suffix} decimals={signal.decimals} />
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 inline-flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            {TRUST_LOCATION}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
