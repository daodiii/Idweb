import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { PaletteBackground } from "@/components/ui/palette-background";
import { BreadcrumbJsonLd } from "@/components/seo/json-ld";
import { ContactForm } from "@/components/ui/contact-form";
import { Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: SEO.contact.title,
  description: SEO.contact.description,
  keywords: SEO.contact.keywords,
  alternates: {
    canonical: "/kontakt",
  },
};

export default function KontaktPage() {
  return (
    <PaletteBackground palette="drommeslor" as="div" speed={120} intensity={0.6}>
      <BreadcrumbJsonLd
        items={[
          { name: "Hjem", href: "/" },
          { name: "Kontakt", href: "/kontakt" },
        ]}
      />
      {/* Hero */}
      <section className="px-6 py-28 text-center sm:py-36">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-[11px] font-medium uppercase tracking-[3px] text-[var(--color-accent)]">
            Kontakt
          </p>
          <h1 className="text-3xl font-extrabold tracking-[-0.02em] text-[var(--color-dark-text)] sm:text-4xl lg:text-5xl">
            La oss snakke om din nettside
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base font-light text-[var(--color-dark-muted)] sm:text-lg">
            Send oss en melding, så tar vi kontakt innen 24 timer. Helt
            uforpliktende — ingen salgspress, bare en ærlig samtale om hva vi
            kan gjøre for deg.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section>
        <div className="px-6 py-24 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-3xl border border-white/[0.06] bg-[var(--color-dark-glass)] p-8 backdrop-blur-sm sm:p-10">
              <h2 className="text-2xl font-bold tracking-[-0.01em] text-[var(--color-dark-text)]">
                Send oss en melding
              </h2>
              <p className="mt-2 font-light text-[var(--color-dark-muted)]">
                Fortell oss litt om bedriften din og hva du ønsker å oppnå. Jo mer
                du deler, desto bedre tilbud kan vi gi deg.
              </p>
              <ContactForm
                showExtendedFields
                className="mt-8"
              />
              <p className="mt-4 text-sm text-[var(--color-dark-muted)]">
                Ved å sende inn skjemaet godtar du vår{" "}
                <a href="/personvern" className="text-[var(--color-accent)] underline">
                  personvernerklæring
                </a>
                .
              </p>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold tracking-[-0.01em] text-[var(--color-dark-text)]">
                  Kontaktinformasjon
                </h2>
                <p className="mt-2 font-light text-[var(--color-dark-muted)]">
                  Foretrekker du å ta kontakt direkte? Vi er tilgjengelige på
                  telefon og e-post i hverdager mellom 08:00 og 17:00.
                </p>
              </div>

              {/* Contact cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-[var(--color-dark-glass)] p-5 backdrop-blur-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/10">
                    <Phone className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-dark-text)]">Telefon</h3>
                    <p className="mt-0.5 text-[var(--color-dark-muted)]">
                      <a href="tel:+4798406164" className="transition-colors hover:text-[var(--color-accent)]">
                        +47 984 06 164
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-[var(--color-dark-glass)] p-5 backdrop-blur-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/10">
                    <Mail className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-dark-text)]">E-post</h3>
                    <p className="mt-0.5 text-[var(--color-dark-muted)]">
                      <a href="mailto:hei@idweb.no" className="transition-colors hover:text-[var(--color-accent)]">
                        hei@idweb.no
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-2xl border border-white/[0.06] bg-[var(--color-dark-glass)] p-5 backdrop-blur-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent)]/10">
                    <Clock className="h-5 w-5 text-[var(--color-accent)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--color-dark-text)]">Åpningstider</h3>
                    <p className="mt-0.5 text-[var(--color-dark-muted)]">
                      Mandag – fredag: 08:00 – 17:00
                    </p>
                    <p className="text-sm text-[var(--color-dark-muted)]">
                      Vi svarer på e-post innen 24 timer, også i helger.
                    </p>
                  </div>
                </div>
              </div>

              {/* Process steps */}
              <div className="rounded-2xl border border-white/[0.06] bg-[var(--color-dark-glass)] p-7 backdrop-blur-sm">
                <h3 className="font-bold text-[var(--color-dark-text)]">
                  Hva skjer etter du tar kontakt?
                </h3>
                <ol className="mt-5 space-y-4">
                  {[
                    "Vi leser meldingen din og forbereder oss.",
                    "Vi tar kontakt innen 24 timer for en uforpliktende samtale.",
                    "Vi sender deg et skreddersydd tilbud med fast pris.",
                    "Du bestemmer — ingen press, ingen forpliktelser.",
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent)]/10 text-sm font-bold text-[var(--color-accent)]">
                        {i + 1}
                      </span>
                      <span className="mt-0.5 text-[var(--color-dark-muted)]">
                        {step}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PaletteBackground>
  );
}
