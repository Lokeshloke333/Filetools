import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBreadcrumbSchema, getSoftwareAppSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Split PDF Online",
  description: "Easily split your PDF document into multiple files, extract specific pages, or divide by page ranges. Fast, secure, and free online PDF splitter.",
  keywords: [
    "split pdf",
    "extract pdf pages",
    "divide pdf",
    "cut pdf",
    "separate pdf pages",
    "online pdf splitter"
  ],
  alternates: {
    canonical: "/tools/pdf/split",
  },
  openGraph: {
    title: "Split PDF Online | Fileinator",
    description: "Easily split your PDF document into multiple files, extract specific pages, or divide by page ranges. Fast, secure, and free online PDF splitter.",
    url: "/tools/pdf/split",
    siteName: "Fileinator",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Split PDF Online | Fileinator",
    description: "Easily split your PDF document into multiple files, extract specific pages, or divide by page ranges. Fast, secure, and free online PDF splitter.",
    images: ["/og-image.png"],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  const breadcrumbs = getBreadcrumbSchema([
    { name: "Home", item: "/" },
    { name: "PDF Tools", item: "/tools" },
    { name: "Split PDF", item: "/tools/pdf/split" },
  ]);

  const softwareApp = getSoftwareAppSchema({
    name: "Split PDF",
    description: "Easily split your PDF document into multiple files or extract specific pages.",
    url: "/tools/pdf/split",
    featureList: [
      "Extract Specific Pages",
      "Divide by Page Ranges",
      "Fast & Secure",
      "Browser Based Processing",
      "Free to Use"
    ],
  });

  return (
    <>
      <JsonLd data={[breadcrumbs, softwareApp]} />
      {children}
    </>
  );
}
