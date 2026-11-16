export type CalendarEvent = {
  id: string;
  title: string;
  /** ISO date-time, or YYYY-MM-DD when allDay is true. */
  start: string;
  end?: string;
  allDay?: boolean;
  location?: string;
  description?: string;
  url?: string;
};

/**
 * Sample schedule, shown only until Google Calendar is connected
 * (see .env.example). Dates are generated relative to today so the
 * calendar never looks empty during development.
 */
export function sampleEvents(now = new Date()): CalendarEvent[] {
  const at = (daysFromNow: number, hour: number, minutes = 0) => {
    const d = new Date(now);
    d.setDate(d.getDate() + daysFromNow);
    d.setHours(hour, minutes, 0, 0);
    return d;
  };
  const make = (
    id: string,
    title: string,
    days: number,
    hour: number,
    durationHours: number,
    location: string,
    description: string,
  ): CalendarEvent => {
    const start = at(days, hour);
    const end = new Date(start.getTime() + durationHours * 3600_000);
    return { id, title, start: start.toISOString(), end: end.toISOString(), location, description };
  };

  return [
    make("s1", "General meeting", 3, 18, 1, "Location TBA", "Open to all Stanford students."),
    make("s2", "Member social", 9, 17, 1.5, "Location TBA", "Meet the board and other members."),
    make("s3", "Track info session", 15, 12, 1, "Location TBA", "How Shark Tank and the Workshop Track work, and how to join."),
    make("s4", "Workshop Track session", 22, 18, 2, "Location TBA", "Hands-on workshop, open to all levels."),
    make("s5", "Shark Tank pitch coaching", 30, 19, 2, "Location TBA", "Working session for cohort teams."),
    make("s6", "Shark Tank pitch night", 44, 17, 3, "Location TBA", "Cohort teams pitch a panel of investors."),
  ];
}
