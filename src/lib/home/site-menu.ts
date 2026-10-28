"use client";

import { useSyncExternalStore } from "react";

/**
 * State and motion of the site menu. Opening freezes the page where it is (the shell turns fixed and its content is
 * moved up by the scroll offset, so nothing jumps), then CSS shrinks the page and slides it aside (site-menu.css).
 * Closing plays that back and hands the scroll position back. The classes sit on <html>:
 *   menu-lock: the page is frozen   menu-open: the page is aside and the menu shows   menu-instant: no transitions
 */
const root = () => document.documentElement;
const listeners = new Set<() => void>();
let open = false;
let savedY = 0;
let finish: ReturnType<typeof setTimeout> | undefined;

const emit = () => listeners.forEach((l) => l());
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
/** The page's move takes 0.8 s going out and 0.6 s coming back (site-menu.css). */
const CLOSE_MS = 640;

function unlock() {
  const el = root();
  el.classList.remove("menu-lock", "menu-instant");
  el.style.removeProperty("--menu-y");
  window.scrollTo({ top: savedY, behavior: "instant" });
}

export function openMenu() {
  if (open) return;
  const el = root();
  clearTimeout(finish);
  if (!el.classList.contains("menu-lock")) {
    savedY = window.scrollY;
    el.style.setProperty("--menu-y", `${-savedY}px`);
    el.classList.add("menu-lock");
    void el.offsetWidth; // let the frozen page paint once, so the move starts from where the page is
  }
  el.classList.add("menu-open");
  open = true;
  emit();
}

/** `instant` is for a link in the menu: the page behind it is about to change, so there is nothing to play back. */
export function closeMenu({ instant = false }: { instant?: boolean } = {}) {
  if (!open) return;
  const el = root();
  open = false;
  emit();
  clearTimeout(finish);
  if (instant || reduced()) {
    el.classList.add("menu-instant");
    el.classList.remove("menu-open");
    void el.offsetWidth;
    unlock();
    return;
  }
  el.classList.remove("menu-open");
  finish = setTimeout(unlock, CLOSE_MS);
}

export const toggleMenu = () => (open ? closeMenu() : openMenu());

export function useMenuOpen() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => open,
    () => false,
  );
}
