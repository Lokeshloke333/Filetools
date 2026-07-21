"use client";

import React, { useState, useEffect } from "react";
import { SlidersHorizontal, Check } from "lucide-react";
import { GlobalSearch } from "../search/GlobalSearch";

export type SortOption = "popular" | "newest" | "alphabetical";

interface ToolsFilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export function ToolsFilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}: ToolsFilterBarProps) {
  const [isSortOpen, setIsSortOpen] = useState(false);

  const sortLabels: Record<SortOption, string> = {
    popular: "Most Popular",
    newest: "Newest",
    alphabetical: "Alphabetical",
  };

  return (
    <div className="sticky top-16 lg:top-20 z-40 py-4 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm px-4 md:px-6 w-full">
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between max-w-7xl mx-auto w-full">
        
        {/* Search */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <GlobalSearch 
            variant="filterBar" 
            initialValue={searchQuery} 
            onSearchChange={onSearchChange} 
          />
        </div>

        {/* Categories Scrollable Row */}
        <div className="flex-grow overflow-x-auto pb-2 lg:pb-0 hide-scrollbar w-full">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => onSelectCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                      : "bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="relative flex-shrink-0 w-full lg:w-auto">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            className="w-full lg:w-auto flex items-center justify-between lg:justify-start gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" />
              <span>{sortLabels[sortBy]}</span>
            </div>
          </button>

          {isSortOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsSortOpen(false)}
              />
              <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl z-20 py-1 overflow-hidden">
                {(Object.entries(sortLabels) as [SortOption, string][]).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      onSortChange(key);
                      setIsSortOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-slate-50 transition-colors text-slate-700"
                  >
                    {label}
                    {sortBy === key && <Check className="w-4 h-4 text-blue-600" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
