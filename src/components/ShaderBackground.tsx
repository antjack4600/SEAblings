// src/components/ShaderBackground.tsx — subtle animated-gradient WebGL background for the landing page.
"use client";
import { useEffect, useRef } from "react";

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
uniform float u_time;
uniform vec2 u_resolution;
void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float t = u_time * 0.22;
  vec3 dark = vec3(10.0 / 255.0, 27.0 / 255.0, 45.0 / 255.0);
  vec3 teal = vec3(13.0 / 255.0, 156.0 / 255.0, 168.0 / 255.0);
  vec3 col = mix(dark, teal, 0.55 + 0.45 * sin(t + uv.y * 4.0));
  float wave = 0.014 * sin(uv.x * 9.0 + t * 0.8) * sin(uv.y * 7.0 + t * 0.5);
  gl_FragColor = vec4(col + wave, 1.0);
}
`;

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = (canvas.getContext("webgl") ??
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    const vert = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vert, VERTEX_SHADER);
    gl.compileShader(vert);
    const frag = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(frag, FRAGMENT_SHADER);
    gl.compileShader(frag);
    const program = gl.createProgram()!;
    gl.attachShader(program, vert);
    gl.attachShader(program, frag);
    gl.linkProgram(program);
    gl.useProgram(program);

    const buffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const posLoc = gl.getAttribLocation(program, "position")!;
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const timeLoc = gl.getUniformLocation(program, "u_time")!;
    const resLoc = gl.getUniformLocation(program, "u_resolution")!;
    const start = performance.now();
    const tick = (now: number) => {
      const t = (now - start) / 1000;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, t);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 6);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
    return () => {
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] shader-bg" />;
}
