import type { Metadata } from "next";
import { Suspense } from "react";
import { sanityFetch } from "@/sanity/lib/live";
import {
  BLOG_POSTS_QUERY,
  BLOG_CATEGORIES_QUERY,
} from "@/sanity/lib/queries";
import { SectionContainer } from "@/app/_components/primitives";
import { BlogCard } from "./_components/blog-card";
import { CategoryFilter } from "./_components/category-filter";

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

type BlogPageProps = {
  searchParams: Promise<{ category?: string }>;
};

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { category } = await searchParams;

  const [postsResult, categoriesResult] = await Promise.all([
    sanityFetch({ query: BLOG_POSTS_QUERY }),
    sanityFetch({ query: BLOG_CATEGORIES_QUERY }),
  ]);

  const allPosts = postsResult.data ?? [];
  const categories = categoriesResult.data ?? [];

  const filteredPosts = category
    ? allPosts.filter((post: any) =>
        post.categories?.some((cat: any) => cat.slug === category)
      )
    : allPosts;

  const featuredPost = !category
    ? filteredPosts.find((post: any) => post.featured)
    : null;

  const regularPosts = featuredPost
    ? filteredPosts.filter((post: any) => post._id !== featuredPost._id)
    : filteredPosts;

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

      <SectionContainer className="pt-8">
        <Suspense>
          <CategoryFilter categories={categories} />
        </Suspense>

        {filteredPosts.length === 0 ? (
          <div className="mt-16 text-center">
            <p className="text-lg text-muted-foreground">No posts found.</p>
            {category && (
              <a
                href="/blog"
                className="mt-4 inline-block text-sm font-medium text-primary-500 hover:text-primary-600"
              >
                View all posts
              </a>
            )}
          </div>
        ) : (
          <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredPost && (
              <BlogCard
                key={featuredPost._id}
                title={featuredPost.title}
                slug={featuredPost.slug}
                excerpt={featuredPost.excerpt}
                coverImage={featuredPost.coverImage}
                publishedAt={featuredPost.publishedAt}
                author={featuredPost.author}
                categories={featuredPost.categories}
                featured
                className="lg:col-span-3"
              />
            )}

            {regularPosts.map((post: any) => (
              <BlogCard
                key={post._id}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt}
                coverImage={post.coverImage}
                publishedAt={post.publishedAt}
                author={post.author}
                categories={post.categories}
              />
            ))}
          </div>
        )}
      </SectionContainer>
    </>
  );
}
