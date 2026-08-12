"use client";

import { useTina } from "tinacms/dist/react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { GlobalSponsorsBanner } from "./GlobalSponsorsBanner";

export function GlobalClient(props: {
  data: any;
  query: string;
  variables: any;
  children: React.ReactNode;
}) {
  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  const displayData = props.data?.global || data?.global;

  return (
    <>
      <Header data={displayData} />
      <GlobalSponsorsBanner sponsors={displayData?.sponsors || []} />
      {props.children}
      <Footer data={displayData} />
    </>
  );
}
