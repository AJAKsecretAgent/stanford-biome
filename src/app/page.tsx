import { Calendar } from "@/components/Calendar";
import { HeroCanvas } from "@/components/HeroCanvas";
import { Metrics } from "@/components/Metrics";
import { Reveal } from "@/components/Reveal";
import {
  Faq,
  JoinCTA,
  Pillars,
  SharkTank,
  SpeakerSeries,
  Speakers,
  SuggestTrack,
  TrackTimeline,
  Updates,
  WorkshopTrack,
} from "@/components/Sections";
import { Team } from "@/components/Team";
import { ButtonLink, SectionHeading, TextLink } from "@/components/ui";
import { site } from "@/data/site";

export default function Home() {
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden">
        <HeroCanvas />
        {/* Scrims keep the headline legible over the brightest part of the shader. */}
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/35 to-transparent" />
        <div aria-hidden className="absolute inset-0 bg-ink/40 sm:hidden" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink to-transparent" />
        <div aria-hidden className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-ink/70 to-transparent" />

        <div className="wrap relative pb-16 pt-36 sm:pb-24">
          <h1 className="display max-w-5xl text-[clamp(3.25rem,9.5vw,8.75rem)] leading-[0.92]">
            Stanford&rsquo;s Premier <em>Biotech Incubator</em>
          </h1>
          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-xl text-lg leading-relaxed text-bone/85 sm:text-xl">{site.description}</p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href={site.joinUrl} className="!px-8 !py-4 !text-base">
                Join Us Today
              </ButtonLink>
              <ButtonLink href="/tracks" variant="ghost" arrow={false} className="!px-8 !py-4 !text-base backdrop-blur-sm">
                Explore the tracks
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Metrics ---------- */}
      <Metrics />

      {/* ---------- Thesis ---------- */}
      <section id="thesis" className="wrap grid scroll-mt-20 gap-10 py-24 sm:py-36 lg:grid-cols-[1fr_2.2fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-glow">01</span>
            <span className="h-px w-8 bg-line-2" />
            Our thesis
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="display text-[clamp(2rem,4.4vw,4rem)] leading-[1.05]">
            Stanford is one of the best places in the world to do biology. It is a far harder place
            to <em>start a biotech company.</em>
          </p>
          <div className="mt-10 grid gap-6 text-lg leading-relaxed text-mute md:grid-cols-2 md:gap-10">
            <p>
              A software founder can ship from a dorm room. A bio founder needs lab access, years
              of de-risking, and investors who understand science risk. Most student ideas die in
              the gap between a promising result and a first conversation with someone who can
              fund it.
            </p>
            <p>
              What student founders lack is structure, access to the right people, and a clear
              sense of what to prove next.{" "}
              <span className="text-bone">BIOME provides all three.</span>
            </p>
          </div>
          <div className="mt-10">
            <TextLink href="/about">Why we exist</TextLink>
          </div>
        </Reveal>
      </section>

      {/* ---------- What you get ---------- */}
      <section id="what-you-get" className="wrap scroll-mt-28 pb-24 sm:pb-36">
        <Reveal>
          <SectionHeading
            index="02"
            label="What you get"
            title={
              <>
                Three things a first&#8209;time bio founder <em>cannot buy.</em>
              </>
            }
          />
        </Reveal>
        <div className="mt-14">
          <Pillars />
        </div>
      </section>

      {/* ---------- Tracks ---------- */}
      <section className="wrap pb-24 sm:pb-36">
        <Reveal>
          <SectionHeading
            index="03"
            label="Tracks"
            title={
              <>
                Two tracks. <em>One goal.</em>
              </>
            }
            lede="Build a company in our incubator, and build the skills to carry it."
            action={<TextLink href="/tracks">Track details</TextLink>}
          />
        </Reveal>
        <div className="mt-14 space-y-6">
          <Reveal>
            <SharkTank />
          </Reveal>
          <TrackTimeline />
          <Reveal>
            <WorkshopTrack />
          </Reveal>
          <Reveal>
            <SpeakerSeries />
          </Reveal>
          <Reveal>
            <SuggestTrack />
          </Reveal>
        </div>
      </section>

      {/* ---------- Email updates ---------- */}
      <Updates />

      <div className="pt-24 sm:pt-36">
        <Speakers />
      </div>

      {/* ---------- Calendar ---------- */}
      <section className="wrap pb-24 sm:pb-36">
        <Reveal>
          <SectionHeading
            index="04"
            label="Calendar"
            title={
              <>
                What&rsquo;s <em>happening</em> at BIOME.
              </>
            }
            action={<TextLink href="/events">Full calendar</TextLink>}
          />
        </Reveal>
        <Reveal className="mt-14">
          <Calendar />
        </Reveal>
      </section>

      {/* ---------- Team ---------- */}
      <section className="wrap pb-24 sm:pb-36">
        <Reveal>
          <SectionHeading
            index="05"
            label="Leadership"
            title={
              <>
                The people <em>behind</em> BIOME.
              </>
            }
          />
        </Reveal>
        <div className="mt-14">
          <Team />
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section id="faq" className="wrap scroll-mt-28 pb-24 sm:pb-36">
        <Faq />
      </section>

      <JoinCTA />
    </>
  );
}
