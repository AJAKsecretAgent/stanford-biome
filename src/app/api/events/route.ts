import { NextResponse } from "next/server";
import { sampleEvents, type CalendarEvent } from "@/data/events";

export const dynamic = "force-dynamic";

type GoogleEvent = {
  id: string;
  status?: string;
  summary?: string;
  description?: string;
  location?: string;
  htmlLink?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
};

/**
 * Returns club events for the calendar UI.
 * With GOOGLE_CALENDAR_ID + GOOGLE_CALENDAR_API_KEY set, reads the public
 * Google Calendar (cached for 5 minutes). Otherwise serves the sample schedule.
 */
export async function GET() {
  const id = process.env.GOOGLE_CALENDAR_ID;
  const key = process.env.GOOGLE_CALENDAR_API_KEY;

  if (!id || !key) {
    return NextResponse.json({ source: "sample", events: sampleEvents() });
  }

  const now = new Date();
  const params = new URLSearchParams({
    key,
    singleEvents: "true", // expands recurring events
    orderBy: "startTime",
    maxResults: "250",
    timeMin: new Date(now.getFullYear(), now.getMonth() - 2, 1).toISOString(),
    timeMax: new Date(now.getFullYear(), now.getMonth() + 10, 1).toISOString(),
  });

  try {
    const res = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(id)}/events?${params}`,
      { next: { revalidate: 300 } },
    );
    if (!res.ok) throw new Error(`Google Calendar responded ${res.status}`);
    const data: { items?: GoogleEvent[] } = await res.json();

    const events: CalendarEvent[] = (data.items ?? [])
      .filter((e) => e.status !== "cancelled" && (e.start?.dateTime || e.start?.date))
      .map((e) => ({
        id: e.id,
        title: e.summary || "Untitled event",
        start: (e.start!.dateTime || e.start!.date)!,
        end: e.end?.dateTime || e.end?.date,
        allDay: !e.start!.dateTime,
        location: e.location,
        // Google descriptions can contain HTML; show plain text only.
        description: e.description?.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim(),
        url: e.htmlLink,
      }));

    return NextResponse.json({ source: "google", events });
  } catch (err) {
    console.error("[events] Google Calendar sync failed:", err);
    return NextResponse.json({ error: "Calendar unavailable" }, { status: 502 });
  }
}
