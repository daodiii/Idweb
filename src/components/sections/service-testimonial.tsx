import type { Testimonial } from "@/types";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface ServiceTestimonialProps {
  testimonial: Testimonial;
}

export function ServiceTestimonial({ testimonial }: ServiceTestimonialProps) {
  const { author, text } = testimonial;

  return (
    <section className="bg-[var(--color-bg)] px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-8 text-[11px] font-medium uppercase tracking-[3px] text-[var(--color-accent)]">
          Kundeomtale
        </p>

        <div className="relative">
          <span
            className="absolute -top-8 left-1/2 -translate-x-1/2 select-none font-serif text-[120px] leading-none text-[var(--color-accent)] opacity-15"
            aria-hidden="true"
          >
            &ldquo;
          </span>

          <blockquote className="relative text-lg font-medium italic leading-relaxed text-[var(--color-text)] sm:text-xl">
            {text}
          </blockquote>
        </div>

        <div className="mt-8 flex flex-col items-center gap-3">
          <Avatar className="h-14 w-14 ring-2 ring-[var(--color-accent)]/30">
            <AvatarImage src={author.avatar} alt={author.name} />
          </Avatar>

          <div>
            <p className="font-semibold text-[var(--color-text)]">{author.name}</p>
            <p className="text-sm text-[var(--color-text-muted)]">
              {author.handle}
              {author.company && <>, {author.company}</>}
            </p>
          </div>

          {author.rating && (
            <div className="flex gap-0.5" aria-label={`${author.rating} av 5 stjerner`}>
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  className={
                    i < author.rating!
                      ? "text-[var(--color-accent)]"
                      : "text-[var(--color-text-muted)] opacity-30"
                  }
                  aria-hidden="true"
                >
                  ★
                </span>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/referanser"
          className="mt-8 inline-block text-sm font-medium text-[var(--color-accent)] transition-colors hover:underline"
        >
          Se alle referanser →
        </Link>
      </div>
    </section>
  );
}
