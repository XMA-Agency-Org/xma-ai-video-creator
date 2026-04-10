import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { Badge } from "@/app/_components/primitives";

type PostHeaderProps = {
  title: string;
  coverImage?: { asset?: unknown; alt?: string } | null;
  publishedAt?: string | null;
  author?: {
    name?: string | null;
    avatar?: unknown | null;
    role?: string | null;
  } | null;
  categories?: { title?: string | null; slug?: string | null }[] | null;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function estimateReadingTime(text: string) {
  const wordCount = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / 200));
}

export function PostHeader({
  title,
  coverImage,
  publishedAt,
  author,
  categories,
}: PostHeaderProps) {
  const imageUrl = coverImage?.asset
    ? urlFor(coverImage.asset)?.width(1400).height(700).format("webp").url()
    : null;

  return (
    <header>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {categories?.map((cat) => (
          <Badge key={cat?.slug} variant="accent" size="sm">
            {cat?.title}
          </Badge>
        ))}
      </div>

      <h1 className="font-heading text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h1>

      <div className="mt-6 flex items-center gap-4">
        {author?.avatar && (
          <div className="relative h-12 w-12 overflow-clip rounded-full ring-2 ring-primary-200">
            <Image
              src={urlFor(author.avatar)?.width(96).height(96).format("webp").url() ?? ""}
              alt={author.name ?? ""}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          {author?.name && (
            <p className="font-heading text-sm font-bold text-foreground">
              {author.name}
            </p>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {author?.role && <span>{author.role}</span>}
            {author?.role && publishedAt && <span>·</span>}
            {publishedAt && (
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            )}
          </div>
        </div>
      </div>

      {imageUrl && (
        <div className="relative mt-8 aspect-[2/1] overflow-clip rounded-[var(--radius-xl)]">
          <Image
            src={imageUrl}
            alt={coverImage?.alt || title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}
    </header>
  );
}
