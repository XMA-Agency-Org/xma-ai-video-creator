"use client";

import { useState, useMemo, useEffect } from "react";
import { VideoGridItem } from "./video-grid-item";
import { VideoFilterBar } from "./video-filter-bar";
import { Button } from "@/app/_components/primitives";
import type { VideoEntry } from "@/app/portfolio/_types/portfolio-types";

const PAGE_SIZE = 15;

type WorkPageContentProps = {
  videos: VideoEntry[];
};

export function WorkPageContent({ videos }: WorkPageContentProps) {
  const [view, setView] = useState<"grid" | "large">("grid");
  const [activeCategory, setActiveCategory] = useState("All");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory]);

  const categories = useMemo(() => {
    const cats = [...new Set(videos.map((v) => v.category))];
    return cats.sort();
  }, [videos]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return videos;
    return videos.filter((v) => v.category === activeCategory);
  }, [videos, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

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
        {visible.map((entry) => (
          <VideoGridItem
            key={entry.id}
            videoUrl={entry.videoUrl}
            title={entry.title}
            category={entry.category}
          />
        ))}
      </div>

      {hasMore && (
        <div className="mt-12 flex justify-center">
          <Button
            intent="outline"
            size="lg"
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
          >
            Load More ({filtered.length - visibleCount} remaining)
          </Button>
        </div>
      )}

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
