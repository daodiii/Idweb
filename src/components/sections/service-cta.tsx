import Link from "next/link";
import { Section } from "@/components/ui/section";

export function ServiceCta() {
  return (
    <Section className="bg-[var(--color-bg-alt)]">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Klar for å komme i gang?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-[var(--color-text-muted)]">
          Bestill en gratis og uforpliktende samtale, så hjelper vi deg med å finne den riktige løsningen for bedriften din.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/kontakt"
            className="rounded-lg bg-[var(--color-accent)] px-8 py-3.5 text-lg font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-accent-hover)]"
          >
            Book en gratis samtale
          </Link>
          <Link
            href="/tjenester"
            className="rounded-lg border border-[var(--color-border)] px-8 py-3.5 text-lg font-semibold transition-colors hover:bg-[var(--color-bg)]"
          >
            Se alle tjenester
          </Link>
        </div>
      </div>
    </Section>
  );
}
