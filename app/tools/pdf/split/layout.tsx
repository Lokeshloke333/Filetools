import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Split PDF - Extract Pages or Split into Multiple Files | FileTools",
  description: "Easily split your PDF document into multiple files, extract specific pages, or divide by page ranges. Fast, secure, and free online PDF splitter.",
  keywords: "split pdf, extract pdf pages, divide pdf, cut pdf, separate pdf pages, pdf tools",
  openGraph: {
    title: "Split PDF - Extract Pages or Split into Multiple Files | FileTools",
    description: "Easily split your PDF document into multiple files, extract specific pages, or divide by page ranges. Fast, secure, and free online PDF splitter.",
    url: "https://filetools.com/tools/pdf/split",
    type: "website",
  },
  alternates: {
    canonical: "https://filetools.com/tools/pdf/split",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
