"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { RAINBOW_BUTTON_CLASSES } from "@/components/ui/rainbow-button";

export function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      // Show after scrolling past the hero (roughly 1 viewport height)
      setVisible(window.scrollY > window.innerHeight * 0.9);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[var(--color-dark-bg)]/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        href="/kontakt"
        className={`${RAINBOW_BUTTON_CLASSES} flex w-full items-center justify-center gap-2 py-3 text-sm font-bold`}
      >
        Få et uforpliktende tilbud
        <MoveRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}
