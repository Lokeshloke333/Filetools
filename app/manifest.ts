/**
 * src/app/manifest.ts
 *
 * Next.js 15 App Router metadata route.
 * Automatically served at: https://fileinator.in/manifest.webmanifest
 * (Next.js also transparently serves it for a linked /manifest.json
 * reference in <head>, generated automatically via this file.)
 *
 * Docs: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/manifest
 *
 * Place the referenced icon files in /public/icons/ (see paths below).
 * Required assets:
 *   - /public/icons/icon-192x192.png   (192x192, any purpose)
 *   - /public/icons/icon-512x512.png   (512x512, any purpose)
 *   - /public/icons/icon-maskable.png  (512x512, purpose: maskable)
 *   - /public/favicon.ico              (standard favicon)
 */

import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site.config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.shortName,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: siteConfig.backgroundColor,
    theme_color: siteConfig.themeColor,
    lang: siteConfig.locale,
    categories: [...siteConfig.categories],
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
