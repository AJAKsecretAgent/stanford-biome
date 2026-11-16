"use client";

import { MotionConfig } from "framer-motion";

/** Makes every Framer Motion animation respect the OS "reduce motion" setting. */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
