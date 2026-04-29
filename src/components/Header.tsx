"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { tinaField } from "tinacms/dist/react";
import { Menu, X } from "lucide-react";

export function Header({ data }: { data: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const nav = data?.nav || [];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
          <img 
            src="/org-logo.svg" 
            alt="Eidsvoll Kampsportklubb Logo" 
            className="w-10 h-10 object-contain"
          />
          <span className="font-bold text-xl tracking-tight hidden sm:block">
            {data?.clubName || "Eidsvoll Kampsportklubb"}
          </span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {nav.map((item: any, i: number) => (
            <Link 
              key={i} 
              href={item.href} 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              data-tina-field={tinaField(item, 'label')}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/medlemskap">
            <Button size="sm" className="rounded-full px-6 font-bold shadow-md shadow-primary/10">
              Bli Medlem
            </Button>
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 bg-background border-b border-border/40 shadow-xl p-6 animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-6">
            {nav.map((item: any, i: number) => (
              <Link 
                key={i} 
                href={item.href} 
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link href="/medlemskap" onClick={() => setIsOpen(false)}>
              <Button className="w-full rounded-xl font-bold py-6 text-lg">
                Bli Medlem
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
