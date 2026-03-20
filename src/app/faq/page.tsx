import Link from "next/link";
import type { Metadata } from "next";
import { SEO } from "@/lib/content/seo";
import { FAQ_PAGE, FAQS } from "@/lib/content/faq";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

export const metadata: Metadata = {
  title: SEO.faq.title,
  description: SEO.faq.description,
  keywords: SEO.faq.keywords,
};

export default function FaqPage() {
  return (
    <div>
      {/* Hero */}
      <section className="px-6 py-24 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {FAQ_PAGE.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--color-text-muted)]">
            {FAQ_PAGE.subheadline}
          </p>
        </div>
      </section>

      {/* FAQ List */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-3xl space-y-8">
          {FAQS.map((faq, index) => (
            <div
              key={index}
              className="border-b border-[var(--color-border)] pb-8"
            >
              <h2 className="text-xl font-bold">{faq.question}</h2>
              <p className="mt-3 text-[var(--color-text-muted)] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-bg-alt)] px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold">
            Fant du ikke svaret du lette etter?
          </h2>
          <p className="mt-4 text-lg text-[var(--color-text-muted)]">
            Ta kontakt med oss — vi svarer gjerne på alle spørsmål, helt
            uforpliktende.
          </p>
          <Link
            href="/kontakt"
            className={`${RAINBOW_BUTTON_CLASSES} mt-8 px-8 py-3 text-lg font-semibold`}
          >
            Kontakt oss
          </Link>
        </div>
      </section>
    </div>
  );
}
