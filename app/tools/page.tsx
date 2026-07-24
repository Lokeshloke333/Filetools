import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Features } from "@/components/Features";
import { CTA } from "@/components/CTA";
import { ToolsDirectory } from "@/components/tools/ToolsDirectory";
import Link from "next/link";
import { ChevronRight, LayoutGrid } from "lucide-react";

export const metadata = {
  title: "Browse All Tools | Fileinator",
  description: "Discover powerful online tools to compress, convert, edit and optimize your files.",
};

export default function ToolsPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      {/* Page Header / Hero Section */}
      <div className="bg-white border-b border-slate-200 pt-8 pb-12">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
          
          {/* Breadcrumb */}
          <nav className="flex items-center text-sm text-slate-500 font-medium mb-8">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2 text-slate-300" />
            <span className="text-slate-900 flex items-center gap-1.5">
              <LayoutGrid className="w-4 h-4" />
              Browse All Tools
            </span>
          </nav>

          {/* Hero Content */}
          <div className="flex flex-col lg:flex-row gap-10 lg:items-center justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold text-xs uppercase tracking-wider mb-4 border border-blue-100">
                <LayoutGrid className="w-3.5 h-3.5" />
                Tool Directory
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">
                Browse All Tools
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
                Discover powerful online tools to compress, convert, edit and optimize your files. 
                Fast, secure and completely browser-based.
              </p>
            </div>
            
            {/* Statistics */}
            <div className="w-full lg:w-[400px] flex-shrink-0">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-3">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">100+</h3>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Tools</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center mb-3">
                    <LayoutGrid className="w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">7</h3>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Categories</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">Free</h3>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Forever</p>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
                  <div className="w-10 h-10 bg-rose-100 text-rose-600 rounded-xl flex items-center justify-center mb-3">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mb-1">256-bit</h3>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Directory Area */}
      <section className="pb-12">
        <React.Suspense fallback={<div className="h-96 flex items-center justify-center text-slate-500">Loading directory...</div>}>
          <ToolsDirectory />
        </React.Suspense>
      </section>

      {/* Reused Sections */}
      <div className="bg-white">
        <Features />
      </div>
      <CTA />
      
      <Footer />
    </main>
  );
}
