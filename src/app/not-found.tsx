import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

export const metadata: Metadata = {
  title: "Side ikke funnet — 404",
  description:
    "Beklager, vi fant ikke siden du leter etter. Gå tilbake til forsiden eller kontakt oss for hjelp.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-[var(--color-dark-bg)] px-6 py-28">
      {/* Ambient warm yellow spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 12% 18%, rgba(244,206,20,0.14), transparent 62%)",
        }}
      />
      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.045]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      {/* Noise layer */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
          <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
          404 · Ikke funnet
        </p>

        <h1 className="mt-7 font-serif text-white">
          <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
            Vi finner
          </span>
          <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
            <span className="relative inline-block">
              ikke
              <span
                aria-hidden
                className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
              />
            </span>
          </span>
          <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
            det du leter etter.
          </span>
        </h1>

        <p className="mt-9 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg">
          Siden kan ha blitt flyttet eller slettet. Gå tilbake til forsiden, eller
          ta kontakt om du fant en lenke som ikke fungerer.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href="/"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-7 py-4 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] active:scale-[0.97]"
            style={{ transitionTimingFunction: ENTRY_EASE }}
          >
            Tilbake til forsiden
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
            Kontakt oss
          </Link>
        </div>
      </div>
    </section>
  );
}
