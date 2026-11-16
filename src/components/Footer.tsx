import Link from "next/link";
import { site } from "@/data/site";
import { SignupForm } from "./SignupForm";
import { Glyph } from "./ui";

export function Footer() {
  const socials = Object.entries(site.socials).filter(([, url]) => url);

  return (
    <footer className="border-t border-line">
      <div className="wrap py-16 sm:py-20">
        <div className="mb-16 grid gap-8 border-b border-line pb-14 lg:grid-cols-2 lg:items-center">
          <p className="display text-4xl">
            Stay in <em>the loop.</em>
          </p>
          <SignupForm source="footer" />
        </div>
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Glyph className="h-6 w-6" />
              <span className="text-[15px] font-semibold tracking-[0.22em]">{site.shortName}</span>
            </Link>
            <p className="display mt-6 max-w-sm text-3xl text-bone/90">
              Science, <em>built into companies.</em>
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-bone/75 transition-colors hover:text-glow">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="eyebrow">Connect</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href={site.joinUrl} className="text-bone/75 transition-colors hover:text-glow">
                  Join BIOME
                </a>
              </li>
              {site.contactEmail && (
                <li>
                  <a
                    href={`mailto:${site.contactEmail}`}
                    className="text-bone/75 transition-colors hover:text-glow"
                  >
                    {site.contactEmail}
                  </a>
                </li>
              )}
              {socials.map(([name, url]) => (
                <li key={name}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="capitalize text-bone/75 transition-colors hover:text-glow"
                  >
                    {name === "x" ? "X" : name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 text-xs text-faint sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. A student organization at Stanford University.
          </p>
          <p className="font-mono uppercase tracking-[0.16em]">Stanford, California</p>
        </div>
      </div>
    </footer>
  );
}
