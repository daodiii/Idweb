import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, Clock, ArrowUpRight } from "lucide-react";
import { SEO } from "@/lib/content/seo";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ContactForm } from "@/components/ui/contact-form";

const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

export const metadata: Metadata = {
  title: SEO.contact.title,
  description: SEO.contact.description,
  alternates: {
    canonical: "/kontakt",
  },
};

const CONTACT_ROWS = [
  {
    icon: Phone,
    label: "Telefon",
    value: "+47 984 06 164",
    href: "tel:+4798406164",
    meta: "Hverdager 08–17",
  },
  {
    icon: Mail,
    label: "E-post",
    value: "hei@idweb.no",
    href: "mailto:hei@idweb.no",
    meta: "Svar innen 24 timer",
  },
  {
    icon: Clock,
    label: "Åpningstider",
    value: "Mandag – fredag",
    href: null,
    meta: "08:00 – 17:00",
  },
] as const;

const PROCESS_STEPS = [
  "Vi leser meldingen din og forbereder oss.",
  "Vi tar kontakt innen 24 timer for en uforpliktende samtale.",
  "Vi sender deg et skreddersydd tilbud med fast pris.",
  "Du bestemmer — ingen press, ingen forpliktelser.",
];

export default function KontaktPage() {
  return (
    <div className="relative overflow-hidden bg-[var(--color-dark-bg)]">
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Kontakt", href: "/kontakt" },
        ]}
      />

      {/* Ambient layers */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 12% 18%, rgba(244,206,20,0.14), transparent 62%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 45% 40% at 88% 82%, rgba(244,206,20,0.08), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] opacity-[0.045]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[2] opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Hero — asymmetric editorial */}
      <section className="relative z-10 px-6 pb-16 pt-24 sm:pt-32 lg:pb-24 lg:pt-36">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Kontakt · Oslo
            </p>

            <h1 className="mt-7 font-serif text-white">
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                La oss snakke
              </span>
              <span className="block text-[clamp(2.75rem,8vw,6rem)] font-black leading-[0.92] tracking-[-0.035em]">
                <span className="relative inline-block">
                  ærlig
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                  />
                </span>
              </span>
              <span className="block text-[clamp(2rem,4.5vw,3.5rem)] font-extralight leading-[1.05] tracking-[-0.01em] text-white/85">
                om nettsiden din.
              </span>
            </h1>

            <p className="mt-9 max-w-[58ch] text-base leading-relaxed text-white/65 sm:text-lg">
              Send oss en melding, så tar vi kontakt innen 24 timer. Helt
              uforpliktende, ingen salgspress, bare en ærlig samtale om hva vi
              kan gjøre for deg.
            </p>
          </div>
        </div>
      </section>

      {/* Form + Contact info — 7/5 asymmetric split */}
      <section className="relative z-10 px-6 pb-24 sm:pb-28 lg:pb-32">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Form column — 7 cols, first on mobile */}
          <div className="order-1 lg:order-1 lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Skjema
            </p>
            <h2 className="mt-6 font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] font-black leading-[1] tracking-[-0.025em] text-white">
              Send oss en melding.
            </h2>
            <p className="mt-5 max-w-[58ch] text-base leading-relaxed text-white/65">
              Fortell oss litt om bedriften din og hva du ønsker å oppnå. Jo
              mer du deler, desto bedre tilbud kan vi gi deg.
            </p>

            <ContactForm showExtendedFields className="mt-10" />

            <p className="mt-6 text-sm text-white/55">
              Ved å sende inn skjemaet godtar du vår{" "}
              <Link
                href="/personvern"
                className="text-[#F4CE14] underline decoration-[#F4CE14]/40 underline-offset-2 transition-colors duration-150 hover:text-[#FFE15D]"
                style={{ transitionTimingFunction: ENTRY_EASE }}
              >
                personvernerklæring
              </Link>
              .
            </p>
          </div>

          {/* Info column — 5 cols, second on mobile */}
          <aside className="order-2 lg:order-2 lg:col-span-5">
            <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
              <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
              Direkte kontakt
            </p>
            <h2 className="mt-6 font-serif text-[clamp(1.5rem,2.8vw,2rem)] font-black leading-[1.05] tracking-[-0.02em] text-white">
              Foretrekker du
              <br />
              <span className="relative inline-block">
                <span className="text-white/85 font-extralight">en telefon?</span>
              </span>
            </h2>

            {/* Contact rows — border-t list */}
            <div className="mt-10">
              {CONTACT_ROWS.map((row) => {
                const Icon = row.icon;
                return (
                  <div
                    key={row.label}
                    className="flex items-start gap-5 border-t border-white/[0.08] py-6 last:border-b"
                  >
                    <span
                      aria-hidden
                      className="mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/[0.08] bg-[rgba(20,20,22,0.6)]"
                    >
                      <Icon className="h-4 w-4 text-[#F4CE14]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
                        {row.label}
                      </p>
                      {row.href ? (
                        <a
                          href={row.href}
                          className="mt-1.5 inline-block font-serif text-xl font-bold leading-tight tracking-[-0.01em] text-white transition-colors duration-150 hover:text-[#F4CE14]"
                          style={{ transitionTimingFunction: ENTRY_EASE }}
                        >
                          {row.value}
                        </a>
                      ) : (
                        <p className="mt-1.5 font-serif text-xl font-bold leading-tight tracking-[-0.01em] text-white">
                          {row.value}
                        </p>
                      )}
                      <p className="mt-1 text-sm text-white/55">{row.meta}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Process — what happens next */}
            <div className="mt-14">
              <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
                <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
                Hva skjer videre
              </p>
              <ol className="mt-7 space-y-5">
                {PROCESS_STEPS.map((step, i) => (
                  <li key={step} className="flex items-start gap-4">
                    <span
                      aria-hidden
                      className="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#F4CE14]/30 bg-[rgba(244,206,20,0.06)] font-mono text-[11px] font-bold tracking-tight text-[#F4CE14]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="pt-0.5 text-base leading-relaxed text-white/70">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              <Link
                href="/referanser"
                className="group mt-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-white/70 transition-colors duration-150 hover:text-[#F4CE14]"
                style={{ transitionTimingFunction: ENTRY_EASE }}
              >
                Se hva vi har levert
                <ArrowUpRight
                  aria-hidden
                  className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ transitionTimingFunction: ENTRY_EASE }}
                />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
