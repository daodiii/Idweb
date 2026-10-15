/**
 * «Lerretet»: the services section drawn as a design canvas. Five client frames sit on a dotted board; a camera
 * flies to one frame at a time and that frame plays its scene while the others hold their final frame.
 * The panel beside the canvas (server-rendered, one article per service) follows the camera.
 * Autoplay pauses on hover, keyboard focus, the pause button, a hidden tab or when the section is off screen.
 * Ported from the approved mockup (idweb-hero/tjenester/tjenester2.html, «Lerretet»).
 */
import { CANVAS_NOTES, FRAME_POS, SERVICES } from "@/lib/home/services/data";
import { EIO, Player, type Rect } from "@/lib/home/services/scene-kit";
import { FOCUS, SCENES } from "@/lib/home/services/scenes";

const HOLD = 2600;
const FLY = 1500;
const WORLD = { x: -10, y: -10, w: 2140, h: 1120 };
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;");

type Cam = { s: number; tx: number; ty: number };
type Box = { x: number; y: number; w: number; h: number };

export function startServicesCanvas(root: HTMLElement) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const vp = root.querySelector<HTMLElement>(".sv-vp")!;
  const world = root.querySelector<HTMLElement>(".sv-world")!;
  const tbar = root.querySelector<HTMLElement>(".sv-tbar")!;
  const tabs = [...root.querySelectorAll<HTMLButtonElement>(".sv-tb[data-i]")];
  const allBtn = root.querySelector<HTMLButtonElement>(".sv-all")!;
  const pauseBtn = root.querySelector<HTMLButtonElement>(".sv-pause")!;
  const cards = [...root.querySelectorAll<HTMLElement>(".sv-card")];
  const overCard = root.querySelector<HTMLElement>(".sv-over")!;
  const panel = root.querySelector<HTMLElement>(".sv-panel")!;
  const n = SERVICES.length;

  let players: Player[] = [];
  let frames: HTMLElement[] = [];
  let built = false;
  let active = -1; // -1 before the first flight, -2 while showing the whole canvas
  let userPaused = reduce;
  let held = false;
  let focusHeld = false;
  let offscreen = true;
  let left = 0;
  let armedAt = 0;
  let advT: ReturnType<typeof setTimeout> | undefined;
  let playT: ReturnType<typeof setTimeout> | undefined;
  let introT: ReturnType<typeof setTimeout> | undefined;
  let flight: Animation | null = null;
  let raf = 0;
  let cardToken = 0;
  const off: (() => void)[] = [];
  const on = <K extends keyof HTMLElementEventMap>(el: HTMLElement, ev: K, fn: (e: HTMLElementEventMap[K]) => void) => {
    el.addEventListener(ev, fn as EventListener);
    off.push(() => el.removeEventListener(ev, fn as EventListener));
  };

  /* ---------- camera ---------- */
  const narrow = () => vp.clientWidth < 760;
  const besidePanel = () => getComputedStyle(panel).position === "absolute";
  const area = () => ({ w: vp.clientWidth - (besidePanel() ? 332 : 0), h: vp.clientHeight - 70 });
  const frameBox = (i: number): Box => ({ x: FRAME_POS[i].x - 10, y: FRAME_POS[i].y - 4, w: 660, h: 476 });
  const focusBox = (i: number, r: Rect): Box => ({ x: FRAME_POS[i].x + r[0], y: FRAME_POS[i].y + 24 + r[1], w: r[2], h: r[3] });
  const firstFocus = (i: number): Rect => FOCUS[SERVICES[i].k][0].slice(1) as Rect;
  const T = (c: Cam) => `translate(${c.tx}px,${c.ty}px) scale(${c.s})`;
  const target = (b: Box, pad: number): Cam => {
    const A = area();
    const s = Math.min((A.w - 2 * pad) / b.w, (A.h - 2 * pad) / b.h);
    return { s, tx: (A.w - b.w * s) / 2 - b.x * s, ty: (A.h - b.h * s) / 2 - b.y * s + 4 };
  };
  const current = (): Cam => {
    const t = getComputedStyle(world).transform;
    const m = new DOMMatrix(t === "none" ? undefined : t);
    return { s: m.a || 1, tx: m.e, ty: m.f };
  };
  const dots = (c: Cam) => {
    vp.style.backgroundSize = `${22 * c.s}px ${22 * c.s}px`;
    vp.style.backgroundPosition = `${c.tx}px ${c.ty}px`;
  };
  // Fly the camera to a box; when `via` is set it pulls back halfway, so a jump between frames reads as travel.
  const fly = (b: Box, dur: number, via = false, pad = narrow() ? 12 : 28) => {
    const to = target(b, pad);
    const from = current();
    flight?.cancel();
    world.style.transform = T(to);
    cancelAnimationFrame(raf);
    if (!dur || reduce) {
      dots(to);
      return;
    }
    const kf: Keyframe[] = [{ transform: T(from) }];
    if (via) {
      const A = area();
      const p1 = { x: (A.w / 2 - from.tx) / from.s, y: (A.h / 2 - from.ty) / from.s };
      const p2 = { x: (A.w / 2 - to.tx) / to.s, y: (A.h / 2 - to.ty) / to.s };
      const sm = Math.min(from.s, to.s) * 0.62;
      const pm = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
      kf.push({ transform: T({ s: sm, tx: A.w / 2 - pm.x * sm, ty: A.h / 2 - pm.y * sm }), offset: 0.5 });
    }
    kf.push({ transform: T(to) });
    flight = world.animate(kf, { duration: dur, easing: EIO });
    const loop = () => {
      dots(current());
      if (flight?.playState === "running") raf = requestAnimationFrame(loop);
      else dots(to);
    };
    raf = requestAnimationFrame(loop);
  };
  const reframe = () => {
    if (!built) return;
    if (active >= 0) fly(narrow() ? focusBox(active, firstFocus(active)) : frameBox(active), 0);
    else fly(WORLD, 0, false, 30);
  };

  /* ---------- canvas ---------- */
  const build = () => {
    built = true;
    world.innerHTML =
      SERVICES.map(
        (s, i) => `<div class="sv-lf" style="left:${FRAME_POS[i].x}px;top:${FRAME_POS[i].y}px">
          <div class="sv-lab"><span>${esc(s.title)}</span><small>${esc(s.client)}</small></div>
          <div class="sv-box"><div class="sv-host"></div><span class="sv-sel"><i></i><i></i><i></i><i></i></span><span class="sv-dim">640 × 440</span></div></div>`,
      ).join("") +
      CANVAS_NOTES.map((c) => `<div class="sv-cm" style="left:${c.x}px;top:${c.y}px"><i>ID</i><span>${esc(c.t)}</span></div>`).join("");
    frames = [...world.querySelectorAll<HTMLElement>(".sv-lf")];
    players = frames.map(
      (f, i) =>
        new Player(f.querySelector<HTMLElement>(".sv-host")!, reduce, (r, animate) => {
          // on phones the camera follows the action inside the active frame
          if (narrow() && active === i) fly(focusBox(i, r), animate ? 1200 : 0);
        }),
    );
    players.forEach((p, i) => p.still(SCENES[SERVICES[i].k]));
    fly(WORLD, 0, false, 30);
  };

  /* ---------- panel ---------- */
  const showCard = (el: HTMLElement) => {
    const cur = cards.find((c) => !c.hidden);
    if (cur === el) return;
    const mine = ++cardToken;
    const swap = () => {
      if (mine !== cardToken) return;
      cards.forEach((c) => (c.hidden = c !== el));
      if (!reduce) el.animate([{ opacity: 0, filter: "blur(3px)" }, { opacity: 1, filter: "blur(0px)" }], { duration: 260, easing: "ease-out" });
    };
    if (!cur || reduce) swap();
    else cur.animate([{ opacity: 1 }, { opacity: 0, filter: "blur(3px)" }], { duration: 180, easing: "ease-out" }).onfinish = swap;
  };

  /* ---------- autoplay ---------- */
  const stalled = () => userPaused || held || focusHeld || offscreen || document.hidden || active < 0;
  const sync = () => {
    if (armedAt) {
      clearTimeout(advT);
      left = Math.max(600, left - (performance.now() - armedAt));
      armedAt = 0;
    }
    if (!stalled()) {
      armedAt = performance.now();
      advT = setTimeout(() => go((active + 1) % n), left);
    }
    root.classList.toggle("is-paused", stalled());
    pauseBtn.dataset.state = userPaused ? "paused" : "playing";
    pauseBtn.setAttribute("aria-label", userPaused ? "Spill av animasjonen" : "Pause animasjonen");
    const lbl = pauseBtn.querySelector(".lbl");
    if (lbl) lbl.textContent = userPaused ? "Spill av" : "Pause";
  };
  const restartBar = (i: number, total: number, delay: number) => {
    tabs.forEach((t, k) => {
      const bar = t.querySelector<HTMLElement>(".sv-pg i")!;
      bar.style.animation = "none";
      if (k !== i || reduce) return;
      void bar.offsetWidth;
      bar.style.animation = `sv-prog ${total}ms linear ${delay}ms forwards`;
    });
  };

  function go(i: number) {
    if (!built) build();
    clearTimeout(playT);
    clearTimeout(advT);
    armedAt = 0;
    const prev = active;
    active = i;
    if (prev >= 0 && prev !== i) players[prev].still(SCENES[SERVICES[prev].k]);
    frames.forEach((f, k) => f.classList.toggle("is-sel", k === i));
    tabs.forEach((t, k) => t.setAttribute("aria-pressed", String(k === i)));
    allBtn.setAttribute("aria-pressed", "false");
    showCard(cards[i]);
    const dur = prev === i ? 0 : FLY;
    fly(narrow() ? focusBox(i, firstFocus(i)) : frameBox(i), dur, prev >= 0 && prev !== i);
    const delay = Math.max(0, dur - 200);
    const sc = SCENES[SERVICES[i].k];
    if (userPaused) playT = setTimeout(() => players[i].still(sc), delay);
    else playT = setTimeout(() => players[i].play(sc, FOCUS[SERVICES[i].k]), delay);
    left = delay + sc.dur + HOLD;
    restartBar(i, sc.dur + HOLD, delay);
    const t = tabs[i];
    if (tbar.scrollWidth > tbar.clientWidth) tbar.scrollTo({ left: t.offsetLeft - 20, behavior: reduce ? "auto" : "smooth" });
    sync();
  }

  const showAll = () => {
    if (!built) build();
    clearTimeout(playT);
    if (active >= 0) {
      players[active].still(SCENES[SERVICES[active].k]);
      frames[active].classList.remove("is-sel");
    }
    active = -2;
    tabs.forEach((t) => t.setAttribute("aria-pressed", "false"));
    allBtn.setAttribute("aria-pressed", "true");
    restartBar(-1, 0, 0);
    showCard(overCard);
    fly(WORLD, 1300, false, 30);
    sync();
  };

  /* ---------- events ---------- */
  tabs.forEach((t, i) => on(t, "click", () => go(i)));
  on(allBtn, "click", showAll);
  root.querySelectorAll<HTMLButtonElement>(".sv-jump").forEach((b) => on(b, "click", () => go(Number(b.dataset.i))));
  on(pauseBtn, "click", () => {
    userPaused = !userPaused;
    if (active >= 0) {
      const sc = SCENES[SERVICES[active].k];
      if (userPaused) {
        clearTimeout(playT);
        players[active].still(sc);
      }
      left = HOLD;
      restartBar(active, HOLD, 0);
    }
    sync();
  });
  on(vp, "pointerenter", (e) => {
    if (e.pointerType === "mouse") {
      held = true;
      sync();
    }
  });
  on(vp, "pointerleave", () => {
    held = false;
    sync();
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
      const was = offscreen;
      offscreen = !en.isIntersecting;
      if (!offscreen && was) {
        if (!built) {
          build();
          introT = setTimeout(() => go(0), reduce ? 0 : 900);
        } else if (active >= 0) {
          go(active); // replay the current scene when it comes back into view
        }
      } else if (offscreen && !was && active >= 0) {
        clearTimeout(playT);
        players[active].still(SCENES[SERVICES[active].k]);
      }
      sync();
    },
    { threshold: 0.2 },
  );
  io.observe(vp);
  const ro = new ResizeObserver(reframe);
  ro.observe(vp);
  sync();

  return () => {
    io.disconnect();
    ro.disconnect();
    clearTimeout(advT);
    clearTimeout(playT);
    clearTimeout(introT);
    flight?.cancel();
    cancelAnimationFrame(raf);
    players.forEach((p) => p.destroy());
    off.forEach((f) => f());
  };
}
