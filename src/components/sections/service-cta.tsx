import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";

const EASE_STR = "cubic-bezier(0.23,1,0.32,1)";

export function ServiceCta() {
  return (
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
            "radial-gradient(ellipse 45% 55% at 8% 110%, rgba(10,10,10,0.16), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 35% 45% at 94% -8%, rgba(255,255,255,0.22), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <AnimateIn>
          <p className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#0a0a0a]/65">
            <span aria-hidden className="inline-block h-px w-8 bg-[#0a0a0a]/35" />
            Neste steg
            <span aria-hidden className="inline-block h-px w-8 bg-[#0a0a0a]/35" />
          </p>

          <h2 className="mt-7 font-serif text-[#0a0a0a]">
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[#0a0a0a]/75">
              La oss ta
            </span>
            <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
              <span className="relative inline-block">
                praten
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#0a0a0a]"
                />
              </span>
            </span>
            <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-[#0a0a0a]/75">
              før vi tar tilbudet.
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-[58ch] text-base leading-relaxed text-[#0a0a0a]/75 sm:text-lg">
            Bestill en gratis og uforpliktende samtale, så finner vi sammen ut hva som passer bedriften din best.
          </p>

          <div className="mt-12 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-7">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#0a0a0a] px-7 py-4 text-sm font-bold text-[#fafaf9] shadow-[0_10px_30px_-12px_rgba(10,10,10,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#1a1a1a] active:scale-[0.97]"
              style={{ transitionTimingFunction: EASE_STR }}
            >
              Book en gratis samtale
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ transitionTimingFunction: EASE_STR }}
              />
            </Link>

            <Link
              href="/tjenester"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-[#0a0a0a]/70 transition-colors duration-150 hover:text-[#0a0a0a]"
              style={{ transitionTimingFunction: EASE_STR }}
            >
              Se alle tjenester
              <ArrowUpRight
                aria-hidden
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
