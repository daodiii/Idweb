import Link from "next/link";
import type { Metadata } from "next";
import {
  TrendingUp,
  MessageSquare,
  Handshake,
  Star,
  ArrowUpRight,
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
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  title: SEO.about.title,
  description: SEO.about.description,
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

const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

export default function OmOssPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Om oss", href: "/om-oss" },
        ]}
      />

      {/* ============================================================ */}
      {/* HERO — asymmetric editorial + right-column stat blocks       */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 82% 22%, rgba(244,206,20,0.15), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
          <div className="col-span-1 flex flex-col lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Om idweb
            </p>

            <h1 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Vi hjelper norske
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                bedrifter
              </span>
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                med å lykkes på{" "}
                <span className="relative inline-block">
                  nett
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>
                .
              </span>
            </h1>

            <p className="mt-9 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg">
              {ABOUT_PAGE.subheadline}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/kontakt"
                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-7 py-4 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] active:scale-[0.97]"
                style={{ transitionTimingFunction: ENTRY_EASE }}
              >
                Ta kontakt
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ transitionTimingFunction: ENTRY_EASE }}
                />
              </Link>
              <Link
                href="/referanser"
                className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-medium text-white/85 transition-[border-color,background-color,color,transform] duration-150 hover:border-white/30 hover:bg-white/[0.04] hover:text-white active:scale-[0.97]"
                style={{ transitionTimingFunction: ENTRY_EASE }}
              >
                Se prosjekter
              </Link>
            </div>
          </div>

          {/* Right column — trust signal stat blocks */}
          <div className="relative col-span-1 hidden lg:col-span-5 lg:flex lg:flex-col lg:justify-center">
            <div className="relative">
              <span
                aria-hidden
                className="pointer-events-none absolute -right-4 -top-10 select-none font-serif text-[10rem] font-black leading-none tracking-tighter text-white/[0.025]"
              >
                id
              </span>
              <div className="relative flex flex-col gap-4">
                {TRUST_SIGNALS.map((signal) => (
                  <div
                    key={signal.label}
                    className="rounded-2xl border border-white/[0.08] bg-[rgba(20,20,22,0.88)] px-6 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-22px_rgba(0,0,0,0.7)]"
                  >
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-5xl font-black leading-none tracking-tight text-white">
                        {signal.decimals
                          ? signal.value.toFixed(signal.decimals)
                          : signal.value}
                      </span>
                      {signal.suffix ? (
                        <span className="font-serif text-2xl font-bold leading-none text-[#F4CE14]">
                          {signal.suffix}
                        </span>
                      ) : null}
                    </div>
                    <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.22em] text-white/55">
                      {signal.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* STORY — asymmetric two-column with mono numbered chapters    */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 12% 18%, rgba(244,206,20,0.12), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
                <span
                  aria-hidden
                  className="inline-block h-px w-8 bg-[#F4CE14]/70"
                />
                Vår historie
              </p>

              <h2 className="mt-7 font-serif text-white">
                <span className="block text-[clamp(1.75rem,3.5vw,2.75rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                  Hvorfor vi
                </span>
                <span className="block text-[clamp(2.25rem,6vw,4.5rem)] font-black leading-[0.95] tracking-[-0.035em]">
                  <span className="relative inline-block">
                    startet
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                    />
                  </span>
                </span>
                <span className="block text-[clamp(1.75rem,3.5vw,2.75rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                  IDweb.
                </span>
              </h2>

              <p className="mt-7 max-w-[42ch] text-sm leading-relaxed text-white/55">
                Tre korte kapitler om hvordan vi havnet her — og hvor vi går.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ol className="flex flex-col">
              {STORY.paragraphs.map((paragraph, index) => (
                <li
                  key={index}
                  className="border-t border-white/[0.07] py-8 first:border-t-0 first:pt-0 sm:py-10"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="font-mono text-xs uppercase tracking-[0.22em] text-[#F4CE14]/75">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="inline-block h-px w-10 bg-[#F4CE14]/30"
                    />
                  </div>
                  <p className="mt-5 max-w-[60ch] text-base leading-relaxed text-white/70 sm:text-lg">
                    {paragraph}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* VALUES — editorial list with border-t dividers               */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 92% 78%, rgba(244,206,20,0.13), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span
                aria-hidden
                className="inline-block h-px w-8 bg-[#F4CE14]/70"
              />
              Verdier
            </p>

            <h2 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                Det vi
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                <span className="relative inline-block">
                  tror
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>
              </span>
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                på.
              </span>
            </h2>

            <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg">
              Fire prinsipper som styrer hvert prosjekt — fra første samtale
              til lansering og videre.
            </p>
          </div>

          <div className="mt-16 flex flex-col lg:mt-20">
            <div className="flex items-baseline justify-between border-b border-white/[0.05] pb-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-white/45">
                Slik tenker vi
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25">
                01 — 0{VALUES.items.length}
              </span>
            </div>

            {VALUES.items.map((value, index) => {
              const Icon = VALUE_ICONS[value.icon];
              return (
                <article
                  key={value.title}
                  className="grid grid-cols-1 gap-6 border-t border-white/[0.07] py-8 first:border-t-0 sm:py-10 lg:grid-cols-12 lg:gap-12"
                >
                  <div className="flex items-start gap-5 lg:col-span-5">
                    <span className="font-serif text-3xl font-black leading-none tracking-tight text-[#F4CE14]/40 sm:text-4xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="flex items-start gap-4">
                      {Icon && (
                        <span className="mt-0.5 flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-[#F4CE14]/10 ring-1 ring-inset ring-[#F4CE14]/20">
                          <Icon className="h-5 w-5 text-[#F4CE14]" />
                        </span>
                      )}
                      <h3 className="font-serif text-xl font-black leading-[1.1] tracking-[-0.01em] text-white sm:text-2xl">
                        {value.title}
                      </h3>
                    </div>
                  </div>

                  <p className="max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg lg:col-span-7">
                    {value.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* APPROACH — asymmetric two-column with sticky headline        */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 8% 88%, rgba(244,206,20,0.12), transparent 62%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
            backgroundSize: "34px 34px",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <div className="lg:sticky lg:top-28">
              <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
                <span
                  aria-hidden
                  className="inline-block h-px w-8 bg-[#F4CE14]/70"
                />
                Slik jobber vi
              </p>

              <h2 className="mt-7 font-serif text-white">
                <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                  Vi finner svaret
                </span>
                <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                  <span className="relative inline-block">
                    sammen
                    <span
                      aria-hidden
                      className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                    />
                  </span>
                </span>
                <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                  med deg.
                </span>
              </h2>

              <p className="mt-8 max-w-[48ch] text-base leading-relaxed text-white/65 sm:text-lg">
                Du kjenner bedriften din best. Vi kjenner nett best. Det er der
                de gode løsningene oppstår.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="flex items-baseline justify-between border-b border-white/[0.05] pb-4">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#F4CE14]">
                Prosessen
              </p>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">
                I tre faser
              </span>
            </div>

            <ol className="flex flex-col">
              {APPROACH.paragraphs.map((paragraph, index) => (
                <li
                  key={index}
                  className="border-t border-white/[0.07] py-8 first:border-t-0 first:pt-8 sm:py-10"
                >
                  <div className="flex items-baseline gap-5">
                    <span
                      className="select-none font-serif font-black leading-none tracking-tight text-[#F4CE14]/30"
                      style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className="inline-block h-px w-12 bg-[#F4CE14]/30"
                    />
                  </div>
                  <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-white/70 sm:text-lg">
                    {paragraph}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CTA — yellow editorial block with dark primary button        */}
      {/* ============================================================ */}
      <section className="relative overflow-hidden bg-[var(--color-accent)] px-6 py-20 sm:py-28 lg:py-32">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "radial-gradient(rgba(10,10,10,0.55) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 45% 55% at 12% 110%, rgba(10,10,10,0.16), transparent 65%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 35% 45% at 92% -10%, rgba(255,255,255,0.22), transparent 65%)",
          }}
        />

        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#0a0a0a]/65">
              <span
                aria-hidden
                className="inline-block h-px w-8 bg-[#0a0a0a]/45"
              />
              La oss snakke
            </p>

            <h2 className="mt-7 font-serif text-[#0a0a0a]">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[#0a0a0a]/80">
                La oss ta en
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                <span className="relative inline-block">
                  prat
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#0a0a0a]"
                  />
                </span>
                .
              </span>
            </h2>

            <p className="mt-8 max-w-[58ch] text-base leading-relaxed text-[#0a0a0a]/75 sm:text-lg">
              {ABOUT_CTA.description}
            </p>
          </div>

          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a0a0a] px-7 py-4 text-sm font-bold text-[#fafaf9] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)] transition-[transform,background-color] duration-150 hover:bg-[#1a1a1a] active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              {ABOUT_CTA.buttonText}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ transitionTimingFunction: ENTRY_EASE }}
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
