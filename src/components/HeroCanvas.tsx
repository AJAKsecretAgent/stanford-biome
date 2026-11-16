"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background: a slow bioluminescent membrane rendered in one WebGL
 * fragment shader, with drifting "cells" in the dark field.
 *
 * Performance guards: renders at reduced resolution, pauses when the hero
 * is off screen or the tab is hidden, and draws a single still frame when
 * the visitor prefers reduced motion. If WebGL is unavailable the CSS
 * gradient behind the canvas shows instead.
 */

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FRAG = `
precision highp float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x),
             mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0., a = .5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.02 + vec2(13.1, 7.7); a *= .5; }
  return v;
}

void main(){
  vec2 p = (gl_FragCoord.xy - .5 * u_res) / u_res.y;
  float aspect = u_res.x / u_res.y;
  float t = u_time * .05;

  // Domain warp so the membrane edge breathes.
  vec2 q = vec2(fbm(p * 1.3 + vec2(0., t)), fbm(p * 1.3 + vec2(5.2, -t)));
  vec2 w = p + .5 * (q - .5);

  // Diagonal sheet rising to the right. On narrow screens it sits lower
  // so the headline keeps a dark field behind it.
  float lift = mix(-.2, -.14, smoothstep(.6, 1.5, aspect));
  float edge = w.y - (.55 * w.x + lift + .1 * sin(w.x * 2.2 + t * 5.));
  float sheet = smoothstep(.06, -.28, edge);

  // Silky folds running along the sheet.
  float folds = fbm(vec2(w.x * 1.4 - edge * 3.2 + t, edge * 4.5 + t * 2.));
  float body = sheet * (.3 + .7 * folds);
  float rim = exp(-pow(edge / .05, 2.));

  vec3 ink     = vec3(.024, .035, .055);
  vec3 deep    = vec3(.0, .11, .1);
  vec3 emerald = vec3(.06, .86, .56);
  vec3 aqua    = vec3(.37, .89, 1.);
  vec3 pale    = vec3(.82, 1., .94);

  vec3 col = mix(ink, deep, sheet);
  col = mix(col, emerald, body * body * .95);
  col = mix(col, aqua, smoothstep(.52, .92, folds) * sheet * .55);
  col += pale * rim * (.25 + .45 * folds);

  // Drifting cells in the dark field.
  vec2 g = p * 7. + vec2(t * .9, -t * .6);
  vec2 id = floor(g);
  vec2 f = fract(g) - .5;
  vec2 off = (vec2(hash(id), hash(id + 9.3)) - .5) * .7;
  float alive = step(.72, hash(id + 3.7));
  float pulse = .6 + .4 * sin(u_time * .6 + hash(id) * 6.283);
  float cell = smoothstep(.07, .0, length(f - off)) * alive * pulse;
  col += emerald * cell * .32 * (1. - sheet);

  // Film grain.
  col += (hash(gl_FragCoord.xy + fract(u_time) * 91.7) - .5) * .05;

  gl_FragColor = vec4(col, 1.);
}`;

export function HeroCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "u_res");
    const uTime = gl.getUniformLocation(program, "u_time");

    // Soft imagery: three-quarter resolution is indistinguishable and much cheaper.
    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.75;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = performance.now();
    let raf = 0;
    let visible = true;

    const draw = () => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, reduced ? 12 : 12 + (performance.now() - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };
    const play = () => {
      cancelAnimationFrame(raf);
      if (!reduced && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
      draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      play();
    });
    io.observe(canvas);
    document.addEventListener("visibilitychange", play);

    resize();
    canvas.style.opacity = "1";
    play();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", play);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(152deg, #06090e 42%, #053a31 62%, #0fbf82 82%, #5fe3ff 105%)",
      }}
    >
      <canvas ref={ref} className="h-full w-full opacity-0 transition-opacity duration-1000" />
    </div>
  );
}
