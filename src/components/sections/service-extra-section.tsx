import type { ServiceExtraSection as ServiceExtraSectionType } from "@/types";
import { Section } from "@/components/ui/section";

interface ServiceExtraSectionProps {
  section: ServiceExtraSectionType;
}

function Checklist({ section }: ServiceExtraSectionProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <ul className="space-y-4">
        {section.items.map((item) => (
          <li key={item.label} className="flex items-start gap-4">
            <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-sm font-bold text-[var(--color-text)]">
              ✓
            </span>
            <div>
              <p className="font-semibold">{item.label}</p>
              {item.detail && (
                <p className="text-sm text-[var(--color-text-muted)]">{item.detail}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Integrations({ section }: ServiceExtraSectionProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {section.items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6 text-center"
        >
          {item.icon && (
            <span className="text-3xl" role="img" aria-hidden="true">{item.icon}</span>
          )}
          <p className="font-semibold">{item.label}</p>
          {item.detail && (
            <p className="text-xs text-[var(--color-text-muted)]">{item.detail}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function Process({ section }: ServiceExtraSectionProps) {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:gap-0">
      {section.items.map((item, i) => (
        <div key={item.label} className="flex items-center gap-4 sm:flex-1 sm:flex-col sm:gap-3 sm:text-center">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)] text-xl font-bold text-[var(--color-text)]">
            {item.value ?? i + 1}
          </div>
          <div>
            <p className="font-semibold">{item.label}</p>
            {item.detail && (
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.detail}</p>
            )}
          </div>
          {i < section.items.length - 1 && (
            <div className="hidden h-0.5 flex-1 bg-[var(--color-border)] sm:block" aria-hidden="true" />
          )}
        </div>
      ))}
    </div>
  );
}

function Platforms({ section }: ServiceExtraSectionProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {section.items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6"
        >
          {item.icon && (
            <span className="text-2xl" role="img" aria-hidden="true">{item.icon}</span>
          )}
          <h3 className="mt-3 text-lg font-semibold">{item.label}</h3>
          {item.detail && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.detail}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function Stats({ section }: ServiceExtraSectionProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {section.items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-8 text-center"
        >
          {item.value && (
            <span className="text-4xl font-bold text-[var(--color-accent)] sm:text-5xl">
              {item.value}
            </span>
          )}
          <p className="mt-2 text-lg font-semibold">{item.label}</p>
          {item.detail && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.detail}</p>
          )}
        </div>
      ))}
    </div>
  );
}

function Deliverables({ section }: ServiceExtraSectionProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {section.items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)] p-6"
        >
          {item.icon && (
            <span className="text-2xl" role="img" aria-hidden="true">{item.icon}</span>
          )}
          {item.value && /^#[0-9A-Fa-f]/.test(item.value) && (
            <div className="mt-2 flex gap-2">
              {item.value.split(",").map((color) => (
                <div
                  key={color}
                  className="h-8 w-8 rounded-full border border-white/20"
                  style={{ backgroundColor: color }}
                  aria-label={`Farge: ${color}`}
                />
              ))}
            </div>
          )}
          <p className="mt-3 font-semibold">{item.label}</p>
          {item.detail && (
            <p className="mt-1 text-sm text-[var(--color-text-muted)]">{item.detail}</p>
          )}
        </div>
      ))}
    </div>
  );
}

const renderers: Record<ServiceExtraSectionType["type"], React.FC<ServiceExtraSectionProps>> = {
  checklist: Checklist,
  integrations: Integrations,
  process: Process,
  platforms: Platforms,
  stats: Stats,
  deliverables: Deliverables,
};

export function ServiceExtraSection({ section }: ServiceExtraSectionProps) {
  const Renderer = renderers[section.type];

  return (
    <Section>
      <h2 className="mb-10 text-center text-3xl font-bold sm:text-4xl">
        {section.headline}
      </h2>
      <Renderer section={section} />
    </Section>
  );
}
