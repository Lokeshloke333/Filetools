import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { CategorySection } from "@/components/CategorySection";
import { PopularTools } from "@/components/PopularTools";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Statistics } from "@/components/Statistics";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { BlogSection } from "@/components/BlogSection";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    absolute: "Free Online Image & PDF Tools | Fileinator",
  },
  description: "Fileinator is a free online image and PDF toolkit that lets you compress, convert, merge, split, unlock, and optimize files securely in your browser.",
  keywords: [
    "free online file tools",
    "online pdf tools",
    "online image tools",
    "compress pdf",
    "merge pdf",
    "split pdf",
    "image compressor",
    "browser file utilities"
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Free Online Image & PDF Tools | Fileinator",
    description: "Use Fileinator to compress, convert, merge, split, unlock and optimize images and PDF files online for free. Secure, fast, and browser-based.",
    url: "/",
    siteName: "Fileinator",
    type: "website",
    images: ["/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Image & PDF Tools | Fileinator",
    description: "Use Fileinator to compress, convert, merge, split, unlock and optimize images and PDF files online for free. Secure, fast, and browser-based.",
    images: ["/og-image.png"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <Hero />
      <PopularTools />
      <CategorySection />
      <Features />
      <HowItWorks />
      <Statistics />
      <Testimonials />
      <FAQ />
      <BlogSection />
      <CTA />
      <Footer />
    </main>
  );
}
