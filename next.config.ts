import type { NextConfig } from "next";

/**
 * STATIC_EXPORT=1 builds a plain static copy of the site (for GitHub Pages),
 * served under BASE_PATH. See scripts/deploy-pages.sh. A normal build keeps
 * the API routes for hosts that run Node, such as Vercel.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      basePath: process.env.BASE_PATH || "",
      trailingSlash: true,
      images: { unoptimized: true },
      env: { NEXT_PUBLIC_STATIC_PREVIEW: "1" },
    }
  : {};

export default nextConfig;
