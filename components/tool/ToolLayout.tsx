"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Breadcrumb } from "@/components/navigation/Breadcrumb";

interface ToolLayoutProps {
  children: React.ReactNode;
}

export function ToolLayout({ children }: ToolLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <main className="flex-grow flex flex-col">
        {/* Breadcrumb Area */}
        <div className="border-b border-slate-200 bg-white mb-6">
          <div className="container mx-auto px-4 md:px-6 py-3 max-w-7xl">
            <Breadcrumb />
          </div>
        </div>

        {/* Main Tool Content Area */}
        <div className="container mx-auto px-4 md:px-6 pb-16 max-w-7xl">
          <div className="w-full flex flex-col gap-10 lg:gap-12">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
