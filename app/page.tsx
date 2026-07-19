import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SearchSection } from "@/components/SearchSection";
import { CategorySection } from "@/components/CategorySection";
import { PopularTools } from "@/components/PopularTools";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Statistics } from "@/components/Statistics";
import { ComingSoon } from "@/components/ComingSoon";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { BlogSection } from "@/components/BlogSection";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <Hero />
      <SearchSection />
      <PopularTools />
      <CategorySection />
      <Features />
      <HowItWorks />
      <Statistics />
      <ComingSoon />
      <Testimonials />
      <FAQ />
      <BlogSection />
      <CTA />
      <Footer />
    </main>
  );
}
