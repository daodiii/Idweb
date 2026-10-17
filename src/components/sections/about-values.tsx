import { Handshake, MessageSquare, Star, TrendingUp } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { VALUES } from "@/lib/content/about";

const VALUE_ICONS: Record<string, React.FC<{ className?: string }>> = {
  TrendingUp,
  MessageSquare,
  Handshake,
  Star,
};

export function AboutValues() {
  return (
    <section className="light-section-warm-alt bg-[var(--color-bg-alt)]/60 px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[var(--color-text-muted)]">
            Verdier
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{VALUES.heading}</h2>
        </Reveal>

        <div className="mt-16 grid gap-5 md:grid-cols-2">
          {VALUES.items.map((value, i) => {
            const Icon = VALUE_ICONS[value.icon];
            return (
              <Reveal key={value.title} delay={(i % 2) * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-[var(--color-accent)] hover:shadow-[0_24px_48px_-24px_rgba(15,23,42,0.2)] sm:p-10">
                  <span
                    className="pointer-events-none absolute -right-2 -top-6 select-none font-serif text-[9rem] font-black leading-none text-[var(--color-bg-alt)] transition-colors duration-300 group-hover:text-[var(--color-accent)]/25"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="relative">
                    {Icon && (
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-accent)] text-[var(--color-text)]">
                        <Icon className="h-6 w-6" />
                      </span>
                    )}
                    <h3 className="mt-6 text-2xl font-bold tracking-tight">{value.title}</h3>
                    <p className="mt-3 leading-relaxed text-[var(--color-text-muted)]">{value.description}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
