"use client";

import React from "react";
import { Button } from "./ui/button";
import { PlayCircle, ArrowRight, FileText, Image as ImageIcon, Video, Star, CheckCircle2, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-16 md:pt-24 lg:pt-10 pb-16">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left Content */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-100/50 border border-blue-200 text-blue-700 text-sm font-medium mb-6"
            >
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
              New: AI Document Analysis
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight"
            >
              All Your File Tools <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                In One Place
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed"
            >
              Discover the world's most comprehensive toolkit for all your file conversions, editing, and optimization needs. Fast, secure, and 100% online.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 items-start sm:items-center"
            >
              <Button size="lg" className="rounded-full px-8 gap-2 w-full sm:w-auto text-base" asChild>
                <Link href="/tools">
                  Browse All Tools
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User avatar" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-amber-400">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-slate-600 mt-0.5">Trusted by 50k+ users</span>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Elements / UI Mockup */}
          <div className="relative h-[500px] lg:h-[600px] hidden md:block w-full">

            {/* Background Container with overflow hidden for the gradient and effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#1E3A8A] via-[#2563EB] to-[#3B82F6] rounded-[32px] border border-blue-400/30 shadow-2xl shadow-blue-900/40 overflow-hidden pointer-events-none">
              {/* Large radial glows */}
              <div className="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] bg-blue-300/30 rounded-full blur-[120px] mix-blend-overlay"></div>
              <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] bg-indigo-300/20 rounded-full blur-[100px] mix-blend-overlay"></div>

              {/* Light reflections */}
              <div className="absolute top-0 left-1/4 w-1/2 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              <div className="absolute bottom-0 right-1/4 w-1/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

              {/* Particles */}
              <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-white/80 rounded-full blur-[1px] animate-pulse"></div>
              <div className="absolute top-40 right-32 w-2 h-2 bg-white/60 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-32 left-40 w-1 h-1 bg-white/90 rounded-full blur-[0.5px] animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-20 right-20 w-1.5 h-1.5 bg-white/70 rounded-full blur-[1px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-1/2 right-1/4 w-1 h-1 bg-white/50 rounded-full blur-[0.5px] animate-pulse" style={{ animationDelay: '0.8s' }}></div>

              {/* Subtle Grid */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA0KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"></div>
            </div>

            {/* Foreground Container for UI Elements */}
            <div className="relative w-full h-full flex items-center justify-center p-8 z-10">

              <div className="relative w-full max-w-[400px]">
                {/* Main App Window Mockup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full bg-white rounded-[20px] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden relative z-10"
                >
                  {/* Fake Window Header */}
                  <div className="h-10 border-b border-slate-50 flex items-center px-4 gap-2 bg-white">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
                  </div>
                  <div className="p-4 space-y-3">

                    {/* Item 1 */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-50 shadow-sm transition-all hover:shadow-md">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="text-emerald-500 w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-semibold text-slate-700 truncate">Compress Image</h4>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                    </div>

                    {/* Item 2 */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-50 shadow-sm transition-all hover:shadow-md">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="text-emerald-500 w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-semibold text-slate-700 truncate">Resize Image</h4>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                    </div>

                    {/* Item 3 (Processing) */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-50 shadow-sm transition-all hover:shadow-md relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-[72%]"></div>
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <FileText className="text-blue-500 w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-semibold text-slate-700 truncate">PDF Compression</h4>
                          <span className="text-[10px] font-bold text-blue-600">72%</span>
                        </div>
                      </div>
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    </div>

                    {/* Item 4 */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-50 shadow-sm transition-all hover:shadow-md">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="text-emerald-500 w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-semibold text-slate-700 truncate">Convert Image to WebP</h4>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                    </div>

                    {/* Item 5 (Processing) */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-50 shadow-sm transition-all hover:shadow-md relative overflow-hidden">
                      <div className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-[45%]"></div>
                      <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                        <FileText className="text-blue-500 w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-semibold text-slate-700 truncate">Merge PDF</h4>
                          <span className="text-[10px] font-bold text-blue-600">45%</span>
                        </div>
                      </div>
                      <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />
                    </div>

                    {/* Item 6 */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-50 shadow-sm transition-all hover:shadow-md">
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
                        <ImageIcon className="text-emerald-500 w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <h4 className="text-sm font-semibold text-slate-700 truncate">Crop Image</h4>
                          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>

                {/* Floating Cards */}

                {/* Top Left */}
                <motion.div
                  initial={{ rotate: -3 }}
                  animate={{ y: [0, -10, 0], rotate: -3 }}
                  transition={{ y: { repeat: Infinity, duration: 4, ease: "easeInOut" } }}
                  className="absolute top-12 -left-12 lg:-left-24 w-48 bg-white/95 backdrop-blur-xl p-3.5 rounded-[20px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-white z-30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                      <ImageIcon className="text-blue-600 w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Compress Image</h4>
                      <p className="text-[10px] text-slate-500">Processing...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-[92%]"></div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600">92%</span>
                  </div>
                </motion.div>

                {/* Top Right */}
                <motion.div
                  initial={{ rotate: 2 }}
                  animate={{ y: [0, 10, 0], rotate: 2 }}
                  transition={{ y: { repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 } }}
                  className="absolute top-8 -right-8 lg:-right-20 w-44 bg-[#F2FDF5]/95 backdrop-blur-xl p-3.5 rounded-[20px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-emerald-50 z-30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Image Resize</h4>
                      <p className="text-[10px] text-emerald-600 font-medium">Completed</p>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Left */}
                <motion.div
                  initial={{ rotate: 2 }}
                  animate={{ y: [0, 10, 0], rotate: 2 }}
                  transition={{ y: { repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 } }}
                  className="absolute bottom-24 -left-8 lg:-left-20 w-44 bg-[#F8FAFC]/95 backdrop-blur-xl p-3.5 rounded-[20px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-slate-100 z-30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200/50 flex items-center justify-center">
                      <ImageIcon className="text-slate-500 w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">Convert Image</h4>
                      <p className="text-[10px] text-slate-500 font-medium">Ready</p>
                    </div>
                  </div>
                </motion.div>

                {/* Bottom Right */}
                <motion.div
                  initial={{ rotate: -2 }}
                  animate={{ y: [0, -10, 0], rotate: -2 }}
                  transition={{ y: { repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1.5 } }}
                  className="absolute bottom-12 -right-8 lg:-right-24 w-48 bg-[#F0F7FF]/95 backdrop-blur-xl p-3.5 rounded-[20px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-blue-50 z-30"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FileText className="text-blue-600 w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-800">PDF Merge</h4>
                      <p className="text-[10px] text-blue-600 font-medium animate-pulse">Processing...</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 flex-1 bg-blue-100/50 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full w-[45%]"></div>
                    </div>
                    <span className="text-[10px] font-bold text-blue-600">45%</span>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
