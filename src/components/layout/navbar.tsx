"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoveRight, Menu as MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HoveredLink,
  Menu,
  MenuItem,
} from "@/components/ui/navbar-menu";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

const MOBILE_LINKS = [
  { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
  { href: "/tjenester/seo", label: "SEO-optimalisering" },
  { href: "/tjenester/vedlikehold", label: "Drift og vedlikehold" },
  { href: "/priser", label: "Priser" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/referanser", label: "Referanser" },
  { href: "/blogg", label: "Blogg" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-transform focus:translate-y-0"
      >
        Hopp til innhold
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[var(--color-dark-bg)]/80 backdrop-blur-md">
        <div
          className={cn(
            "mx-auto flex w-full max-w-6xl items-center justify-between",
            "px-6 py-3"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
          >
            <Image
              src="/images/idweb-logo.png"
              alt="IDweb — Nettsideutvikling i Norge"
              width={360}
              height={120}
              className="-my-10 h-28 w-auto [filter:drop-shadow(0_0_0.5px_rgba(0,0,0,0.3))]"
              priority
              fetchPriority="high"
            />
          </Link>

          {/* Center nav with dropdowns — desktop */}
          <div className="hidden md:block">
            <Menu
              setActive={setActive}
              className="border-none bg-transparent p-0 shadow-none dark:border-none dark:bg-transparent"
            >
              <MenuItem setActive={setActive} active={active} item="Tjenester">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/tjenester#nettside">
                    Skreddersydd nettside
                  </HoveredLink>
                  <HoveredLink href="/tjenester#seo">
                    SEO-optimalisering
                  </HoveredLink>
                  <HoveredLink href="/tjenester#vedlikehold">
                    Drift og vedlikehold
                  </HoveredLink>
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Priser">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/priser#starter">Starter</HoveredLink>
                  <HoveredLink href="/priser#profesjonell">
                    Profesjonell
                  </HoveredLink>
                  <HoveredLink href="/priser#bedrift">Bedrift</HoveredLink>
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Om oss">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/om-oss">Om selskapet</HoveredLink>
                  <HoveredLink href="/referanser">Referanser</HoveredLink>
                  <HoveredLink href="/blogg">Blogg</HoveredLink>
                  <HoveredLink href="/faq">FAQ</HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
            aria-expanded={mobileOpen}
            className="inline-flex items-center justify-center rounded-lg p-2 text-[var(--color-dark-text)] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MenuIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {/* CTA button */}
          <Link
            href="/kontakt"
            className={`${RAINBOW_BUTTON_CLASSES} hidden gap-2 px-5 py-2 text-sm md:flex`}
          >
            Kom i gang <MoveRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="absolute inset-x-6 top-full mt-2 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg)]/95 p-6 shadow-xl backdrop-blur-lg md:hidden">
            <nav className="flex flex-col gap-3">
              {MOBILE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--color-text-muted)] transition-colors hover:bg-[var(--color-bg-alt)] hover:text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                onClick={() => setMobileOpen(false)}
                className={`${RAINBOW_BUTTON_CLASSES} mt-2 gap-2 px-5 py-2.5 text-sm`}
              >
                Kom i gang <MoveRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
