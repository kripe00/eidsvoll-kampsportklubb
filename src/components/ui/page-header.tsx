import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: ReactNode;
  description?: ReactNode;
  titleTinaField?: string;
  descriptionTinaField?: string;
  align?: "center" | "left";
  className?: string;
  containerClassName?: string;
  descriptionClassName?: string;
  children?: ReactNode;
}

/**
 * Shared editorial page header used across content and utility pages.
 */
export function PageHeader({
  title,
  description,
  titleTinaField,
  descriptionTinaField,
  align = "center",
  className,
  containerClassName,
  descriptionClassName,
  children,
}: PageHeaderProps) {
  const isCentered = align === "center";

  return (
    <div className={cn("pt-32 bg-muted/30 border-b border-border/40 pb-16", className)}>
      <div
        className={cn(
          "container mx-auto px-4 lg:px-8",
          isCentered ? "text-center max-w-4xl" : "max-w-5xl",
          containerClassName
        )}
      >
        <h1
          className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 text-foreground uppercase leading-[0.95] md:leading-[0.85] break-words"
          data-tina-field={titleTinaField}
        >
          {title}
        </h1>
        {description && (
          <div
            className={cn(
              "text-lg text-muted-foreground leading-relaxed",
              isCentered ? "max-w-2xl mx-auto" : "max-w-2xl",
              descriptionClassName
            )}
            data-tina-field={descriptionTinaField}
          >
            {description}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
