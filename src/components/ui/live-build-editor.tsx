"use client";

import { useEffect, useMemo, useReducer, useRef } from "react";
import {
  HERO_BUILD_SCENES,
  tokenizeLine,
} from "@/lib/content/hero-build-scenes";
import type {
  PreviewSlot,
  Scene,
  Token,
} from "@/lib/content/hero-build-scenes";

const TOKEN_COLOR: Record<Token["kind"], string> = {
  keyword: "#C586C0",
  tag: "#569CD6",
  attr: "#9CDCFE",
  string: "#F4CE14",
  comment: "#6A737D",
  punct: "#CFCFCF",
  plain: "#D8D8D8",
};

const BASE_CHAR_MS = 22;
const PAUSE_NEWLINE_MS = 55;
const PAUSE_HEAVY_PUNCT_MS = 120;
const COMPILING_MS = 480;
const BUILT_COUNTING_MS = 700;
const HOLDING_MS = 1700;
const FADING_MS = 380;
const STARTUP_DELAY_MS = 950;
const SAVE_FLASH_MS = 380;
const LIGHTHOUSE_TARGET = 98;

type Phase = "typing" | "compiling" | "built" | "holding" | "fading";

type Tokenized = {
  scene: Scene;
  tokensByLine: Token[][];
  lineLengths: number[];
  totalChars: number;
};

function tokenizeScene(scene: Scene): Tokenized {
  const tokensByLine = scene.lines.map((l) =>
    tokenizeLine(l.text, scene.language),
  );
  const lineLengths = scene.lines.map((l) => l.text.length);
  const totalChars = lineLengths.reduce((s, n) => s + n + 1, 0);
  return { scene, tokensByLine, lineLengths, totalChars };
}

function resolveCursor(tokenized: Tokenized, charsTyped: number) {
  let remaining = charsTyped;
  const linesVisible: number[] = [];
  let activeLine = 0;
  let activeCol = 0;
  let done = false;

  for (let i = 0; i < tokenized.lineLengths.length; i++) {
    if (done) {
      linesVisible.push(0);
      continue;
    }
    const lineCharsIncludingNewline = tokenized.lineLengths[i] + 1;
    if (remaining >= lineCharsIncludingNewline) {
      linesVisible.push(tokenized.lineLengths[i]);
      remaining -= lineCharsIncludingNewline;
      activeLine = Math.min(i + 1, tokenized.lineLengths.length - 1);
      activeCol = 0;
    } else {
      linesVisible.push(remaining);
      activeLine = i;
      activeCol = remaining;
      done = true;
    }
  }
  return { linesVisible, activeLine, activeCol };
}

function getRevealedSlots(scene: Scene, linesVisible: number[]) {
  const set = new Set<PreviewSlot>();
  for (let i = 0; i < scene.lines.length; i++) {
    const fullyTyped = linesVisible[i] >= scene.lines[i].text.length;
    if (fullyTyped && scene.lines[i].revealsPreview) {
      set.add(scene.lines[i].revealsPreview as PreviewSlot);
    }
  }
  return set;
}

function charAtPosition(scene: Scene, pos: number): string | undefined {
  if (pos < 0) return undefined;
  let acc = 0;
  for (const line of scene.lines) {
    if (pos < acc + line.text.length) return line.text[pos - acc];
    if (pos === acc + line.text.length) return "\n";
    acc += line.text.length + 1;
  }
  return undefined;
}

function delayAfter(lastChar: string | undefined): number {
  if (lastChar === undefined) return 0;
  if (lastChar === "\n") return PAUSE_NEWLINE_MS;
  if (lastChar === ";" || lastChar === "," || lastChar === ">") {
    return PAUSE_HEAVY_PUNCT_MS;
  }
  // Mild deterministic-ish jitter via fast pseudo-noise.
  const jitter = ((Date.now() % 7) - 3) * 1.6;
  return BASE_CHAR_MS + jitter;
}

type AnimState = {
  sceneIdx: number;
  phase: Phase;
  charsTyped: number;
  phaseStart: number;
  lastCharAt: number;
  lighthouseScore: number;
  fadingOpacity: number;
  saveFlash: boolean;
  saveFlashAt: number;
  hasSavedFlash: boolean;
  hasSwappedScene: boolean;
};

