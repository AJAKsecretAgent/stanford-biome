"use client";

import { useEffect, useMemo, useState } from "react";
import { sampleEvents, type CalendarEvent } from "@/data/events";
import { isStaticPreview } from "@/lib/preview";
import { site } from "@/data/site";

type Loaded = CalendarEvent & { startDate: Date; endDate?: Date };

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

/** All-day events arrive as YYYY-MM-DD and must be read as local dates. */
function parse(value: string, allDay?: boolean) {
  if (allDay && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(value);
}

const timeFmt = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });
const monthFmt = new Intl.DateTimeFormat("en-US", { month: "long" });
const shortMonthFmt = new Intl.DateTimeFormat("en-US", { month: "short" });
const weekdayFmt = new Intl.DateTimeFormat("en-US", { weekday: "long", month: "long", day: "numeric" });

function EventRow({ event }: { event: Loaded }) {
  const time = event.allDay
    ? "All day"
    : `${timeFmt.format(event.startDate)}${event.endDate ? ` to ${timeFmt.format(event.endDate)}` : ""}`;
  const body = (
    <>
      <div className="flex w-14 shrink-0 flex-col items-center rounded-xl border border-line bg-white/[0.03] py-2">
        <span className="eyebrow !text-[10px] text-glow">{shortMonthFmt.format(event.startDate)}</span>
        <span className="display mt-1 text-2xl">{event.startDate.getDate()}</span>
      </div>
      <div className="min-w-0">
        <p className="font-medium leading-snug text-bone">{event.title}</p>
        <p className="mt-1 text-sm text-mute">
          {time}
          {event.location ? ` · ${event.location}` : ""}
        </p>
        {event.description && (
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-faint">{event.description}</p>
        )}
      </div>
    </>
  );
  const cls = "flex gap-4 rounded-2xl p-3 -mx-3 transition-colors";
  return event.url ? (
    <a href={event.url} target="_blank" rel="noreferrer" className={`${cls} hover:bg-white/[0.04]`}>
      {body}
    </a>
  ) : (
    <div className={cls}>{body}</div>
  );
}

