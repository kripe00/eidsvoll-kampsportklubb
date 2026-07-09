"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  items?: FAQItem[];
}

export function FAQ({ title, items = [] }: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleIndex = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Generate structured FAQ JSON-LD data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer,
      },
    })),
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="w-full max-w-4xl mx-auto py-12 md:py-20 px-4">
      {/* Dynamic SEO JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-foreground">
          {title || "Ofte stilte spørsmål (FAQ)"}
        </h2>
        <div className="w-16 h-[2px] bg-primary mx-auto mt-4" />
      </div>

      <div className="space-y-4">
        {items.map((item, idx) => {
          const isOpen = activeIndex === idx;
          return (
            <div
              key={idx}
              className="border border-border/60 bg-muted/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-colors duration-300"
            >
              <button
                onClick={() => toggleIndex(idx)}
                className="w-full flex items-center justify-between p-6 text-left font-bold text-lg text-foreground hover:text-primary transition-colors focus:outline-none"
                aria-expanded={isOpen}
              >
                <span className="pr-4">{item.question}</span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 text-muted-foreground/80 shrink-0 transition-transform duration-300",
                    isOpen && "rotate-180 text-primary"
                  )}
                />
              </button>

              {/* Smooth Expand/Collapse height transition */}
              <div
                className={cn(
                  "grid transition-[grid-template-rows] duration-300 ease-in-out px-6",
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                )}
              >
                <div className="overflow-hidden">
                  <p className="text-muted-foreground leading-relaxed font-light pb-6 whitespace-pre-line">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
