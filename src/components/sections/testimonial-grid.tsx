import { Star } from "lucide-react";
import { AnimateIn } from "@/components/ui/animate-in";
import type { Testimonial } from "@/types";

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
    <section className="relative overflow-hidden bg-[var(--color-dark-bg)] px-6 py-20 sm:py-28 lg:py-32">
      {/* Ambient warm yellow spotlight */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 92% 78%, rgba(244,206,20,0.10), transparent 62%)",
        }}
      />
      {/* Subtle dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <AnimateIn>
          <div className="mb-16 max-w-2xl">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Kundestemmer
            </p>
            <h2 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                {title.split(" ")[0]}{" "}
                <span className="relative inline-block font-black text-white">
                  {title.split(" ").slice(1).join(" ") || title}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>
              </span>
            </h2>
            {description && (
              <p className="mt-7 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg">
                {description}
              </p>
            )}
          </div>
        </AnimateIn>

        <div>
          {testimonials.map((t, i) => (
            <AnimateIn
              key={t.author.name}
              variant="fade-up-stagger"
              delay={i * 0.08}
              className="grid gap-8 border-t border-white/[0.08] py-12 md:grid-cols-12 md:gap-12"
            >
              {/* Quote — spans 8 cols */}
              <div className="md:col-span-8">
                <div className="mb-5 flex gap-0.5">
                  {Array.from({ length: t.author.rating ?? 5 }).map((_, j) => (
                    <Star
                      key={j}
                      className="h-4 w-4 fill-[#F4CE14] text-[#F4CE14]"
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <blockquote className="font-serif text-[clamp(1.5rem,3vw,2.25rem)] font-extralight leading-[1.25] tracking-[-0.01em] text-white/90">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
              </div>

              {/* Attribution — spans 4 cols */}
              <div className="md:col-span-4 md:pl-6">
                <p className="font-serif text-xl font-black tracking-tight text-white">
                  {t.author.name}
                </p>
                <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
                  {t.author.handle}
                  {t.author.company && ` · ${t.author.company}`}
                </p>
              </div>
            </AnimateIn>
          ))}
          <div aria-hidden className="border-t border-white/[0.08]" />
        </div>
      </div>
    </section>
  );
}
