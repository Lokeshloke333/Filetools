"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";

export function BlogSection() {
  const posts = [
    {
      category: "Guides",
      date: "Oct 12, 2023",
      title: "How to compress PDF files without losing quality",
      imageColor: "bg-purple-100",
      iconColor: "text-purple-500",
    },
    {
      category: "News",
      date: "Oct 05, 2023",
      title: "Introducing our new AI-powered document translator",
      imageColor: "bg-blue-100",
      iconColor: "text-blue-500",
    },
    {
      category: "Tips",
      date: "Sep 28, 2023",
      title: "Top 5 ways to secure your confidential files online",
      imageColor: "bg-emerald-100",
      iconColor: "text-emerald-500",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-100">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2 tracking-tight">
              From the Blog
            </h2>
            <p className="text-slate-500">
              Latest news, tips, and guides on file management.
            </p>
          </div>
          <Link href="#" className="text-blue-600 font-medium flex items-center hover:underline">
            View all articles <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Link key={i} href="#" className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-lg transition-all duration-300">
              {/* Fake Image Placeholder */}
              <div className={`h-48 w-full ${post.imageColor} flex items-center justify-center relative overflow-hidden`}>
                <ImageIcon className={`w-12 h-12 ${post.iconColor} opacity-50`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                    {post.category}
                  </span>
                  <span className="text-sm text-slate-400 font-medium">
                    {post.date}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <div className="mt-auto flex items-center text-blue-600 font-medium text-sm">
                  Read article <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
