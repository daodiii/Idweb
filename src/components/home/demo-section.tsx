"use client";

import { useEffect, useRef } from "react";
import { rotator, splitStreams } from "@/lib/home/rotator";

type Kind = "flyt" | "overalt" | "systemer";

/**
 * One of the three animated sections from the approved demo. The markup is static and server-rendered;
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
    if (kind === "systemer") {
      return rotator({
        root, tabs: q<HTMLElement>(".sys-tab"), panels: q<HTMLElement>(".sys-panel"), bars: q<HTMLElement>(".sb i"),
        pauseBtn, holdEls: q<HTMLElement>(".sys-panels"), dur: 9500,
      });
    }
    // «Én nettside overalt»: the active pill is a clipped copy of the tab row, so text colour and fill change in one motion
    splitStreams(root);
    const list = root.querySelector<HTMLElement>(".tabs:not(.tabs-on)")!;
    const overlay = root.querySelector<HTMLElement>(".tabs-on")!;
    const baseTabs = [...list.querySelectorAll<HTMLElement>(".tab")];
    const urls = q<HTMLElement>(".url > span");
    let active = 0;
    const clip = () => {
      const l = list.getBoundingClientRect();
      const t = baseTabs[active].getBoundingClientRect();
      overlay.style.clipPath = `inset(0 ${(l.right - t.right).toFixed(1)}px 0 ${(t.left - l.left).toFixed(1)}px round 999px)`;
    };
    const stop = rotator({
      root, tabs: baseTabs, panels: q<HTMLElement>(".panel"), bars: q<HTMLElement>(".tabs-on .tp i"),
      pauseBtn, holdEls: q<HTMLElement>(".win"), dur: 7000,
      onShow: (i) => {
        active = i;
        clip();
        urls.forEach((u, k) => u.classList.toggle("on", k === i));
      },
    });
    const ro = new ResizeObserver(clip);
    ro.observe(list);
    document.fonts?.ready.then(clip);
    return () => {
      stop();
      ro.disconnect();
    };
  }, [kind]);

  // .dx wraps the section so the rotator's state classes (.is-paused, .play) sit inside the scope the CSS expects
  return (
    <div className="dx">
      <section
        ref={ref}
        id={id}
        className={`band${alt ? " alt" : ""}`}
        aria-labelledby={kind === "flyt" ? "flyt-h" : kind === "overalt" ? "overalt-h" : "sys-h"}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
