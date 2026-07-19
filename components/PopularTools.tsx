"use client";

import React from "react";
import { ArrowRight, FileText, FileImage, FileVideo, Music, Scissors, Lock, FileSpreadsheet, Key } from "lucide-react";
import { AdPlaceholder } from "./AdPlaceholder";
import Link from "next/link";

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function ToolCard({ title, description, icon, href }: ToolCardProps) {
  return (
    <Link 
      href={href}
      className="group flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-200"
    >
      <div className="w-12 h-12 flex-shrink-0 bg-slate-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors">
        {icon}
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{description}</p>
      </div>
      <div className="ml-2 text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all">
        <ArrowRight className="w-5 h-5" />
      </div>
    </Link>
  );
}

export function PopularTools() {
  const tools = [
    {
      title: "PDF to Word",
      description: "Convert PDF to editable Word document.",
      icon: <FileText className="w-6 h-6 text-blue-600" />,
      href: "#",
    },
    {
      title: "Image Resize",
      description: "Resize images to exact pixel dimensions.",
      icon: <FileImage className="w-6 h-6 text-indigo-600" />,
      href: "/tools/image/compress",
    },
    {
      title: "Compress Video",
      description: "Reduce video file size without quality loss.",
      icon: <FileVideo className="w-6 h-6 text-rose-600" />,
      href: "#",
    },
    {
      title: "Audio Cutter",
      description: "Trim and cut audio files easily.",
      icon: <Music className="w-6 h-6 text-amber-500" />,
      href: "#",
    },
    {
      title: "Split PDF",
      description: "Extract pages from your PDF.",
      icon: <Scissors className="w-6 h-6 text-emerald-600" />,
      href: "#",
    },
    {
      title: "Unlock PDF",
      description: "Remove passwords from PDF files.",
      icon: <Key className="w-6 h-6 text-slate-700" />,
      href: "#",
    },
    {
      title: "Excel to PDF",
      description: "Convert spreadsheets to PDF.",
      icon: <FileSpreadsheet className="w-6 h-6 text-green-600" />,
      href: "#",
    },
    {
      title: "Protect PDF",
      description: "Add a password to secure your PDF.",
      icon: <Lock className="w-6 h-6 text-red-500" />,
      href: "#",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Popular Tools</h2>
            <p className="text-slate-500 mt-2">The most used tools by our community.</p>
          </div>
          <Link href="#" className="text-blue-600 font-medium flex items-center hover:underline">
            View all tools <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Content Area with Ads */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Ad - Desktop only */}
          <div className="hidden lg:block lg:col-span-2 sticky top-24">
            <AdPlaceholder height="h-[600px]" className="rounded-xl" />
          </div>

          {/* Tools Grid */}
          <div className="lg:col-span-8">
            <div className="grid md:grid-cols-2 gap-4">
              {tools.map((tool) => (
                <ToolCard
                  key={tool.title}
                  href={tool.href}
                  title={tool.title}
                  description={tool.description}
                  icon={tool.icon}
                />
              ))}
            </div>
            
            {/* Mobile/Tablet Ad - under the tools */}
            <div className="mt-8 lg:hidden">
              <AdPlaceholder height="h-[250px]" className="rounded-xl w-full max-w-md mx-auto" />
            </div>
          </div>

          {/* Right Ad - Desktop only */}
          <div className="hidden lg:block lg:col-span-2 sticky top-24">
            <AdPlaceholder height="h-[600px]" className="rounded-xl" />
          </div>

        </div>

      </div>
    </section>
  );
}
