"use client";

import { useEffect, useRef, useState } from "react";

const VERTEX_SHADER = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_color0;
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;

// Simplex noise helpers
vec3 mod289(vec3 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0/289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x_ = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x_) - 0.5;
  vec3 ox = floor(x_ + 0.5);
  vec3 a0 = x_ - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 3; i++) {
    value += amplitude * snoise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = u_time * 0.15;

  // Sinusoidal UV warping for organic flow
  vec2 warpedUV = uv;
  warpedUV.x += sin(uv.y * 3.0 + t) * 0.15;
  warpedUV.y += cos(uv.x * 3.0 + t * 0.8) * 0.15;

  float n1 = fbm(warpedUV * 2.0 + t * 0.3);
  float n2 = fbm(warpedUV * 2.5 - t * 0.2 + 5.0);

  // Blend four colors based on noise
  float blend1 = smoothstep(-0.3, 0.3, n1);
  float blend2 = smoothstep(-0.2, 0.4, n2);

  vec3 color = mix(
    mix(u_color0, u_color1, blend1),
    mix(u_color2, u_color3, blend2),
    smoothstep(-0.1, 0.5, n1 + n2 - 0.3)
  );

  // Vignette for edge softness
  float vignette = 1.0 - smoothstep(0.4, 1.2, length(uv - 0.5) * 1.5);
  color *= (0.6 + 0.4 * vignette);

  gl_FragColor = vec4(color, 1.0);
}`;

const COLORS = {
  color0: [0.047, 0.055, 0.137], // #0C0E23 near-black navy
  color1: [0.957, 0.808, 0.078], // #F4CE14 gold
  color2: [0.027, 0.082, 0.180], // #07152E deep navy
  color3: [0.831, 0.643, 0.078], // #D4A414 dark gold
} as const;

const CANVAS_SIZE = 256;

function CssFallback() {
  return (
    <div
      className="mesh-gradient-fallback absolute inset-0"
      aria-hidden="true"
      style={{
        background: [
          `radial-gradient(ellipse 80% 60% at 30% 40%, rgba(12,14,35,0.9) 0%, transparent 70%)`,
          `radial-gradient(ellipse 70% 50% at 70% 60%, rgba(244,206,20,0.3) 0%, transparent 70%)`,
          `radial-gradient(ellipse 60% 70% at 50% 30%, rgba(7,21,46,0.8) 0%, transparent 70%)`,
          `radial-gradient(ellipse 80% 50% at 40% 70%, rgba(212,164,20,0.25) 0%, transparent 70%)`,
        ].join(", "),
        backgroundSize: "200% 200%",
        animation: "meshFallbackDrift 20s ease-in-out infinite alternate",
      }}
    />
  );
}

export function MeshGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      setWebglSupported(false);
      return;
    }

    // Check reduced motion preference
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Compile shaders
    function createShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setWebglSupported(false);
      return;
    }

    gl.useProgram(program);

    // Full-screen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);
    const posLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, "u_time");
    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uColor0 = gl.getUniformLocation(program, "u_color0");
    const uColor1 = gl.getUniformLocation(program, "u_color1");
    const uColor2 = gl.getUniformLocation(program, "u_color2");
    const uColor3 = gl.getUniformLocation(program, "u_color3");

    gl.uniform2f(uRes, CANVAS_SIZE, CANVAS_SIZE);
    gl.uniform3fv(uColor0, COLORS.color0);
    gl.uniform3fv(uColor1, COLORS.color1);
    gl.uniform3fv(uColor2, COLORS.color2);
    gl.uniform3fv(uColor3, COLORS.color3);
    gl.viewport(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // IntersectionObserver to pause when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(canvas);

    // Render loop
    let animationFrameId: number;
    const startTime = performance.now();

    function render() {
      if (isVisible && gl) {
        const elapsed = (performance.now() - startTime) / 1000;
        gl.uniform1f(uTime, elapsed);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
      if (!reducedMotion) {
        animationFrameId = requestAnimationFrame(render);
      }
    }

    // Render first frame always (even with reduced motion)
    gl.uniform1f(uTime, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    if (!reducedMotion) {
      animationFrameId = requestAnimationFrame(render);
    }

    // Handle context loss
    const handleContextLost = (e: Event) => { e.preventDefault(); };
    canvas.addEventListener("webglcontextlost", handleContextLost);

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      canvas.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, []);

  if (!webglSupported) {
    return <CssFallback />;
  }

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full object-cover"
      style={{ imageRendering: "auto" }}
    />
  );
}
