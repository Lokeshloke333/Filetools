import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Image - Convert PDF to JPG or PNG | FileTools",
  description: "Extract and convert pages from your PDF documents into high-quality JPG or PNG images. Customize resolution, quality, and page ranges.",
  keywords: "pdf to image, pdf to jpg, pdf to png, extract images from pdf, convert pdf to image, pdf tools",
  openGraph: {
    title: "PDF to Image - Convert PDF to JPG or PNG | FileTools",
    description: "Extract and convert pages from your PDF documents into high-quality JPG or PNG images. Customize resolution, quality, and page ranges.",
    url: "https://filetools.com/tools/pdf/pdf-to-image",
    type: "website",
  },
  alternates: {
    canonical: "https://filetools.com/tools/pdf/pdf-to-image",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
