"use client";

import React from "react";
import { ArrowRight, Image as ImageIcon, FileText, Video, Music, Sparkles, Wrench } from "lucide-react";

interface FeaturedCategoriesProps {
  onSelectCategory: (category: string) => void;
  toolCounts: Record<string, number>;
}

export const CATEGORY_DATA = [
  {
    id: "Image",
    title: "Image Tools",
    description: "Compress, resize, crop and convert images",
    icon: ImageIcon,
    gradient: "from-indigo-500 to-purple-600",
    shadow: "shadow-indigo-500/20",
  },
  {
    id: "PDF",
    title: "PDF Tools",
    description: "Merge, split, compress and convert PDFs",
    icon: FileText,
    gradient: "from-rose-500 to-red-600",
    shadow: "shadow-rose-500/20",
  },
  {
    id: "Video",
    title: "Video Tools",
    description: "Compress, convert and trim video files",
    icon: Video,
    gradient: "from-blue-500 to-indigo-600",
    shadow: "shadow-blue-500/20",
  },
  {
    id: "Audio",
    title: "Audio Tools",
    description: "Convert, cut and merge audio tracks",
    icon: Music,
    gradient: "from-orange-500 to-amber-600",
    shadow: "shadow-orange-500/20",
  },
  {
    id: "AI",
    title: "AI Tools",
    description: "Remove backgrounds and enhance with AI",
    icon: Sparkles,
    gradient: "from-cyan-500 to-blue-600",
    shadow: "shadow-cyan-500/20",
  },
  {
    id: "Utilities",
    title: "Utilities",
    description: "QR codes, palettes, and code formatters",
    icon: Wrench,
    gradient: "from-emerald-500 to-teal-600",
    shadow: "shadow-emerald-500/20",
  },
];

export function FeaturedCategories({ onSelectCategory, toolCounts }: FeaturedCategoriesProps) {

  const handleCategoryClick = (categoryId: string) => {
    onSelectCategory(categoryId);
  };

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Featured Categories</h2>
        <p className="text-slate-500 mt-1">Jump directly to a tool category.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {CATEGORY_DATA.map((cat) => {
          const Icon = cat.icon;
          const count = toolCounts[cat.id] || 0;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className={`group text-left relative flex flex-col p-6 rounded-2xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg ${cat.shadow} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`}
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500">
                <Icon className="w-32 h-32" />
              </div>
              
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                <Icon className="w-6 h-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold mb-2 relative z-10">{cat.title}</h3>
              <p className="text-white/80 text-sm mb-6 flex-grow relative z-10">{cat.description}</p>
              
              <div className="flex items-center justify-between mt-auto relative z-10 w-full">
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
                  {count} tools
                </span>
                <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
