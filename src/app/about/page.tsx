import type { Metadata } from "next";
import { Metrics } from "@/components/Metrics";
import { Reveal } from "@/components/Reveal";
import { JoinCTA } from "@/components/Sections";
import { PageHeader, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "Why BIOME exists: bridging Stanford science and engineering with biotech company creation.",
};

const principles = [
  {
    title: "Translation first",
    body: "We care about what happens after the result. Every track is designed around moving a technology toward patients, customers, and capital.",
  },
  {
    title: "Builders first",
    body: "BIOME is for people who intend to build. Members work on their own ventures, against milestones, in front of investors.",
  },
  {
    title: "Interdisciplinary by default",
    body: "Biotech companies need engineers, scientists, clinicians, and operators at the same table. Our teams are assembled that way from day one.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        label="About"
        title={
          <>
            Where Stanford science <em>becomes companies.</em>
          </>
        }
        lede="BIOME is a student-led biotech incubator. We connect Stanford's engineering and life-science talent with the mentorship, structure, and capital it takes to commercialize a discovery."
      />

      <section className="wrap grid gap-12 py-24 sm:py-32 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-glow">01</span>
            <span className="h-px w-8 bg-line-2" />
            Why we exist
          </p>
        </Reveal>
        <Reveal delay={0.08} className="space-y-8">
          <p className="display text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.1]">
            Stanford produces world-class biology and engineering. Too little of it leaves the lab.
          </p>
          <div className="space-y-5 text-lg leading-relaxed text-mute">
            <p>
              The gap between a promising result and a fundable company is wide, and most students
              cross it alone. They have the science. What is missing is a clear path: how to find
              the right problem, de-risk the technology, and tell the story to people who write
              checks.
            </p>
            <p>
              BIOME closes that gap with two tracks. Shark Tank is our incubator: a cohort of
              student teams builds toward a live pitch in front of investors. The Workshop Track
              teaches the lab and translational skills founders need along the way. A speaker
              series brings the people building biotech onto campus.
            </p>
            <p>
              BIOME began as the Biological Interdisciplinary Open Maker Environment, a community
              for people who wanted to build with biology. Today, it leads bio-entrepreneurship at
              Stanford.
            </p>
          </div>
        </Reveal>
      </section>

      <Metrics />

      <section className="wrap py-24 sm:py-32">
        <Reveal>
          <SectionHeading
            index="02"
            label="Principles"
            title={
              <>
                How we <em>operate.</em>
              </>
            }
          />
        </Reveal>
        <ul className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {principles.map((p, i) => (
            <li key={p.title} className="bg-ink">
              <Reveal delay={i * 0.08} className="flex h-full min-h-72 flex-col p-8">
                <span className="font-mono text-xs text-glow">0{i + 1}</span>
                <h3 className="display mt-auto pt-12 text-4xl">{p.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-mute">{p.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <JoinCTA />
    </>
  );
}
