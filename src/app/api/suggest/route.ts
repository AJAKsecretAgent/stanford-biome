import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Track suggestions. Forwards each idea to SUGGEST_WEBHOOK_URL.
 * Without a webhook: accepted and logged in development, rejected in
 * production so an idea is never silently dropped.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const idea = typeof body?.idea === "string" ? body.idea.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";

  if (idea.length < 10 || idea.length > 1000) {
    return NextResponse.json(
      { error: "Tell us a little more about the idea (10 to 1,000 characters)." },
      { status: 400 },
    );
  }
  if (email && (!EMAIL.test(email) || email.length > 254)) {
    return NextResponse.json({ error: "That email address does not look right." }, { status: 400 });
  }

  const webhook = process.env.SUGGEST_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[suggest] (dev only, not stored) ${email || "anonymous"}: ${idea}`);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "Suggestions are not open yet. Please check back soon." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idea, email, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[suggest] webhook failed:", err);
    return NextResponse.json(
      { error: "We could not save your idea. Please try again." },
      { status: 502 },
    );
  }
}
