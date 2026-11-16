import Link from "next/link";

/* ---------- Icons ---------- */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden className={`h-3.5 w-3.5 ${className}`}>
      <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

/** BIOME glyph: two crossing strands. */
export function Glyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <path d="M4 4c0 8 16 8 16 16" stroke="var(--color-glow)" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M20 4c0 8-16 8-16 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7.5 7.2h9M7.5 16.8h9" stroke="currentColor" strokeOpacity=".45" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Buttons ---------- */
const base =
  "group inline-flex items-center justify-center gap-2.5 rounded-full px-6 py-3 text-sm font-medium transition duration-300 ease-out-soft whitespace-nowrap";
const variants = {
  primary:
    "bg-bone text-ink hover:bg-glow hover:shadow-[0_0_40px_-6px_var(--color-glow)]",
  ghost: "border border-line-2 text-bone hover:border-bone/60 hover:bg-white/5",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  arrow = true,
}: {
  href: string;
  children: React.ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  arrow?: boolean;
}) {
  const cls = `${base} ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  const external = /^(https?:|mailto:)/.test(href);
  if (external || href.startsWith("#")) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/** Inline text link with an arrow. */
export function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-2 border-b border-line-2 pb-1 text-sm text-bone transition-colors hover:border-glow hover:text-glow"
    >
      {children}
      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
    </Link>
  );
}

/* ---------- Section scaffolding ---------- */
export function SectionHeading({
  index,
  label,
  title,
  lede,
  action,
}: {
  index?: string;
  label: string;
  title: React.ReactNode;
  lede?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="eyebrow flex items-center gap-3">
          {index && <span className="text-glow">{index}</span>}
          <span className="h-px w-8 bg-line-2" />
          {label}
        </p>
        <h2 className="display mt-6 text-[clamp(2.25rem,5vw,4.25rem)]">{title}</h2>
        {lede && <p className="mt-6 max-w-xl text-base leading-relaxed text-mute sm:text-lg">{lede}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/** Header block for interior pages. */
export function PageHeader({
  label,
  title,
  lede,
}: {
  label: string;
  title: React.ReactNode;
  lede: string;
}) {
  return (
    <header className="grain relative overflow-hidden border-b border-line pt-40 pb-20 sm:pt-48 sm:pb-28">
      <div
        aria-hidden
        className="absolute -right-40 -top-40 h-[640px] w-[640px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, rgba(61,255,168,.35), rgba(95,227,255,.12) 55%, transparent)" }}
      />
      <div className="wrap relative">
        <p className="eyebrow flex items-center gap-3">
          <span className="h-px w-8 bg-line-2" />
          {label}
        </p>
        <h1 className="display mt-8 max-w-5xl text-[clamp(2.75rem,7.5vw,6.5rem)]">{title}</h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mute sm:text-xl">{lede}</p>
      </div>
    </header>
  );
}
