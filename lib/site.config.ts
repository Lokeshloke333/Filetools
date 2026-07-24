/**
 * src/lib/site.config.ts
 *
 * Single source of truth for site-wide constants used by the
 * technical SEO layer (robots, sitemap, manifest, metadata, etc).
 *
 * IMPORTANT: Never hardcode the production domain anywhere else in the
 * codebase. Always import `siteConfig.url` from here instead, and
 * override it via NEXT_PUBLIC_SITE_URL for preview/staging deployments.
 */

export const siteConfig = {
  name: "Fileinator",
  shortName: "Fileinator",
  description:
    "Free online image and PDF tools. Compress, convert, merge, split, unlock, and optimize files securely in your browser.",
  // Falls back to production domain if the env var isn't set (e.g. local dev).
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://fileinator.in",
  // Replace with your actual brand primary color (kept here as the
  // single source of truth — used by manifest.ts and layout theme-color).
  themeColor: "#2563EB",
  backgroundColor: "#ffffff",
  locale: "en",
  categories: ["productivity", "utilities"] as const,
} as const;

export type SiteConfig = typeof siteConfig;
