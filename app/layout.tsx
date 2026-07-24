import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { siteConfig } from "@/lib/site.config";
import { JsonLd } from "@/components/seo/JsonLd";
import { getOrganizationSchema, getWebSiteSchema } from "@/lib/seo/schema";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import { MicrosoftClarity } from "@/components/analytics/MicrosoftClarity";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Fileinator",
    template: "%s | Fileinator",
  },
  description: "Fileinator is a free online image and PDF toolkit that lets you compress, convert, merge, split, unlock, and optimize files securely in your browser. Fast, private, and easy to use.",
  keywords: [
    "online image tools",
    "online pdf tools",
    "compress image",
    "merge pdf",
    "split pdf",
    "unlock pdf",
    "image to pdf",
    "pdf to image",
    "convert image",
    "free file tools",
    "browser file tools",
    "pdf utilities",
    "image utilities"
  ],
  authors: [{ name: "Fileinator", url: siteConfig.url }],
  applicationName: "Fileinator",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: "Fileinator",
    title: "Free Online Image & PDF Tools | Fileinator",
    description: "Use Fileinator to compress, convert, merge, split, unlock and optimize images and PDF files online for free.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fileinator - Free Online File Tools",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Image & PDF Tools | Fileinator",
    description: "Use Fileinator to compress, convert, merge, split, unlock and optimize images and PDF files online for free.",
    images: ["/og-image.png"],
    creator: "@Fileinator",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192x192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512x512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png" }
    ],
  },
  appleWebApp: {
    capable: true,
    title: "Fileinator",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_BING_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = getOrganizationSchema();
  const webSiteSchema = getWebSiteSchema();

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <JsonLd data={[organizationSchema, webSiteSchema]} />
      </head>
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster position="bottom-right" />
        <GoogleAnalytics />
        <MicrosoftClarity />
      </body>
    </html>
  );
}
