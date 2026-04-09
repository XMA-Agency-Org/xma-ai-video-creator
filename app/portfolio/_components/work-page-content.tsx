"use client";

import { useState, useMemo } from "react";
import { VideoGridItem } from "./video-grid-item";
import { VideoFilterBar } from "./video-filter-bar";
import type { VideoEntry } from "@/app/portfolio/_types/portfolio-types";

type WorkPageContentProps = {
  videos: VideoEntry[];
};

export function WorkPageContent({ videos }: WorkPageContentProps) {
  const [view, setView] = useState<"grid" | "large">("grid");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = [...new Set(videos.map((v) => v.category))];
    return cats.sort();
  }, [videos]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return videos;
    return videos.filter((v) => v.category === activeCategory);
  }, [videos, activeCategory]);

  const gridClass =
    view === "grid"
      ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
      : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <>
      <VideoFilterBar
        total={videos.length}
        filteredCount={filtered.length}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        view={view}
        onViewChange={setView}
      />

      <div className={`mt-8 grid gap-4 ${gridClass}`}>
        {filtered.map((entry) => (
          <VideoGridItem
            key={entry.id}
            videoUrl={entry.video}
            title={entry.title}
            category={entry.category}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-20 text-center">
          <p className="font-heading text-xl font-bold text-muted-foreground">
            No videos in this category yet
          </p>
        </div>
      )}
    </>
  );
}
