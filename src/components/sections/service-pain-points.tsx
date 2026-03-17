import type { Service } from "@/types";
import { Section } from "@/components/ui/section";

interface ServicePainPointsProps {
  service: Service;
}

export function ServicePainPoints({ service }: ServicePainPointsProps) {
  return (
    <Section>
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-3xl font-bold text-pretty sm:text-4xl">
          Hvorfor trenger du {service.title.toLowerCase()}?
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-relaxed text-[var(--color-text-muted)]">
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
                <p className="font-semibold text-[var(--color-text)]">{point.title}</p>
                <p className="mt-1 text-sm text-[var(--color-text-muted)]">
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
