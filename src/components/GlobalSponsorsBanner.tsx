import React from "react";
import Link from "next/link";

export function GlobalSponsorsBanner({ sponsors }: { sponsors: any[] }) {
  if (!sponsors || sponsors.length === 0) {
    return null;
  }

  // Ensure we have enough items to fill the screen even if there's only 1 or 2 sponsors
  // by duplicating the original array a few times if it's small.
  const multipliedSponsors = sponsors.length < 4 
    ? [...sponsors, ...sponsors, ...sponsors, ...sponsors] 
    : sponsors;

  const renderSponsorList = (items: any[], isDuplicate: boolean = false) => {
    return items.map((sponsor, index) => {
      const content = (
        <div 
          className="flex items-center justify-center w-32 h-16 md:w-48 md:h-24 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
        >
          {sponsor.logo ? (
            <img 
              src={sponsor.logo} 
              alt={sponsor.name || "Sponsor"} 
              className="max-w-full max-h-full object-contain"
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
          key={`${isDuplicate ? 'dup-' : ''}${index}`}
          className="shrink-0"
        >
          {content}
        </Link>
      ) : (
        <div key={`${isDuplicate ? 'dup-' : ''}${index}`} className="shrink-0">
          {content}
        </div>
      );
    });
  };

  return (
    <div className="w-full bg-muted/20 border-t border-border/30 overflow-hidden py-12 hover-pause relative">
      <div className="container mx-auto px-4 mb-8">
         <h3 className="text-center text-sm font-bold tracking-[0.2em] uppercase text-muted-foreground/60">
           Stolt støttet av
         </h3>
      </div>
      
      {/* The marquee container */}
      <div className="flex overflow-hidden group">
        <div className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-12 md:gap-24 px-6 md:px-12">
          {renderSponsorList(multipliedSponsors)}
        </div>
        <div className="flex animate-marquee min-w-full shrink-0 items-center justify-around gap-12 md:gap-24 px-6 md:px-12" aria-hidden="true">
          {renderSponsorList(multipliedSponsors, true)}
        </div>
      </div>
    </div>
  );
}
