/**
 * Homepage hero: a client's text messages arrive one by one; the highlighted words lift off, split in two and land
 * in the desktop site and on the phone, where they become working features. The server renders the finished frame;
 * this engine resets it and plays the sequence once while the hero is on screen, then holds the finished frame.
 * Ported from the approved mockup (idweb-hero/onsker2.html, variant 3).
 */

type Wish = { a: string; m: string; b: string; t: "flood" | 2 | 3 | 4 | 5 | null };

const WISHES: Wish[] = [
  { a: "Den må se ", m: "trygg og ryddig", b: " ut.", t: "flood" },
  { a: "Folk må kunne ", m: "sende bilde", b: " av lekkasjen.", t: 2 },
  { a: "Det må være lett å få tak i oss ", m: "om natta", b: ".", t: 3 },
  { a: "Kunden vil se ", m: "når rørleggeren er på vei", b: ".", t: 4 },
  { a: "", m: "Pris på nytt bad", b: ", uten å vente på befaring.", t: 5 },
  { a: "", m: "Blogg", b: "? Nei, ingen kommer til å lese den.", t: null },
];
const COUNT_DELAY: Record<number, number> = { 4: 700, 5: 900 };
// The calm cut (docs/specs/calm-homepage.md, Part 2): three wishes built and one turned down, without flight trails.
const CALM_WISHES = [0, 1, 3, 5].map((i) => WISHES[i]);
const WORD = ["ingen", "ett", "to", "tre", "fire", "fem", "seks"];

type Mode = "wide" | "narrow" | "mobile";
const halt = new Error("halt");

