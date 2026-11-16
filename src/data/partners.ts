export type Partner = {
  name: string;
  /** e.g. "/partners/acme.svg" (file in public/partners/). Light or white logos read best. */
  logo?: string;
  url?: string;
};

export type PartnerTier = {
  name: string;
  description: string;
  /** How many tiles the tier shows. Unfilled tiles render as open slots. */
  slots: number;
  partners: Partner[];
};

/**
 * No partners are listed yet: add real ones to `partners` and they
 * replace the open slots.
 */
export const partnerTiers: PartnerTier[] = [
  {
    name: "Capital",
    description: "Funds that meet our teams early and show up at Shark Tank.",
    slots: 3,
    partners: [],
  },
  {
    name: "Companies",
    description: "Biotech and pharma companies backing the next generation of founders.",
    slots: 4,
    partners: [],
  },
  {
    name: "Stanford",
    description: "Departments, labs, and programs we build alongside.",
    slots: 4,
    partners: [],
  },
];
