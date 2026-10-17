import { Reveal } from "@/components/ui/reveal";
import { MILESTONES, STORY } from "@/lib/content/about";

export function AboutStory() {
  const [lead, ...rest] = STORY.paragraphs;

  return (
    <section className="px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[3px] text-[var(--color-text-muted)]">
                Bakgrunn
              </p>
              <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{STORY.heading}</h2>
              <blockquote className="mt-8 border-l-4 border-[var(--color-accent)] pl-6 font-serif text-2xl leading-snug sm:text-[1.7rem]">
                {lead}
              </blockquote>
            </Reveal>
          </div>
        </div>

        <div className="space-y-10 lg:col-span-7 lg:pt-4">
          <Reveal>
            <div className="space-y-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
              {rest.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ol className="relative rounded-2xl border border-[var(--color-border)] bg-white p-8 shadow-[0_12px_32px_-18px_rgba(15,23,42,0.14)]">
              {MILESTONES.map((m, i) => (
                <li key={m.year} className="relative flex gap-5 pb-8 last:pb-0">
                  {i < MILESTONES.length - 1 && (
                    <span
                      className="absolute bottom-0 left-[0.6rem] top-6 w-px bg-[var(--color-border)]"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className="relative mt-1.5 h-[1.3rem] w-[1.3rem] shrink-0 rounded-full border-4 border-white bg-[var(--color-accent)] ring-1 ring-[var(--color-accent)]"
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-serif text-2xl font-black leading-none">{m.year}</p>
                    <p className="mt-1.5 text-[var(--color-text-muted)]">{m.label}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
