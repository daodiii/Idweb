/**
 * The services section: one example at a time, alone in a calm frame. The first service's finished frame is shown at
 * once, so nothing waits on the animation; when the frame scrolls into view, that example builds at a calm pace.
 * Choosing a service (the one showing included) builds its example from the start, then it stays finished. Reduced
 * motion shows every example finished. The panel beside the frame (server-rendered, one article per service) follows the choice.
 * Four examples are canvas scenes (scenes.ts); «Timebestilling» and «Nettbutikk» are live demos (demos.ts) of the
 * customer's phone beside what happens by itself, laid out on a fixed canvas that is scaled into the frame.
 * Replaces the earlier «Lerretet» canvas, which showed all five frames on one board.
 */
import { playPanel } from "@/lib/home/demo-tabs";
import { SERVICES, type DemoKey, type SceneKey } from "@/lib/home/services/data";
import { DEMOS } from "@/lib/home/services/demos";
import { Player } from "@/lib/home/services/scene-kit";
import { SCENES } from "@/lib/home/services/scenes";

/** The demo canvas: wide with the phone and the timeline side by side, or narrow with the timeline under the phone. */
const DEMO_W = 890;
const DEMO_H = 612;
const DEMO_NARROW_W = 400;
const NARROW_BELOW = 600;
const EASE = "cubic-bezier(.23,1,.32,1)";

const isDemo = (k: string): k is DemoKey => k in DEMOS;

export function startServicesStage(root: HTMLElement) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const host = root.querySelector<HTMLElement>(".sv-host")!;
  const frame = root.querySelector<HTMLElement>(".sv-frame")!;
  const tabs = [...root.querySelectorAll<HTMLButtonElement>(".sv-tb")];
  const cards = [...root.querySelectorAll<HTMLElement>(".sv-card")];
  const player = new Player(host, reduce);
  let active = 0;

  // the live demos sit in their own layer beside the scene canvas
  const wrap = document.createElement("div");
  wrap.className = "dx dmo-wrap";
  wrap.hidden = true;
  const panel = document.createElement("div");
  panel.className = "dmo";
  wrap.append(panel);
  host.append(wrap);
  let stopDemo = () => {};

  const layoutDemo = () => {
    const narrow = frame.clientWidth < NARROW_BELOW;
    const w = narrow ? DEMO_NARROW_W : DEMO_W;
    panel.classList.toggle("narrow", narrow);
    panel.style.width = `${w}px`;
    panel.style.height = narrow ? "auto" : `${DEMO_H}px`;
    frame.style.aspectRatio = `${w} / ${narrow ? panel.offsetHeight : DEMO_H}`;
    panel.style.transform = `scale(${frame.clientWidth / w})`;
  };
  const ro = new ResizeObserver(() => {
    if (!wrap.hidden) layoutDemo();
  });
  ro.observe(frame);

  const leaveDemo = () => {
    stopDemo();
    stopDemo = () => {};
    wrap.hidden = true;
    panel.replaceChildren();
    frame.style.removeProperty("aspect-ratio");
  };

  const showDemo = (key: DemoKey) => {
    stopDemo();
    player.stop();
    panel.innerHTML = DEMOS[key];
    wrap.hidden = false;
    layoutDemo();
    stopDemo = playPanel(panel, reduce);
    if (!reduce) wrap.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: EASE });
  };

  const show = (i: number) => {
    const k = SERVICES[i].k;
    if (isDemo(k)) {
      showDemo(k);
      return;
    }
    leaveDemo();
    const sc = SCENES[k as SceneKey];
    if (reduce) player.still(sc);
    else player.play(sc, []);
  };

  player.still(SCENES[SERVICES[0].k as SceneKey]);

  // the first example builds when most of the frame is on screen, once
  const io = new IntersectionObserver(
    ([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      show(active);
    },
    { threshold: 0.6 },
  );
  if (!reduce) io.observe(host);

  const choose = (i: number) => {
    io.disconnect();
    if (i !== active) {
      active = i;
      tabs.forEach((t, k) => t.setAttribute("aria-pressed", String(k === i)));
      cards.forEach((c, k) => (c.hidden = k !== i));
      if (!reduce) cards[i].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: EASE });
    }
    show(i);
  };

  const handlers = tabs.map((t, i) => {
    const fn = () => choose(i);
    t.addEventListener("click", fn);
    return () => t.removeEventListener("click", fn);
  });

  return () => {
    io.disconnect();
    ro.disconnect();
    handlers.forEach((off) => off());
    stopDemo();
    player.destroy();
    wrap.remove();
  };
}
