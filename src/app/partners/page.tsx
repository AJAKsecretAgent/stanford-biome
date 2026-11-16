import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { JoinCTA, PartnerWall } from "@/components/Sections";
import { ButtonLink, PageHeader } from "@/components/ui";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Partners",
  description: "Partner with Stanford BIOME: meet student bio founders at the earliest stage.",
};

const reasons = [
  { title: "Earliest access", body: "Meet Stanford bio founders before they have a deck in circulation." },
  { title: "A seat at Shark Tank", body: "Judge, mentor, and follow up with the teams that stand out." },
  { title: "Talent pipeline", body: "Reach the students who will start and staff the next wave of biotech." },
];

export default function PartnersPage() {
  const partnerHref = site.partnerUrl || (site.contactEmail ? `mailto:${site.contactEmail}` : "");

  return (
    <>
      <PageHeader
        label="Partners"
        title={
          <>
            Back the next generation of <em>bio founders.</em>
          </>
        }
        lede="We work with venture funds, biotech companies, and Stanford programs that want to meet student founders at the very start."
      />

      <section className="wrap py-20 sm:py-28">
        <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {reasons.map((r, i) => (
            <li key={r.title} className="bg-ink">
              <Reveal delay={i * 0.08} className="flex h-full min-h-56 flex-col p-8">
                <span className="font-mono text-xs text-glow">0{i + 1}</span>
                <h2 className="display mt-auto pt-10 text-4xl">{r.title}</h2>
                <p className="mt-4 text-sm leading-relaxed text-mute">{r.body}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <div className="mt-24">
          <PartnerWall />
        </div>

        {partnerHref && (
          <Reveal className="mt-20 flex justify-center">
            <ButtonLink href={partnerHref}>Become a partner</ButtonLink>
          </Reveal>
        )}
      </section>

      <JoinCTA />
    </>
  );
}