export function LiveBuildEditor() {
  const tokenizedScenes = useMemo(
    () => HERO_BUILD_SCENES.map(tokenizeScene),
    [],
  );

  const stateRef = useRef<AnimState>({
    sceneIdx: 0,
    phase: "typing",
    charsTyped: 0,
    phaseStart: 0,
    lastCharAt: 0,
    lighthouseScore: 0,
    fadingOpacity: 1,
    saveFlash: false,
    saveFlashAt: 0,
    hasSavedFlash: false,
    hasSwappedScene: false,
  });

  const [, forceRender] = useReducer((x: number) => x + 1, 0);
  const rafRef = useRef<number | null>(null);
  const startupTimerRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReduced) {
      const t = tokenizedScenes[0];
      stateRef.current = {
        ...stateRef.current,
        charsTyped: t.totalChars,
        phase: "built",
        lighthouseScore: LIGHTHOUSE_TARGET,
      };
      forceRender();
      return;
    }

    startupTimerRef.current = window.setTimeout(() => {
      const now = performance.now();
      stateRef.current.phaseStart = now;
      stateRef.current.lastCharAt = now;
      rafRef.current = window.requestAnimationFrame(tick);
    }, STARTUP_DELAY_MS);

    const tick = (now: number) => {
      if (
        typeof document !== "undefined" &&
        document.visibilityState !== "visible"
      ) {
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }

      const s = stateRef.current;
      const scene = tokenizedScenes[s.sceneIdx];
      let changed = false;

      if (s.phase === "typing") {
        // Advance every character whose due-time has passed. Accumulates
        // remainder time so we stay on schedule even if rAF fires slower
        // than the per-char interval (which happens under React render load).
        // Cap at 8 chars/tick so a long stall doesn't dump the whole scene.
        let advancedThisTick = 0;
        while (s.charsTyped < scene.totalChars && advancedThisTick < 8) {
          const lastChar = charAtPosition(scene.scene, s.charsTyped - 1);
          const wait = delayAfter(lastChar);
          if (now - s.lastCharAt < wait) break;
          s.charsTyped += 1;
          s.lastCharAt += wait;
          advancedThisTick += 1;
          changed = true;
        }
        if (s.charsTyped >= scene.totalChars) {
          s.phase = "compiling";
          s.phaseStart = now;
          changed = true;
        }
      } else if (s.phase === "compiling") {
        if (now - s.phaseStart >= COMPILING_MS) {
          s.phase = "built";
          s.phaseStart = now;
          s.lighthouseScore = 0;
          changed = true;
        }
      } else if (s.phase === "built") {
        const elapsed = now - s.phaseStart;
        const progress = Math.min(1, elapsed / BUILT_COUNTING_MS);
        const eased = 1 - Math.pow(1 - progress, 3);
        const next = Math.round(eased * LIGHTHOUSE_TARGET);
        if (next !== s.lighthouseScore) {
          s.lighthouseScore = next;
          changed = true;
        }
        if (elapsed >= BUILT_COUNTING_MS) {
          s.phase = "holding";
          s.phaseStart = now;
          changed = true;
        }
      } else if (s.phase === "holding") {
        const elapsed = now - s.phaseStart;
        if (
          elapsed > HOLDING_MS - SAVE_FLASH_MS - 100 &&
          !s.hasSavedFlash
        ) {
          s.saveFlash = true;
          s.saveFlashAt = now;
          s.hasSavedFlash = true;
          changed = true;
        }
        if (s.saveFlash && now - s.saveFlashAt >= SAVE_FLASH_MS) {
          s.saveFlash = false;
          changed = true;
        }
        if (elapsed >= HOLDING_MS) {
          s.phase = "fading";
          s.phaseStart = now;
          s.fadingOpacity = 0;
          changed = true;
        }
      } else if (s.phase === "fading") {
        const elapsed = now - s.phaseStart;
        if (elapsed >= FADING_MS / 2 && !s.hasSwappedScene) {
          s.sceneIdx = (s.sceneIdx + 1) % tokenizedScenes.length;
          s.charsTyped = 0;
          s.lighthouseScore = 0;
          s.fadingOpacity = 1;
          s.hasSwappedScene = true;
          s.hasSavedFlash = false;
          changed = true;
        }
        if (elapsed >= FADING_MS) {
          s.phase = "typing";
          s.phaseStart = now;
          s.lastCharAt = now;
          s.hasSwappedScene = false;
          changed = true;
        }
      }

      if (changed) forceRender();
      rafRef.current = window.requestAnimationFrame(tick);
    };

    return () => {
      if (startupTimerRef.current !== null)
        window.clearTimeout(startupTimerRef.current);
      if (rafRef.current !== null)
        window.cancelAnimationFrame(rafRef.current);
    };
  }, [tokenizedScenes]);

  const s = stateRef.current;
  const tokenized = tokenizedScenes[s.sceneIdx];
  const cursor = resolveCursor(tokenized, s.charsTyped);
  const revealed = getRevealedSlots(tokenized.scene, cursor.linesVisible);

  return (
    <div
      className="relative w-full"
      style={{ perspective: "1400px" }}
      role="img"
      aria-label="Animasjon: kode for nettside skrives og kompileres live"
    >
      <div
        className="editor-window-enter relative mx-auto w-full max-w-[520px] origin-center overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d0d0f]"
        style={{
          transform: "rotateY(-6deg) rotateX(2deg)",
          transformStyle: "preserve-3d",
          boxShadow:
            "0 30px 80px -28px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)",
        }}
        aria-hidden="true"
      >
        <EditorChrome scene={tokenized.scene} saveFlash={s.saveFlash} />
        <div
          style={{
            opacity: s.fadingOpacity,
            transition: "opacity 200ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <EditorBody
            tokenized={tokenized}
            cursor={cursor}
            showCaret={s.phase === "typing" || s.phase === "compiling"}
          />
          <PreviewPane scene={tokenized.scene} revealed={revealed} />
        </div>
        <StatusBar phase={s.phase} lighthouseScore={s.lighthouseScore} />
      </div>

      <div
        className="hero-entrance pointer-events-none absolute -left-2 -bottom-3 select-none"
        style={{ animationDelay: "1.5s" }}
        aria-hidden="true"
      >
        <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.8)]">
          <span className="block h-1.5 w-1.5 rounded-full bg-[#F4CE14]" />
          Built with Next.js
        </div>
      </div>
    </div>
  );
}

