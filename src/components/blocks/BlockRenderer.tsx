"use client";

import { About } from "../About";
import { Values } from "../Values";
import { Trainers } from "../Trainers";
import { Membership } from "../Membership";

export function BlockRenderer({ blocks }: { blocks: any[] }) {
  if (!blocks || !Array.isArray(blocks)) {
    return null;
  }

  return (
    <div className="space-y-24">
      {blocks.map((block, i) => {
        if (!block) return null;
        
        const template = block._template || block.__typename || "";
        
        try {
          if (template === "about" || template.endsWith("BlocksAbout")) {
            return <About key={i} {...block} />;
          }
          if (template === "values" || template.endsWith("BlocksValues")) {
            return <Values key={i} {...block} />;
          }
          if (template === "trainers" || template.endsWith("BlocksTrainers")) {
            return <Trainers key={i} {...block} />;
          }
          if (template === "membership" || template.endsWith("BlocksMembership")) {
            return <Membership key={i} {...block} />;
          }
          
          console.warn(`No component for template: ${template}`);
          return null;
        } catch (err) {
          console.error(`Error rendering block ${i} (${template}):`, err);
          return (
            <div key={i} className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg text-xs">
              Feil ved visning av blokk: {template}
            </div>
          );
        }
      })}
    </div>
  );
}
