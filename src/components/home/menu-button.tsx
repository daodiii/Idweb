"use client";

import { toggleMenu, useMenuOpen } from "@/lib/home/site-menu";

/** The hamburger in the header row, on every screen size. It opens the site menu (site-menu.tsx). */
export function MenuButton() {
  const open = useMenuOpen();
  return (
    <button type="button" className="menubtn" aria-expanded={open} aria-controls="site-menu" onClick={toggleMenu}>
      <span className="sr">{open ? "Lukk meny" : "Åpne meny"}</span>
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
        <path d="M2.5 6h13M2.5 12h13" />
      </svg>
    </button>
  );
}
