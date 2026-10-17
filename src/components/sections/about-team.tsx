import { Reveal } from "@/components/ui/reveal";
import { TEAM_MEMBERS, TEAM_SECTION } from "@/lib/content/about";

export function AboutTeam() {
  return (
    <section className="light-section-warm bg-[var(--color-bg-alt)]/60 px-6 py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[var(--color-text-muted)]">
            Teamet
          </p>
          <h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{TEAM_SECTION.heading}</h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
            {TEAM_SECTION.description}
          </p>
          <p className="mt-6 border-l-4 border-[var(--color-accent)] pl-5 font-serif text-xl leading-snug">
            {TEAM_SECTION.cta}
          </p>
        </Reveal>

        <div className="grid gap-5">
          {TEAM_MEMBERS.map((member, i) => (
            <Reveal key={member.name} delay={0.1 + i * 0.08}>
              <article className="flex items-center gap-6 rounded-3xl border border-[var(--color-border)] bg-white p-8 shadow-[0_24px_48px_-28px_rgba(15,23,42,0.22)]">
                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] font-serif text-3xl font-black ring-8 ring-[var(--color-accent)]/20">
                  {member.initials}
                </div>
                <div>
                  <h3 className="text-2xl font-bold tracking-tight">{member.name}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wider text-[var(--color-text-muted)]">
                    {member.role}
                  </p>
                  <p className="mt-3 leading-relaxed text-[var(--color-text-muted)]">{member.bio}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
