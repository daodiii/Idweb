import { Star } from "lucide-react";
import { PaletteBackground } from "@/components/ui/palette-background";
import { AnimateIn } from "@/components/ui/animate-in";
import type { Testimonial } from "@/types";

const AVATAR_COLORS = [
  "bg-blue-600",
  "bg-emerald-600",
  "bg-violet-600",
  "bg-amber-600",
  "bg-rose-600",
  "bg-cyan-600",
];

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function getAvatarColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

interface TestimonialGridProps {
  testimonials: Testimonial[];
  title?: string;
  description?: string;
}

export function TestimonialGrid({
  testimonials,
  title = "Hva kundene sier",
  description,
}: TestimonialGridProps) {
  return (
    <PaletteBackground palette="kosmos" singleLayer className="px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <AnimateIn>
          <h2 className="text-center text-3xl font-extrabold tracking-[-0.02em] text-[var(--color-dark-text)] sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-center font-light text-[var(--color-dark-muted)]">
              {description}
            </p>
          )}
        </AnimateIn>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <AnimateIn
              key={t.author.name}
              variant="fade-up-stagger"
              delay={i * 0.1}
              className="rounded-xl border border-white/5 bg-[var(--color-dark-glass)] p-6 backdrop-blur-sm"
            >
              {/* Stars */}
              <div className="mb-4 flex gap-0.5">
                {Array.from({ length: t.author.rating ?? 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-[var(--color-accent)] text-[var(--color-accent)]"
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="mb-6 text-lg font-medium italic leading-relaxed text-[var(--color-dark-muted)] sm:text-xl">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white ${getAvatarColor(t.author.name)}`}
                >
                  {getInitials(t.author.name)}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-dark-text)]">
                    {t.author.name}
                  </p>
                  <p className="text-xs text-[var(--color-dark-muted)]">
                    {t.author.handle}
                    {t.author.company && `, ${t.author.company}`}
                  </p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </PaletteBackground>
  );
}
