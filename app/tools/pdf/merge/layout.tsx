import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF - Combine Multiple PDFs into One | FileTools",
  description: "Merge multiple PDF files into a single document instantly and securely. Drag and drop, reorder pages, and download your combined PDF for free.",
  keywords: "merge pdf, combine pdf, join pdf, merge pdf online, combine pdf free, pdf tools",
  openGraph: {
    title: "Merge PDF - Combine Multiple PDFs into One | FileTools",
    description: "Merge multiple PDF files into a single document instantly and securely. Drag and drop, reorder pages, and download your combined PDF for free.",
    url: "https://filetools.com/tools/pdf/merge",
    type: "website",
  },
  alternates: {
    canonical: "https://filetools.com/tools/pdf/merge",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
