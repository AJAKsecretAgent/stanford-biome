"use client";

import { useState } from "react";
import { isStaticPreview, previewFormMessage } from "@/lib/preview";
import { Arrow } from "./ui";

type Status = "idle" | "sending" | "done" | "error";

/** "Have an idea for a track?" form. Posts to /api/suggest (see .env.example). */
export function SuggestForm() {
  const [idea, setIdea] = useState("");
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
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, email }),
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
      <p role="status" className="flex items-center gap-3 rounded-2xl border border-glow/30 bg-glow/5 px-6 py-5 text-sm">
        <span className="h-2 w-2 shrink-0 rounded-full bg-glow shadow-[0_0_12px_var(--color-glow)]" />
        Thank you. The board reads every idea.
      </p>
    );
  }

  const field =
    "w-full rounded-2xl border border-line-2 bg-white/[0.03] px-5 py-4 text-base text-bone placeholder:text-faint transition-colors focus:border-glow/60 focus:outline-none";

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <label htmlFor="track-idea" className="sr-only">
        Your track idea
      </label>
      <textarea
        id="track-idea"
        required
        minLength={10}
        maxLength={1000}
        rows={4}
        placeholder="A track on... because..."
        value={idea}
        onChange={(e) => {
          setIdea(e.target.value);
          if (status === "error") setStatus("idle");
        }}
        className={`${field} resize-none`}
      />
      <div className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="track-idea-email" className="sr-only">
          Email (optional)
        </label>
        <input
          id="track-idea-email"
          type="email"
          autoComplete="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${field} min-w-0 flex-1`}
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="group flex shrink-0 items-center justify-center gap-2 rounded-full bg-bone px-7 py-4 text-sm font-medium text-ink transition duration-300 hover:bg-glow disabled:opacity-60"
        >
          {status === "sending" ? "Sending" : "Send idea"}
          <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
      <p role="alert" className="min-h-5 text-sm text-[#ff9a8a]">
        {status === "error" ? message : ""}
      </p>
    </form>
  );
}
