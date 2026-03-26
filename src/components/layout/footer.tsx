"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { SITE_NAME, FOOTER_LINKS, CONTACT_INFO } from "@/lib/constants";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";
import { PaletteBackground } from "@/components/ui/palette-background";

function FooterAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-[var(--color-dark-border)] md:border-none">
      {/* Mobile: native <details> for progressive enhancement (works without JS) */}
      <details className="group md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between py-3 text-left [&::-webkit-details-marker]:hidden">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-dark-text)]">
            {title}
          </h3>
          <ChevronDown
            className="h-4 w-4 text-[var(--color-dark-muted)] transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="pb-4">
          {children}
        </div>
      </details>

      {/* Desktop: always visible */}
      <div className="hidden md:block">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-pretty text-[var(--color-dark-text)]">
          {title}
        </h3>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <PaletteBackground as="footer" palette="kosmos" intensity={0.4} className="border-t border-[var(--color-dark-border)]">
      <div className="mx-auto max-w-6xl px-6 pb-24 pt-10 md:py-16">
        {/* Top section */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          {/* Brand + Contact — always visible */}
          <div>
            <Link href="/" className="inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]">
              <Image
                src="/images/idweb-logo.png"
                alt="IDweb — Webutvikling og SEO-optimalisering"
                width={974}
                height={394}
                className="h-16 w-auto md:h-20 [filter:drop-shadow(0_0_0.5px_rgba(0,0,0,0.3))]"
              />
            </Link>
            <p className="mt-3 text-sm text-[var(--color-dark-muted)]">
              Jeg bygger nettsider som gir norske bedrifter flere kunder.
            </p>
            <div className="mt-4 space-y-1.5 text-sm text-[var(--color-dark-muted)] md:mt-6 md:space-y-2">
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
          <FooterAccordion title="Tjenester">
            <ul className="space-y-2.5 md:space-y-3">
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
          </FooterAccordion>

          {/* Selskap */}
          <FooterAccordion title="Selskap">
            <ul className="space-y-2.5 md:space-y-3">
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
          </FooterAccordion>

          {/* Juridisk + CTA */}
          <FooterAccordion title="Juridisk">
            <ul className="space-y-2.5 md:space-y-3">
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
            <div className="mt-6 md:mt-8">
              <Link
                href="/kontakt"
                className={`${RAINBOW_BUTTON_CLASSES} px-5 py-2 text-sm`}
              >
                Få et tilbud
              </Link>
            </div>
          </FooterAccordion>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 border-t border-[var(--color-dark-border)] pt-6 text-center text-xs text-[var(--color-dark-muted)] md:mt-12 md:pt-8 md:text-sm">
          <p>
            &copy; {new Date().getFullYear()} {SITE_NAME} v/ Daod Ilyas. Org.nr: {CONTACT_INFO.orgNr}. Alle rettigheter
            reservert.
          </p>
        </div>
      </div>
    </PaletteBackground>
  );
}
