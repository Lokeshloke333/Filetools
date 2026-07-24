import { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF to Image - Convert PDF to JPG or PNG | Fileinator",
  description: "Extract and convert pages from your PDF documents into high-quality JPG or PNG images. Customize resolution, quality, and page ranges.",
  keywords: "pdf to image, pdf to jpg, pdf to png, extract images from pdf, convert pdf to image, pdf tools",
  openGraph: {
    title: "PDF to Image - Convert PDF to JPG or PNG | Fileinator",
    description: "Extract and convert pages from your PDF documents into high-quality JPG or PNG images. Customize resolution, quality, and page ranges.",
    url: "https://fileinator.com/tools/pdf/pdf-to-image",
    type: "website",
  },
  alternates: {
    canonical: "https://fileinator.com/tools/pdf/pdf-to-image",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