export function startHero(k: HTMLElement, pauseBtn: HTMLButtonElement | null, opts: { calm?: boolean } = {}) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wishes = opts.calm ? CALM_WISHES : WISHES;
  const st = k.querySelector<HTMLElement>(".stage")!;
  const fit = k.querySelector<HTMLElement>(".fit")!;
  const bd = k.querySelector<HTMLElement>(".bd")!;
  const scr = k.querySelector<HTMLElement>(".scr")!;
  const thread = k.querySelector<HTMLElement>(".thread")!;
  const nb = k.querySelector<HTMLElement>(".nb")!;
  const nd = k.querySelector<HTMLElement>(".nd")!;
  const base = "k v3 rh";
  let mode: Mode = "wide";
  let cls = "m1 m2 m3 m4 m5 done";
  let gen = 0;
  let paused = false;
  let userPaused = false;
  let offscreen = true;
  let started = false;
  let finished = false;
  const resumers: (() => void)[] = [];
  let held: Animation[] = [];

  const apply = () => { k.className = `${base} ${mode === "wide" ? "" : mode}${cls ? " " + cls : ""}`; };
  const size = () => {
    const w = fit.clientWidth;
    mode = w >= 1136 ? "wide" : w >= 700 ? "narrow" : "mobile";
    const sw = mode === "wide" ? 1136 : mode === "narrow" ? 900 : 540;
    const s = Math.min(1, w / sw);
    st.style.transform = `scale(${s})`;
    fit.style.height = `${604 * s}px`;
    apply();
  };
  const setCls = (c: string) => { cls = c; apply(); };

  const fmt = (n: number, f?: string) => (f === "kr" ? `${Math.round(n / 1000)} 000` : String(Math.round(n)));
  const countUp = (el: HTMLElement, dur: number, delay = 0) => {
    const from = Number(el.dataset.from || 0);
    const to = Number(el.dataset.to);
    const f = el.dataset.fmt;
    let acc = 0;
    let last = 0;
    const frame = (now: number) => {
      if (!el.isConnected) return;
      if (!last) last = now;
      if (!paused) acc += now - last;
      last = now;
      const t = Math.max(0, Math.min(1, (acc - delay) / dur));
      el.textContent = fmt(from + (to - from) * (1 - Math.pow(1 - t, 3)), f);
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  };
  const anim = (el: Element, kf: Keyframe[], o: KeyframeAnimationOptions) =>
    el.animate(kf, { fill: "forwards", easing: "cubic-bezier(.77,0,.175,1)", ...o }).finished.catch(() => undefined);
  const rel = (el: Element) => {
    const s = st.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    const q = s.width / st.offsetWidth;
    return { x: (r.left - s.left) / q, y: (r.top - s.top) / q, w: r.width / q, h: r.height / q };
  };
  const centre = (el: Element) => { const r = rel(el); return { x: r.x + r.w / 2, y: r.y + r.h / 2 }; };
  const ripple = (x: number, y: number) => {
    const r = document.createElement("span");
    r.className = "ripple";
    r.style.left = `${x}px`;
    r.style.top = `${y}px`;
    st.appendChild(r);
    anim(r, [{ transform: "scale(.15)", opacity: 1 }, { transform: "scale(2.1)", opacity: 0 }], { duration: 800, easing: "cubic-bezier(.23,1,.32,1)" }).then(() => r.remove());
  };
  const trail = (x: number, y: number) => {
    const d = document.createElement("span");
    d.className = "trail";
    d.style.left = `${x}px`;
    d.style.top = `${y}px`;
    st.appendChild(d);
    anim(d, [{ opacity: 0.7, transform: "scale(1)" }, { opacity: 0, transform: "scale(.2)" }], { duration: 600, easing: "linear" }).then(() => d.remove());
  };
  type P = { x: number; y: number };
  const flyTo = (el: HTMLElement, from: P, to: P, apex: P | null, dur: number, x: { s0?: number; sm?: number; s1?: number; o1?: number } = {}) => {
    const kf: Keyframe[] = [{ transform: `translate(${from.x}px, ${from.y}px) scale(${x.s0 ?? 1})`, opacity: 1 }];
    if (apex) kf.push({ transform: `translate(${apex.x}px, ${apex.y}px) scale(${x.sm ?? 1}) rotate(-4deg)`, opacity: 1, offset: 0.5 });
    kf.push({ transform: `translate(${to.x}px, ${to.y}px) scale(${x.s1 ?? 0.5})`, opacity: x.o1 ?? 0.15 });
    const a = el.animate(kf, { duration: dur, fill: "forwards", easing: "cubic-bezier(.65,0,.35,1)" });
    const tick = () => {
      if (a.playState === "finished" || a.playState === "idle" || !el.isConnected) return;
      if (a.playState === "running" && !opts.calm) {
        const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
        trail(m.m41 + el.offsetWidth / 2, m.m42 + el.offsetHeight / 2);
      }
      setTimeout(() => requestAnimationFrame(tick), 45);
    };
    requestAnimationFrame(tick);
    return a.finished.catch(() => undefined);
  };
  const bump = (el: HTMLElement, n: number) => {
    el.textContent = String(n);
    anim(el, [{ transform: "scale(1.35)" }, { transform: "scale(1)" }], { duration: 400, easing: "cubic-bezier(.23,1,.32,1)", fill: "none" });
  };

  const wait = (g: number, ms: number) => new Promise<void>((res, rej) => setTimeout(() => {
    const go = () => (g === gen ? res() : rej(halt));
    if (g !== gen) return rej(halt);
    if (paused) resumers.push(go);
    else go();
  }, ms));
  const step = async (g: number, p: Promise<unknown>) => { await p; if (g !== gen) throw halt; };

  const msgs: HTMLElement[] = [];
  const reveal = async (g: number, w: Wish) => {
    msgs.forEach((m) => m.classList.add("past"));
    const dots = document.createElement("div");
    dots.className = "dotsb";
    dots.innerHTML = "<i></i><i></i><i></i>";
    thread.appendChild(dots);
    await wait(g, 900);
    dots.remove();
    const m = document.createElement("div");
    m.className = "msg";
    m.append(w.a);
    const mk = document.createElement("mark");
    mk.textContent = w.m;
    m.append(mk, w.b);
    const re = document.createElement("span");
    re.className = `react${w.t ? "" : " no"}`;
    re.textContent = w.t ? "✓ Bygget" : "✕ Nei takk";
    m.append(re);
    thread.appendChild(m);
    msgs.push(m);
    requestAnimationFrame(() => m.classList.add("in"));
    await wait(g, 500);
    return mk;
  };

  // plays once and stops on the finished site; the button then offers to play it again
  const run = async (g: number) => {
    setCls("snap out");
    st.querySelectorAll(".fly,.trail,.ripple").forEach((e) => e.remove());
    thread.innerHTML = "";
    msgs.length = 0;
    k.querySelectorAll<HTMLElement>(".cnt").forEach((c) => { c.textContent = fmt(Number(c.dataset.from || 0), c.dataset.fmt); });
    nb.textContent = "0";
    nd.textContent = "0";
    // the tally and the closing pill count the wishes this cut plays
    const of = k.querySelector(".tally em");
    if (of) of.textContent = `av ${wishes.length} meldinger`;
    const pill = k.querySelector(".final .pill")?.lastChild;
    const yes = wishes.filter((w) => w.t).length;
    const no = wishes.length - yes;
    if (pill) pill.textContent = `Rørlegger Hansen: ${WORD[yes]} ønsker med, ${no === 1 ? "ett" : WORD[no]} nei takk`;
    await wait(g, 60);
    setCls("");
    await wait(g, 900);
    let built = 0;
    let dropped = 0;
    const ms: string[] = [];
    for (let i = 0; i < wishes.length; i++) {
      const w = wishes[i];
      // n is the wish's place in the full story: the stage's feature classes (m2, .f2, .t2 …) are numbered by it
      const n = WISHES.indexOf(w) + 1;
      const mk = await reveal(g, w);
      await wait(g, 220);
      mk.classList.add("lit");
      await wait(g, 560);
      const r = rel(mk);
      const fly = document.createElement("span");
      fly.className = `fly${w.t ? "" : " x"}`;
      fly.textContent = w.m;
      mk.classList.add("gone");
      const from = { x: r.x, y: r.y };
      fly.style.transform = `translate(${from.x}px, ${from.y}px)`;
      st.appendChild(fly);
      const fw = fly.offsetWidth;
      const fh = fly.offsetHeight;
      if (w.t) {
        const desk = mode === "mobile" ? null : w.t === "flood" ? bd.querySelector(".hero-t") : bd.querySelector(`.t${w.t}`);
        const phone = mode === "narrow" ? null : w.t === "flood" ? scr.querySelector(".hero-p") : scr.querySelector(`.p${w.t}`);
        const targets = [desk, phone].filter(Boolean) as Element[];
        const pts = targets.map(centre);
        const apex = { x: (mode === "mobile" ? 420 : 610) - fw / 2, y: 4 };
        await step(g, flyTo(fly, from, apex, null, 720, { s1: 1.12, o1: 1 }));
        const flyers = [fly];
        for (let t = 1; t < pts.length; t++) { const c = fly.cloneNode(true) as HTMLElement; st.appendChild(c); flyers.push(c); }
        await step(g, Promise.all(pts.map((p, t) => flyTo(flyers[t], apex, { x: p.x - fw / 2, y: p.y - fh / 2 },
          t === 0 ? null : { x: (apex.x + p.x) / 2 + 60, y: 40 }, t === 0 ? 650 : 820, { s0: 1.12, sm: 1.0, s1: 0.5 }))));
        flyers.forEach((f) => f.remove());
        pts.forEach((p) => ripple(p.x, p.y));
        if (w.t === "flood") {
          targets.forEach((tg, t) => {
            const host = tg.closest(".bd, .scr") as HTMLElement;
            const fl = host.querySelector<HTMLElement>(".flood")!;
            const hr = rel(host);
            fl.style.setProperty("--cx", `${pts[t].x - hr.x}px`);
            fl.style.setProperty("--cy", `${pts[t].y - hr.y}px`);
          });
        }
        ms.push(`m${n}`);
        setCls(ms.join(" "));
        k.querySelectorAll<HTMLElement>(`.f${n} .cnt`).forEach((c) =>
          countUp(c, Number(c.dataset.dur) || (c.dataset.fmt ? 1800 : 1500), COUNT_DELAY[n] ?? 900));
        bump(nb, ++built);
      } else {
        // the one they didn't need: it sets off, is crossed out and falls away
        const stop = mode === "mobile" ? { x: 120, y: 470 } : { x: 318, y: 430 };
        await step(g, flyTo(fly, from, stop, null, 700, { s1: 1, o1: 1 }));
        fly.classList.add("struck");
        await wait(g, 650);
        await step(g, anim(fly, [
          { transform: `translate(${stop.x}px, ${stop.y}px)`, opacity: 1 },
          { transform: `translate(${stop.x + 14}px, ${stop.y + 110}px) rotate(18deg)`, opacity: 0 },
        ], { duration: 750, easing: "cubic-bezier(.55,0,1,.45)" }));
        fly.remove();
        bump(nd, ++dropped);
      }
      msgs[i].querySelector(".react")?.classList.add("on");
      await wait(g, 800);
    }
    msgs.forEach((m) => m.classList.add("past"));
    setCls(`${ms.join(" ")} done`);
    finished = true;
    sync();
  };

  const sync = () => {
    const p = userPaused || offscreen || document.hidden;
    if (p !== paused) {
      paused = p;
      if (p) {
        held = k.getAnimations({ subtree: true }).filter((a) => a.playState === "running");
        held.forEach((a) => a.pause());
      } else {
        held.forEach((a) => { try { a.play(); } catch { /* already gone */ } });
        held = [];
        resumers.splice(0).forEach((f) => f());
      }
      k.classList.toggle("is-paused", p);
    }
    if (pauseBtn) {
      pauseBtn.dataset.state = finished || userPaused ? "paused" : "playing";
      const lbl = pauseBtn.querySelector(".lbl");
      const text = finished ? "Spill av igjen" : userPaused ? "Spill av" : "Pause";
      if (lbl) lbl.textContent = text;
      pauseBtn.setAttribute("aria-label", finished ? "Spill av animasjonen igjen" : `${text} animasjonen`);
    }
    if (!paused && !started && !reduce) {
      started = true;
      const g = ++gen;
      run(g).catch((e) => { if (e !== halt) console.error(e); });
    }
  };

  const ro = new ResizeObserver(size);
  ro.observe(fit);
  size();
  k.classList.remove("pre");
  const io = new IntersectionObserver(([en]) => { offscreen = !en.isIntersecting; sync(); }, { threshold: 0.2 });
  io.observe(fit);
  const onVis = () => sync();
  document.addEventListener("visibilitychange", onVis);
  const onPause = () => {
    if (finished) {
      finished = false;
      userPaused = false;
      started = false;
      gen++;
    } else userPaused = !userPaused;
    sync();
  };
  pauseBtn?.addEventListener("click", onPause);
  if (reduce && pauseBtn) pauseBtn.hidden = true;

  return () => {
    gen++;
    io.disconnect();
    ro.disconnect();
    document.removeEventListener("visibilitychange", onVis);
    pauseBtn?.removeEventListener("click", onPause);
  };
}
