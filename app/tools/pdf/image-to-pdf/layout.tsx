import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Image to PDF - Convert JPG, PNG to PDF Online | FileTools",
  description: "Convert your JPG, PNG, WEBP, and AVIF images into a single PDF document. Customize page size, orientation, and margins for free.",
  keywords: "image to pdf, jpg to pdf, png to pdf, convert image to pdf, photo to pdf, pdf tools",
  openGraph: {
    title: "Image to PDF - Convert JPG, PNG to PDF Online | FileTools",
    description: "Convert your JPG, PNG, WEBP, and AVIF images into a single PDF document. Customize page size, orientation, and margins for free.",
    url: "https://filetools.com/tools/pdf/image-to-pdf",
    type: "website",
  },
  alternates: {
    canonical: "https://filetools.com/tools/pdf/image-to-pdf",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
