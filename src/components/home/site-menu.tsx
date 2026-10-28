"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { schibsted } from "@/lib/home/fonts";
import { LINKS } from "@/lib/home/nav-links";
import { closeMenu, useMenuOpen } from "@/lib/home/site-menu";
import "@/styles/site-menu.css";

const Chevron = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3.5 6l4.5 4.5L12.5 6" />
  </svg>
);

/**
 * The site menu: the page shrinks and slides aside (site-menu.css) and this panel shows in the space it leaves. Sits
 * outside the page shell so it is not scaled with it. Closes on Escape, a click on the shrunken page, a link or a
 * finished navigation; focus moves in on opening and back to the hamburger on closing.
 */
export function SiteMenu() {
  const open = useMenuOpen();
  const pathname = usePathname();
  const [services, setServices] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  // a finished navigation closes the menu, also when it did not start from a link in it
  const [shownFor, setShownFor] = useState(pathname);
  if (shownFor !== pathname) {
    setShownFor(pathname);
    closeMenu({ instant: true });
  }

  useEffect(() => {
    if (open) {
      closeRef.current?.focus({ preventScroll: true });
    } else if (wasOpen.current) {
      document.querySelector<HTMLElement>(".menubtn")?.focus({ preventScroll: true });
    }
    wasOpen.current = open;
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    const onHash = () => closeMenu({ instant: true });
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", onHash);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", onHash);
    };
  }, [open]);

  // the page behind is frozen and out of reach while the menu is open
  useEffect(() => {
    const shell = document.querySelector<HTMLElement>(".page-shell");
    if (shell) shell.inert = open;
  }, [open]);

  const go = () => closeMenu({ instant: true });

  return (
    <div className={`ka smenu-root ${schibsted.variable}`}>
      <div className="smenu-scrim" onClick={() => closeMenu()} aria-hidden="true" />
      <button ref={closeRef} type="button" className="smenu-close" onClick={() => closeMenu()} tabIndex={open ? 0 : -1} aria-hidden={!open}>
        <span className="sr">Lukk meny</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
        </svg>
      </button>
      <div id="site-menu" className="smenu" role="dialog" aria-modal="true" aria-label="Meny" aria-hidden={!open} inert={!open}>
        <nav className="smenu-nav" aria-label="Hovedmeny">
          <ul>
            {LINKS.map((l) => (
              <li key={l.href} className="smenu-item">
                {l.children ? (
                  <>
                    <button type="button" className="smenu-link" aria-expanded={services} onClick={() => setServices((v) => !v)}>
                      {l.label}
                      <Chevron />
                    </button>
                    <div className="smenu-sub" data-open={services || undefined}>
                      <div className="smenu-sub-in">
                        {/* the list scrolls, so it takes focus to be reachable by keyboard */}
                        <div className="smenu-sublist" role="group" aria-label={`${l.label}, sider`} tabIndex={services ? 0 : -1}>
                          {l.children.map((c) => (
                            <Link key={c.href} href={c.href} onClick={go} tabIndex={services ? 0 : -1}>
                              <span>{c.label}</span>
                              {c.text && <small>{c.text}</small>}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <Link href={l.href} className="smenu-link" onClick={go}>
                    {l.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <Link href="/#kontakt" className="smenu-book" onClick={go}>
            Book en gratis prat
          </Link>
        </nav>
      </div>
    </div>
  );
}
