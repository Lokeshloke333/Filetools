import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getSoftwareAppSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Compress Image Online Free",
  description: "Compress JPG, PNG and WebP images online without losing quality. Fast, secure and completely free browser-based image compressor with Fileinator.",
  keywords: [
    "compress image",
    "compress jpg",
    "compress png",
    "image optimizer",
    "online compressor",
    "reduce image size"
  ],
  alternates: {
    canonical: "/tools/image/compress",
  },
  openGraph: {
    title: "Compress Image Online Free | Fileinator",
    description: "Compress JPG, PNG and WebP images online without losing quality. Fast, secure and completely free with Fileinator.",
    url: "/tools/image/compress",
    siteName: "Fileinator",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress Image Online Free | Fileinator",
    description: "Compress JPG, PNG and WebP images online without losing quality. Fast, secure and completely free with Fileinator.",
    images: ["/og-image.png"],
  },
};

export default function CompressImageLayout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "Image Tools", item: "/tools" },
    { name: "Compress Image", item: "/tools/image/compress" },
  ]);

  const softwareApp = getSoftwareAppSchema({
    name: "Compress Image",
    description: "Compress JPG, PNG and WebP images online without losing quality.",
    url: "/tools/image/compress",
    featureList: [
      "Supports JPG, PNG, WebP",
      "Fast Compression",
      "Browser Based",
      "No Upload Storage",
      "Lossy and Lossless Optimization"
    ],
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, softwareApp]} />
      {children}
    </>
  );
}
