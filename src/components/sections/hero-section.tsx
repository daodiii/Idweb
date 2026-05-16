import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { HERO, TRUST_LOCATION, TRUST_SIGNALS } from "@/lib/content/homepage";

const HEADLINE_WORDS = HERO.headline.split(" ");
const EMPHASIZED_WORD_INDEX = 2;
const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

const FLOAT_POSITIONS = [
  { top: "4%", left: "2%", rotate: "-2.5deg", floatDelay: "0s" },
  { top: "36%", left: "30%", rotate: "1.6deg", floatDelay: "1.2s" },
  { top: "68%", left: "6%", rotate: "-1deg", floatDelay: "2.4s" },
];

export function HeroSection() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-[var(--color-dark-bg)]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 82% 22%, rgba(244,206,20,0.16), transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.045]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto grid w-full max-w-6xl grid-cols-1 gap-14 px-6 py-28 lg:grid-cols-12 lg:gap-8 lg:py-0">
        <div className="col-span-1 flex flex-col lg:col-span-7">
          <p
            className="hero-entrance flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55"
            style={{ animationDelay: "0s" }}
          >
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            {HERO.brand} · {TRUST_LOCATION.toUpperCase()}
          </p>

          <h1 className="mt-7 font-serif text-white">
            {HEADLINE_WORDS.map((word, i) => {
              const isEmphasized = i === EMPHASIZED_WORD_INDEX;
              const isCity = word === "OSLO";
              return (
                <span
                  key={`${word}-${i}`}
                  className="hero-entrance mr-[0.22em] inline-block align-baseline"
                  style={{ animationDelay: `${0.15 + i * 0.07}s` }}
                >
                  <span
                    className={
                      isEmphasized
                        ? "block text-[clamp(2.75rem,8.5vw,6.5rem)] font-black leading-[0.92] tracking-[-0.035em]"
                        : "block text-[clamp(2rem,5vw,4rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85"
                    }
                  >
                    {isCity ? (
                      <span className="relative inline-block">
                        {word.toLowerCase()}
                        <span
                          aria-hidden
                          className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                        />
                      </span>
                    ) : i === 0 ? (
                      word.charAt(0) + word.slice(1).toLowerCase()
                    ) : (
                      word.toLowerCase()
                    )}
                  </span>
                </span>
              );
            })}
          </h1>

          <p
            className="hero-entrance mt-9 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg"
            style={{ animationDelay: "0.7s" }}
          >
            {HERO.subheadline}
          </p>

          <div
            className="hero-entrance mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
            style={{ animationDelay: "0.95s" }}
          >
            <Link
              href="/referanser"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-7 py-4 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              {HERO.primaryCta}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ transitionTimingFunction: ENTRY_EASE }}
              />
            </Link>
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 px-7 py-4 text-sm font-medium text-white/85 transition-[border-color,background-color,color,transform] duration-150 hover:border-white/30 hover:bg-white/[0.04] hover:text-white active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              {HERO.secondaryCta}
            </Link>
          </div>
        </div>

        <div
          className="hero-entrance relative col-span-1 hidden lg:col-span-5 lg:flex lg:items-center lg:justify-center"
          style={{ animationDelay: "1.05s" }}
        >
          <div className="relative h-[460px] w-full max-w-[420px]">
            <span
              aria-hidden
              className="absolute -right-6 top-1/2 -translate-y-1/2 select-none font-serif text-[12rem] font-black leading-none tracking-tighter text-white/[0.025]"
            >
              id
            </span>
            {TRUST_SIGNALS.map((signal, i) => {
              const pos = FLOAT_POSITIONS[i];
              return (
                <div
                  key={signal.label}
                  className="absolute"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <div
                    className="hero-float"
                    style={{ animationDelay: pos.floatDelay }}
                  >
                    <div
                      className="rounded-2xl border border-white/[0.08] bg-[rgba(20,20,22,0.88)] px-6 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_20px_40px_-22px_rgba(0,0,0,0.7)]"
                      style={{ transform: `rotate(${pos.rotate})` }}
                    >
                      <div className="flex items-baseline gap-1.5">
                        <span className="font-serif text-4xl font-black leading-none tracking-tight text-white">
                          {signal.value}
                        </span>
                        {signal.suffix ? (
                          <span className="font-serif text-2xl font-bold leading-none text-[#F4CE14]">
                            {signal.suffix}
                          </span>
                        ) : null}
                      </div>
                      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
                        {signal.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
