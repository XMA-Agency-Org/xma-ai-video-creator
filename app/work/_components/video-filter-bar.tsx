"use client";

import { cn } from "@/app/_lib/class-merge";

type VideoFilterBarProps = {
  total: number;
  filteredCount: number;
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  view: "grid" | "large";
  onViewChange: (view: "grid" | "large") => void;
};

export function VideoFilterBar({
  total,
  filteredCount,
  categories,
  activeCategory,
  onCategoryChange,
  view,
  onViewChange,
}: VideoFilterBarProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange("All")}
          className={cn(
            "cursor-pointer rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200",
            activeCategory === "All"
              ? "bg-primary-500 text-white shadow-md"
              : "border-2 border-foreground/10 bg-foreground/[0.03] text-foreground hover:border-primary-300"
          )}
        >
          All Work
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
            className={cn(
              "cursor-pointer rounded-full px-5 py-2.5 text-sm font-bold transition-all duration-200",
              activeCategory === cat
                ? "bg-primary-500 text-white shadow-md"
                : "border-2 border-foreground/10 bg-foreground/[0.03] text-foreground hover:border-primary-300"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-bold text-foreground">{filteredCount}</span> of{" "}
          {total} videos
        </p>

        <div className="flex items-center gap-1 rounded-full bg-foreground/5 p-1">
          <button
            onClick={() => onViewChange("grid")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-all",
              view === "grid"
                ? "bg-primary-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Grid
          </button>
          <button
            onClick={() => onViewChange("large")}
            className={cn(
              "cursor-pointer rounded-full px-4 py-2 text-xs font-bold transition-all",
              view === "large"
                ? "bg-primary-500 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Large
          </button>
        </div>
      </div>
    </div>
  );
}
