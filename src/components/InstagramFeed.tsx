"use client";

import { Instagram, ExternalLink } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface InstagramItem {
  image: string;
  caption?: string;
  postUrl?: string;
}

interface InstagramFeedProps {
  title?: string;
  username?: string;
  profileUrl?: string;
  images?: InstagramItem[];
}

export function InstagramFeed({
  title = "Følg oss på Instagram",
  username = "@eidsvoll_kampsportklubb",
  profileUrl = "https://www.instagram.com/eidsvoll_kampsportklubb/",
  images = [],
}: InstagramFeedProps) {
  if (!images || images.length === 0) return null;

  return (
    <section className="w-full bg-background py-24 border-t border-border/40">
      <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight text-foreground">
            {title}
          </h2>
          <Link 
            href={profileUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:text-primary/80 font-semibold tracking-wide flex items-center justify-center gap-1.5 mt-2 transition-colors duration-200"
          >
            <Instagram className="w-5 h-5" />
            <span>{username}</span>
          </Link>
          <div className="w-16 h-[2px] bg-primary mx-auto mt-4" />
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 lg:gap-6 mb-12">
          {images.map((item, idx) => {
            const linkHref = item.postUrl || profileUrl;
            return (
              <Link
                key={idx}
                href={linkHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative aspect-square bg-muted overflow-hidden border border-border/40 hover:border-primary/50 transition-colors duration-300 shadow-md"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.caption || "Instagram bilde"}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                  <div className="flex justify-end">
                    <ExternalLink className="w-4 h-4 text-white/70" />
                  </div>
                  
                  <div className="flex flex-col items-center text-center justify-center flex-grow px-2">
                    <Instagram className="w-8 h-8 text-primary mb-3 scale-90 group-hover:scale-100 transition-transform duration-300" />
                    {item.caption && (
                      <p className="text-xs text-white/90 font-light line-clamp-3 leading-relaxed">
                        {item.caption}
                      </p>
                    )}
                  </div>

                  <div className="text-[10px] text-white/50 tracking-wider text-center uppercase font-semibold">
                    Åpne på Instagram
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Call to Action Button */}
        <div className="flex justify-center">
          <Link href={profileUrl} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="group h-14 px-8 text-sm font-bold rounded-none bg-primary hover:bg-primary/90 text-white transition-all duration-300 flex items-center gap-2">
              <Instagram className="w-4 h-4" />
              <span>GÅ TIL VÅR PROFIL</span>
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
