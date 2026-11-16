"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Venture } from "@/data/ventures";
import { Arrow } from "./ui";

function Tag({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
        accent ? "border-glow/40 text-glow" : "border-line-2 text-mute"
      }`}
    >
      {children}
    </span>
  );
}

function Modal({ venture, onClose }: { venture: Venture; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/80 p-0 backdrop-blur-md sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="venture-title"
        className="relative max-h-[90svh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-line-2 bg-ink-2 p-7 sm:rounded-3xl sm:p-10"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 24, opacity: 0 }}
        transition={{ duration: 0.4, ease: [0.21, 0.6, 0.35, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full border border-line-2 text-bone transition-colors hover:border-glow hover:text-glow"
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
            <path d="m3 3 10 10M13 3 3 13" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>

        <div className="flex flex-wrap gap-2 pr-14">
          <Tag accent>{venture.sector}</Tag>
          <Tag>{venture.stage}</Tag>
          {venture.sample && <Tag>Sample</Tag>}
        </div>
        <h3 id="venture-title" className="display mt-6 text-5xl sm:text-6xl">
          {venture.name}
        </h3>
        <p className="mt-4 text-lg text-bone/90">{venture.oneLiner}</p>
        <p className="mt-6 leading-relaxed text-mute">{venture.description}</p>

        <dl className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
          <div>
            <dt className="eyebrow">Founders</dt>
            <dd className="mt-3 text-sm leading-relaxed">{venture.founders.join(", ")}</dd>
          </div>
          {venture.year && (
            <div>
              <dt className="eyebrow">Cohort</dt>
              <dd className="mt-3 text-sm">{venture.year}</dd>
            </div>
          )}
        </dl>

        {venture.website && (
          <a
            href={venture.website}
            target="_blank"
            rel="noreferrer"
            className="group mt-8 inline-flex items-center gap-2 text-sm text-glow"
          >
            Visit website
            <Arrow className="transition-transform group-hover:translate-x-1" />
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

export function VentureGrid({ ventures }: { ventures: Venture[] }) {
  const [active, setActive] = useState<Venture | null>(null);

  return (
    <>
      <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {ventures.map((v, i) => (
          <li key={v.slug} className="bg-ink">
            <motion.button
              type="button"
              onClick={() => setActive(v)}
              className="group relative flex h-full min-h-72 w-full flex-col justify-between p-7 text-left transition-colors duration-500 hover:bg-ink-2"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <Tag accent>{v.sector}</Tag>
                  {v.sample && <Tag>Sample</Tag>}
                </div>
                <span className="eyebrow pt-1.5 text-faint">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div>
                <h3 className="display text-4xl">{v.name}</h3>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-mute">{v.oneLiner}</p>
                <p className="mt-6 flex items-center justify-between border-t border-line pt-4 text-xs text-mute">
                  <span className="font-mono uppercase tracking-[0.14em]">{v.stage}</span>
                  <span className="flex items-center gap-2 text-bone transition-colors group-hover:text-glow">
                    Details
                    <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </p>
              </div>
            </motion.button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active && <Modal venture={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
