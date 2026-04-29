import React from "react";
import ReactMarkdown from "react-markdown";
import { TinaMarkdown } from "tinacms/dist/rich-text";

export interface RichTextProps {
  content: any;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  if (!content) return null;

  const components = {
    a: (props: any) => (
      <a 
        href={props.href || props.url}
        className="text-primary font-bold underline underline-offset-4 hover:text-primary/80 transition-colors" 
        target="_blank" 
        rel="noopener noreferrer" 
      >
        {props.children}
      </a>
    ),
  };

  if (typeof content === 'string') {
    return (
      <div className={className}>
        <ReactMarkdown components={components}>{content}</ReactMarkdown>
      </div>
    );
  }

  return (
    <div className={className}>
      <TinaMarkdown content={content} components={components} />
    </div>
  );
}
