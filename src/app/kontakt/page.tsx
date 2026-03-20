import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

export const metadata: Metadata = {
  title: SEO.contact.title,
  description: SEO.contact.description,
  keywords: SEO.contact.keywords,
};

export default function KontaktPage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            La oss snakke om din nettside
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
            Send oss en melding, så tar vi kontakt innen 24 timer. Helt
            uforpliktende — ingen salgspress, bare en ærlig samtale om hva vi
            kan gjøre for deg.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="px-6 pb-24">
        <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold">Send oss en melding</h2>
            <p className="mt-2 text-[var(--color-text-muted)]">
              Fortell oss litt om bedriften din og hva du ønsker å oppnå. Jo mer
              du deler, desto bedre tilbud kan vi gi deg.
            </p>
            <form className="mt-8 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium"
                >
                  Navn *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  placeholder="Ditt fulle navn"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium"
                >
                  E-post *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autoComplete="email"
                  className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  placeholder="din@epost.no"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium"
                >
                  Telefon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  autoComplete="tel"
                  className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  placeholder="123 45 678"
                />
              </div>
              <div>
                <label
                  htmlFor="company"
                  className="block text-sm font-medium"
                >
                  Bedrift
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  autoComplete="organization"
                  className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  placeholder="Bedriftsnavn AS"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium"
                >
                  Melding *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-2 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
                  placeholder="Fortell oss om prosjektet ditt — hva slags nettside trenger du, hva ønsker du å oppnå, og har du en tidsramme i tankene?"
                />
              </div>
              <button
                type="submit"
                className={`${RAINBOW_BUTTON_CLASSES} w-full px-8 py-3 text-lg font-semibold`}
              >
                Send melding
              </button>
              <p className="text-sm text-[var(--color-text-muted)]">
                Ved å sende inn skjemaet godtar du vår{" "}
                <a href="/personvern" className="underline">
                  personvernerklæring
                </a>
                .
              </p>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold">Kontaktinformasjon</h2>
              <p className="mt-2 text-[var(--color-text-muted)]">
                Foretrekker du å ta kontakt direkte? Vi er tilgjengelige på
                telefon og e-post i hverdager mellom 08:00 og 17:00.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold">Telefon</h3>
                <p className="mt-1 text-[var(--color-text-muted)]">
                  <a href="tel:+4798406164" className="hover:underline">
                    +47 984 06 164
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold">E-post</h3>
                <p className="mt-1 text-[var(--color-text-muted)]">
                  <a
                    href="mailto:hei@idweb.no"
                    className="hover:underline"
                  >
                    hei@idweb.no
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold">Åpningstider</h3>
                <p className="mt-1 text-[var(--color-text-muted)]">
                  Mandag – fredag: 08:00 – 17:00
                </p>
                <p className="text-[var(--color-text-muted)]">
                  Vi svarer på e-post innen 24 timer, også i helger.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-[var(--color-border)] p-6">
              <h3 className="font-semibold">Hva skjer etter du tar kontakt?</h3>
              <ol className="mt-4 space-y-3 text-[var(--color-text-muted)]">
                <li className="flex gap-3">
                  <span className="font-bold text-[var(--color-accent)]">
                    1.
                  </span>
                  Vi leser meldingen din og forbereder oss.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[var(--color-accent)]">
                    2.
                  </span>
                  Vi tar kontakt innen 24 timer for en uforpliktende samtale.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[var(--color-accent)]">
                    3.
                  </span>
                  Vi sender deg et skreddersydd tilbud med fast pris.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-[var(--color-accent)]">
                    4.
                  </span>
                  Du bestemmer — ingen press, ingen forpliktelser.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
