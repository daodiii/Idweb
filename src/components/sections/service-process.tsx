import type { ProcessStep } from "@/types";
import { AuroraBackground } from "@/components/ui/aurora-background";

interface ServiceProcessProps {
  steps: ProcessStep[];
}

export function ServiceProcess({ steps }: ServiceProcessProps) {
  const lastIndex = steps.length - 1;

  return (
    <AuroraBackground variant="bottom-left" className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-12 text-center text-3xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-4xl">
          Slik jobber vi
        </h2>

        {/* Desktop: horizontal */}
        <div className="hidden items-stretch gap-3 sm:flex">
          {steps.map((step, i) => (
            <div key={step.step} className="contents">
              <div
                className={`flex flex-1 flex-col items-center rounded-2xl border p-6 text-center backdrop-blur-sm ${
                  i === 0 || i === lastIndex
                    ? "border-[var(--color-accent)]/20 bg-[var(--color-accent)]/8"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                    i === 0 || i === lastIndex
                      ? "bg-[var(--color-accent)] text-[var(--color-dark-bg)]"
                      : "bg-white/10 text-[var(--color-dark-text)]"
                  }`}
                >
                  {step.step}
                </div>
                <h3 className="mt-3 font-semibold text-[var(--color-dark-text)]">{step.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{step.description}</p>
              </div>
              {i < lastIndex && (
                <div className="flex items-center text-xl text-[var(--color-accent)]" aria-hidden="true">
                  &rarr;
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="flex flex-col gap-4 sm:hidden">
          {steps.map((step, i) => (
            <div key={step.step}>
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold ${
                      i === 0 || i === lastIndex
                        ? "bg-[var(--color-accent)] text-[var(--color-dark-bg)]"
                        : "bg-white/10 text-[var(--color-dark-text)]"
                    }`}
                  >
                    {step.step}
                  </div>
                  {i < lastIndex && (
                    <div className="mt-2 h-8 w-px bg-[var(--color-accent)]/30" aria-hidden="true" />
                  )}
                </div>
                <div className="pt-2">
                  <h3 className="font-semibold text-[var(--color-dark-text)]">{step.title}</h3>
                  <p className="mt-1 text-sm text-slate-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AuroraBackground>
  );
}
