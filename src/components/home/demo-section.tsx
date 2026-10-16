"use client";

import { useEffect, useRef } from "react";
import { demoTabs } from "@/lib/home/demo-tabs";

type Kind = "flyt" | "systemer";

/**
 * One of the two animated sections from the approved demo («Slik jobber vi», «Når kunden trykker»). The markup is static and server-rendered;
 * on the client each scene plays once (the first when the section comes into view, the others when chosen) and holds its last frame.
 */
export function DemoSection({ id, kind, html, warm = false }: { id: string; kind: Kind; html: string; warm?: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const q = <T extends Element>(s: string) => [...root.querySelectorAll<T>(s)];
    if (kind === "flyt") return demoTabs({ root, tabs: q<HTMLElement>(".step"), panels: q<HTMLElement>(".scene") });
    return demoTabs({ root, tabs: q<HTMLElement>(".sys-tab"), panels: q<HTMLElement>(".sys-panel") });
  }, [kind]);

  // .dx wraps the section so the state classes (.play, .is-active) sit inside the scope the CSS expects
  return (
    <div className="dx">
      <section
        ref={ref}
        id={id}
        className={`band${warm ? " warm" : ""}`}
        aria-labelledby={kind === "flyt" ? "flyt-h" : "sys-h"}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
