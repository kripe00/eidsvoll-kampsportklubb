"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { tinaField } from "tinacms/dist/react";
import { Menu, X } from "lucide-react";
import { OptimizedImage } from "./ui/optimized-image";
import { ProveukeModal } from "./ProveukeModal";

export function Header({ data }: { data: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = data?.nav || [
    { label: "Nyheter", href: "/nyheter" },
    { label: "Timeplan", href: "/timeplan" },
    { label: "Medlemskap", href: "/medlemskap" },
    { label: "Om oss", href: "/om-oss" },
    { label: "Kontakt", href: "/kontakt" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/85 backdrop-blur-xl border-b border-border/40">
      <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo & Club Name */}
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity shrink-0">
          <OptimizedImage 
            src={data?.logo || "/logo.png"} 
            alt="Eidsvoll Kampsportklubb Logo" 
            width={44}
            height={44}
            priority={true}
            className="w-11 h-11 object-contain"
          />
          <span className="font-bold text-lg lg:text-xl tracking-tight hidden sm:block whitespace-nowrap">
            {data?.clubName || "Eidsvoll Kampsportklubb"}
          </span>
        </Link>
        
        {/* Desktop Nav Links */}
        <nav aria-label="Hovednavigasjon" className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navLinks.map((item: any, i: number) => (
            <Link 
              key={i} 
              href={item.href} 
              className="text-sm font-semibold text-muted-foreground hover:text-foreground hover:text-primary transition-colors"
              data-tina-field={tinaField(item, 'label')}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Action CTA Buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ProveukeModal 
            trigger={
              <Button 
                size="sm" 
                variant="outline" 
                className="rounded-full px-4 py-2 font-bold text-xs sm:text-sm border-primary/40 text-foreground hover:bg-primary/10 transition-all whitespace-nowrap"
              >
                Prøv gratis
              </Button>
            }
          />
          <Link href="/medlemskap">
            <Button 
              size="sm" 
              className="rounded-full px-5 py-2 font-bold text-xs sm:text-sm shadow-md shadow-primary/10 whitespace-nowrap"
            >
              Bli medlem
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Lukk meny" : "Åpne meny"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-background border-b border-border/40 shadow-2xl p-6 animate-in slide-in-from-top-4 duration-200">
          <nav aria-label="Mobilnavigasjon" className="flex flex-col gap-5">
            {navLinks.map((item: any, i: number) => (
              <Link 
                key={i} 
                href={item.href} 
                className="text-lg font-bold text-foreground hover:text-primary transition-colors py-1"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex flex-col gap-3 pt-4 border-t border-border/40">
              <ProveukeModal 
                trigger={
                  <Button variant="outline" className="w-full rounded-xl font-bold py-6 text-base border-primary/40 text-foreground">
                    Gratis prøveperiode (2 uker)
                  </Button>
                }
              />
              <Link href="/medlemskap" onClick={() => setIsOpen(false)}>
                <Button className="w-full rounded-xl font-bold py-6 text-base shadow-lg">
                  Bli medlem
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
