/**
 * The services section: one example at a time, alone in a calm frame. The first service's finished frame is shown at
 * once, so nothing waits on the animation; when the frame scrolls into view, that example builds at a calm pace.
 * Choosing a service (the one showing included) builds its example from the start, then it stays finished. Reduced
 * motion shows every example finished. The panel beside the frame (server-rendered, one article per service) follows the choice.
 * Replaces the earlier «Lerretet» canvas, which showed all five frames on one board.
 */
import { SERVICES } from "@/lib/home/services/data";
import { Player } from "@/lib/home/services/scene-kit";
import { SCENES } from "@/lib/home/services/scenes";

export function startServicesStage(root: HTMLElement) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const host = root.querySelector<HTMLElement>(".sv-host")!;
  const tabs = [...root.querySelectorAll<HTMLButtonElement>(".sv-tb")];
  const cards = [...root.querySelectorAll<HTMLElement>(".sv-card")];
  const player = new Player(host, reduce);
  let active = 0;

  const show = (i: number) => {
    const sc = SCENES[SERVICES[i].k];
    if (reduce) player.still(sc);
    else player.play(sc, []);
  };

  player.still(SCENES[SERVICES[0].k]);

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
      if (!reduce) cards[i].animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, easing: "cubic-bezier(.23,1,.32,1)" });
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
    handlers.forEach((off) => off());
    player.destroy();
  };
}
