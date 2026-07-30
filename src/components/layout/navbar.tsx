"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu as MenuIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  HoveredLink,
  Menu,
  MenuItem,
} from "@/components/ui/navbar-menu";

const ENTRY_EASE = "cubic-bezier(0.23,1,0.32,1)";

const MOBILE_LINKS = [
  { href: "/tjenester/nettside", label: "Skreddersydd nettside" },
  { href: "/nettside", label: "Nettside for din bransje" },
  { href: "/webutvikler", label: "Webutvikler i Oslo-området" },
  { href: "/tjenester/seo", label: "SEO-optimalisering" },
  { href: "/tjenester/vedlikehold", label: "Drift og vedlikehold" },
  { href: "/referanser", label: "Referanser" },
  { href: "/blogg", label: "Nyttige artikler" },
  { href: "/om-oss", label: "Om oss" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar() {
  const [active, setActive] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMobile = useCallback(() => {
    setMobileOpen(false);
    menuButtonRef.current?.focus();
  }, []);

  // Escape key closes mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") closeMobile();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMobile]);

  // Click outside closes mobile menu
  useEffect(() => {
    if (!mobileOpen) return;
    function onClickOutside(e: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        !menuButtonRef.current?.contains(e.target as Node)
      ) {
        closeMobile();
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [mobileOpen, closeMobile]);

  // Focus first link when menu opens
  useEffect(() => {
    if (mobileOpen && mobileMenuRef.current) {
      const firstLink = mobileMenuRef.current.querySelector("a");
      firstLink?.focus();
    }
  }, [mobileOpen]);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-20 rounded-lg bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-[var(--color-text)] transition-transform focus:translate-y-0"
      >
        Hopp til innhold
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[var(--color-dark-bg)]/85">
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
              alt="IDweb — Webutvikling og SEO-optimalisering"
              width={974}
              height={394}
              className="-my-2 h-16 w-auto [filter:drop-shadow(0_0_0.5px_rgba(0,0,0,0.3))]"
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
                  <HoveredLink href="/tjenester/nettside">
                    Skreddersydd nettside
                  </HoveredLink>
                  <HoveredLink href="/nettside">
                    Nettside for din bransje
                  </HoveredLink>
                  <HoveredLink href="/webutvikler">
                    Webutvikler i Oslo-området
                  </HoveredLink>
                  <HoveredLink href="/tjenester/seo">
                    SEO-optimalisering
                  </HoveredLink>
                  <HoveredLink href="/tjenester/vedlikehold">
                    Drift og vedlikehold
                  </HoveredLink>
                </div>
              </MenuItem>

              <Link
                href="/referanser"
                className="text-sm font-medium text-[var(--color-dark-muted)] transition-colors hover:text-[var(--color-dark-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                Referanser
              </Link>

              <Link
                href="/blogg"
                className="text-sm font-medium text-[var(--color-dark-muted)] transition-colors hover:text-[var(--color-dark-text)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
              >
                Nyttige artikler
              </Link>

              <MenuItem setActive={setActive} active={active} item="Om oss">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/om-oss">Om selskapet</HoveredLink>
                  <HoveredLink href="/faq">FAQ</HoveredLink>
                </div>
              </MenuItem>
            </Menu>
          </div>

          {/* Mobile menu button */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={mobileOpen ? "Lukk meny" : "Åpne meny"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            className="inline-flex items-center justify-center rounded-lg p-2 text-[var(--color-dark-text)] transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)] md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <MenuIcon className="h-5 w-5" aria-hidden="true" />
            )}
          </button>

          {/* CTA button — desktop only */}
          <div className="hidden md:block">
            <Link
              href="/kontakt"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-5 py-2 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] active:scale-[0.97]"
              style={{ transitionTimingFunction: ENTRY_EASE }}
            >
              Kom i gang
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                style={{ transitionTimingFunction: ENTRY_EASE }}
              />
            </Link>
          </div>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div
            ref={mobileMenuRef}
            id="mobile-nav-panel"
            role="dialog"
            aria-label="Navigasjonsmeny"
            className="absolute inset-x-6 top-full mt-2 rounded-2xl border border-white/[0.08] bg-[rgba(20,20,22,0.96)] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),0_30px_60px_-30px_rgba(0,0,0,0.8)] md:hidden"
          >
            <nav className="flex flex-col gap-1">
              {MOBILE_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/[0.04] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-4 border-t border-white/[0.06] pt-4">
                <Link
                  href="/kontakt"
                  onClick={closeMobile}
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F4CE14] px-5 py-3 text-sm font-bold text-[#0a0a0a] shadow-[0_10px_30px_-12px_rgba(244,206,20,0.55)] transition-[transform,background-color] duration-150 hover:bg-[#FFE15D] active:scale-[0.97]"
                  style={{ transitionTimingFunction: ENTRY_EASE }}
                >
                  Kom i gang
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    style={{ transitionTimingFunction: ENTRY_EASE }}
                  />
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
