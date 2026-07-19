import React from "react";

interface ToolSettingsProps {
  children: React.ReactNode;
  title?: string;
}

export function ToolSettings({ children, title = "Settings" }: ToolSettingsProps) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col h-full shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-6">{title}</h3>
      <div className="flex flex-col gap-6 flex-grow">
        {children}
      </div>
    </div>
  );
}
