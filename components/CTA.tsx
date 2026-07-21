"use client";

import React from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-blue-600 to-indigo-700 px-6 py-16 md:py-20 text-center shadow-2xl">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6 tracking-tight">
              Ready to simplify your workflow?
            </h2>
            <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join millions of professionals who use FileTools to convert, compress, and edit files every day. No credit card required.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-white text-blue-700 hover:bg-slate-50 rounded-full px-8 w-full sm:w-auto h-14 text-base font-bold shadow-lg">
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent text-white border-blue-400 hover:bg-blue-700/50 hover:text-white hover:border-blue-300 rounded-full px-8 w-full sm:w-auto h-14 text-base font-bold">
                View Pricing
              </Button>
            </div>
            <p className="text-sm text-blue-200 mt-6 opacity-80">
              Free forever for basic use. Upgrade anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
