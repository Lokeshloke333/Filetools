import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Compress PDF - Reduce PDF File Size Online | FileTools",
  description: "Compress PDF files online for free. Reduce the file size of your PDF documents quickly while maintaining the best possible quality for sharing.",
  keywords: "compress pdf, reduce pdf size, make pdf smaller, optimize pdf, pdf tools",
  openGraph: {
    title: "Compress PDF - Reduce PDF File Size Online | FileTools",
    description: "Compress PDF files online for free. Reduce the file size of your PDF documents quickly while maintaining the best possible quality for sharing.",
    url: "https://filetools.com/tools/pdf/compress",
    type: "website",
  },
  alternates: {
    canonical: "https://filetools.com/tools/pdf/compress",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
