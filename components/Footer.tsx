"use client";

import React from "react";
import Link from "next/link";
import { Layers, Globe, Users, Mail, MessageCircle, Send } from "lucide-react";
import { AdPlaceholder } from "./AdPlaceholder";
import { Button } from "./ui/button";

export function Footer() {
  return (
    <footer className="bg-[#0b1120] text-slate-400 pt-16 pb-8 border-t border-slate-800">
      <div className="container mx-auto px-4 md:px-6">

        {/* Footer Top Ad */}
        <div className="mb-16 border-b border-slate-800 pb-16">
          <AdPlaceholder height="h-24" className="bg-slate-900/50 border-slate-800 text-slate-500" />
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

          {/* Column 2: Top Tools */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Top Tools</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">PDF to Word</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Merge PDF</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Compress Image</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Crop Video</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Audio Cutter</Link></li>
            </ul>
          </div>

          {/* Column 3: Solutions */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Solutions</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">For Business</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">For Developers</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">For Education</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">API Access</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Integrations</Link></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Blog</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Contact</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Partners</Link></li>
            </ul>
          </div>

          {/* Column 5: Legal */}
          <div className="col-span-1">
            <h4 className="text-white font-semibold mb-6">Legal</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">Security</Link></li>
              <li><Link href="#" className="hover:text-blue-400 transition-colors">GDPR</Link></li>
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
