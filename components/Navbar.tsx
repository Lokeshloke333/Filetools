"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import { Button } from "./ui/button";
import { MegaMenu } from "./navbar/MegaMenu";
import { MobileMenu } from "./navbar/MobileMenu";
import { GlobalSearch } from "./search/GlobalSearch";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for shadow and blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-slate-200/50" 
          : "bg-white border-b border-slate-100"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full px-4 lg:px-6 h-16 lg:h-20 flex items-center justify-between gap-4">
        
        {/* Left Section: Logo & Search */}
        <div className="flex items-center gap-6 flex-1 md:flex-none">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="Fileinator Logo" className="h-8 w-auto" />
          </Link>
          
          {/* Desktop Search Bar */}
          <div className="hidden lg:flex relative ml-4 xl:ml-8">
            <GlobalSearch className="w-[350px] xl:w-[450px]" />
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 justify-center flex-1">
          <MegaMenu />
          
          <Link href="/tools" className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">
            Browse Tools
          </Link>


          
          <div className="flex items-center gap-1.5 text-sm font-medium text-slate-400 cursor-not-allowed">
            API
            <span className="text-[10px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
              Soon
            </span>
          </div>
        </nav>

        {/* CTA Button Desktop */}
        <div className="hidden lg:flex items-center flex-shrink-0">
          <Button asChild className="rounded-full px-6 py-2.5 h-auto text-sm font-bold bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5">
            <Link href="/contact">Contact</Link>
          </Button>
        </div>

        {/* Mobile Toggle & Mobile Search Icon */}
        <div className="flex items-center gap-3 lg:hidden">
          <button className="text-slate-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-full p-1" aria-label="Search">
            <Search className="w-5 h-5" />
          </button>
          <button
            className="p-1.5 text-slate-600 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 rounded-md transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Component */}
      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </header>
  );
}
