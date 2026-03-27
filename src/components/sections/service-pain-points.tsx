import type { Service } from "@/types";
import { Section } from "@/components/ui/section";

interface ServicePainPointsProps {
  service: Service;
}

export function ServicePainPoints({ service }: ServicePainPointsProps) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-extrabold tracking-[-0.02em] text-pretty sm:text-4xl lg:text-5xl">
          Hvorfor trenger du {service.title.toLowerCase()}?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-base font-light leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
          {service.longDescription}
        </p>

        <div className="mt-12 flex flex-col gap-4">
          {service.painPoints.map((point) => (
            <div
              key={point.title}
              className="flex items-start gap-4 rounded-xl border border-[var(--color-border)] bg-white p-5"
            >
              <div
                className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500"
                aria-hidden="true"
              />
              <div>
                <p className="text-lg font-bold tracking-[-0.01em] text-[var(--color-text)] sm:text-xl">{point.title}</p>
                <p className="mt-1 text-sm font-light text-[var(--color-text-muted)]">
                  {point.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
