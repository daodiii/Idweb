"use client";

import { useEffect, useRef } from "react";
import { demoTabs } from "@/lib/home/demo-tabs";

/**
 * The animated «Slik jobber vi» section from the approved demo. The markup is static and server-rendered;
 * on the client each scene plays once (the first when the section comes into view, the others when chosen) and holds its last frame.
 */
export function DemoSection({ id, html, warm = false }: { id: string; html: string; warm?: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const q = <T extends Element>(s: string) => [...root.querySelectorAll<T>(s)];
    return demoTabs({ root, tabs: q<HTMLElement>(".step"), panels: q<HTMLElement>(".scene") });
  }, []);

  // .dx wraps the section so the state classes (.play, .is-active) sit inside the scope the CSS expects
  return (
    <div className="dx">
      <section ref={ref} id={id} className={`band${warm ? " warm" : ""}`} aria-labelledby="flyt-h" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
