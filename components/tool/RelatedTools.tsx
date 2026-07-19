import React from "react";
import Link from "next/link";
import { Maximize, Crop, RotateCw, RefreshCw } from "lucide-react";

interface RelatedToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

function RelatedToolCard({ title, description, icon, href }: RelatedToolCardProps) {
  return (
    <Link 
      href={href}
      className="group flex flex-col p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-400 hover:shadow-lg transition-all duration-300 relative"
    >
      <div className="w-12 h-12 flex-shrink-0 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>
      <h3 className="font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors text-lg">
        {title}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed flex-grow">
        {description}
      </p>
    </Link>
  );
}

export function RelatedTools() {
  const tools = [
    {
      title: "Resize Image",
      description: "Change image dimensions to any size you need without distortion.",
      icon: <Maximize className="w-6 h-6" />,
      href: "/tools/image/resize"
    },
    {
      title: "Crop Image",
      description: "Crop images to perfect proportions for social media or print.",
      icon: <Crop className="w-6 h-6" />,
      href: "/tools/image/crop"
    },
    {
      title: "Rotate Image",
      description: "Rotate or flip images effortlessly with a single click.",
      icon: <RotateCw className="w-6 h-6" />,
      href: "/tools/image/rotate"
    },
    {
      title: "Convert Image",
      description: "Convert between JPG, PNG, WebP, AVIF, and other formats.",
      icon: <RefreshCw className="w-6 h-6" />,
      href: "/tools/image/convert"
    }
  ];

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {tools.map((tool, idx) => (
          <RelatedToolCard key={idx} {...tool} />
        ))}
      </div>
    </div>
  );
}
