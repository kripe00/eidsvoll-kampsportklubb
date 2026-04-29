"use client";

import { useTina } from "tinacms/dist/react";
import { Hero } from "./Hero";
import { News } from "./News";
import { tinaField } from "tinacms/dist/react";

export function HomePageClient(props: {
  data: any;
  query: string;
  variables: any;
}) {
  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  const hero = data?.hero || props.data?.hero;
  const rawEdges = data?.newsConnection?.edges || props.data?.newsConnection?.edges || [];

  return (
    <main>
      <Hero 
        welcomeText={hero.welcomeText} 
        highlightedText={hero.highlightedText} 
        description={hero.description} 
        backgroundImage={hero.backgroundImage} 
        parent={hero}
      />
      <News newsItems={rawEdges} />
    </main>
  );
}
