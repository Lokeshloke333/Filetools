import React from "react";

interface AboutToolProps {
  title: string;
  content: React.ReactNode;
}

export function AboutTool({ title, content }: AboutToolProps) {
  return (
    <div className="mt-16 bg-slate-50 border border-slate-200 rounded-3xl p-8 md:p-10">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">{title}</h2>
      <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed prose-p:mb-4 last:prose-p:mb-0">
        {content}
      </div>
    </div>
  );
}
