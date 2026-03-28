import { FINAL_CTA } from "@/lib/content/homepage";
import { ContactForm } from "@/components/ui/contact-form";
import { AnimateIn } from "@/components/ui/animate-in";

export function CtaSection() {
  return (
    <section className="bg-gradient-to-r from-[var(--color-accent)] to-[#FBBF24] px-6 py-14 sm:py-24">
      <AnimateIn className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--color-dark-bg)] sm:text-4xl lg:text-5xl">
          {FINAL_CTA.headline}
        </h2>
        <p className="mt-4 text-lg font-light text-[var(--color-dark-bg)]/70">
          {FINAL_CTA.description}
        </p>

        <div className="mt-8">
          <ContactForm className="text-[var(--color-dark-bg)]" variant="light" />
        </div>

        <p className="mt-6 text-sm text-[var(--color-dark-bg)]/60">
          {FINAL_CTA.secondaryText}
        </p>
      </AnimateIn>
    </section>
  );
}
