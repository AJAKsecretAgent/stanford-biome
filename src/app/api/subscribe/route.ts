import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Email signup. Forwards each signup to SUBSCRIBE_WEBHOOK_URL.
 * Without a webhook: accepted and logged in development, rejected in
 * production so a signup is never silently dropped.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const source = typeof body?.source === "string" ? body.source.slice(0, 40) : "site";

  if (!EMAIL.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const webhook = process.env.SUBSCRIBE_WEBHOOK_URL;
  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.log(`[subscribe] (dev only, not stored) ${email} via ${source}`);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json(
      { error: "Signups are not open yet. Please check back soon." },
      { status: 503 },
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source, submittedAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[subscribe] webhook failed:", err);
    return NextResponse.json(
      { error: "We could not save your email. Please try again." },
      { status: 502 },
    );
  }
}
