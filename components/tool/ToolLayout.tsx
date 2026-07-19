"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AdPlaceholder } from "@/components/AdPlaceholder";
import { Breadcrumb } from "./Breadcrumb";

interface ToolLayoutProps {
  children: React.ReactNode;
  breadcrumbs: { label: string; href?: string }[];
}

export function ToolLayout({ children, breadcrumbs }: ToolLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <main className="flex-grow flex flex-col">
        {/* Breadcrumb Area */}
        <div className="border-b border-slate-200 bg-white mb-6">
          <div className="container mx-auto px-4 md:px-6 py-3">
            <Breadcrumb items={breadcrumbs} />
          </div>
        </div>

        {/* Top Advertisement */}
        {/* <div className="container mx-auto px-4 md:px-6 py-8">
          <AdPlaceholder width="max-w-4xl w-full" height="h-[90px]" label="ADVERTISEMENT 728 x 90" />
        </div> */}

        {/* 3-Column Layout Area */}
        <div className="container mx-auto px-4 md:px-6 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-start">

            {/* Left Sidebar Advertisement - Hidden on mobile/tablet */}
            <aside className="hidden lg:flex flex-col gap-6 col-span-3 xl:col-span-2 sticky top-24">
              <AdPlaceholder width="w-full" height="h-[250px]" label="ADVERTISEMENT 300 x 250" />
              <AdPlaceholder width="w-full" height="h-[600px]" label="ADVERTISEMENT 300 x 600" />
            </aside>

            {/* Main Tool Content */}
            <div className="col-span-1 lg:col-span-6 xl:col-span-8 flex flex-col gap-10 lg:gap-12 w-full">
              {children}
            </div>

            {/* Right Sidebar Advertisement - Hidden on mobile/tablet */}
            <aside className="hidden lg:flex flex-col gap-6 col-span-3 xl:col-span-2 sticky top-24">
              <AdPlaceholder width="w-full" height="h-[250px]" label="ADVERTISEMENT 300 x 250" />
              <AdPlaceholder width="w-full" height="h-[600px]" label="ADVERTISEMENT 300 x 600" />
            </aside>

          </div>
        </div>

        {/* Bottom Advertisement */}
        <div className="container mx-auto px-4 md:px-6 pb-16">
          <AdPlaceholder width="max-w-4xl w-full" height="h-[90px]" label="ADVERTISEMENT 728 x 90" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