function EditorChrome({
  scene,
  saveFlash,
}: {
  scene: Scene;
  saveFlash: boolean;
}) {
  return (
    <>
      <div className="flex h-8 items-center border-b border-white/[0.05] bg-[#101013] px-3">
        <div className="flex items-center gap-1.5">
          <span className="block h-2.5 w-2.5 rounded-full bg-[#FF5F57]/60" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[#FEBC2E]/60" />
          <span className="block h-2.5 w-2.5 rounded-full bg-[#28C840]/60" />
        </div>
        <div className="flex-1 text-center font-mono text-[10.5px] tracking-tight text-white/35">
          ~/idweb/{scene.filename}
        </div>
        <div
          className="font-mono text-[10px] tracking-[0.15em] text-white/60"
          style={{
            opacity: saveFlash ? 1 : 0,
            transition: "opacity 160ms cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          ⌘S
        </div>
      </div>
      <div className="flex h-8 items-end gap-0.5 border-b border-white/[0.05] bg-[#0e0e11] px-2">
        {scene.tabs.map((tab) => (
          <div
            key={tab.label}
            className={
              "flex h-full items-center gap-1.5 rounded-t-md px-3 font-mono text-[11px] " +
              (tab.active
                ? "bg-[#0d0d0f] text-white/85"
                : "text-white/30")
            }
          >
            <span
              className="block h-1 w-1 rounded-full"
              style={{
                background: tab.active ? "#F4CE14" : "rgba(255,255,255,0.18)",
              }}
            />
            {tab.label}
          </div>
        ))}
      </div>
    </>
  );
}

function EditorBody({
  tokenized,
  cursor,
  showCaret,
}: {
  tokenized: Tokenized;
  cursor: { linesVisible: number[]; activeLine: number; activeCol: number };
  showCaret: boolean;
}) {
  return (
    <div className="relative h-[244px] overflow-hidden bg-[#0d0d0f] py-3 font-mono text-[12.5px] leading-[1.62]">
      <div className="flex h-full">
        <div className="select-none px-3 text-right text-white/15">
          {tokenized.scene.lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>
        <div className="relative flex-1 pr-4">
          {tokenized.scene.lines.map((_, i) => {
            const visible = cursor.linesVisible[i] ?? 0;
            const tokens = tokenized.tokensByLine[i];
            const isActive = i === cursor.activeLine;
            return (
              <div key={i} className="relative whitespace-pre">
                <LineSegments tokens={tokens} visibleChars={visible} />
                {isActive && showCaret ? (
                  <span
                    className="editor-caret-blink absolute top-[0.18em] inline-block h-[1.15em] w-[2px] bg-[#F4CE14]"
                    style={{ left: `${visible}ch` }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function LineSegments({
  tokens,
  visibleChars,
}: {
  tokens: Token[];
  visibleChars: number;
}) {
  if (visibleChars <= 0) {
    return <span>&nbsp;</span>;
  }
  let consumed = 0;
  const parts: { text: string; kind: Token["kind"]; key: number }[] = [];
  for (let i = 0; i < tokens.length; i++) {
    if (consumed >= visibleChars) break;
    const tok = tokens[i];
    const take = Math.min(tok.text.length, visibleChars - consumed);
    parts.push({ text: tok.text.slice(0, take), kind: tok.kind, key: i });
    consumed += take;
  }
  return (
    <>
      {parts.map((p) => (
        <span key={p.key} style={{ color: TOKEN_COLOR[p.kind] }}>
          {p.text}
        </span>
      ))}
    </>
  );
}

function PreviewPane({
  scene,
  revealed,
}: {
  scene: Scene;
  revealed: Set<PreviewSlot>;
}) {
  return (
    <div className="border-t border-white/[0.05] bg-[#0a0a0c]">
      <div className="flex h-6 items-center gap-2 border-b border-white/[0.04] bg-[#0e0e11] px-3">
        <div className="flex gap-1">
          <span className="block h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="block h-1.5 w-1.5 rounded-full bg-white/15" />
          <span className="block h-1.5 w-1.5 rounded-full bg-white/15" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2.5 py-[2px] font-mono text-[9.5px] text-white/40">
            <span className="block h-1 w-1 rounded-full bg-[#28C840]/80" />
            {scene.preview.chrome.url}
          </div>
        </div>
      </div>
      <div className="relative h-[130px] overflow-hidden">
        {scene.preview.layout === "site-hero" && (
          <PreviewSiteHero scene={scene} revealed={revealed} />
        )}
        {scene.preview.layout === "google-snippet" && (
          <PreviewGoogleSnippet scene={scene} revealed={revealed} />
        )}
        {scene.preview.layout === "pricing-card" && (
          <PreviewPricingCard scene={scene} revealed={revealed} />
        )}
      </div>
    </div>
  );
}

function SlotFade({
  show,
  children,
}: {
  show: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(4px)",
        transition:
          "opacity 220ms cubic-bezier(0.23,1,0.32,1), transform 220ms cubic-bezier(0.23,1,0.32,1)",
      }}
    >
      {children}
    </div>
  );
}

function PreviewSiteHero({
  scene,
  revealed,
}: {
  scene: Scene;
  revealed: Set<PreviewSlot>;
}) {
  const c = scene.preview.content;
  return (
    <div className="flex h-full flex-col justify-center gap-2 px-5">
      <SlotFade show={revealed.has("headline")}>
        <div
          className="font-serif text-[16px] font-black leading-tight tracking-tight text-white"
          style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
        >
          {c.headline}
        </div>
      </SlotFade>
      <SlotFade show={revealed.has("subtitle")}>
        <div className="text-[11px] leading-snug text-white/55">
          {c.subtitle}
        </div>
      </SlotFade>
      <SlotFade show={revealed.has("cta")}>
        <div>
          <span className="inline-flex items-center gap-1.5 rounded-md bg-[#F4CE14] px-3 py-1.5 text-[10px] font-bold text-black">
            {c.cta}
            <span aria-hidden>→</span>
          </span>
        </div>
      </SlotFade>
    </div>
  );
}

function PreviewGoogleSnippet({
  scene,
  revealed,
}: {
  scene: Scene;
  revealed: Set<PreviewSlot>;
}) {
  const c = scene.preview.content;
  return (
    <div className="flex h-full flex-col justify-center gap-1 bg-[#0a0a0c] px-5 py-3">
      <SlotFade show={revealed.has("snippet-url")}>
        <div className="flex items-center gap-1.5 text-[9.5px] text-white/45">
          <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#F4CE14] text-[7px] font-black leading-none text-black">
            i
          </span>
          IDweb · {c.snippetUrl}
        </div>
      </SlotFade>
      <SlotFade show={revealed.has("snippet-title")}>
        <div
          className="text-[13px] leading-tight text-[#8AB4F8]"
          style={{ fontFamily: "var(--font-body), system-ui, sans-serif" }}
        >
          {c.snippetTitle}
        </div>
      </SlotFade>
      <SlotFade show={revealed.has("snippet-desc")}>
        <div className="text-[10.5px] leading-snug text-white/55">
          {c.snippetDesc}
        </div>
      </SlotFade>
    </div>
  );
}

function PreviewPricingCard({
  scene,
  revealed,
}: {
  scene: Scene;
  revealed: Set<PreviewSlot>;
}) {
  const c = scene.preview.content;
  const features = c.planFeatures ?? ["", "", ""];
  return (
    <div className="flex h-full items-center px-5">
      <div className="flex w-full items-start gap-4">
        <div className="flex flex-col">
          <SlotFade show={revealed.has("plan-name")}>
            <div className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/45">
              {c.planName}
            </div>
          </SlotFade>
          <SlotFade show={revealed.has("plan-price")}>
            <div
              className="mt-1 text-[22px] font-black leading-none tracking-tight text-white"
              style={{ fontFamily: "var(--font-heading), Georgia, serif" }}
            >
              {c.planPrice}
            </div>
          </SlotFade>
          <SlotFade show={revealed.has("plan-delivery")}>
            <div className="mt-1 text-[10px] text-[#F4CE14]/80">
              {c.planDelivery}
            </div>
          </SlotFade>
        </div>
        <div className="flex flex-1 flex-col gap-1 pt-0.5">
          {features.map((feat, i) => {
            const slot = `plan-feature-${i + 1}` as PreviewSlot;
            return (
              <SlotFade key={i} show={revealed.has(slot)}>
                <div className="flex items-center gap-1.5 text-[10.5px] text-white/65">
                  <span className="block h-1 w-1 rounded-full bg-[#F4CE14]" />
                  {feat}
                </div>
              </SlotFade>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatusBar({
  phase,
  lighthouseScore,
}: {
  phase: Phase;
  lighthouseScore: number;
}) {
  const compiling = phase === "compiling";
  const built = phase === "built" || phase === "holding" || phase === "fading";

  return (
    <div className="flex h-7 items-center justify-between border-t border-white/[0.05] bg-[#0e0e11] px-3 font-mono text-[10px] text-white/45">
      <div className="flex items-center gap-2">
        {compiling ? (
          <>
            <span className="block h-1.5 w-1.5 rounded-full bg-[#FEBC2E]" />
            <span>Compiling…</span>
          </>
        ) : (
          <>
            <span className="status-dot-pulse block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Compiled in 312&thinsp;ms</span>
          </>
        )}
      </div>
      <div className="flex items-center gap-3">
        <span
          style={{
            opacity: built ? 1 : 0.4,
            transition: "opacity 200ms cubic-bezier(0.23,1,0.32,1)",
          }}
        >
          <span className="text-white/35">Lighthouse</span>{" "}
          <span className="text-[#F4CE14]">{lighthouseScore}</span>
        </span>
        <span className="hidden text-white/30 sm:inline">LCP 0.8&thinsp;s</span>
        <span className="text-white/25">TSX · UTF-8</span>
      </div>
    </div>
  );
}
