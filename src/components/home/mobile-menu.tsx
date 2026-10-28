"use client";

import { useEffect, useId, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavLink {
  href: string;
  label: string;
  /** One line about the page, shown in the wide desktop menu where a design uses it. */
  text?: string;
  /** Sub-pages, shown in a dropdown on desktop and indented under the link in the phone menu. */
  children?: readonly NavLink[];
}

/**
 * Below 820 px the header links fold into this panel; the booking button sits at its foot, since it does not fit in the
 * header row. The sub-pages of a link are a short scrollable list with a line each. Closes on a link click, Escape, a hash
 * jump or navigation.
 */
export function MobileMenu({ links }: { links: readonly NavLink[] }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  // A finished navigation closes the panel, also when it came from outside the menu.
  const [shownFor, setShownFor] = useState(pathname);
  if (shownFor !== pathname) {
    setShownFor(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("hashchange", close);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("hashchange", close);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        className="menubtn"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr">{open ? "Lukk meny" : "Åpne meny"}</span>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M4 4l10 10M14 4L4 14" /> : <path d="M2.5 6h13M2.5 12h13" />}
        </svg>
      </button>
      <nav id={panelId} className="menupanel" aria-label="Meny" hidden={!open}>
        <div className="wrap">
          <div className="menuscroll">
            {links.map((l) => (
              <div key={l.href} className="menuitem">
                <Link href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </Link>
                {l.children && (
                  // a scrollable region must be reachable by keyboard, so it takes focus
                  <div className="subscroll" role="group" aria-label={`${l.label}, sider`} tabIndex={0}>
                    {l.children.map((c) => (
                      <Link key={c.href} href={c.href} className="sub" onClick={() => setOpen(false)}>
                        <span className="sub-t">{c.label}</span>
                        {c.text && <small className="sub-d">{c.text}</small>}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <Link href="/#kontakt" className="btn dark book menu-book" onClick={() => setOpen(false)}>
            Book en gratis prat
          </Link>
        </div>
      </nav>
    </>
  );
}
