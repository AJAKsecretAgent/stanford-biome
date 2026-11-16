/**
 * Tracks. BIOME runs two, plus a speaker series:
 *   01  Shark Tank      (the incubator)
 *   02  Workshop Track  (lab and translational skills)
 *   +   Speaker Series  (starts winter quarter)
 * Copy here is a first draft: edit freely.
 */

export const sharkTank = {
  kicker: "Track 01 · Incubator",
  blurb:
    "Shark Tank is BIOME's incubator. A cohort of student teams takes a scientific insight to an investable company, then pitches it live to a room of investors.",
  /** e.g. "Spring 2027". Leave "" to show "Dates to be announced". */
  date: "",
  /** Leave "" until applications open; the button then points to the signup form. */
  applyUrl: "",
  points: [
    "A cohort of teams, working against shared milestones",
    "Mentorship from founders, operators, and investors",
    "Pitch coaching before you take the stage",
    "A final pitch night in front of early-stage biotech investors",
  ],
};

/** The four phases of Shark Tank. */
export const trackPhases = [
  {
    step: "01",
    title: "Source",
    body: "Find a problem worth a company. Clinical need, a platform insight, or research that deserves to leave the lab.",
  },
  {
    step: "02",
    title: "Validate",
    body: "Pressure-test it. Talk to clinicians, patients, and buyers. Map the science risk and the path to de-risk it.",
  },
  {
    step: "03",
    title: "Build",
    body: "Generate the first proof. Prototype, run the key experiment, and shape the story around real data.",
  },
  {
    step: "04",
    title: "Pitch",
    body: "Stand in front of the sharks with a thesis that holds up to diligence.",
  },
];

export const workshopTrack = {
  kicker: "Track 02",
  blurb:
    "Hands-on workshops in the lab and translational skills a founder needs alongside the build: how to generate convincing data at the bench, and how to carry it toward patients and a company.",
  /** e.g. "Winter 2027". Leave "" to show "Dates to be announced". */
  date: "",
  /** Sign-up link. Leave "" to point the button at the mailing list. */
  signupUrl: "",
  points: [
    "Essential lab skills, taught hands-on",
    "Translational know-how: from a result to a product path",
    "Built to complement Shark Tank, and open to anyone who wants the skills",
  ],
  /** Example topics (draft). Empty the list to hide the chips. */
  topics: [
    "Core bench techniques",
    "Experiment design",
    "Prototyping",
    "IP and tech transfer",
    "Regulatory pathways",
    "Clinical translation",
  ],
};

/** Speaker Series: runs alongside the two tracks. */
export const speakerSeries = {
  kicker: "Speaker Series",
  starts: "Starts winter quarter",
  blurb:
    "Candid conversations with the founders, scientists, and investors building biotech today. Open to the whole Stanford community.",
};

/** "What you get": the three things BIOME gives a founder. Draft copy. */
export const pillars = [
  {
    title: "Structure",
    body: "Shark Tank tells you what to prove next: the unmet need, the technical risk, the business.",
    href: "/tracks#shark-tank",
    cta: "Shark Tank",
  },
  {
    title: "Skills",
    body: "The Workshop Track teaches the essentials a founder leans on: hands-on lab technique, and how to move a result toward a product.",
    href: "/tracks#workshop",
    cta: "Workshop Track",
  },
  {
    title: "A stage",
    body: "Shark Tank ends with your team pitching the people who fund biotech at the earliest stage, with the coaching to be ready for it.",
    href: "/tracks#shark-tank",
    cta: "How it works",
  },
];

/**
 * FAQ. DRAFT ANSWERS: these describe club policy, so check each one
 * before launch. Delete an entry to remove it; empty the list to hide the section.
 */
export const faq = [
  {
    q: "Who can join BIOME?",
    a: "Any Stanford student, undergraduate or graduate, from any department.",
  },
  {
    q: "Which track is right for me?",
    a: "If you have a team or an idea you want to turn into a company, Shark Tank. If you want to build lab and translational skills, the Workshop Track. The two are designed to work together.",
  },
  {
    q: "Do I need a startup idea?",
    a: "No. The Workshop Track needs no idea at all, and the first phase of Shark Tank is about sourcing a problem worth building on.",
  },
  {
    q: "Do I need a biology background?",
    a: "No. Biotech companies need engineers, computer scientists, clinicians, and operators as much as bench scientists. Our teams are deliberately mixed.",
  },
  {
    q: "What is the time commitment?",
    a: "It depends on the track. The Workshop Track is lighter and the Speaker Series is drop-in. Shark Tank is a serious commitment for the length of the cohort.",
  },
  {
    q: "When does the next track start?",
    a: "Dates are announced to the mailing list first. Add your email at the bottom of this page.",
  },
  {
    q: "I am an investor or a company. How do I get involved?",
    a: "We work with funds, biotech companies, and Stanford programs as mentors, sharks, and sponsors. See the Partners page.",
  },
];

/**
 * People who have spoken at or mentored BIOME. Empty by default: the
 * "In the room" section appears once you add real names.
 *   { name: "Jane Doe", affiliation: "Founder, Company" }
 */
export const speakers: { name: string; affiliation: string }[] = [];
