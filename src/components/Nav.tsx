"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { ButtonLink, Glyph } from "./ui";

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation, and lock scroll while it is open.
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? "border-b border-line bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent"
        }`}
      >
        <div className="wrap flex h-18 items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2.5" aria-label={`${site.name} home`}>
            <Glyph className="h-6 w-6" />
            <span className="text-[15px] font-semibold tracking-[0.22em]">{site.shortName}</span>
            <span className="eyebrow hidden pl-1 sm:inline">Stanford</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {site.nav.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative text-sm transition-colors ${
                    active ? "text-bone" : "text-bone/65 hover:text-bone"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -bottom-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-glow"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ButtonLink href={site.joinUrl} arrow={false} className="!px-5 !py-2.5">
              Join Us
            </ButtonLink>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-2 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 h-px w-5 bg-bone transition-all duration-300 ${
                    open ? "top-1.5 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-5 bg-bone transition-all duration-300 ${
                    open ? "top-1.5 -rotate-45" : "top-3"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 px-5 pt-28 pb-10 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {site.nav.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i + 0.05 }}
                >
                  <Link
                    href={item.href}
                    className="display flex items-baseline justify-between border-b border-line py-4 text-4xl"
                  >
                    {item.label}
                    <span className="eyebrow">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <ButtonLink href={site.joinUrl} className="mt-auto w-full">
              Join Us Today
            </ButtonLink>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
