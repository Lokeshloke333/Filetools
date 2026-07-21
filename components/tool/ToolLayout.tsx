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
          <div className="max-w-7xl mx-auto w-full px-4 md:px-6 py-3">
            <Breadcrumb />
          </div>
        </div>

        {/* Main Tool Content */}
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6 pb-16">
          <div className="max-w-6xl mx-auto flex flex-col gap-10 lg:gap-12 w-full">
            {children}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
