import Link from "next/link";
import Image from "next/image";
import { SITE_NAME, FOOTER_LINKS, CONTACT_INFO } from "@/lib/constants";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function Footer() {
  return (
    <AuroraBackground as="footer" variant="bottom-center" intensity={0.05} className="border-t border-[var(--color-dark-border)]">
      <div className="mx-auto max-w-6xl px-6 py-16">
        {/* Top section: 4 columns */}
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand + Contact */}
          <div>
            <Link href="/" className="inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]">
              <Image
                src="/images/idweb-logo.png"
                alt="IDweb — Nettsideutvikling i Norge"
                width={300}
                height={100}
                className="h-20 w-auto [filter:drop-shadow(0_0_0.5px_rgba(0,0,0,0.3))]"
                unoptimized
              />
            </Link>
            <p className="mt-3 text-sm text-[var(--color-dark-muted)]">
              Vi bygger nettsider som gir norske bedrifter flere kunder.
            </p>
            <div className="mt-6 space-y-2 text-sm text-[var(--color-dark-muted)]">
              <p>
                <a href={CONTACT_INFO.phoneHref} className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]">
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p>
                <a href={CONTACT_INFO.emailHref} className="hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]">
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p>{CONTACT_INFO.hours}</p>
            </div>
          </div>

          {/* Tjenester */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-pretty text-[var(--color-dark-text)]">
              Tjenester
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.tjenester.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-dark-muted)] transition-colors hover:text-[var(--color-dark-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Selskap */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-pretty text-[var(--color-dark-text)]">
              Selskap
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.selskap.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-dark-muted)] transition-colors hover:text-[var(--color-dark-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Juridisk + CTA */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-pretty text-[var(--color-dark-text)]">
              Juridisk
            </h3>
            <ul className="mt-4 space-y-3">
              {FOOTER_LINKS.juridisk.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--color-dark-muted)] transition-colors hover:text-[var(--color-dark-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link
                href="/kontakt"
                className={`${RAINBOW_BUTTON_CLASSES} px-5 py-2 text-sm`}
              >
                Få et tilbud
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-[var(--color-dark-border)] pt-8 text-center text-sm text-[var(--color-dark-muted)]">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME}. Alle rettigheter
            reservert.
          </p>
        </div>
      </div>
    </AuroraBackground>
  );
}
