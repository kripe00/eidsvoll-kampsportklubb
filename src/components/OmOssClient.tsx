"use client";

import { useTina } from "tinacms/dist/react";
import { About } from "./About";
import { Values } from "./Values";
import { Trainers } from "./Trainers";
import { tinaField } from "tinacms/dist/react";

export function OmOssClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  const page = props.query ? data.page : props.data.page;

  // Extract sections from blocks or use fallbacks
  const aboutBlock = page.blocks?.find((b: any) => b._template === 'about');
  const valuesBlock = page.blocks?.find((b: any) => b._template === 'values');
  const trainersBlock = page.blocks?.find((b: any) => b._template === 'trainers');

  return (
    <main>
      <div className="pt-24 bg-muted/30 border-b border-border/40 pb-12">
        <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6" data-tina-field={tinaField(page, 'title')}>
            {page.title}
          </h1>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>
      </div>
      
      {aboutBlock && (
        <About 
          title={aboutBlock.title} 
          body={aboutBlock.body} 
        />
      )}
      
      {valuesBlock && (
        <Values 
          title={valuesBlock.title} 
          description={valuesBlock.description} 
          items={valuesBlock.items} 
        />
      )}
      
      {trainersBlock && (
        <Trainers 
          title={trainersBlock.title} 
          trainerList={trainersBlock.trainerList} 
        />
      )}
    </main>
  );
}
