import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/app/_components/primitives";
import { cn } from "@/app/_lib/class-merge";

type BlogCardProps = {
  title: string;
  slug: string;
  excerpt?: string | null;
  coverImage?: { asset?: unknown; alt?: string } | null;
  publishedAt?: string | null;
  author?: { name?: string | null; avatar?: unknown | null } | null;
  categories?: { title?: string | null; slug?: string | null }[] | null;
  featured?: boolean;
  className?: string;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogCard({
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  author,
  categories,
  featured,
  className,
}: BlogCardProps) {
  const imageUrl = coverImage?.asset
    ? urlFor(coverImage.asset)?.width(featured ? 1200 : 600).height(featured ? 630 : 340).format("webp").url()
    : null;

  return (
    <a
      href={`/blog/${slug}`}
      className={cn(
        "group flex flex-col rounded-[var(--radius-xl)] border border-border bg-background transition-all duration-300 hover:-translate-y-1 hover:shadow-lg",
        featured && "md:col-span-2 md:flex-row",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/9] overflow-clip rounded-t-[var(--radius-xl)]",
          featured && "md:aspect-auto md:w-1/2 md:rounded-l-[var(--radius-xl)] md:rounded-tr-none"
        )}
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={coverImage?.alt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"}
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-primary-100">
            <span className="font-heading text-lg font-bold text-primary-300">XMA</span>
          </div>
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col justify-between p-5",
          featured && "md:p-8"
        )}
      >
        <div>
          {categories && categories.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Badge key={cat?.slug} variant="accent" size="sm">
                  {cat?.title}
                </Badge>
              ))}
            </div>
          )}

          <h3
            className={cn(
              "font-heading text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary-500",
              featured && "md:text-2xl"
            )}
          >
            {title}
          </h3>

          {excerpt && (
            <p
              className={cn(
                "mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground",
                featured && "md:line-clamp-3 md:text-base"
              )}
            >
              {excerpt}
            </p>
          )}
        </div>

        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          {author?.avatar && (
            <div className="relative h-6 w-6 overflow-clip rounded-full">
              <Image
                src={urlFor(author.avatar)?.width(48).height(48).format("webp").url() ?? ""}
                alt={author.name ?? ""}
                fill
                className="object-cover"
              />
            </div>
          )}
          {author?.name && <span className="font-medium text-foreground">{author.name}</span>}
          {publishedAt && (
            <>
              <span className="text-border">|</span>
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            </>
          )}
        </div>
      </div>
    </a>
  );
}
