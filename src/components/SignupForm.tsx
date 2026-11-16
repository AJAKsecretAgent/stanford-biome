"use client";

import { useState } from "react";
import { isStaticPreview, previewFormMessage } from "@/lib/preview";
import { Arrow } from "./ui";

type Status = "idle" | "sending" | "done" | "error";

/** Email capture. Posts to /api/subscribe (see .env.example to wire up storage). */
export function SignupForm({ source = "tracks" }: { source?: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (isStaticPreview) {
      setStatus("error");
      setMessage(previewFormMessage);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "done") {
    return (
      <p role="status" className="glass flex items-center gap-3 rounded-full px-6 py-4 text-sm">
        <span className="h-2 w-2 rounded-full bg-glow shadow-[0_0_12px_var(--color-glow)]" />
        You are on the list. We will email you when the next track opens.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false}>
      <div className="glass flex items-center gap-2 rounded-full p-1.5 pl-6 transition-colors focus-within:border-glow/60">
        <label htmlFor={`email-${source}`} className="sr-only">
          Email address
        </label>
        <input
          id={`email-${source}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@stanford.edu"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          className="min-w-0 flex-1 bg-transparent py-2.5 text-base text-bone placeholder:text-faint focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="group flex shrink-0 items-center gap-2 rounded-full bg-bone px-5 py-3 text-sm font-medium text-ink transition duration-300 hover:bg-glow disabled:opacity-60"
        >
          {status === "sending" ? "Sending" : "Notify me"}
          <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
      <p role="alert" className="mt-3 min-h-5 pl-6 text-sm text-[#ff9a8a]">
        {status === "error" ? message : ""}
      </p>
    </form>
  );
}
