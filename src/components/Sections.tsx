import Image from "next/image";
import { partnerTiers } from "@/data/partners";
import {
  faq,
  pillars,
  sharkTank,
  speakerSeries,
  speakers,
  trackPhases,
  workshopTrack,
} from "@/data/programs";
import { site } from "@/data/site";
import { Reveal } from "./Reveal";
import { SignupForm } from "./SignupForm";
import { SuggestForm } from "./SuggestForm";
import { ButtonLink, TextLink } from "./ui";

/** The four phases of Shark Tank, drawn as a connected timeline. */
export function TrackTimeline() {
  return (
    <ol className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
      {trackPhases.map((phase, i) => (
        <li key={phase.step} className="bg-ink">
          <Reveal delay={i * 0.08} className="group relative flex h-full flex-col p-7 pb-9">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-glow/40 font-mono text-xs text-glow transition-colors duration-500 group-hover:bg-glow group-hover:text-ink">
                {phase.step}
              </span>
              <span className="h-px flex-1 bg-gradient-to-r from-glow/40 to-transparent" />
            </div>
            <h3 className="display mt-12 text-4xl">{phase.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-mute">{phase.body}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

function Points({ points }: { points: string[] }) {
  return (
    <ul className="self-end">
      {points.map((point, i) => (
        <li key={point} className="flex gap-5 border-t border-line-2 py-5 last:border-b">
          <span className="font-mono text-xs text-glow">0{i + 1}</span>
          <span className="leading-relaxed text-bone/85">{point}</span>
        </li>
      ))}
    </ul>
  );
}

/** Track 01: Shark Tank, the incubator. */
export function SharkTank() {
  return (
    <div id="shark-tank" className="grain relative scroll-mt-28 overflow-hidden rounded-3xl border border-line-2 bg-ink-2">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(70% 90% at 100% 0%, rgba(95,227,255,.22), transparent 60%), radial-gradient(60% 80% at 0% 100%, rgba(61,255,168,.2), transparent 60%)",
        }}
      />
      <div className="relative grid gap-12 p-7 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:p-16">
        <div>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-glow shadow-[0_0_10px_var(--color-glow)]" />
            {sharkTank.kicker} · {sharkTank.date || "Dates to be announced"}
          </p>
          <h3 className="display mt-8 text-[clamp(3rem,8vw,6.5rem)]">
            Shark <em className="text-glow">Tank</em>
          </h3>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-bone/85">{sharkTank.blurb}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            {sharkTank.applyUrl ? (
              <ButtonLink href={sharkTank.applyUrl}>Apply to Shark Tank</ButtonLink>
            ) : (
              <ButtonLink href="/#updates">Get notified</ButtonLink>
            )}
          </div>
        </div>
        <Points points={sharkTank.points} />
      </div>
    </div>
  );
}

/** Track 02: the Workshop Track. */
export function WorkshopTrack() {
  return (
    <div id="workshop" className="glass relative scroll-mt-28 overflow-hidden rounded-3xl">
      <div className="grid gap-12 p-7 sm:p-12 lg:grid-cols-[1.3fr_1fr] lg:p-16">
        <div>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-aqua shadow-[0_0_10px_var(--color-aqua)]" />
            {workshopTrack.kicker} · {workshopTrack.date || "Dates to be announced"}
          </p>
          <h3 className="display mt-8 text-[clamp(3rem,8vw,6.5rem)]">
            Workshop <em className="text-aqua">Track</em>
          </h3>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-bone/85">{workshopTrack.blurb}</p>
          {workshopTrack.topics.length > 0 && (
            <ul className="mt-8 flex max-w-lg flex-wrap gap-2" aria-label="Example workshop topics">
              {workshopTrack.topics.map((t) => (
                <li key={t} className="rounded-full border border-line-2 px-3.5 py-1.5 text-sm text-mute">
                  {t}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-10 flex flex-wrap gap-3">
            {workshopTrack.signupUrl ? (
              <ButtonLink href={workshopTrack.signupUrl}>Sign up</ButtonLink>
            ) : (
              <ButtonLink href="/#updates">Get notified</ButtonLink>
            )}
          </div>
        </div>
        <Points points={workshopTrack.points} />
      </div>
    </div>
  );
}

/** Speaker Series: a slim strip that sits alongside the two tracks. */
export function SpeakerSeries() {
  return (
    <div
      id="speakers"
      className="glass grid scroll-mt-28 items-center gap-6 rounded-3xl p-7 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:gap-14 lg:px-16"
    >
      <div>
        <p className="eyebrow flex items-center gap-3">
          <span className="h-1.5 w-1.5 rounded-full bg-bone" />
          {speakerSeries.starts}
        </p>
        <h3 className="display mt-5 text-4xl sm:text-5xl">
          Speaker <em>Series</em>
        </h3>
      </div>
      <p className="max-w-xl leading-relaxed text-bone/80">{speakerSeries.blurb}</p>
      <TextLink href="/#updates">Get notified</TextLink>
    </div>
  );
}

/** Open slot: visitors propose the next track. */
export function SuggestTrack() {
  return (
    <div id="suggest" className="scroll-mt-28 rounded-3xl border border-dashed border-line-2">
      <div className="grid gap-10 p-7 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
        <div>
          <p className="eyebrow flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full border border-mute" />
            Track 03 · Open
          </p>
          <h3 className="display mt-8 text-[clamp(2.5rem,5.5vw,4.5rem)]">
            Have an idea for a track? <em>Let us know.</em>
          </h3>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">
            BIOME is built by its members. If there is a track you wish existed, tell us what it
            is and who it is for.
          </p>
        </div>
        <div className="self-end">
          <SuggestForm />
        </div>
      </div>
    </div>
  );
}

/** Email capture band for track announcements. */
export function Updates() {
  return (
    <section id="updates" className="scroll-mt-24 border-y border-line bg-ink-2">
      <div className="wrap grid gap-10 py-20 lg:grid-cols-2 lg:items-center lg:py-28">
        <Reveal>
          <p className="eyebrow">Stay in the loop</p>
          <h2 className="display mt-6 text-[clamp(2.25rem,5vw,4rem)]">
            Be first to know when the <em>next track opens.</em>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <SignupForm source="tracks" />
        </Reveal>
      </div>
    </section>
  );
}

/** Tiered partner wall. Unfilled tiles render as open slots. */
export function PartnerWall() {
  return (
    <div className="space-y-14">
      {partnerTiers.map((tier) => {
        const open = Math.max(0, tier.slots - tier.partners.length);
        return (
          <Reveal key={tier.name} className="grid gap-6 border-t border-line pt-10 lg:grid-cols-[1fr_3fr] lg:gap-12">
            <div>
              <h3 className="display text-3xl">{tier.name}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-mute">{tier.description}</p>
            </div>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {tier.partners.map((p) => {
                const inner = p.logo ? (
                  <Image src={p.logo} alt={p.name} width={160} height={48} className="max-h-10 w-auto object-contain opacity-80 transition-opacity group-hover:opacity-100" />
                ) : (
                  <span className="text-center text-sm font-medium">{p.name}</span>
                );
                const cls = "group glass flex h-28 items-center justify-center rounded-2xl p-5 transition-colors hover:border-line-2";
                return (
                  <li key={p.name}>
                    {p.url ? (
                      <a href={p.url} target="_blank" rel="noreferrer" className={cls}>
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </li>
                );
              })}
              {Array.from({ length: open }, (_, i) => (
                <li
                  key={`open-${i}`}
                  className="flex h-28 items-center justify-center rounded-2xl border border-dashed border-line-2 font-mono text-[10px] uppercase tracking-[0.16em] text-faint"
                >
                  Open slot
                </li>
              ))}
            </ul>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Closing call to action used at the bottom of every page. */
export function JoinCTA() {
  return (
    <section className="grain relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[130%]"
        style={{
          background:
            "radial-gradient(60% 60% at 50% 100%, rgba(61,255,168,.28), rgba(95,227,255,.08) 55%, transparent 75%)",
        }}
      />
      <div className="wrap relative py-28 text-center sm:py-40">
        <Reveal>
          <p className="eyebrow">Join BIOME</p>
          <h2 className="display mx-auto mt-8 max-w-4xl text-[clamp(2.75rem,8vw,7rem)]">
            It is never too early <em>to start.</em>
          </h2>
          <p className="mx-auto mt-8 max-w-lg text-lg leading-relaxed text-bone/80">
            You do not need a company, a co-founder, or a finished idea.
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <ButtonLink href={site.joinUrl} className="!px-8 !py-4 !text-base">
              Join Us Today
            </ButtonLink>
            <ButtonLink href="/tracks" variant="ghost" arrow={false} className="!px-8 !py-4 !text-base">
              See the tracks
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** "What you get": three concrete pillars. */
export function Pillars() {
  return (
    <ul className="grid gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-3">
      {pillars.map((p, i) => (
        <li key={p.title} className="bg-ink">
          <Reveal delay={i * 0.08} className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-ink-2 sm:p-10">
            <p className="eyebrow text-glow">0{i + 1}</p>
            <h3 className="display mt-12 text-6xl sm:text-7xl">{p.title}</h3>
            <p className="mt-5 mb-10 max-w-sm leading-relaxed text-mute">{p.body}</p>
            <div className="mt-auto">
              <TextLink href={p.href}>{p.cta}</TextLink>
            </div>
          </Reveal>
        </li>
      ))}
    </ul>
  );
}

/** FAQ accordion (native <details>, so it works without JavaScript). */
export function Faq() {
  if (!faq.length) return null;
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
      <Reveal>
        <p className="eyebrow">Questions</p>
        <h2 className="display mt-6 text-[clamp(2.25rem,4.5vw,3.75rem)]">
          Asked <em>often.</em>
        </h2>
      </Reveal>
      <Reveal delay={0.08} className="border-t border-line">
        {faq.map((item) => (
          <details key={item.q} className="group border-b border-line">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg transition-colors hover:text-glow [&::-webkit-details-marker]:hidden">
              {item.q}
              <span className="relative h-4 w-4 shrink-0 transition-transform duration-300 group-open:rotate-45" aria-hidden>
                <span className="absolute left-0 top-1/2 h-px w-4 bg-current" />
                <span className="absolute left-1/2 top-0 h-4 w-px bg-current" />
              </span>
            </summary>
            <p className="max-w-2xl pb-7 leading-relaxed text-mute">{item.a}</p>
          </details>
        ))}
      </Reveal>
    </div>
  );
}

/** "In the room": past speakers and mentors. Hidden until names are added. */
export function Speakers() {
  if (!speakers.length) return null;
  return (
    <section className="wrap pb-24 sm:pb-32">
      <Reveal>
        <p className="eyebrow">In the room</p>
        <h2 className="display mt-6 max-w-3xl text-[clamp(2.25rem,4.5vw,3.75rem)]">
          Learn from people who have <em>built it.</em>
        </h2>
      </Reveal>
      <ul className="mt-12 grid border-t border-line sm:grid-cols-2 sm:gap-x-12">
        {speakers.map((s) => (
          <li key={s.name} className="flex items-baseline justify-between gap-6 border-b border-line py-5">
            <span className="display text-2xl">{s.name}</span>
            <span className="text-right text-sm text-mute">{s.affiliation}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
