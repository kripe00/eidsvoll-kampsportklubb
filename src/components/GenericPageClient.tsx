"use client";

import React from "react";
import { useTina } from "tinacms/dist/react";
import { BlockRenderer } from "./blocks/BlockRenderer";
import { RichText } from "./RichText";
import { tinaField } from "tinacms/dist/react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { PageHeader } from "./ui/page-header";

export function GenericPageClient(props: {
  data: any;
  query: string;
  variables: any;
  hideHeader?: boolean;
  extraContent?: React.ReactNode;
}) {
  const { locale, t } = useLanguage();

  const { data } = useTina({
    query: props.query || "{ __typename }",
    variables: props.variables,
    data: props.data,
  });

  // Get the page data from real-time updates or initial props
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

  const isOmOss = page.title?.toLowerCase()?.includes("om oss") || props.data?.omOss || data?.omOss;

  const displayTitle = locale !== "no" && isOmOss ? t.about.pageTitle : page.title;

  return (
    <main className="bg-background min-h-screen">
      {!props.hideHeader && (
        <PageHeader
          title={displayTitle}
          titleTinaField={tinaField(page, 'title')}
          description={
            page.description
              ? locale !== "no" && isOmOss
                ? <p>{t.about.pageDescription}</p>
                : <RichText content={page.description} />
              : undefined
          }
          descriptionTinaField={tinaField(page, 'description')}
        />
      )}
      <div className={`container mx-auto px-4 lg:px-8 ${props.hideHeader ? "pt-28 md:pt-36 pb-20" : "py-20"} max-w-6xl`}>
        <BlockRenderer blocks={page.blocks} />
        {props.extraContent}
      </div>
    </main>
  );
}
