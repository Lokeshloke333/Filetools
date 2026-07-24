/**
 * src/app/sitemap.ts
 *
 * Next.js 15 App Router metadata route.
 * Automatically served at: https://fileinator.in/sitemap.xml
 *
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
 *
 * Scalability:
 * This file never needs to change when tools are added/removed — it
 * simply maps over `allRoutes` from `src/lib/routes.config.ts`. To add a
 * new tool page, add one entry to `toolRoutes` in that file (or, better,
 * generate it from your real tools registry) and it will automatically
 * appear here, in robots.ts (if relevant), and in your nav — single
 * source of truth.
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";
import { allRoutes } from "@/lib/routes.config";

// Regenerate the sitemap at most once a day so it stays fresh without
// hitting build/runtime cost on every request.
export const revalidate = 86400; // 24 hours, in seconds

export default function sitemap(): MetadataRoute.Sitemap {
  const buildTime = new Date();

  return allRoutes.map((route) => ({
    url:
      route.path === "/"
        ? siteConfig.url
        : `${siteConfig.url}${route.path}`,
    lastModified: route.lastModified ?? buildTime,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
