"use client";

import React from "react";
import { 
  FileImage, 
  FileText, 
  FileVideo, 
  FileAudio, 
  Archive, 
  ShieldCheck,
  Code,
  FileSpreadsheet
} from "lucide-react";

export function CategorySection() {
  const categories = [
    {
      title: "Image Tools",
      description: "Compress, crop, resize and convert image files easily.",
      icon: <FileImage className="w-6 h-6 text-indigo-500" />,
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-100",
      hoverColor: "hover:border-indigo-300 hover:shadow-indigo-100",
    },
    {
      title: "Document Tools",
      description: "Edit, merge, split and compress PDF and Word documents.",
      icon: <FileText className="w-6 h-6 text-blue-500" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100",
      hoverColor: "hover:border-blue-300 hover:shadow-blue-100",
    },
    {
      title: "Video Tools",
      description: "Trim, convert and compress videos without quality loss.",
      icon: <FileVideo className="w-6 h-6 text-rose-500" />,
      bgColor: "bg-rose-50",
      borderColor: "border-rose-100",
      hoverColor: "hover:border-rose-300 hover:shadow-rose-100",
    },
    {
      title: "Audio Tools",
      description: "Convert, cut, merge and compress audio formats.",
      icon: <FileAudio className="w-6 h-6 text-amber-500" />,
      bgColor: "bg-amber-50",
      borderColor: "border-amber-100",
      hoverColor: "hover:border-amber-300 hover:shadow-amber-100",
    },
    {
      title: "Archive Tools",
      description: "Extract, compress and manage ZIP, RAR and 7Z archives.",
      icon: <Archive className="w-6 h-6 text-emerald-500" />,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100",
      hoverColor: "hover:border-emerald-300 hover:shadow-emerald-100",
    },
    {
      title: "Security Tools",
      description: "Password protect, unlock and sign your confidential files.",
      icon: <ShieldCheck className="w-6 h-6 text-slate-700" />,
      bgColor: "bg-slate-100",
      borderColor: "border-slate-200",
      hoverColor: "hover:border-slate-400 hover:shadow-slate-200",
    },
    {
      title: "Developer Tools",
      description: "Format, validate and minify JSON, XML and HTML code.",
      icon: <Code className="w-6 h-6 text-cyan-500" />,
      bgColor: "bg-cyan-50",
      borderColor: "border-cyan-100",
      hoverColor: "hover:border-cyan-300 hover:shadow-cyan-100",
    },
    {
      title: "Spreadsheet Tools",
      description: "Convert Excel to PDF, CSV, and merge multiple sheets.",
      icon: <FileSpreadsheet className="w-6 h-6 text-green-500" />,
      bgColor: "bg-green-50",
      borderColor: "border-green-100",
      hoverColor: "hover:border-green-300 hover:shadow-green-100",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
            Browse by Category
          </h2>
          <p className="text-slate-600 text-lg">
            Find the perfect tool for your file format. Over 100+ utilities to help you work faster.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <a
              key={category.title}
              href="#"
              className={`group flex flex-col p-6 bg-white border ${category.borderColor} rounded-2xl shadow-sm transition-all duration-300 ${category.hoverColor} hover:shadow-lg`}
            >
              <div className={`w-12 h-12 rounded-xl ${category.bgColor} flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300`}>
                {category.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {category.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed flex-grow">
                {category.description}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
