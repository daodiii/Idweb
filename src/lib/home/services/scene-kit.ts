/**
 * Plays one service scene on a fixed 640×440 canvas that is scaled into its host. Scenes are static markup
 * plus a timeline (`run`) written against the small Api below. A player can also render a scene's final
 * frame at once (`still`), which is how inactive frames and reduced motion are shown.
 * Ported from the approved mockup (idweb-hero/tjenester/tjenester2.html, «Lerretet»).
 */

export const W = 640;
export const H = 440;
export const EO = "cubic-bezier(.23,1,.32,1)";
export const EIO = "cubic-bezier(.77,0,.175,1)";
/** Calm pace: the scenes' timelines were written fast; steps start PACE× later and each motion runs MOTION× longer,
 *  so one step settles before the next begins. */
const PACE = 1.28;
const MOTION = 1.08;

export type Rect = [number, number, number, number];
export type Scene = { dur: number; html: string; run: (a: Api) => void };
type ShowOpts = { from?: string; d?: number; stagger?: number };

const CURSOR =
  '<span class="rng"></span><svg width="20" height="24" viewBox="0 0 20 24"><path d="M2.5 1.5v17.2l4.6-4.4 3 6.9 3.1-1.3-3-6.8h6.4z" fill="#fff" stroke="#14161B" stroke-width="1.5" stroke-linejoin="round"/></svg>';

export class Player {
  readonly cv: HTMLDivElement;
  cur!: HTMLDivElement;
  fast = false;
  timers: ReturnType<typeof setTimeout>[] = [];
  anims: Animation[] = [];
  private ro: ResizeObserver;

  constructor(
    private host: HTMLElement,
    private reduce: boolean,
    private onFocus?: (r: Rect, animate: boolean) => void,
  ) {
    this.cv = document.createElement("div");
    this.cv.className = "cv";
    host.appendChild(this.cv);
    this.ro = new ResizeObserver(() => this.fit());
    this.ro.observe(host);
    this.fit();
  }

  /** Scale the canvas to fill the host (the host keeps the 640×440 ratio). */
  fit() {
    const s = this.host.clientWidth / W || 1;
    this.cv.style.transform = `scale(${s})`;
  }

  at(ms: number, fn: () => void) {
    if (this.fast) fn();
    else this.timers.push(setTimeout(fn, ms * PACE));
  }

  stop() {
    this.timers.forEach(clearTimeout);
    this.timers = [];
    this.anims.forEach((x) => x.cancel());
    this.anims = [];
    this.cv.replaceChildren();
    this.cv.className = "cv";
  }

  private build(sc: Scene, fast: boolean) {
    this.stop();
    this.fast = fast || this.reduce;
    this.cv.className = this.fast ? "cv rm" : "cv";
    this.cv.innerHTML = sc.html;
    this.cur = document.createElement("div");
    this.cur.className = "cur";
    this.cur.innerHTML = CURSOR;
    this.cv.appendChild(this.cur);
    sc.run(new Api(this));
  }

  /** Play a scene from the start; `focus` tells the page where the action is over time. */
  play(sc: Scene, focus: number[][]) {
    this.build(sc, false);
    if (!this.fast) this.cv.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 450, easing: EO });
    focus.forEach(([ms, x, y, w, h]) => this.at(ms, () => this.onFocus?.([x, y, w, h], ms > 0)));
  }

  /** Render the scene's final frame immediately. */
  still(sc: Scene) {
    this.build(sc, true);
    this.fast = false;
  }

  pos(el: Element) {
    const c = this.cv.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const k = c.width / W || 1;
    return { x: (r.left - c.left) / k, y: (r.top - c.top) / k, w: r.width / k, h: r.height / k };
  }

  destroy() {
    this.stop();
    this.ro.disconnect();
  }
}

/** What a scene's timeline can do: schedule steps, reveal, type, animate and move a pointer. */
export class Api {
  private cv: HTMLDivElement;

  constructor(private p: Player) {
    this.cv = p.cv;
  }

  q(s: string) {
    return this.cv.querySelector(s) as HTMLElement;
  }

  qa(s: string) {
    return [...this.cv.querySelectorAll<HTMLElement>(s)];
  }

  at(ms: number, fn: () => void) {
    this.p.at(ms, fn);
  }

  pos(el: Element) {
    return this.p.pos(el);
  }

  anim(el: Element | null, kf: Keyframe[], o: KeyframeAnimationOptions = {}) {
    if (!el) return null;
    const fast = this.p.fast;
    const x = el.animate(kf, { easing: EO, ...o, duration: fast ? 0 : (Number(o.duration) || 400) * MOTION, delay: fast ? 0 : (o.delay || 0) * MOTION });
    this.p.anims.push(x);
    return x;
  }

  enter(sel: string, ms: number) {
    this.at(ms, () => this.anim(this.q(sel), [{ opacity: 0, transform: "translateY(10px) scale(.985)" }, { opacity: 1, transform: "none" }], { duration: 560, fill: "backwards" }));
  }

  show(sel: string, ms: number, o: ShowOpts = {}) {
    this.at(ms, () =>
      this.qa(sel).forEach((el, j) => {
        el.classList.remove("hid");
        this.anim(el, [{ opacity: 0, transform: o.from || "translateY(8px)" }, { opacity: 1, transform: "none" }], { duration: o.d || 450, delay: j * (o.stagger || 0), fill: "backwards" });
      }),
    );
  }

  pop(sel: string, ms: number) {
    this.at(ms, () => {
      const el = this.q(sel);
      el.classList.remove("hid");
      this.anim(el, [{ opacity: 0, transform: "scale(.85)" }, { opacity: 1, transform: "none" }], { duration: 420, fill: "backwards" });
    });
  }

  type(sel: string, text: string, ms: number, cps = 40) {
    this.at(ms, () => {
      const el = this.q(sel);
      if (this.p.fast) {
        el.textContent = text;
        return;
      }
      let i = 0;
      el.textContent = "";
      el.classList.add("typing");
      const id = setInterval(() => {
        el.textContent = text.slice(0, ++i);
        if (i >= text.length) {
          clearInterval(id);
          el.classList.remove("typing");
        }
      }, (1000 / cps) * MOTION);
      this.p.timers.push(id);
    });
  }

  cursor(sel: string, ms: number, o: { click?: boolean } = {}) {
    const click = o.click !== false;
    this.at(ms, () => {
      const t = this.q(sel);
      if (!t) return;
      const p = this.pos(t);
      const cur = this.p.cur;
      cur.style.opacity = "1";
      cur.style.transform = `translate(${p.x + p.w * 0.55 - 3}px,${p.y + p.h * 0.55 - 2}px)`;
    });
    if (!click) return;
    this.at(ms + 620, () => {
      const t = this.q(sel);
      const cur = this.p.cur;
      cur.classList.add("press");
      t?.classList.add("pressed");
      this.anim(cur.querySelector(".rng"), [{ transform: "scale(.4)", opacity: 0.8 }, { transform: "scale(1.4)", opacity: 0 }], { duration: 450, fill: "forwards" });
      const release = () => {
        cur.classList.remove("press");
        t?.classList.remove("pressed");
      };
      if (this.p.fast) release();
      else this.p.timers.push(setTimeout(release, 160));
    });
  }

  away(ms: number) {
    this.at(ms, () => {
      const c = this.p.cur;
      c.style.transform = "translate(600px,460px)";
      c.style.opacity = "0";
    });
  }
}
