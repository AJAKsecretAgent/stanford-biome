/**
 * Team. To fill in a card, add any of the optional fields:
 *
 *   image: "/team/diba-dindoust.jpg"   (put the file in public/team/, portrait 4:5 works best)
 *   focus: "Therapeutics"              (one short line under the role)
 *   bio:   "Two or three sentences."
 *   links: { linkedin: "https://...", email: "name@stanford.edu", website: "https://..." }
 *
 * Anything left out simply does not render.
 */
export type Person = {
  name: string;
  role: string;
  image?: string;
  focus?: string;
  bio?: string;
  links?: { linkedin?: string; email?: string; website?: string };
};

export const president: Person = {
  name: "Diba Dindoust",
  role: "President",
};

export const executives: Person[] = [
  { name: "Melwin Cheng", role: "Executive Board" },
  { name: "Ajay Vinjamuri", role: "Executive Board" },
  { name: "Gabriel Kim", role: "Executive Board" },
  { name: "Lucas Lin", role: "Executive Board" },
  { name: "Salman Siddiqi", role: "Executive Board" },
  { name: "Canon Pham", role: "Executive Board" },
  { name: "Gloria Park", role: "Executive Board" },
  { name: "Alvin Wong", role: "Executive Board" },
  { name: "Theo Frano", role: "Executive Board" },
];

export const advisors: Person[] = [
  { name: "Ross Venook", role: "Advisor" },
  { name: "Alex Engel", role: "Advisor" },
];
