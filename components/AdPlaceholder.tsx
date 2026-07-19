import React from "react";

interface AdPlaceholderProps {
  width?: string;
  height?: string;
  label?: string;
  className?: string;
}

export function AdPlaceholder({
  width = "w-full",
  height = "h-24",
  label = "ADVERTISEMENT",
  className = "",
}: AdPlaceholderProps) {
  return (
    <div
      className={`mx-auto flex items-center justify-center border border-dashed border-slate-300 bg-slate-50 text-slate-400 text-xs font-semibold tracking-widest ${width} ${height} ${className}`}
    >
      {label}
    </div>
  );
}
