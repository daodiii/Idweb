"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { HERO } from "@/lib/content/homepage";
import { Magnetic } from "@/components/ui/magnetic";
import { EASE, INK, PAPER, YELLOW } from "@/lib/motion";

/**
 * Hero 01 — «Gulltråder». A WebGL fragment shader weaves luminous
 * golden silk threads across the void; the field leans toward the
 * cursor. Static gradient fallback when WebGL or motion is off.
 */

const VERT = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(7.3, 3.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;

  float t = uTime * 0.05;
  vec2 m = (uMouse - 0.5) * 0.55;

  // Domain-warped field — two layers of fbm feeding each other.
  vec2 q = vec2(
    fbm(p * 1.4 + vec2(t * 0.9, -t * 0.5) + m),
    fbm(p * 1.4 - vec2(t * 0.6, t * 0.8) - m * 0.6)
  );
  float f = fbm(p * 2.1 + q * 1.7 - t * 0.4);

  // Luminous contour threads — iso-lines of the warped field.
  float threads = 0.0;
  threads += smoothstep(0.014, 0.0, abs(f - 0.34)) * 0.5;
  threads += smoothstep(0.012, 0.0, abs(f - 0.42)) * 0.85;
  threads += smoothstep(0.010, 0.0, abs(f - 0.50)) * 1.0;
  threads += smoothstep(0.012, 0.0, abs(f - 0.58)) * 0.85;
  threads += smoothstep(0.014, 0.0, abs(f - 0.66)) * 0.5;
  float wash = smoothstep(0.55, 0.95, f);

  vec3 base = vec3(0.043, 0.043, 0.05);
  vec3 amber = vec3(0.5, 0.36, 0.05);
  vec3 gold = vec3(0.957, 0.808, 0.078);

  vec3 col = base;
  col += wash * amber * 0.18;
  col += threads * mix(amber, gold, smoothstep(0.3, 0.7, f)) * 1.0;

  // Keep the energy on the right; the left text zone stays near-black.
  float vign = smoothstep(1.5, 0.35, length(uv - vec2(0.74, 0.42)));
  float leftFade = smoothstep(0.0, 0.62, uv.x + (1.0 - uv.y) * 0.12);
  col = mix(base * 0.9, col, clamp(vign * (0.25 + 0.75 * leftFade), 0.0, 1.0));

  gl_FragColor = vec4(min(col, vec3(1.0)), 1.0);
}
`;

function AuroraCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(sh));
        return null;
      }
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let raf = 0;
    let running = false;
    let visible = true;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const start = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = Math.round(rect.width * dpr);
      canvas.height = Math.round(rect.height * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const frame = () => {
      if (!running) return;
      mouse.x += (mouse.tx - mouse.x) * 0.045;
      mouse.y += (mouse.ty - mouse.y) * 0.045;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };

    const startLoop = () => {
      if (running || !visible || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stopLoop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / rect.width;
      mouse.ty = 1 - (e.clientY - rect.top) / rect.height;
    };

    resize();
    startLoop();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startLoop();
      else stopLoop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stopLoop() : startLoop());
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      stopLoop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}

function RevealLine({
  children,
  index,
  className = "",
}: {
  children: React.ReactNode;
  index: number;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.06em] -mb-[0.06em]">
      <motion.span
        className={`block will-change-transform ${className}`}
        initial={reduced ? { opacity: 0 } : { y: "110%", filter: "blur(8px)" }}
        animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1.0, ease: EASE, delay: 0.3 + index * 0.13 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HeroAurora() {
  return (
    <section
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden pt-20"
      style={{ backgroundColor: "#0B0B0D", color: PAPER }}
    >
      {/* Static fallback gradient (also the reduced-motion experience) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 72% 35%, rgba(244,206,20,0.16), transparent 60%), radial-gradient(ellipse 50% 50% at 85% 80%, rgba(180,130,20,0.12), transparent 60%), #0B0B0D",
        }}
      />
      <AuroraCanvas />

      <div className="relative z-10 px-[4vw]">
        <h1>
          <span className="sr-only">{HERO.headline}</span>
          <span aria-hidden>
            <RevealLine
              index={0}
              className="text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.98] tracking-[-0.05em]"
            >
              Webutvikling
            </RevealLine>
            <RevealLine
              index={1}
              className="text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.98] tracking-[-0.05em]"
            >
              og nettsider
            </RevealLine>
            <RevealLine
              index={2}
              className="text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.98] tracking-[-0.05em]"
            >
              i <span style={{ color: YELLOW }}>Oslo.</span>
            </RevealLine>
          </span>
        </h1>

        <motion.p
          className="mt-8 max-w-[46ch] text-base leading-relaxed sm:text-lg"
          style={{ color: "rgba(243,240,231,0.7)" }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.9 }}
        >
          {HERO.subheadline}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-4"
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 1.05 }}
        >
          <Magnetic>
            <Link
              href="/referanser"
              className="group inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-sm font-semibold transition-colors duration-200 hover:brightness-110 active:scale-[0.97]"
              style={{ backgroundColor: YELLOW, color: INK }}
            >
              {HERO.primaryCta}
              <ArrowUpRight
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </Magnetic>
          <Magnetic strength={0.22}>
            <Link
              href="/kontakt"
              className="inline-flex items-center gap-2 rounded-full border px-7 py-4 text-sm font-semibold transition-colors duration-200 hover:bg-white/[0.06] active:scale-[0.97]"
              style={{ borderColor: "rgba(243,240,231,0.3)", color: PAPER }}
            >
              {HERO.secondaryCta}
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}
