"use client";

import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

interface FAQSectionProps {
  title?: string;
  faqs: FAQItem[];
}

export function FAQSection({ title = "FAQ", faqs }: FAQSectionProps) {
  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-slate-900 mb-6 tracking-tight">{title}</h2>
      
      <Accordion type="single" collapsible className="w-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-slate-100 last:border-0 px-6">
            <AccordionTrigger className="text-left text-[15px] font-semibold text-slate-800 hover:text-blue-600 hover:no-underline py-5">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-600 leading-relaxed text-sm pb-6">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
