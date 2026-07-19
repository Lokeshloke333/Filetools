"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

export function SearchSection() {
  const [query, setQuery] = useState("");

  const popularSearches = [
    "PDF to Word",
    "Merge PDF",
    "Image Resize",
    "Compress Video",
    "JPG to PNG",
  ];

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          
          {/* Search Bar */}
          <div className="relative w-full shadow-lg shadow-slate-200/50 rounded-2xl group transition-all duration-300 focus-within:shadow-xl focus-within:shadow-blue-200/50">
            <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
              <Search className="w-6 h-6 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="block w-full p-5 pl-14 text-base md:text-lg text-slate-900 border border-slate-200 rounded-2xl bg-white outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-slate-400"
              placeholder="Search for tools (e.g., 'Compress PDF')..."
            />
            <button className="absolute inset-y-2 right-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-colors">
              Search
            </button>
          </div>

          {/* Popular Searches */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <span className="text-sm font-medium text-slate-500 mr-2">Popular:</span>
            {popularSearches.map((term) => (
              <button
                key={term}
                onClick={() => setQuery(term)}
                className="text-xs md:text-sm font-medium text-slate-600 bg-slate-100 hover:bg-blue-50 hover:text-blue-600 px-3 py-1.5 rounded-full transition-colors"
              >
                {term}
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
