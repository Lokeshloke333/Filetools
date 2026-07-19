import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ToolDefinition } from "@/lib/tools";

interface ToolGridProps {
  tools: ToolDefinition[];
}

export function ToolGrid({ tools }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="py-20 text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-2">No tools found</h3>
        <p className="text-slate-500">Try adjusting your search or filters.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {tools.map((tool) => {
        const Icon = tool.icon;
        const isComingSoon = tool.status === "coming-soon";

        const cardContent = (
          <div className="flex flex-col h-full p-6">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isComingSoon ? "bg-slate-100 text-slate-400" : "bg-blue-50 " + tool.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-[10px] font-semibold tracking-wider uppercase bg-purple-50 text-purple-600 px-2 py-0.5 rounded-full">
                  {tool.category}
                </span>
                {isComingSoon ? (
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    Soon
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-wider uppercase bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    Active
                  </span>
                )}
              </div>
            </div>
            
            <h3 className={`text-lg font-bold mb-2 ${isComingSoon ? "text-slate-600" : "text-slate-900 group-hover:text-blue-600 transition-colors"}`}>
              {tool.title}
            </h3>
            <p className="text-sm text-slate-500 flex-grow line-clamp-2">
              {tool.description}
            </p>
            
            <div className="flex justify-end mt-4">
              <ArrowRight className={`w-5 h-5 ${isComingSoon ? "text-slate-300" : "text-slate-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all"}`} />
            </div>
          </div>
        );

        if (isComingSoon) {
          return (
            <div
              key={tool.id}
              className="bg-white border border-slate-200/60 rounded-2xl opacity-60 cursor-not-allowed"
            >
              {cardContent}
            </div>
          );
        }

        return (
          <Link
            key={tool.id}
            href={tool.href}
            className="group bg-white border border-slate-200 rounded-2xl hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 block"
          >
            {cardContent}
          </Link>
        );
      })}
    </div>
  );
}
