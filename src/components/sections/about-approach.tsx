import { Reveal } from "@/components/ui/reveal";
import { APPROACH } from "@/lib/content/about";

export function AboutApproach() {
  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[var(--color-text-muted)]">
            Prosess
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{APPROACH.heading}</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]">{APPROACH.intro}</p>
        </Reveal>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Line through the step numbers */}
          <span
            className="absolute left-[16.6%] right-[16.6%] top-7 hidden h-px bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent md:block"
            aria-hidden="true"
          />
          {APPROACH.steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.1} className="text-center">
                <span className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] font-serif text-xl font-black shadow-[0_0_0_8px_var(--color-bg)]">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{step.title}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-[var(--color-text-muted)]">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
