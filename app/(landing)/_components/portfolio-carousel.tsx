"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { PortfolioItem } from "@/app/(landing)/_types/landing-types";
import { getCloudinaryVideoUrl, getCloudinaryPosterUrl } from "@/app/_lib/cloudinary-video";

type PortfolioCarouselProps = {
  items: PortfolioItem[];
};

export function PortfolioCarousel({ items: allItems }: PortfolioCarouselProps) {
  const items = allItems.filter((i) => i.videoSrc).slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback(
    (index: number) => {
      const wrapped = ((index % items.length) + items.length) % items.length;
      videoRefs.current[activeIndex]?.pause();
      setActiveIndex(wrapped);
    },
    [activeIndex, items.length]
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [goTo, activeIndex]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [goTo, activeIndex]);

  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    if (!video) return;

    video.currentTime = 0;
    video.play().catch(() => {});

    function handleEnded() {
      goNext();
    }

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [activeIndex, goNext]);

  useEffect(() => {
    intervalRef.current = setInterval(goNext, 8000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goNext]);

  function resetAutoplay() {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 8000);
  }

  if (items.length === 0) return null;

  return (
    <div className="relative flex items-center gap-3">
      <button
        onClick={() => {
          goPrev();
          resetAutoplay();
        }}
        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-foreground/10 text-foreground transition-colors hover:bg-foreground hover:text-background"
        aria-label="Previous video"
      >
        <ChevronLeft size={18} />
      </button>

      <div className="min-w-0 flex-1">
        <div className="overflow-clip rounded-[var(--radius-2xl)] border-2 border-foreground/10 shadow-lg">
          <div className="relative aspect-[9/16] max-h-[70vh] mx-auto w-auto bg-foreground/5">
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  i === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <video
                  ref={(el) => { videoRefs.current[i] = el; }}
                  className="h-full w-full object-cover"
                  src={getCloudinaryVideoUrl(item.videoSrc, "carousel")}
                  poster={getCloudinaryPosterUrl(item.videoSrc, "carousel")}
                  muted
                  playsInline
                  preload={i <= 1 ? "metadata" : "none"}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <span className="inline-flex rounded-full bg-primary-500/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                    {item.category}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-bold text-white md:text-2xl">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                goTo(i);
                resetAutoplay();
              }}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "w-8 bg-primary-500"
                  : "w-4 bg-foreground/15 hover:bg-foreground/25"
              }`}
              style={{ touchAction: "manipulation" }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <button
        onClick={() => {
          goNext();
          resetAutoplay();
        }}
        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-foreground/10 text-foreground transition-colors hover:bg-foreground hover:text-background"
        aria-label="Next video"
      >
        <ChevronRight size={18} />
      </button>
    </div>
  );
}
