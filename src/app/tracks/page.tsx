import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import {
  Faq,
  JoinCTA,
  SharkTank,
  SpeakerSeries,
  Speakers,
  SuggestTrack,
  TrackTimeline,
  WorkshopTrack,
} from "@/components/Sections";
import { PageHeader, SectionHeading } from "@/components/ui";

export const metadata: Metadata = {
  title: "Tracks",
  description: "BIOME's two tracks: Shark Tank, our biotech incubator, and the Workshop Track, plus the Speaker Series.",
};

export default function TracksPage() {
  return (
    <>
      <PageHeader
        label="Tracks"
        title={
          <>
            Two tracks. <em>One goal.</em>
          </>
        }
        lede="Shark Tank is our incubator. The Workshop Track teaches the lab and translational skills behind it. Both exist to get Stanford science out of the lab and into companies."
      />

      <section className="wrap py-24 sm:py-32">
        <Reveal>
          <SharkTank />
        </Reveal>
        <Reveal className="mt-20">
          <SectionHeading
            label="How Shark Tank works"
            title={
              <>
                Four phases. <em>One cohort.</em>
              </>
            }
            lede="Each phase ends with a concrete milestone, so every team knows exactly what it has to prove next."
          />
        </Reveal>
        <div className="mt-12">
          <TrackTimeline />
        </div>
      </section>

      <section className="wrap pb-24 sm:pb-32">
        <Reveal>
          <WorkshopTrack />
        </Reveal>
      </section>

      <section className="wrap space-y-6 pb-24 sm:pb-32">
        <Reveal>
          <SpeakerSeries />
        </Reveal>
        <Reveal>
          <SuggestTrack />
        </Reveal>
      </section>

      <Speakers />

      <section className="wrap pb-24 sm:pb-32">
        <Faq />
      </section>

      <JoinCTA />
    </>
  );
}
