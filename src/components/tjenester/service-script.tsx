"use client";

import { useEffect } from "react";

/**
 * Runs a service page's demo script against the server-rendered markup. The script was written as a plain page
 * script, so it is run in a function scope with timers, animation frames and window/document listeners tracked and
 * undone on unmount; the markup is reset first so Strict Mode's second mount starts from the same state.
 */
export function ServiceScript({ html, script }: { html: string; script: string }) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>("[data-svc]");
    if (!root) return;
    root.innerHTML = html;
    root.classList.remove("js");

    const undo: Array<() => void> = [];
    const timeouts = new Set<number>();
    const intervals = new Set<number>();
    const frames = new Set<number>();
    const track = <T extends EventTarget>(target: T): T =>
      new Proxy(target, {
        get(o, k) {
          const v = Reflect.get(o, k, o);
          if (k === "addEventListener") {
            return (...a: Parameters<EventTarget["addEventListener"]>) => {
              o.addEventListener(...a);
              undo.push(() => o.removeEventListener(...a));
            };
          }
          return typeof v === "function" ? v.bind(o) : v;
        },
        set(o, k, v) {
          Reflect.set(o, k, v, o);
          return true;
        },
      });

    const setT = (fn: TimerHandler, ms?: number, ...args: unknown[]) => {
      const id = window.setTimeout(
        (...a: unknown[]) => {
          timeouts.delete(id);
          if (typeof fn === "function") fn(...a);
        },
        ms,
        ...args,
      );
      timeouts.add(id);
      return id;
    };
    const setI = (fn: TimerHandler, ms?: number, ...args: unknown[]) => {
      const id = window.setInterval(fn, ms, ...args);
      intervals.add(id);
      return id;
    };
    const raf = (fn: FrameRequestCallback) => {
      const id = window.requestAnimationFrame((t) => {
        frames.delete(id);
        fn(t);
      });
      frames.add(id);
      return id;
    };

    try {
      new Function("window", "document", "setTimeout", "setInterval", "requestAnimationFrame", script)(
        track(window),
        track(document),
        setT,
        setI,
        raf,
      );
    } catch (err) {
      console.error("Service page script failed", err);
    }

    return () => {
      timeouts.forEach((id) => window.clearTimeout(id));
      intervals.forEach((id) => window.clearInterval(id));
      frames.forEach((id) => window.cancelAnimationFrame(id));
      undo.forEach((fn) => fn());
    };
  }, [html, script]);

  return null;
}
