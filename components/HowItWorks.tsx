"use client";

import React from "react";
import { UploadCloud, Settings, DownloadCloud } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      title: "1. Upload",
      description: "Select or drag & drop your files into our secure platform.",
      icon: <UploadCloud className="w-8 h-8 text-blue-400" />,
    },
    {
      title: "2. Process",
      description: "Our cloud servers process your request in just a few seconds.",
      icon: <Settings className="w-8 h-8 text-blue-400" />,
    },
    {
      title: "3. Download",
      description: "Download your processed files instantly. Easy and fast.",
      icon: <DownloadCloud className="w-8 h-8 text-blue-400" />,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-slate-900 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[100px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            How It Works
          </h2>
          <p className="text-slate-400 text-lg">
            Convert, edit, and compress your files in three simple steps. No software installation required.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
          </div>

          <div className="grid md:grid-cols-3 gap-10 md:gap-8">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10 group">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-900 flex items-center justify-center mb-6 shadow-xl relative group-hover:scale-110 transition-transform duration-300">
                  <div className="absolute inset-0 rounded-full bg-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
