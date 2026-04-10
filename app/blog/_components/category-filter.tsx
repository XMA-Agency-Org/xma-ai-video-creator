"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/app/_lib/class-merge";

type CategoryFilterProps = {
  categories: {
    _id?: string;
    title?: string | null;
    slug?: string | null;
    postCount?: number | null;
  }[];
};

export function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  function handleCategoryClick(slug: string | null | undefined) {
    const params = new URLSearchParams(searchParams.toString());
    if (!slug || activeCategory === slug) {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`/blog?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => handleCategoryClick(null)}
        className={cn(
          "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
          !activeCategory
            ? "bg-primary-500 text-white shadow-md"
            : "bg-muted text-muted-foreground hover:bg-primary-100 hover:text-primary-600"
        )}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => handleCategoryClick(cat.slug)}
          className={cn(
            "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
            activeCategory === cat.slug
              ? "bg-primary-500 text-white shadow-md"
              : "bg-muted text-muted-foreground hover:bg-primary-100 hover:text-primary-600"
          )}
        >
          {cat.title}
          {cat.postCount ? (
            <span className="ml-1.5 text-xs opacity-60">({cat.postCount})</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
