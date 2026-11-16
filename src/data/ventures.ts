export type Venture = {
  slug: string;
  name: string;
  sector: string;
  stage: string;
  oneLiner: string;
  description: string;
  founders: string[];
  year?: string;
  website?: string;
  /** Shows a "Sample" tag on the card. Remove once the entry is real. */
  sample?: boolean;
};

/**
 * SAMPLE ENTRIES. These are illustrative, not real companies.
 * Replace them with real BIOME teams and drop `sample: true`.
 */
export const ventures: Venture[] = [
  {
    slug: "aster",
    name: "Project Aster",
    sector: "Therapeutics",
    stage: "Pre-seed",
    oneLiner: "Programmable delivery for hard-to-reach tissues.",
    description:
      "Sample entry. Describe the problem, the technical insight, and what the team has shown so far. Two or three sentences is the right length for this panel.",
    founders: ["Founder Name", "Founder Name"],
    sample: true,
  },
  {
    slug: "kelp",
    name: "Project Kelp",
    sector: "Diagnostics",
    stage: "Prototype",
    oneLiner: "A point-of-care test that reads out in minutes.",
    description:
      "Sample entry. Describe the problem, the technical insight, and what the team has shown so far.",
    founders: ["Founder Name"],
    sample: true,
  },
  {
    slug: "lumen",
    name: "Project Lumen",
    sector: "Computational biology",
    stage: "Incubating",
    oneLiner: "Models that design experiments, not just analyze them.",
    description:
      "Sample entry. Describe the problem, the technical insight, and what the team has shown so far.",
    founders: ["Founder Name", "Founder Name", "Founder Name"],
    sample: true,
  },
  {
    slug: "mica",
    name: "Project Mica",
    sector: "Medical devices",
    stage: "Prototype",
    oneLiner: "A smarter implantable sensor for chronic care.",
    description:
      "Sample entry. Describe the problem, the technical insight, and what the team has shown so far.",
    founders: ["Founder Name", "Founder Name"],
    sample: true,
  },
  {
    slug: "tern",
    name: "Project Tern",
    sector: "Synthetic biology",
    stage: "Incubating",
    oneLiner: "Engineered microbes for sustainable manufacturing.",
    description:
      "Sample entry. Describe the problem, the technical insight, and what the team has shown so far.",
    founders: ["Founder Name"],
    sample: true,
  },
  {
    slug: "vale",
    name: "Project Vale",
    sector: "Tools",
    stage: "Pre-seed",
    oneLiner: "Bench automation that small labs can afford.",
    description:
      "Sample entry. Describe the problem, the technical insight, and what the team has shown so far.",
    founders: ["Founder Name", "Founder Name"],
    sample: true,
  },
];
