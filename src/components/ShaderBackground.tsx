// src/components/ShaderBackground.tsx — vivid aurora WebGL background for the landing page.
// Falls back to a CSS gradient when WebGL is unavailable; draws one static frame
// when the visitor prefers reduced motion.
"use client";
import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
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

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 st = vec2(uv.x * aspect, uv.y);
  float t = u_time * 0.12;

  vec3 deep = vec3(0.031, 0.075, 0.140);
  vec3 navy = vec3(0.040, 0.130, 0.220);
  vec3 teal = vec3(0.050, 0.610, 0.660);
  vec3 aqua = vec3(0.160, 0.780, 0.720);
  vec3 gold = vec3(0.950, 0.720, 0.290);

  // Two flowing aurora bands, distorted by smooth noise.
  float band1 = sin(st.x * 3.0 + t * 1.3 + noise(st * 2.0 + t) * 2.0) * 0.5 + 0.5;
  float band2 = sin(st.x * 4.7 - t * 0.9 + noise(st * 3.0 - t) * 2.4) * 0.5 + 0.5;
  float velvet = smoothstep(0.15, 0.95, uv.y + (band1 - 0.5) * 0.35);

  vec3 col = mix(deep, navy, velvet);
  col = mix(col, teal, pow(band1, 3.0) * (0.35 + 0.35 * velvet));
  col = mix(col, aqua, pow(band2, 6.0) * 0.28);

  // Warm radial glow behind the hero card.
  vec2 center = vec2(0.5 * aspect, 0.52);
  float d2 = dot(st - center, st - center);
  col += gold * exp(-d2 * 3.5) * 0.10;
  col += teal * exp(-d2 * 9.0) * 0.08;

  // Subtle grain keeps the gradients from banding.
  col += (hash(gl_FragCoord.xy + fract(u_time) * 100.0) - 0.5) * 0.025;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = (canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return; // CSS gradient on the wrapper remains visible.

    const vert = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vert || !frag) return;
    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    if (!buffer) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const posLoc = gl.getAttribLocation(program, "position");
    if (posLoc < 0) return;
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const start = performance.now();

    const render = (seconds: number) => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.uniform1f(timeLoc, seconds);
      gl.uniform2f(resLoc, width, height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
    };

    const loop = (now: number) => {
      render((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches) {
        render(0); // one static frame, no continuous repaint
      } else {
        raf = requestAnimationFrame(loop);
      }
    };

    sync();
    reduce.addEventListener("change", sync);
    window.addEventListener("resize", sync);

    return () => {
      cancelAnimationFrame(raf);
      reduce.removeEventListener("change", sync);
      window.removeEventListener("resize", sync);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <div className="shader-fallback fixed inset-0 z-[-1]" aria-hidden="true">
      <canvas ref={canvasRef} className="shader-bg h-full w-full" />
    </div>
  );
}
