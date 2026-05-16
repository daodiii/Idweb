"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { SITE_NAME, FOOTER_LINKS, CONTACT_INFO } from "@/lib/constants";

const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

function ColumnEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
      <span aria-hidden className="inline-block h-px w-6 bg-[#F4CE14]/70" />
      {children}
    </h3>
  );
}

function FooterAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/[0.06] md:border-none">
      {/* Mobile: native <details> for progressive enhancement (works without JS) */}
      <details className="group md:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-left [&::-webkit-details-marker]:hidden">
          <ColumnEyebrow>{title}</ColumnEyebrow>
          <ChevronDown
            className="h-4 w-4 text-white/55 transition-transform group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <div className="pb-4">{children}</div>
      </details>

      {/* Desktop: always visible */}
      <div className="hidden md:block">
        <ColumnEyebrow>{title}</ColumnEyebrow>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06] bg-[var(--color-dark-bg)]">
      {/* Ambient warm spotlight, bottom-left for visual rhythm */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 8% 95%, rgba(244,206,20,0.07), transparent 65%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.55) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 md:py-20">
        {/* Editorial closing line */}
        <div className="mb-16 max-w-3xl">
          <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-white/55">
            <span aria-hidden className="inline-block h-px w-8 bg-[#F4CE14]/70" />
            La oss snakke
          </p>
          <p className="mt-7 font-serif text-white">
            <span className="block text-[clamp(1.75rem,4vw,2.75rem)] font-extralight leading-[1.1] tracking-[-0.01em] text-white/85">
              Klar for en nettside som{" "}
              <span className="relative inline-block font-black text-white">
                konverterer
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 right-0 h-[3px] rounded-full bg-[#F4CE14]"
                />
              </span>
              ?
            </span>
          </p>
          <div className="mt-7">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-7 py-4 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              Få et tilbud
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ transitionTimingFunction: ENTRY_EASE }}
              />
            </Link>
          </div>
        </div>

        {/* Columns */}
        <div className="grid gap-6 md:grid-cols-2 md:gap-12 lg:grid-cols-4">
          {/* Brand + Contact — always visible */}
          <div>
            <Link
              href="/"
              className="inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
            >
              <Image
                src="/images/idweb-logo.png"
                alt="IDweb — Webutvikling og SEO-optimalisering"
                width={974}
                height={394}
                className="h-16 w-auto md:h-20 [filter:drop-shadow(0_0_0.5px_rgba(0,0,0,0.3))]"
              />
            </Link>
            <p className="mt-4 max-w-[28ch] text-sm leading-relaxed text-white/65">
              Vi bygger nettsider som gir norske bedrifter flere kunder.
            </p>
            <div className="mt-6 space-y-2 text-sm text-white/65">
              <p>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p>
                <a
                  href={CONTACT_INFO.emailHref}
                  className="transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p className="text-white/55">{CONTACT_INFO.hours}</p>
            </div>
          </div>

          {/* Tjenester */}
          <FooterAccordion title="Tjenester">
            <ul className="space-y-3">
              {FOOTER_LINKS.tjenester.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          {/* Selskap */}
          <FooterAccordion title="Selskap">
            <ul className="space-y-3">
              {FOOTER_LINKS.selskap.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>

          {/* Juridisk */}
          <FooterAccordion title="Juridisk">
            <ul className="space-y-3">
              {FOOTER_LINKS.juridisk.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterAccordion>
        </div>

        {/* Bottom bar with yellow line accent */}
        <div className="mt-16 md:mt-20">
          <div aria-hidden className="h-px w-12 bg-[#F4CE14]/70" />
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
            &copy; {new Date().getFullYear()} {SITE_NAME} v/ Daod Ilyas · Org.nr {CONTACT_INFO.orgNr} · Alle rettigheter reservert.
          </p>
        </div>
      </div>
    </footer>
  );
}
