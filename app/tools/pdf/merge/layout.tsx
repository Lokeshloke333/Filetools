import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Merge PDF - Combine Multiple PDFs into One | Fileinator",
  description: "Merge multiple PDF files into a single document instantly and securely. Drag and drop, reorder pages, and download your combined PDF for free.",
  keywords: "merge pdf, combine pdf, join pdf, merge pdf online, combine pdf free, pdf tools",
  openGraph: {
    title: "Merge PDF - Combine Multiple PDFs into One | Fileinator",
    description: "Merge multiple PDF files into a single document instantly and securely. Drag and drop, reorder pages, and download your combined PDF for free.",
    url: "https://fileinator.com/tools/pdf/merge",
    type: "website",
  },
  alternates: {
    canonical: "https://fileinator.com/tools/pdf/merge",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
