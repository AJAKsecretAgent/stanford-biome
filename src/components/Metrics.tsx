"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { metrics, metricsArePlaceholder, type Metric } from "@/data/metrics";

function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView || reduced) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.21, 0.6, 0.35, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = Math.round(v).toLocaleString();
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value]);

  return <span ref={ref}>{value.toLocaleString()}</span>;
}

function Tile({ metric, index }: { metric: Metric; index: number }) {
  return (
    <div className="group relative flex min-h-56 flex-col justify-between bg-ink p-6 transition-colors duration-500 hover:bg-ink-2 sm:p-8">
      <p className="eyebrow flex items-center justify-between">
        <span>{metric.label}</span>
        <span className="text-faint">0{index + 1}</span>
      </p>
      <div>
        <p className="display text-6xl tabular-nums sm:text-7xl">
          {metric.prefix}
          <CountUp value={metric.value} />
          <span className="text-glow">{metric.suffix}</span>
        </p>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-mute">{metric.detail}</p>
      </div>
      <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-glow transition-transform duration-700 ease-out-soft group-hover:scale-x-100" />
    </div>
  );
}

export function Metrics() {
  return (
    <section aria-label="BIOME by the numbers" className="border-y border-line">
      {/* 1px gaps over a line-coloured background draw the bento hairlines. */}
      <div className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m, i) => (
          <Tile key={m.label} metric={m} index={i} />
        ))}
      </div>
      {metricsArePlaceholder && (
        <p className="wrap border-t border-line py-3 font-mono text-[10px] uppercase tracking-[0.16em] text-faint">
          Figures are illustrative placeholders
        </p>
      )}
    </section>
  );
}
