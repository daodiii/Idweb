import { icons } from "lucide-react";
import type { ServiceFeature } from "@/types";
import { cn } from "@/lib/utils";
import { AuroraBackground } from "@/components/ui/aurora-background";

interface ServiceBentoFeaturesProps {
  features: ServiceFeature[];
}

const cardVariants = [
  "bg-white/6 border-white/8",
  "bg-[var(--color-accent)]/8 border-[var(--color-accent)]/15",
  "bg-white/4 border-white/6",
  "bg-white/6 border-white/8",
  "bg-[var(--color-accent)]/8 border-[var(--color-accent)]/15",
  "bg-white/4 border-white/6",
];

const gridPlacements = [
  "col-span-1 md:col-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1 md:col-span-2",
];

function LucideIcon({ name, className }: { name: string; className?: string }) {
  const pascalName = name
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join("");
  const IconComponent = icons[pascalName as keyof typeof icons];
  if (!IconComponent) return null;
  return <IconComponent className={className} aria-hidden="true" />;
}

export function ServiceBentoFeatures({ features }: ServiceBentoFeaturesProps) {
  return (
    <AuroraBackground variant="center" className="rounded-3xl px-6 py-20 sm:px-10 sm:py-28">
      <h2 className="mb-12 text-center text-3xl font-bold text-pretty text-[var(--color-dark-text)] sm:text-4xl">
        Dette inkluderer
      </h2>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <li
              key={feature.title}
              className={cn(
                "rounded-2xl border p-6 backdrop-blur-xl shadow-lg shadow-black/10",
                "cursor-pointer transition-transform duration-200 motion-reduce:transition-none hover:scale-[1.02]",
                cardVariants[i % cardVariants.length],
                gridPlacements[i % gridPlacements.length],
              )}
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-accent)]/15">
                <LucideIcon name={feature.iconName} className="h-5 w-5 text-[var(--color-accent)]" />
              </div>
              <h3 className="mt-3 text-lg font-semibold text-[var(--color-dark-text)]">{feature.title}</h3>
              <p className="mt-1 text-sm text-slate-400">{feature.description}</p>
            </li>
          ))}
        </ul>
    </AuroraBackground>
  );
}
