/**
 * Auto-advancing tab sets for the homepage demo sections («Fra idé til trygg drift», «Én nettside overalt»,
 * «Systemene som jobber»). Each panel replays a CSS choreography (the `.play` class) when it becomes active;
 * the progress bar of the active tab drives the timing, so pausing is just pausing that bar.
 * Ported from the approved animation demo; all markup is static and authored by us.
 */

const nf = new Intl.NumberFormat("nb-NO");

type Later = (ms: number, fn: () => void) => void;

/** Split streamed answer text into word spans once; highlighted facts sweep in just after their last word. */
export function splitStreams(root: HTMLElement) {
  root.querySelectorAll<HTMLElement>("[data-stream]").forEach((el) => {
    if (el.dataset.split) return;
    el.dataset.split = "1";
    const base = Number(el.dataset.stream) || 0;
    let i = 0;
    const walk = (node: Node) => {
      [...node.childNodes].forEach((n) => {
        if (n.nodeType === Node.TEXT_NODE) {
          const frag = document.createDocumentFragment();
          (n.textContent ?? "").split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.append(part);
              return;
            }
            const w = document.createElement("span");
            w.className = "w";
            w.textContent = part;
            w.style.setProperty("--wd", `${base + i++ * 34}ms`);
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === Node.ELEMENT_NODE) {
          walk(n);
        }
      });
    };
    walk(el);
    el.querySelectorAll<HTMLElement>(".fact").forEach((f) => {
      const words = f.querySelectorAll<HTMLElement>(".w");
      const last = words[words.length - 1];
      if (last) f.style.setProperty("--fd", `${parseInt(last.style.getPropertyValue("--wd"), 10) + 260}ms`);
    });
  });
}

/** Count-ups, typing and cursor targets for the panel that just started playing. */
function runScripts(panel: HTMLElement, later: Later, alive: () => boolean, reduce: boolean) {
  panel.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const to = Number(el.dataset.count);
    const from = Number(el.dataset.from) || 0;
    const suf = el.dataset.suffix ?? "";
    const fmt = (v: number) => nf.format(Math.round(v)) + suf;
    if (reduce) {
      el.textContent = fmt(to);
      return;
    }
    el.textContent = fmt(from);
    later(Number(el.dataset.delay) || 0, () => {
      const t0 = performance.now();
      const dur = Number(el.dataset.dur) || 1000;
      const step = (now: number) => {
        if (!alive()) return;
        const p = Math.min(1, (now - t0) / dur);
        el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - p, 4)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  });
  panel.querySelectorAll<HTMLElement>("[data-type]").forEach((el) => {
    const txt = el.dataset.type ?? "";
    const d = Number(el.dataset.delay) || 0;
    if (reduce) {
      el.textContent = txt;
      return;
    }
    el.textContent = "";
    for (let k = 1; k <= txt.length; k++) {
      later(d + k * 55 + Math.floor(Math.random() * 25), () => {
        el.textContent = txt.slice(0, k);
      });
    }
  });
  panel.querySelectorAll<SVGElement>("[data-cursor]").forEach((cur) => {
    const box = cur.parentElement as HTMLElement;
    const tgt = panel.querySelector<HTMLElement>(cur.dataset.cursor ?? "");
    if (!box || !tgt) return;
    let x = 0;
    let y = 0;
    let n: HTMLElement | null = tgt;
    while (n && n !== box) {
      x += n.offsetLeft;
      y += n.offsetTop;
      n = n.offsetParent as HTMLElement | null;
    }
    cur.style.setProperty("--sx", `${box.offsetWidth * 0.84}px`);
    cur.style.setProperty("--sy", `${box.offsetHeight * 0.98}px`);
    cur.style.setProperty("--cx", `${x + tgt.offsetWidth * 0.6}px`);
    cur.style.setProperty("--cy", `${y + tgt.offsetHeight * 0.55}px`);
  });
}

export type RotatorOptions = {
  root: HTMLElement;
  tabs: HTMLElement[];
  panels: HTMLElement[];
  bars: HTMLElement[];
  pauseBtn: HTMLButtonElement;
  holdEls: HTMLElement[];
  dur: number;
  onShow?: (i: number) => void;
};

