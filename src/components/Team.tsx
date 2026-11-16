import Image from "next/image";
import { advisors, executives, president, type Person } from "@/data/team";
import { Reveal } from "./Reveal";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

/** Portrait slot: the photo when one is set, otherwise a monogram placeholder. */
function Portrait({ person, sizes }: { person: Person; sizes: string }) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-line bg-ink-2">
      {person.image ? (
        <Image
          src={person.image}
          alt={`Portrait of ${person.name}`}
          fill
          sizes={sizes}
          className="object-cover grayscale transition duration-700 ease-out-soft group-hover:scale-[1.03] group-hover:grayscale-0"
        />
      ) : (
        <div
          aria-hidden
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "radial-gradient(120% 80% at 80% 110%, rgba(61,255,168,.16), transparent 60%), linear-gradient(180deg, #0d141d, #080c12)",
          }}
        >
          <span className="display text-6xl text-bone/25 transition-colors duration-500 group-hover:text-glow/70">
            {initials(person.name)}
          </span>
        </div>
      )}
      <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition duration-500 group-hover:ring-glow/40" />
    </div>
  );
}

function Links({ person }: { person: Person }) {
  const l = person.links;
  if (!l) return null;
  const items = [
    l.linkedin && { label: "LinkedIn", href: l.linkedin },
    l.website && { label: "Website", href: l.website },
    l.email && { label: "Email", href: `mailto:${l.email}` },
  ].filter(Boolean) as { label: string; href: string }[];
  if (!items.length) return null;
  return (
    <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
      {items.map((i) => (
        <li key={i.label}>
          <a
            href={i.href}
            target={i.href.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            className="eyebrow !text-[10px] underline-offset-4 transition-colors hover:text-glow hover:underline"
            aria-label={`${person.name} on ${i.label}`}
          >
            {i.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className="group">
      <Portrait person={person} sizes="(min-width: 1024px) 18vw, (min-width: 640px) 33vw, 50vw" />
      <h3 className="mt-4 text-base font-medium leading-tight">{person.name}</h3>
      <p className={`mt-1.5 text-sm ${person.role === "President" ? "text-glow" : "text-mute"}`}>
        {person.role}
        {person.focus ? ` · ${person.focus}` : ""}
      </p>
      {person.bio && <p className="mt-3 text-sm leading-relaxed text-mute">{person.bio}</p>}
      <Links person={person} />
    </article>
  );
}

/** Larger lead card for the president. */
function LeadCard({ person }: { person: Person }) {
  return (
    <article className="group glass grid gap-6 rounded-3xl p-4 sm:grid-cols-[minmax(0,260px)_1fr] sm:gap-10 sm:p-5">
      <Portrait person={person} sizes="(min-width: 640px) 260px, 100vw" />
      <div className="flex flex-col justify-end p-2 sm:py-6">
        <p className="eyebrow text-glow">{person.role}</p>
        <h3 className="display mt-4 text-5xl sm:text-6xl">{person.name}</h3>
        {person.focus && <p className="mt-3 text-mute">{person.focus}</p>}
        {person.bio && <p className="mt-5 max-w-xl leading-relaxed text-mute">{person.bio}</p>}
        <Links person={person} />
      </div>
    </article>
  );
}

function Grid({ label, people }: { label: string; people: Person[] }) {
  return (
    <div className="border-t border-line pt-10">
      <h3 className="display text-3xl sm:text-4xl">{label}</h3>
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
        {people.map((p, i) => (
          <Reveal key={p.name} delay={(i % 5) * 0.05}>
            <PersonCard person={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function Team() {
  // With a bio the president gets a feature card; without one they lead the grid.
  const feature = Boolean(president.bio);
  return (
    <div className="space-y-16">
      {feature && (
        <Reveal>
          <LeadCard person={president} />
        </Reveal>
      )}
      <Grid
        label="Executive board"
        people={feature ? executives : [president, ...executives]}
      />
      <Grid
        label="Advisors"
        people={advisors}
      />
    </div>
  );
}
