/**
 * Global site config. Every link the site points to lives here.
 * Leave a value as "" to hide the thing that uses it.
 */
export const site = {
  name: "Stanford BIOME",
  shortName: "BIOME",
  headline: "Stanford's Premier Biotech Incubator",
  description:
    "BIOME is where Stanford's scientists and engineers turn research into companies. Student-led and built for translation, from bench insight to funded venture.",

  /** "Join Us Today" button. Drop the application link in here. */
  joinUrl: "#",

  /** "Become a partner" button on the Partners page. Falls back to contactEmail. */
  partnerUrl: "",

  /** Shown in the footer and used for mailto links. */
  contactEmail: "",

  socials: {
    linkedin: "",
    instagram: "",
    x: "",
  },

  /**
   * "Subscribe" links shown under the calendar (from Google Calendar settings
   * > Integrate calendar). `google` = the public URL, `ics` = the iCal address
   * (works for Apple Calendar and Outlook).
   */
  calendarSubscribe: { google: "", ics: "" },

  nav: [
    { label: "About", href: "/about" },
    { label: "Tracks", href: "/tracks" },
    { label: "Ventures", href: "/ventures" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
    { label: "Partners", href: "/partners" },
  ],
} as const;
