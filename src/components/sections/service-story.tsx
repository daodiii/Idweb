import type { Service } from "@/types";
import { Section } from "@/components/ui/section";

interface ServiceStoryProps {
  service: Service;
}

export function ServiceStory({ service }: ServiceStoryProps) {
  return (
    <Section>
      <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Text column */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Hvorfor {service.title.toLowerCase()}?
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-[var(--color-text-muted)]">
            {service.longDescription}
          </p>
        </div>

        {/* Decorative visual */}
        <div className="flex-1" aria-hidden="true">
          <div className="relative mx-auto aspect-square max-w-sm">
            {/* Layered geometric shapes */}
            <div className="absolute inset-4 rounded-3xl bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-20" />
            <div className="absolute inset-8 rounded-2xl border-2 border-[var(--color-accent)] opacity-30" />
            <div className="absolute inset-12 rounded-xl bg-gradient-to-tr from-[var(--color-text)] to-[var(--color-bg-alt)] opacity-10" />
            <div className="absolute inset-16 rounded-lg bg-[var(--color-accent)] opacity-15" />
            {/* Center circle */}
            <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-hover)] opacity-40" />
          </div>
        </div>
      </div>
    </Section>
  );
}
