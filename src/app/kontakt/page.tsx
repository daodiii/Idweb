import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Phone, Mail, Clock, ArrowRight } from "lucide-react";

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
    <div className="bg-[var(--color-dark-bg)]">
      {/* Hero */}
      <AuroraBackground variant="top-center" intensity={0.25}>
        <div className="px-6 py-28 text-center sm:py-36">
          <div className="mx-auto max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[3px] text-[var(--color-accent)]">
              Kontakt
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--color-dark-text)] sm:text-5xl lg:text-6xl">
              La oss snakke om din nettside
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-light text-[var(--color-dark-muted)]">
              Send oss en melding, så tar vi kontakt innen 24 timer. Helt
              uforpliktende — ingen salgspress, bare en ærlig samtale om hva vi
              kan gjøre for deg.
            </p>
          </div>
        </div>
      </AuroraBackground>

      {/* Contact Form + Info */}
      <AuroraBackground variant="center" intensity={0.12} showStarfield={false}>
        <div className="px-6 py-24 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
            {/* Form */}
            <div className="rounded-3xl border border-white/[0.06] bg-[var(--color-dark-glass)] p-8 backdrop-blur-sm sm:p-10">
              <h2 className="text-2xl font-bold text-[var(--color-dark-text)]">
                Send oss en melding
              </h2>
              <p className="mt-2 text-[var(--color-dark-muted)]">
                Fortell oss litt om bedriften din og hva du ønsker å oppnå. Jo mer
                du deler, desto bedre tilbud kan vi gi deg.
              </p>
              <form className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--color-dark-text)]"
                  >
                    Navn *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    autoComplete="name"
                    className="mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[var(--color-dark-text)] placeholder:text-[var(--color-dark-muted)]/50 focus:border-[var(--color-accent)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/50"
                    placeholder="Ditt fulle navn"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--color-dark-text)]"
                  >
                    E-post *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    autoComplete="email"
                    className="mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[var(--color-dark-text)] placeholder:text-[var(--color-dark-muted)]/50 focus:border-[var(--color-accent)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/50"
                    placeholder="din@epost.no"
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-[var(--color-dark-text)]"
                    >
                      Telefon
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      autoComplete="tel"
                      className="mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[var(--color-dark-text)] placeholder:text-[var(--color-dark-muted)]/50 focus:border-[var(--color-accent)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/50"
                      placeholder="123 45 678"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium text-[var(--color-dark-text)]"
                    >
                      Bedrift
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      autoComplete="organization"
                      className="mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[var(--color-dark-text)] placeholder:text-[var(--color-dark-muted)]/50 focus:border-[var(--color-accent)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/50"
                      placeholder="Bedriftsnavn AS"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--color-dark-text)]"
                  >
                    Melding *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="mt-2 w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-[var(--color-dark-text)] placeholder:text-[var(--color-dark-muted)]/50 focus:border-[var(--color-accent)]/50 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]/50"
                    placeholder="Fortell oss om prosjektet ditt — hva slags nettside trenger du, hva ønsker du å oppnå, og har du en tidsramme i tankene?"
                  />
                </div>
                <button
                  type="submit"
                  className={`${RAINBOW_BUTTON_CLASSES} w-full px-8 py-3.5 text-lg font-semibold`}
                >
                  Send melding
                </button>
                <p className="text-sm text-[var(--color-dark-muted)]">
                  Ved å sende inn skjemaet godtar du vår{" "}
                  <a href="/personvern" className="text-[var(--color-accent)] underline">
                    personvernerklæring
                  </a>
                  .
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-[var(--color-dark-text)]">
                  Kontaktinformasjon
                </h2>
                <p className="mt-2 text-[var(--color-dark-muted)]">
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
      </AuroraBackground>
    </div>
  );
}
