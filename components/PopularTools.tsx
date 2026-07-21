"use client";

import { ArrowRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import { TOOLS } from "@/lib/tools";

interface ToolCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  href: string;
  isComingSoon?: boolean;
}

function ToolCard({ title, description, icon: Icon, color, href, isComingSoon }: ToolCardProps) {
  if (isComingSoon) {
    return (
      <div className="group flex items-center p-4 bg-slate-50/50 border border-slate-200/60 rounded-xl opacity-70">
        <div className="w-12 h-12 flex-shrink-0 bg-slate-100/50 rounded-lg flex items-center justify-center mr-4">
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <div className="flex-grow">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-slate-500">
              {title}
            </h3>
            <span className="text-[10px] uppercase tracking-wider font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded-full">
              Soon
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <Link 
      href={href}
      className="group flex items-center p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-500 hover:shadow-md transition-all duration-200"
    >
      <div className="w-12 h-12 flex-shrink-0 bg-slate-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-50 transition-colors">
        <Icon className={`w-6 h-6 ${color}`} />
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
  const activeTools = TOOLS.filter(t => t.status === "active");

  return (
    <section className="py-16 md:py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Featured Tools</h2>
            <p className="text-slate-500 mt-2">The most used tools by our community.</p>
          </div>
          <Link href="/tools" className="text-blue-600 font-medium flex items-center hover:underline">
            View all tools <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        {/* Content Area */}
        {/* Tools Grid */}
        <div className="flex flex-col gap-12 w-full">
          <div className="grid md:grid-cols-2 gap-4">
            {activeTools.map((tool) => (
              <ToolCard
                key={tool.title}
                href={tool.href}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                color={tool.color}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
