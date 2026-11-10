import React from "react";
import Link from "next/link";
import { OptimizedImage } from "./ui/optimized-image";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export function GlobalSponsorsBanner({ sponsors = [] }: { sponsors?: any[] }) {
  const { t } = useLanguage();
  
  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  const renderSponsorItem = (sponsor: any, key: string | number) => {
    const content = (
      <div 
        className="flex items-center justify-center px-4 py-2 h-14 md:h-20 min-w-[140px] md:min-w-[180px] opacity-85 hover:opacity-100 transition-opacity duration-300 relative"
      >
        {sponsor.logo ? (
          <OptimizedImage 
            src={sponsor.logo} 
            alt={sponsor.name || "Sponsor"} 
            width={220}
            height={100}
            className="max-h-12 md:max-h-16 max-w-[200px] md:max-w-[240px] object-contain w-auto h-auto rounded-md"
          />
        ) : (
          <span className="text-lg md:text-xl font-black tracking-tighter uppercase text-muted-foreground whitespace-nowrap">
            {sponsor.name}
          </span>
        )}
      </div>
    );

    return sponsor.url ? (
      <Link 
        href={sponsor.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        key={key}
        className="shrink-0"
      >
        {content}
      </Link>
    ) : (
      <div key={key} className="shrink-0">
        {content}
      </div>
    );
  };

  // When fewer than 4 sponsors exist, display a clean static partner strip instead of a duplicated marquee
  if (sponsors.length < 4) {
    return (
      <div className="w-full bg-muted/25 border-t border-border/40 py-8">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-10">
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
            {t.banner.proudSupporters}
          </span>
          <div className="hidden sm:block w-8 h-[1px] bg-border" />
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14">
            {sponsors.map((sponsor, idx) => renderSponsorItem(sponsor, idx))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-muted/25 border-t border-border/40 overflow-hidden py-8 hover-pause relative">
      <div className="container mx-auto px-4 mb-4">
        <h3 className="text-center text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">
          {t.banner.proudSupporters}
        </h3>
      </div>
      
      <div className="flex overflow-hidden group">
        <div className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-12 md:gap-24 px-6 md:px-12">
          {sponsors.map((sponsor, idx) => renderSponsorItem(sponsor, idx))}
        </div>
        <div className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-12 md:gap-24 px-6 md:px-12" aria-hidden="true">
          {sponsors.map((sponsor, idx) => renderSponsorItem(sponsor, `dup-${idx}`))}
        </div>
      </div>
    </div>
  );
}
