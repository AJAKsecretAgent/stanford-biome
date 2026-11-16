export type Metric = {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  detail: string;
};

/**
 * PLACEHOLDER NUMBERS. Replace with real figures, then set
 * `metricsArePlaceholder` to false to remove the "illustrative" footnote.
 */
export const metricsArePlaceholder = true;

export const metrics: Metric[] = [
  {
    value: 40,
    suffix: "+",
    label: "Founders in residence",
    detail: "Students building across therapeutics, devices, and computational biology.",
  },
  {
    value: 12,
    label: "Ventures incubated",
    detail: "Teams taken from a research insight to a fundable company thesis.",
  },
  {
    value: 2,
    prefix: "$",
    suffix: "M+",
    label: "Raised by BIOME teams",
    detail: "Non-dilutive grants and early venture funding.",
  },
  {
    value: 25,
    suffix: "+",
    label: "Mentors and investors",
    detail: "Operators, faculty, and partners who work directly with our teams.",
  },
];
