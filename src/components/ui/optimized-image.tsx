"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface OptimizedImageProps {
  src?: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  containerClassName?: string;
  priority?: boolean;
  sizes?: string;
  [key: string]: any; // Capture data-tina-field and other props
}

export function OptimizedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className,
  containerClassName,
  priority = false,
  sizes,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  if (!src) {
    return (
      <div 
        className={cn(
          "bg-muted flex items-center justify-center text-muted-foreground/30 text-xs font-bold uppercase tracking-widest", 
          fill ? "absolute inset-0 w-full h-full" : "w-full h-full",
          className
        )} 
        {...props}
      >
        Mangler bilde
      </div>
    );
  }

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      className={cn(
        "overflow-hidden select-none", 
        fill ? "absolute inset-0 w-full h-full" : "relative inline-block",
        containerClassName
      )}
      {...props}
    >
      {/* Shimmer Placeholder Background */}
      {!isLoaded && (
        <div 
          className={cn(
            "absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse z-10",
            fill ? "w-full h-full" : ""
          )}
          style={!fill && width && height ? { width, height } : undefined}
        />
      )}

      {/* Actual Image with Blur & Opacity transition */}
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        priority={priority}
        sizes={sizes}
        onLoad={handleLoad}
        className={cn(
          "transition-all duration-700 ease-out",
          !isLoaded ? "opacity-0 blur-md scale-[1.02]" : "opacity-100 blur-0 scale-100",
          className
        )}
      />
    </div>
  );
}
