import { PROJECTS } from "@/lib/content/portfolio";
import { SOCIAL_PROOF } from "@/lib/content/homepage";

const CLIENT_NAMES = PROJECTS.map((p) => p.client);

export function ClientLogos() {
  return (
    <section className="relative overflow-hidden border-y border-[var(--color-dark-border)] bg-[var(--color-dark-bg)] py-10">
      <div className="mx-auto mb-6 max-w-6xl px-6 text-center">
        <p className="text-[11px] font-medium uppercase tracking-[3px] text-[var(--color-dark-muted)]">
          {SOCIAL_PROOF.heading}
        </p>
      </div>

      <div className="group flex overflow-hidden [--duration:30s] [--gap:3rem] [gap:var(--gap)]">
        {[...Array(4)].map((_, setIndex) => (
          <div
            key={setIndex}
            className="flex shrink-0 animate-marquee items-center [gap:var(--gap)] group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]"
            aria-hidden={setIndex > 0 ? true : undefined}
          >
            {CLIENT_NAMES.map((name) => (
              <span
                key={name}
                className="whitespace-nowrap font-serif text-lg font-black tracking-[-0.03em] text-[var(--color-dark-muted)] opacity-40 transition-opacity duration-300 hover:opacity-80 sm:text-xl"
              >
                {name}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
