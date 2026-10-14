import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface PriceGuideRow {
  label: string;
  detail: string;
  range: string;
}

interface PriceGuideProps {
  /** Place name in the heading ("Hva koster et webbyrå i {place}?"). */
  place: string;
  rows: readonly PriceGuideRow[];
  footnote: string;
  guideHref: string;
  accent: string;
}

/**
 * Market price ranges as a spec sheet. Server Component, no entrance
 * animation. The footnote is not optional copy: it is what keeps these
 * figures from reading as IDweb's own prices.
 */
export function PriceGuide({ place, rows, footnote, guideHref, accent }: PriceGuideProps) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse 50% 45% at 90% 85%, color-mix(in srgb, ${accent} 9%, transparent), transparent 60%)` }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <h2 className="font-[family-name:var(--font-heading)] text-white">
            <span className="block text-[clamp(1.9rem,4vw,3.2rem)] font-extralight leading-[1.08] tracking-[-0.01em] text-white/85">
              Hva koster et webbyrå
            </span>{" "}
            <span className="block text-[clamp(2.5rem,7vw,5rem)] font-black leading-[0.95] tracking-[-0.035em]">
              i{" "}
              <span className="relative inline-block">
                {place}
                <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full" style={{ background: accent }} />
              </span>
              ?
            </span>
          </h2>

          <p className="mt-8 max-w-[52ch] text-base leading-relaxed text-white/70 sm:text-lg">
            Prisen styres av antall sider, hvor mye av designet som lages fra
            bunnen av, og funksjoner som booking, nettbutikk eller koblinger mot
            andre systemer. Hos oss får du en fast pris etter en gratis samtale,
            før noe arbeid starter.
          </p>

          <Link
            href={guideHref}
            className="mt-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-white/70 transition-colors duration-150 hover:text-white"
          >
            Les hele prisguiden
            <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-white/[0.08] bg-[rgba(20,20,22,0.72)] p-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: accent }}>
              Typiske markedspriser
            </p>
            <dl className="mt-6 divide-y divide-white/[0.07]">
              {rows.map((row) => (
                <div key={row.label} className="flex flex-col gap-1 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt>
                    <span className="block font-[family-name:var(--font-heading)] text-base font-bold tracking-tight text-white sm:text-lg">
                      {row.label}
                    </span>{" "}
                    <span className="mt-1 block text-sm text-white/50">{row.detail}</span>
                  </dt>
                  <dd className="shrink-0 font-[family-name:var(--font-heading)] text-base font-bold tracking-tight tabular-nums text-white sm:text-right sm:text-lg">
                    {row.range}
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 border-t border-white/[0.07] pt-5 text-[13px] leading-relaxed text-white/55">
              {footnote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
