"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQ } from "@/components/FAQ";
import { CTA } from "@/components/CTA";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { 
  Mail, 
  Clock, 
  MapPin, 
  MessageSquare,
  Send,
  Headset
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200/60 pt-8 pb-16">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6">

          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mt-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100"
            >
              <Headset className="w-8 h-8" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-4"
            >
              Contact Us
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-600"
            >
              Need help or have feedback? We'd love to hear from you. Our support team is always ready to assist.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto w-full px-4 md:px-6">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 items-start">
            
            {/* Left: Contact Form (Spans 3 cols) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-3 bg-white rounded-[24px] p-6 md:p-10 shadow-xl shadow-slate-200/40 border border-slate-200/60"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">Send us a message</h2>
              
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div className="space-y-2.5">
                    <Label htmlFor="name" className="text-slate-700 font-medium">Your Name</Label>
                    <Input id="name" placeholder="John Doe" className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                  </div>
                  <div className="space-y-2.5">
                    <Label htmlFor="email" className="text-slate-700 font-medium">Email Address</Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="subject" className="text-slate-700 font-medium">Subject</Label>
                  <Input id="subject" placeholder="How can we help you?" className="h-11 rounded-xl bg-slate-50 border-slate-200 focus:bg-white transition-colors" />
                </div>

                <div className="space-y-2.5">
                  <Label htmlFor="message" className="text-slate-700 font-medium">Message</Label>
                  <textarea 
                    id="message" 
                    rows={6}
                    placeholder="Provide as much detail as possible..."
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-white transition-colors resize-y"
                  />
                </div>

                <Button size="lg" className="w-full h-12 text-base rounded-xl gap-2 font-semibold shadow-lg shadow-blue-500/20 mt-4">
                  Send Message
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </motion.div>

            {/* Right: Info Cards (Spans 2 cols) */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2 space-y-4"
            >
              {/* Card 1 */}
              <div className="flex items-start p-6 bg-white rounded-[20px] shadow-md shadow-slate-200/30 border border-slate-200/60 group hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Email Support</h3>
                  <p className="text-sm text-slate-500 mb-2">Reach out to our support team directly via email.</p>
                  <a href="mailto:support@fileinator.example" className="text-sm font-medium text-blue-600 hover:underline">support@fileinator.example</a>
                </div>
              </div>

              {/* Card 2 */}
              <div className="flex items-start p-6 bg-white rounded-[20px] shadow-md shadow-slate-200/30 border border-slate-200/60 group hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Response Time</h3>
                  <p className="text-sm text-slate-500">We aim to respond to all inquiries within <span className="font-medium text-slate-700">2-4 hours</span> during business days.</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="flex items-start p-6 bg-white rounded-[20px] shadow-md shadow-slate-200/30 border border-slate-200/60 group hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Support Hours</h3>
                  <p className="text-sm text-slate-500">Monday - Friday<br/>9:00 AM - 6:00 PM (EST)</p>
                </div>
              </div>

              {/* Card 4 */}
              <div className="flex items-start p-6 bg-white rounded-[20px] shadow-md shadow-slate-200/30 border border-slate-200/60 group hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 mr-4 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Location</h3>
                  <p className="text-sm text-slate-500">Online Worldwide<br/>Operating remotely from Earth.</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ limit={4} />

      {/* CTA Section */}
      <CTA />

      <Footer />
    </main>
  );
}
