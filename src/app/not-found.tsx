import Link from "next/link";
import type { Metadata } from "next";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

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
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-24 text-center">
      <p className="text-sm font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
        404
      </p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
        Siden finnes ikke
      </h1>
      <p className="mx-auto mt-6 max-w-md text-lg text-[var(--color-text-muted)]">
        Beklager, vi kunne ikke finne siden du leter etter. Den kan ha blitt
        flyttet eller slettet.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/"
          className={`${RAINBOW_BUTTON_CLASSES} px-8 py-3 text-lg font-semibold`}
        >
          Gå til forsiden
        </Link>
        <Link
          href="/kontakt"
          className="rounded-xl border border-[var(--color-border)] px-8 py-3 text-lg font-semibold transition-colors hover:bg-[var(--color-bg-alt)]"
        >
          Kontakt oss
        </Link>
      </div>
    </div>
  );
}
