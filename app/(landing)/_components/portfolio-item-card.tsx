"use client";

import { useRef, useEffect } from "react";
import type { PortfolioItem } from "@/app/(landing)/_types/landing-types";
import { getCloudinaryVideoUrl, getCloudinaryPosterUrl } from "@/app/_lib/cloudinary-video";

type PortfolioItemCardProps = {
  item: PortfolioItem;
};

export function PortfolioItemCard({ item }: PortfolioItemCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const video = videoRef.current;
    if (!card || !video) return;

    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (!isTouchDevice) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.6 },
    );

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  function handleMouseEnter() {
    videoRef.current?.play();
  }

  function handleMouseLeave() {
    videoRef.current?.pause();
  }

  if (!item.videoSrc) return null;

  return (
    <div
      ref={cardRef}
      className="group relative overflow-clip rounded-[var(--radius-2xl)] border-2 border-foreground/10 bg-foreground/[0.03] shadow-sm transition-all duration-300 hover:border-primary-300 hover:shadow-xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="aspect-[4/3] w-full overflow-clip">
        <video
          ref={videoRef}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={getCloudinaryVideoUrl(item.videoSrc, "card")}
          poster={getCloudinaryPosterUrl(item.videoSrc, "card")}
          muted
          loop
          playsInline
          preload="metadata"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <div className="p-5">
        <span className="inline-flex rounded-full bg-primary-50 px-3 py-1 text-xs font-bold text-primary-600">
          {item.category}
        </span>
        <h3 className="mt-2 font-heading text-base font-bold text-foreground">
          {item.title}
        </h3>
      </div>
    </div>
  );
}
