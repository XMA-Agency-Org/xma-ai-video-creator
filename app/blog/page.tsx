import type { Metadata } from "next";
import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import { BLOG_POSTS_QUERY, BLOG_CATEGORIES_QUERY } from "@/sanity/lib/queries";
import { SectionContainer } from "@/app/_components/primitives";
import { BlogContent } from "./_components/blog-content";

export const metadata: Metadata = {
  title: "Blog | XMA Agency",
  description:
    "Insights on AI video creation, content strategy, and brand storytelling from the XMA Agency team.",
  openGraph: {
    title: "Blog | XMA Agency",
    description:
      "Insights on AI video creation, content strategy, and brand storytelling from the XMA Agency team.",
    type: "website",
  },
};

export default async function BlogPage() {
  const [postsResult, categoriesResult] = await Promise.all([
    sanityFetch({ query: BLOG_POSTS_QUERY }),
    sanityFetch({ query: BLOG_CATEGORIES_QUERY }),
  ]);

  return (
    <>
      <SectionContainer className="pb-0 pt-12">
        <div className="text-center">
          <span className="inline-block rounded-full bg-primary-100 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-primary-600">
            Blog
          </span>
          <h1 className="mt-4 font-heading text-4xl font-black tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Insights & Ideas
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            AI video creation tips, content strategy, and brand storytelling from our team.
          </p>
        </div>
      </SectionContainer>

      <Suspense>
        <BlogContent
          posts={postsResult.data ?? []}
          categories={categoriesResult.data ?? []}
        />
      </Suspense>
    </>
  );
}
