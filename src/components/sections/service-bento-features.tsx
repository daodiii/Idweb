import type { ServiceFeature } from "@/types";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/section";

interface ServiceBentoFeaturesProps {
  features: ServiceFeature[];
}

const cardVariants = [
  "bg-white/15 border-white/20 text-white",
  "bg-[#F4CE14]/25 border-[#F4CE14]/30 text-white",
  "bg-black/30 border-white/10 text-white",
  "bg-white/15 border-white/20 text-white",
  "bg-[#F4CE14]/25 border-[#F4CE14]/30 text-white",
  "bg-black/30 border-white/10 text-white",
];

const gridPlacements = [
  "col-span-1 md:col-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1 md:col-span-2",
];

export function ServiceBentoFeatures({ features }: ServiceBentoFeaturesProps) {
  return (
    <Section>
      <h2 className="mb-12 text-center text-3xl font-bold sm:text-4xl">
        Dette inkluderer
      </h2>

      {/* Dark panel for glassmorphism visibility */}
      <div className="rounded-3xl bg-gradient-to-br from-[var(--color-text)] to-[#2a2c2f] p-6 sm:p-10">
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <li
              key={feature.title}
              className={cn(
                "rounded-2xl border p-6 backdrop-blur-xl shadow-lg shadow-black/10",
                "transition-transform duration-200 hover:scale-[1.02]",
                cardVariants[i % cardVariants.length],
                gridPlacements[i % gridPlacements.length]
              )}
            >
              <span className="text-3xl" role="img" aria-hidden="true">
                {feature.icon}
              </span>
              <h3 className="mt-3 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-1 text-sm opacity-80">{feature.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
