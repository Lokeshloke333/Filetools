"use client";

import React from "react";
import { FileSearch, Sparkles, Languages, Replace, Brush, Eye, Fingerprint, Box } from "lucide-react";

export function ComingSoon() {
  const features = [
    { name: "PDF OCR Engine", icon: <FileSearch className="w-5 h-5 text-blue-500" /> },
    { name: "AI Image Generator", icon: <Sparkles className="w-5 h-5 text-purple-500" /> },
    { name: "Document Translator", icon: <Languages className="w-5 h-5 text-indigo-500" /> },
    { name: "Background Remover", icon: <Replace className="w-5 h-5 text-rose-500" /> },
    { name: "SVG Editor", icon: <Brush className="w-5 h-5 text-emerald-500" /> },
    { name: "EXIF Viewer", icon: <Eye className="w-5 h-5 text-amber-500" /> },
    { name: "Watermark Maker", icon: <Fingerprint className="w-5 h-5 text-cyan-500" /> },
    { name: "3D File Converter", icon: <Box className="w-5 h-5 text-slate-500" /> },
  ];

  return (
    <section className="py-16 bg-white border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">
            Coming Soon
          </h2>
          <p className="text-slate-500">
            We are constantly working on new features. Here is a sneak peek of what's next.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="flex flex-col items-center justify-center p-6 border border-slate-100 border-dashed rounded-xl bg-slate-50/50 hover:bg-slate-50 transition-colors opacity-70 cursor-not-allowed"
            >
              <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center mb-3">
                {feature.icon}
              </div>
              <h3 className="text-sm font-semibold text-slate-700 text-center mb-2">{feature.name}</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                Coming Soon
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
