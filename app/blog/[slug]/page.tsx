import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { sanityFetch } from "@/sanity/lib/live";
import { urlFor } from "@/sanity/lib/image";
import {
  BLOG_POST_QUERY,
  BLOG_ALL_SLUGS_QUERY,
  RELATED_POSTS_QUERY,
} from "@/sanity/lib/queries";
import { SectionContainer } from "@/app/_components/primitives";
import { PostHeader } from "../_components/post-header";
import { PostBody } from "../_components/post-body";
import { BlogCard } from "../_components/blog-card";
import { BlogSchemaScript } from "../_components/blog-schema-script";
import { SidebarCta } from "../_components/sidebar-cta";
import { EndOfPostCta } from "../_components/end-of-post-cta";
import { BlogScrollTrigger } from "../_components/blog-scroll-trigger";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const { data } = await sanityFetch({ query: BLOG_ALL_SLUGS_QUERY });
  return ((data ?? []) as { slug: string }[]).map((post) => ({ slug: post.slug }));
}

async function getPost(slug: string) {
  const { data } = await sanityFetch({
    query: BLOG_POST_QUERY,
    params: { slug },
  });
  return data;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) return {};

  const seoTitle = post.seo?.title || post.title;
  const seoDescription = post.seo?.description || post.excerpt || "";
  const ogImageSource = post.seo?.image?.asset || post.coverImage?.asset;
  const ogImageUrl = ogImageSource
    ? urlFor(ogImageSource)?.width(1200).height(630).format("webp").url()
    : undefined;

  const metadata: Metadata = {
    title: `${seoTitle} | XMA Blog`,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post._updatedAt ?? undefined,
      authors: post.author?.name ? [post.author.name] : undefined,
    },
  };

  if (ogImageUrl && metadata.openGraph) {
    metadata.openGraph.images = [
      { url: ogImageUrl, width: 1200, height: 630 },
    ];
  }

  if (post.seo?.noIndex) {
    metadata.robots = "noindex";
  }

  return metadata;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const categorySlugs = post.categories
    ?.map((cat: any) => cat.slug)
    .filter(Boolean) ?? [];

  const { data: relatedPosts } = await sanityFetch({
    query: RELATED_POSTS_QUERY,
    params: { currentSlug: slug, categorySlugs },
  });

  return (
    <>
      <BlogSchemaScript schemaMarkup={post.schemaMarkup} />

      <SectionContainer className="pt-12">
        <BlogScrollTrigger />
        <div className="mx-auto max-w-3xl lg:max-w-none lg:grid lg:grid-cols-[1fr_288px] lg:gap-12 lg:items-start">
          <div className="min-w-0">
            <nav className="mb-8">
              <a
                href="/blog"
                className="group inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-primary-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:-translate-x-0.5"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back to Blog
              </a>
            </nav>

            <PostHeader
              title={post.title}
              coverImage={post.coverImage}
              publishedAt={post.publishedAt}
              author={post.author}
              categories={post.categories}
            />

            {post.body && <PostBody body={post.body} />}

            <EndOfPostCta />

            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-6">
                {post.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <SidebarCta />
        </div>
      </SectionContainer>

      {relatedPosts && relatedPosts.length > 0 && (
        <SectionContainer background="muted">
          <h2 className="mb-8 text-center font-heading text-2xl font-bold tracking-tight text-foreground">
            Related Posts
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((related: any) => (
              <BlogCard
                key={related._id}
                title={related.title}
                slug={related.slug}
                excerpt={related.excerpt}
                coverImage={related.coverImage}
                publishedAt={related.publishedAt}
                author={related.author}
                categories={related.categories}
              />
            ))}
          </div>
        </SectionContainer>
      )}
    </>
  );
}
