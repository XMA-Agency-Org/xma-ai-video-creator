"use client";

import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import { InlineCtaBlock } from "./inline-cta-block";

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 font-heading text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-3 font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="mt-8 mb-3 font-heading text-lg font-bold text-foreground">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-relaxed text-foreground/80">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-primary-500 pl-6 italic text-foreground/70">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-primary-600">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const target = value?.openInNewTab ? "_blank" : undefined;
      const rel = target ? "noopener noreferrer" : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="font-medium text-primary-500 underline decoration-primary-300 underline-offset-2 transition-colors hover:text-primary-600 hover:decoration-primary-500"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    blogCtaBlock: ({ value }) => (
      <InlineCtaBlock
        headline={value?.headline ?? "Ready to scale with AI video?"}
        description={value?.description}
        buttonLabel={value?.buttonLabel ?? "Book a Strategy Call"}
      />
    ),
    image: ({ value }) => {
      const imageUrl = value?.asset
        ? urlFor(value.asset)?.width(1200).format("webp").url()
        : null;

      if (!imageUrl) return null;

      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-clip rounded-[var(--radius-lg)]">
            <Image
              src={imageUrl}
              alt={value?.alt || ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
          {value?.caption && (
            <figcaption className="mt-2 text-center text-sm text-muted-foreground">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-6 list-disc space-y-2 text-foreground/80">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-6 list-decimal space-y-2 text-foreground/80">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-base leading-relaxed">{children}</li>,
  },
};

type PostBodyProps = {
  body: unknown[];
};

export function PostBody({ body }: PostBodyProps) {
  return (
    <article className="prose-reset mt-10">
      <PortableText value={body} components={portableTextComponents} />
    </article>
  );
}
