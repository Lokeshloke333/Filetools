"use client";

import React from "react";
import Link from "next/link";
import { Layers, Globe, Users, Mail, MessageCircle, Send } from "lucide-react";

import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-[#0b1120] text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto w-full px-4 md:px-6">

        {/* Footer Top Ad */}
        <div className="mb-16 border-b border-slate-800 pb-16">
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">

          {/* Column 1: Brand & Newsletter */}
          <div className="col-span-2 lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-blue-600 p-1.5 rounded-lg flex items-center justify-center">
                <Layers className="text-white w-5 h-5" />
              </div>
              <span className="font-bold text-xl tracking-tight text-white">FileTools</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 max-w-sm">
              The ultimate online toolkit for all your file conversion, compression, and editing needs. Secure, fast, and easy to use.
            </p>

            {/* Socials */}
            <div className="flex items-center gap-4 mb-8">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Users className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>

            {/* Newsletter */}
            {/* <div>
              <h4 className="text-white font-semibold mb-3">Subscribe to our newsletter</h4>
              <div className="flex max-w-sm">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-slate-900 border border-slate-700 text-sm rounded-l-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500 text-white"
                />
                <Button className="rounded-l-none rounded-r-lg px-4">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div> */}
          </div>

          {/* Column 2: Products */}
          <div className="col-span-1 lg:col-span-1 lg:col-start-4">
            <h4 className="text-white font-semibold mb-6">Products</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/#tools" className="hover:text-blue-400 transition-colors">All Tools</Link></li>
              <li><Link href="/tools/image" className="hover:text-blue-400 transition-colors">Image Tools</Link></li>
              <li><Link href="/tools/pdf" className="hover:text-blue-400 transition-colors">PDF Tools</Link></li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-and-conditions" className="hover:text-blue-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} FileTools Inc. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-white transition-colors">English (US)</Link>
            <Link href="#" className="hover:text-white transition-colors">System Status</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
