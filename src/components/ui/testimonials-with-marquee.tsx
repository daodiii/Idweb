import { cn } from "@/lib/utils"
import {
  TestimonialCard,
  type TestimonialAuthor,
} from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-[var(--color-dark-bg)] to-[#162032]",
        "py-12 px-0 sm:py-24 md:py-32",
        className,
      )}
    >
      <div className="mx-auto flex max-w-container flex-col items-center gap-4 text-center sm:gap-16">
        <div className="flex flex-col items-center gap-4 px-4 sm:gap-8">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
            Kundeomtaler
          </p>
          <h2 className="max-w-[720px] text-3xl font-semibold leading-tight text-pretty text-[var(--color-dark-text)] sm:text-5xl sm:leading-tight">
            {title}
          </h2>
          <p className="text-md max-w-[600px] font-medium text-[var(--color-dark-muted)] sm:text-xl">
            {description}
          </p>
        </div>
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
          <div className="group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)] flex-row [--duration:50s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused] motion-reduce:[animation-play-state:paused]">
              {[...Array(3)].map((_, setIndex) =>
                testimonials.map((testimonial, i) => (
                  <TestimonialCard
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                )),
              )}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-1/3 bg-gradient-to-r from-[var(--color-dark-bg)] sm:block" />
          <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 bg-gradient-to-l from-[var(--color-dark-bg)] sm:block" />
        </div>
      </div>
    </section>
  )
}
