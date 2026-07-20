"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { FeaturedCategories } from "@/components/tools/FeaturedCategories";
import { TOOLS } from "@/lib/tools";

export function CategorySection() {
  const router = useRouter();

  const toolCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    TOOLS.forEach((tool) => {
      counts[tool.category] = (counts[tool.category] || 0) + 1;
    });
    return counts;
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    router.push(`/tools?search=${encodeURIComponent(categoryId)}`);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <FeaturedCategories onSelectCategory={handleCategorySelect} toolCounts={toolCounts} />
      </div>
    </section>
  );
}
