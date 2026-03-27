import Link from "next/link";
import { Section } from "@/components/ui/section";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

export function ServiceCta() {
  return (
    <Section className="bg-[var(--color-bg)]">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-pretty sm:text-4xl lg:text-5xl">
          Klar for å komme i gang?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base font-light text-[var(--color-text-muted)] sm:text-lg">
          Bestill en gratis og uforpliktende samtale, så hjelper vi deg med å finne den riktige løsningen for bedriften din.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/kontakt"
            className={`${RAINBOW_BUTTON_CLASSES} px-8 py-3.5 text-lg font-semibold`}
          >
            Book en gratis samtale
          </Link>
        </div>
      </div>
    </Section>
  );
}
