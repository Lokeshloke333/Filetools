import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex items-center text-sm text-slate-500" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 sm:gap-2 whitespace-nowrap overflow-x-auto no-scrollbar">
        <li>
          <Link href="/" className="flex items-center hover:text-blue-600 transition-colors">
            <Home className="w-4 h-4 mr-1" />
            Home
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 mx-1 text-slate-300 flex-shrink-0" />
            {item.href ? (
              <Link href={item.href} className="hover:text-blue-600 transition-colors truncate">
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-slate-800 truncate" aria-current="page">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