export function Calendar() {
  const [events, setEvents] = useState<Loaded[] | null>(null);
  const [source, setSource] = useState<"google" | "sample" | null>(null);
  const [failed, setFailed] = useState(false);
  const [today, setToday] = useState<Date | null>(null);
  const [cursor, setCursor] = useState<Date | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    // Dates are set after mount so server and client render the same markup.
    const now = new Date();
    setToday(now);
    setCursor(new Date(now.getFullYear(), now.getMonth(), 1));

    const load: Promise<{ source: "google" | "sample"; events: CalendarEvent[] }> = isStaticPreview
      ? Promise.resolve({ source: "sample", events: sampleEvents(now) })
      : fetch("/api/events").then((r) => (r.ok ? r.json() : Promise.reject()));
    load
      .then((data: { source: "google" | "sample"; events: CalendarEvent[] }) => {
        setSource(data.source);
        setEvents(
          data.events
            .map((e) => ({
              ...e,
              startDate: parse(e.start, e.allDay),
              endDate: e.end && !e.allDay ? parse(e.end) : undefined,
            }))
            .sort((a, b) => a.startDate.getTime() - b.startDate.getTime()),
        );
      })
      .catch(() => {
        setFailed(true);
        setEvents([]);
      });
  }, []);

  const byDay = useMemo(() => {
    const map = new Map<string, Loaded[]>();
    for (const e of events ?? []) {
      const k = dayKey(e.startDate);
      map.set(k, [...(map.get(k) ?? []), e]);
    }
    return map;
  }, [events]);

  const cells = useMemo(() => {
    if (!cursor) return [];
    const y = cursor.getFullYear();
    const m = cursor.getMonth();
    const lead = new Date(y, m, 1).getDay();
    const days = new Date(y, m + 1, 0).getDate();
    const total = Math.ceil((lead + days) / 7) * 7;
    return Array.from({ length: total }, (_, i) => {
      const n = i - lead + 1;
      return n >= 1 && n <= days ? new Date(y, m, n) : null;
    });
  }, [cursor]);

  const shift = (delta: number) => {
    setSelected(null);
    setCursor((c) => (c ? new Date(c.getFullYear(), c.getMonth() + delta, 1) : c));
  };

  const selectedEvents = selected ? byDay.get(selected) ?? [] : null;
  const upcoming = useMemo(() => {
    if (!events || !today) return [];
    const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate()).getTime();
    return events.filter((e) => e.startDate.getTime() >= startOfToday).slice(0, 4);
  }, [events, today]);

  const list = selectedEvents ?? upcoming;
  const selectedDate = selected && list[0] ? list[0].startDate : null;

  return (
    <div className="glass grid overflow-hidden rounded-3xl lg:grid-cols-[1.15fr_1fr]">
      {/* Month grid */}
      <div className="p-5 sm:p-8">
        <div className="flex items-center justify-between">
          <p className="display text-3xl sm:text-4xl" aria-live="polite">
            {cursor ? (
              <>
                {monthFmt.format(cursor)} <span className="text-mute">{cursor.getFullYear()}</span>
              </>
            ) : (
              <span className="text-mute">Calendar</span>
            )}
          </p>
          <div className="flex gap-2">
            {[
              { label: "Previous month", delta: -1, d: "M10 3.5 5.5 8l4.5 4.5" },
              { label: "Next month", delta: 1, d: "M6 3.5 10.5 8 6 12.5" },
            ].map((b) => (
              <button
                key={b.label}
                type="button"
                aria-label={b.label}
                onClick={() => shift(b.delta)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 text-bone transition-colors hover:border-glow hover:text-glow"
              >
                <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4" aria-hidden>
                  <path d={b.d} stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-7 text-center">
          {WEEKDAYS.map((d) => (
            <span key={d} className="eyebrow pb-3 !text-[10px]">
              {d}
            </span>
          ))}
        </div>
        <div className="grid min-h-[17rem] grid-cols-7 gap-1 sm:min-h-[22rem]">
          {cells.map((date, i) => {
            if (!date) return <span key={i} />;
            const k = dayKey(date);
            const count = byDay.get(k)?.length ?? 0;
            const isToday = today ? dayKey(today) === k : false;
            const isSelected = selected === k;
            return (
              <button
                key={i}
                type="button"
                disabled={!count}
                aria-pressed={count ? isSelected : undefined}
                aria-label={`${weekdayFmt.format(date)}${count ? `, ${count} event${count > 1 ? "s" : ""}` : ""}`}
                onClick={() => setSelected(isSelected ? null : k)}
                className={`relative flex aspect-square flex-col items-center justify-center rounded-xl text-sm tabular-nums transition-colors duration-200 ${
                  isSelected
                    ? "bg-glow text-ink"
                    : count
                      ? "bg-white/[0.05] text-bone hover:bg-white/[0.1]"
                      : "text-faint"
                } ${isToday && !isSelected ? "ring-1 ring-inset ring-line-2 !text-bone" : ""}`}
              >
                {date.getDate()}
                {count > 0 && (
                  <span
                    className={`absolute bottom-[18%] h-1 w-1 rounded-full ${
                      isSelected ? "bg-ink" : "bg-glow shadow-[0_0_8px_var(--color-glow)]"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Agenda */}
      <div className="flex flex-col border-t border-line p-5 sm:p-8 lg:border-l lg:border-t-0">
        <div className="flex items-center justify-between">
          <p className="eyebrow">{selectedDate ? weekdayFmt.format(selectedDate) : "Coming up"}</p>
          {selected && (
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-xs text-mute underline-offset-4 hover:text-bone hover:underline"
            >
              Show upcoming
            </button>
          )}
        </div>

        <div className="mt-5 flex-1 space-y-2">
          {events === null && (
            <div className="space-y-3" aria-label="Loading events">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-16 animate-pulse rounded-2xl bg-white/[0.04]" />
              ))}
            </div>
          )}
          {events !== null && list.length === 0 && (
            <p className="text-sm leading-relaxed text-mute">
              {failed
                ? "The calendar could not be loaded. Refresh to try again."
                : "Nothing scheduled yet. New events are announced to the mailing list first."}
            </p>
          )}
          {list.map((e) => (
            <EventRow key={e.id} event={e} />
          ))}
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-line pt-5 text-xs text-faint">
          <span className="flex items-center gap-2 font-mono uppercase tracking-[0.16em]">
            {source && (
              <>
                <span
                  className={`h-1.5 w-1.5 rounded-full ${source === "google" ? "bg-glow" : "bg-mute"}`}
                />
                {source === "google" ? "Synced with Google Calendar" : "Sample schedule"}
              </>
            )}
          </span>
          <span className="flex gap-4">
            {[
              { label: "Google Calendar", href: site.calendarSubscribe.google },
              { label: "Apple or Outlook", href: site.calendarSubscribe.ics.replace(/^https?:/, "webcal:") },
            ]
              .filter((l) => l.href)
              .map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-bone underline-offset-4 hover:text-glow hover:underline"
                >
                  {l.label}
                </a>
              ))}
          </span>
        </div>
      </div>
    </div>
  );
}
