import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getSoftwareAppSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Rotate Image Online",
  description: "Rotate images 90, 180, or 270 degrees clockwise or counterclockwise online. Flip photos horizontally or vertically fast and free with Fileinator.",
  keywords: [
    "rotate image",
    "rotate photo online",
    "flip image",
    "picture rotator",
    "turn photo 90 degrees",
    "online image rotator"
  ],
  alternates: {
    canonical: "/tools/image/rotate",
  },
  openGraph: {
    title: "Rotate Image Online | Fileinator",
    description: "Rotate images 90, 180, or 270 degrees clockwise or counterclockwise online. Flip photos horizontally or vertically fast and free with Fileinator.",
    url: "/tools/image/rotate",
    siteName: "Fileinator",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rotate Image Online | Fileinator",
    description: "Rotate images 90, 180, or 270 degrees clockwise or counterclockwise online. Flip photos horizontally or vertically fast and free with Fileinator.",
    images: ["/og-image.png"],
  },
};

export default function RotateImageLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Image Tools", item: "/tools" },
    { name: "Rotate Image", item: "/tools/image/rotate" },
  ]);

  const softwareApp = getSoftwareAppSchema({
    name: "Rotate Image",
    description: "Rotate images 90, 180, or 270 degrees clockwise or counterclockwise online. Flip photos horizontally or vertically.",
    url: "/tools/image/rotate",
    featureList: [
      "Rotate 90, 180, 270 degrees",
      "Flip Horizontally or Vertically",
      "Fast Browser Processing",
      "No Quality Degradation",
      "Free & Private"
    ],
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, softwareApp]} />
      {children}
    </>
  );
}
