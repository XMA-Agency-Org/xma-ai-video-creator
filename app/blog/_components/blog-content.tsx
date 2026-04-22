"use client";

import { useSearchParams } from "next/navigation";
import { SectionContainer } from "@/app/_components/primitives";
import { BlogCard } from "./blog-card";
import { CategoryFilter } from "./category-filter";

type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: { asset?: unknown; alt?: string } | null;
  publishedAt?: string | null;
  featured?: boolean | null;
  author?: { name?: string | null; avatar?: unknown } | null;
  categories?: { title?: string | null; slug?: string | null }[] | null;
};

type Category = {
  _id?: string;
  title?: string | null;
  slug?: string | null;
  postCount?: number | null;
};

type BlogContentProps = {
  posts: Post[];
  categories: Category[];
};

export function BlogContent({ posts, categories }: BlogContentProps) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  const filteredPosts = category
    ? posts.filter((post) =>
        post.categories?.some((cat) => cat.slug === category)
      )
    : posts;

  const featuredPost = !category
    ? filteredPosts.find((post) => post.featured)
    : null;

  const regularPosts = featuredPost
    ? filteredPosts.filter((post) => post._id !== featuredPost._id)
    : filteredPosts;

  return (
    <SectionContainer className="pt-8">
      <CategoryFilter categories={categories} />

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

          {regularPosts.map((post) => (
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
  );
}
