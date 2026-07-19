"use client";

import React from "react";
import { Button } from "./ui/button";
import { PlayCircle, ArrowRight, FileText, Image as ImageIcon, Video, Star } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-slate-50 pt-16 md:pt-24 lg:pt-10 pb-16">
      <div className="container mx-auto px-4 md:px-6">
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
              <Button size="lg" className="rounded-full px-8 gap-2 w-full sm:w-auto text-base">
                Get Started Free
                <ArrowRight className="w-4 h-4" />
              </Button>
              <Button size="lg" variant="ghost" className="rounded-full px-6 gap-2 w-full sm:w-auto text-base font-semibold">
                <PlayCircle className="w-5 h-5 text-blue-600" />
                See How It Works
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
                <span className="text-sm font-medium text-slate-600 mt-0.5">Trusted by 4M+ users</span>
              </div>
            </motion.div>
          </div>

          {/* Right Floating Elements / UI Mockup */}
          <div className="relative h-[400px] lg:h-[500px] hidden md:block">
            {/* Background decorative blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-blue-400/20 rounded-full blur-3xl"></div>

            {/* Main App Window Mockup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-10"
            >
              {/* Fake Window Header */}
              <div className="h-10 bg-slate-50 border-b border-slate-100 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <FileText className="text-blue-600 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">PDF to Word</h3>
                    <p className="text-sm text-slate-500">Ready to convert</p>
                  </div>
                </div>

                {/* Progress bar fake */}
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between text-xs font-medium text-slate-600">
                    <span>Converting...</span>
                    <span>75%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: "0%" }}
                      animate={{ width: "75%" }}
                      transition={{ duration: 1.5, delay: 0.8 }}
                      className="h-full bg-blue-600 rounded-full"
                    ></motion.div>
                  </div>
                </div>

                <Button className="w-full">Cancel</Button>
              </div>
            </motion.div>

            {/* Floating Card 1 */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute top-10 right-0 w-48 bg-white p-4 rounded-xl shadow-xl border border-slate-100 z-20 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <ImageIcon className="text-green-600 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Image Resize</h4>
                  <p className="text-xs text-green-600 font-medium">Completed</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-12 left-0 w-52 bg-white p-4 rounded-xl shadow-xl border border-slate-100 z-20 hidden lg:block"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <Video className="text-purple-600 w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Compress Video</h4>
                  <p className="text-xs text-slate-500">Processing (1.2GB)</p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
