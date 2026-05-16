import { FINAL_CTA } from "@/lib/content/homepage";
import { ContactForm } from "@/components/ui/contact-form";
import { AnimateIn } from "@/components/ui/animate-in";

export function CtaSection() {
  return (
    <section className="relative overflow-hidden bg-[var(--color-accent)] px-6 py-20 sm:py-28 lg:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(10,10,10,0.55) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 55% at 12% 110%, rgba(10,10,10,0.16), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 35% 45% at 92% -10%, rgba(255,255,255,0.22), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <AnimateIn>
          <p className="flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-[#0a0a0a]/65">
            <span aria-hidden className="inline-block h-px w-8 bg-[#0a0a0a]/35" />
            Få et uforpliktende tilbud
            <span aria-hidden className="inline-block h-px w-8 bg-[#0a0a0a]/35" />
          </p>

          <h2 className="mt-7 font-serif text-[clamp(2.25rem,6.5vw,5rem)] font-black leading-[0.95] tracking-[-0.035em] text-[#0a0a0a]">
            {FINAL_CTA.headline}
          </h2>

          <p className="mx-auto mt-6 max-w-[58ch] text-base leading-relaxed text-[#0a0a0a]/75 sm:text-lg">
            {FINAL_CTA.description}
          </p>

          <div className="mt-12">
            <ContactForm className="text-[#0a0a0a]" variant="light" />
          </div>

          <p className="mt-10 font-mono text-xs uppercase tracking-[0.2em] text-[#0a0a0a]/60">
            {FINAL_CTA.secondaryText}
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