/** Wire one tab set. Returns a cleanup function. */
export function rotator({ root, tabs, panels, bars, pauseBtn, holdEls, dur, onShow }: RotatorOptions) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const n = tabs.length;
  let cur = 0;
  let userPaused = reduce;
  let held = false;
  let focusHeld = false;
  let offscreen = true;
  let token = 0;
  let timers: ReturnType<typeof setTimeout>[] = [];
  const off: (() => void)[] = [];
  const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement, ev: K, fn: (e: HTMLElementEventMap[K]) => void) => {
    el.addEventListener(ev, fn as EventListener);
    off.push(() => el.removeEventListener(ev, fn as EventListener));
  };
  root.style.setProperty("--dur", `${dur}ms`);

  const sync = () => {
    root.classList.toggle("is-paused", userPaused || held || focusHeld || offscreen || document.hidden);
    pauseBtn.dataset.state = userPaused ? "paused" : "playing";
    const lbl = pauseBtn.querySelector(".lbl");
    if (lbl) lbl.textContent = userPaused ? "Spill av" : "Pause";
    pauseBtn.setAttribute("aria-label", userPaused ? "Spill av animasjonen" : "Pause animasjonen");
  };
  const setState = () => {
    tabs.forEach((t, k) => {
      const active = k === cur;
      t.setAttribute("aria-selected", String(active));
      t.tabIndex = active ? 0 : -1;
    });
    panels.forEach((p, k) => {
      const active = k === cur;
      p.classList.toggle("is-active", active);
      p.inert = !active;
      if (!active) p.classList.remove("play");
    });
    onShow?.(cur);
  };
  const play = (panel: HTMLElement) => {
    timers.forEach(clearTimeout);
    timers = [];
    const mine = ++token;
    panel.classList.remove("play");
    void panel.offsetWidth;
    panel.classList.add("play");
    runScripts(panel, (ms, fn) => timers.push(setTimeout(fn, ms)), () => token === mine, reduce);
  };
  const show = (i: number, focus = false) => {
    cur = (i + n) % n;
    setState();
    bars.forEach((b, k) => {
      b.classList.remove("run");
      if (k === cur) {
        void b.offsetWidth;
        b.classList.add("run");
      }
    });
    play(panels[cur]);
    if (focus) tabs[cur].focus();
  };

  bars.forEach((b) => on(b, "animationend", (e) => { if (e.target === b && b.classList.contains("run")) show(cur + 1); }));
  tabs.forEach((t, k) => {
    on(t, "click", () => show(k));
    on(t, "keydown", (e) => {
      const step = ({ ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 } as Record<string, number>)[e.key];
      if (step) {
        e.preventDefault();
        show(cur + step, true);
      } else if (e.key === "Home") {
        e.preventDefault();
        show(0, true);
      } else if (e.key === "End") {
        e.preventDefault();
        show(n - 1, true);
      }
    });
  });
  on(pauseBtn, "click", () => {
    userPaused = !userPaused;
    sync();
  });
  holdEls.forEach((el) => {
    on(el, "pointerenter", (e) => { if (e.pointerType === "mouse") { held = true; sync(); } });
    on(el, "pointerleave", () => { held = false; sync(); });
  });
  on(root, "focusin", (e) => {
    const t = e.target as HTMLElement;
    focusHeld = t !== pauseBtn && t.matches(":focus-visible");
    sync();
  });
  on(root, "focusout", (e) => {
    if (!root.contains(e.relatedTarget as Node | null)) {
      focusHeld = false;
      sync();
    }
  });
  document.addEventListener("visibilitychange", sync);
  off.push(() => document.removeEventListener("visibilitychange", sync));
  const io = new IntersectionObserver(
    ([en]) => {
      const wasOff = offscreen;
      offscreen = !en.isIntersecting;
      // replay the current scene each time it comes into view
      if (!offscreen && wasOff) show(cur);
      sync();
    },
    { threshold: 0.25 },
  );
  io.observe(root);

  setState();
  sync();

  return () => {
    io.disconnect();
    timers.forEach(clearTimeout);
    token++;
    off.forEach((f) => f());
  };
}
