import React from "react";
import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

export interface CategoryData {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  shadow: string;
  status: "active" | "coming-soon";
}

interface CategoryCardProps {
  category: CategoryData;
  toolCount?: number;
  onClick?: () => void;
  href?: string;
}

export function CategoryCard({ category, toolCount = 0, onClick, href }: CategoryCardProps) {
  const Icon = category.icon;
  const isComingSoon = category.status === "coming-soon";

  const content = (
    <>
      <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
        <Icon className="w-32 h-32" />
      </div>
      
      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm relative z-10">
        <Icon className="w-6 h-6 text-white" />
      </div>
      
      <h3 className="text-xl font-bold mb-2 relative z-10">{category.title}</h3>
      <p className="text-white/80 text-sm mb-6 flex-grow relative z-10">{category.description}</p>
      
      <div className="flex items-center justify-between mt-auto relative z-10 w-full">
        <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold">
          {isComingSoon ? "Coming Soon" : `${toolCount} tools`}
        </span>
        <ArrowRight className="w-5 h-5 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
      </div>
    </>
  );

  const className = `group text-left relative flex flex-col h-full p-6 rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-lg ${category.shadow} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden`;

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={className} type="button">
      {content}
    </button>
  );
}
