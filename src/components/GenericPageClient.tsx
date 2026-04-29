"use client";

import { useTina } from "tinacms/dist/react";
import { BlockRenderer } from "./blocks/BlockRenderer";
import { RichText } from "./RichText";
import { tinaField } from "tinacms/dist/react";

export function GenericPageClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  // Get the page data from either real-time updates or initial props
  const page = data?.page || 
               data?.omOss || 
               data?.medlemskap || 
               data?.sponsorer ||
               props.data?.page || 
               props.data?.omOss || 
               props.data?.medlemskap ||
               props.data?.sponsorer;
               
  if (!page) {
    console.warn("GenericPageClient: No page data found in:", { data, propsData: props.data });
    return null;
  }

  return (
    <main className="bg-background min-h-screen">
      {/* Reverted to Light, Clean Header */}
      <div className="pt-32 bg-muted/30 border-b border-border/40 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl font-black uppercase tracking-tighter">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tighter mb-4 text-foreground uppercase leading-[0.95] md:leading-[0.85] break-words" data-tina-field={tinaField(page, 'title')}>
            {page.title}
          </h1>
          {page.description && (
            <div className="max-w-2xl mx-auto text-lg text-slate-700 leading-relaxed" data-tina-field={tinaField(page, 'description')}>
              <RichText content={page.description} />
            </div>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 lg:px-8 py-20 max-w-6xl">
        <BlockRenderer blocks={page.blocks} />
      </div>
    </main>
  );
}
