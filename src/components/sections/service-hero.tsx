import Link from "next/link";
import type { Service } from "@/types";

interface ServiceHeroProps {
  service: Service;
}

export function ServiceHero({ service }: ServiceHeroProps) {
  return (
    <section className="relative overflow-hidden px-6 py-24 text-center sm:py-32">
      {/* Radial accent glow — inline style needed for complex multi-stop radial gradient not expressible in Tailwind */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(244, 206, 20, 0.08) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Gradient background */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-bg-alt)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {service.title}
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-muted)] sm:text-xl">
          {service.shortDescription}
        </p>
        <Link
          href="/kontakt"
          className="mt-10 inline-block rounded-lg bg-[var(--color-accent)] px-8 py-3.5 text-lg font-semibold text-[var(--color-text)] transition-colors hover:bg-[var(--color-accent-hover)]"
        >
          Få et uforpliktende tilbud
        </Link>
      </div>
    </section>
  );
}
