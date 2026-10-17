"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import type { CaseStep } from "@/lib/content/kundecase";

/* «Det vi bygde». Rendered as rows (words left, picture right), which is also what a visitor without script sees.
   When the page scrolls by itself and the story is wide enough, it becomes a scene: the words scroll on the left and
   one picture stays in the middle of the screen. Both the black words and the picture follow one measurement, the
   step whose centre is nearest the picture's centre, so they cannot disagree. (Two separate triggers drifted apart
   in the mockup.) */
export function Scene({ slug, host, steps }: { slug: string; host: string; steps: CaseStep[] }) {
  const storyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;
    const rows = [...story.querySelectorAll<HTMLElement>(".kc-step")];
    const shots = [...story.querySelectorAll<HTMLElement>("[data-shot]")];
    const pin = story.querySelector<HTMLElement>(".kc-pin")!;
    const frame = pin.querySelector<HTMLElement>(".kc-shot")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let active = -1;
    let raf = 0;

    const set = (i: number) => {
      if (i === active) return;
      active = i;
      rows.forEach((r, j) => r.classList.toggle("on", j === i));
      shots.forEach((s, j) => s.classList.toggle("on", j === i));
    };
    const update = () => {
      raf = 0;
      if (!story.classList.contains("is-scene")) return;
      const r = frame.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      let best = 0;
      let dist = Infinity;
      rows.forEach((row, j) => {
        const b = row.getBoundingClientRect();
        const d = Math.abs(b.top + b.height / 2 - mid);
        if (d < dist) {
          dist = d;
          best = j;
        }
      });
      set(best);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const decide = () => {
      story.classList.remove("is-scene"); // measure the page as plain rows, so the scene cannot vote for itself
      const scrolls = document.documentElement.scrollHeight > innerHeight * 1.6;
      const wide = story.clientWidth >= 760;
      if (scrolls && wide) {
        story.classList.add("is-scene");
        // below the sticky header (76 px), otherwise centred on the screen
        pin.style.setProperty("--pin-top", `${Math.max(96, Math.round((innerHeight - pin.offsetHeight) / 2))}px`);
      }
      active = -1;
      update();
    };

    // rows rise in as they reach the screen; without script, or with reduced motion, they are simply there
    let io: IntersectionObserver | undefined;
    if (!reduce) {
      story.classList.add("kc-anim");
      io = new IntersectionObserver(
        (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io?.unobserve(e.target); } }),
        { rootMargin: "0px 0px -8% 0px" },
      );
      rows.forEach((r) => io!.observe(r));
    }

    const ro = new ResizeObserver(decide);
    ro.observe(story);
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("resize", decide);
    decide();
    return () => {
      ro.disconnect();
      io?.disconnect();
      removeEventListener("scroll", onScroll);
      removeEventListener("resize", decide);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [slug]);

  const src = (img: string) => `/images/kunder/${slug}/${img}.webp`;

  return (
    <>
      <div className="kc-story" ref={storyRef}>
        {steps.map((s) => (
          <article className="kc-step" key={s.img}>
            <div className="kc-step-t">
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
            <figure>
              <Image src={src(s.img)} alt={`${s.title} på ${host}`} width={1600} height={1000} sizes="(max-width: 860px) 100vw, 680px" />
            </figure>
          </article>
        ))}
        <div className="kc-pin" aria-hidden="true">
          <div className="kc-shot">
            {steps.map((s, i) => (
              <Image key={s.img} data-shot={i} className={i === 0 ? "on" : undefined} src={src(s.img)} alt="" fill sizes="680px" />
            ))}
          </div>
          <p className="kc-cap">Skjermbilder fra {host}.</p>
        </div>
      </div>
      <p className="kc-cap kc-story-cap">Skjermbilder fra {host}.</p>
    </>
  );
}
