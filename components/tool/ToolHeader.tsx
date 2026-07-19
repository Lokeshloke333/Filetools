import React from "react";
import { Check } from "lucide-react";
import { BackButton } from "@/components/navigation/BackButton";

interface ToolHeaderProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  iconColor?: string;
}

export function ToolHeader({
  title,
  subtitle,
  icon,
  iconColor = "bg-purple-100 text-purple-600",
}: ToolHeaderProps) {
  const badges = ["Free", "No signup", "Fast", "Secure"];

  return (
    <div className="flex flex-col items-center sm:items-start lg:flex-row gap-6 lg:gap-8">
      
      {/* Back Button */}
      <BackButton className="hidden sm:inline-flex mt-1" />
      
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
          
          {/* Tool Icon */}
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${iconColor}`}>
            {icon}
          </div>
          
          {/* Title & Subtitle */}
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{title}</h1>
            <p className="text-slate-500 text-base">{subtitle}</p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {badges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold tracking-wide border border-emerald-100"
            >
              <Check className="w-3.5 h-3.5" />
              {badge}
            </span>
          ))}
        </div>
      </div>
      
    </div>
  );
}
