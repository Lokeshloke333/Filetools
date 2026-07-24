/**
 * src/app/robots.ts
 *
 * Next.js 15 App Router metadata route.
 * Automatically served at: https://fileinator.in/robots.txt
 *
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";
import { disallowedPaths } from "@/lib/routes.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: disallowedPaths,
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
