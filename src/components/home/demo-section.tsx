"use client";

import { useEffect, useRef } from "react";
import { rotator } from "@/lib/home/rotator";

type Kind = "flyt" | "systemer";

/**
 * One of the two animated sections from the approved demo («Slik jobber vi», «Når kunden trykker»). The markup is static and server-rendered;
 * on the client a rotator advances its tabs, replays each scene and pauses on hover, focus or when off screen.
 */
export function DemoSection({ id, kind, html, alt = false }: { id: string; kind: Kind; html: string; alt?: boolean }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const q = <T extends Element>(s: string) => [...root.querySelectorAll<T>(s)];
    const pauseBtn = root.querySelector<HTMLButtonElement>(".pause")!;

    if (kind === "flyt") {
      return rotator({
        root, tabs: q<HTMLElement>(".step"), panels: q<HTMLElement>(".scene"), bars: q<HTMLElement>(".step-bar i"),
        pauseBtn, holdEls: q<HTMLElement>(".stage"), dur: 7500,
      });
    }
    return rotator({
      root, tabs: q<HTMLElement>(".sys-tab"), panels: q<HTMLElement>(".sys-panel"), bars: q<HTMLElement>(".sb i"),
      pauseBtn, holdEls: q<HTMLElement>(".sys-panels"), dur: 9500,
    });
  }, [kind]);

  // .dx wraps the section so the rotator's state classes (.is-paused, .play) sit inside the scope the CSS expects
  return (
    <div className="dx">
      <section
        ref={ref}
        id={id}
        className={`band${alt ? " alt" : ""}`}
        aria-labelledby={kind === "flyt" ? "flyt-h" : "sys-h"}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
