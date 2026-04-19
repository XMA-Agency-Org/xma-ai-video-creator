"use client";

import { useRef, useState } from "react";
import { Volume2, VolumeOff } from "lucide-react";
import { VideoLightbox } from "./video-lightbox";
import { posthog } from "@/app/_lib/posthog-client";
import { getCloudinaryVideoUrl, getCloudinaryPosterUrl } from "@/app/_lib/cloudinary-video";

type VideoGridItemProps = {
  videoUrl: string;
  title: string;
  category: string;
};

export function VideoGridItem({ videoUrl, title, category }: VideoGridItemProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  function handleMouseEnter() {
    videoRef.current?.play();
    setPlaying(true);
  }

  function handleMouseLeave() {
    videoRef.current?.pause();
    setPlaying(false);
  }

  function handleClick() {
    setLightboxOpen(true);
    posthog.capture("portfolio_video_lightbox_opened", {
      title,
      category,
    });
  }

  function handleCloseLightbox() {
    setLightboxOpen(false);
  }

  function handleToggleMute(e: React.MouseEvent) {
    e.stopPropagation();
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  }

  if (!videoUrl) return null;

  return (
    <>
      <div
        className="group relative cursor-pointer overflow-clip rounded-[var(--radius-2xl)] border-2 border-foreground/10 bg-foreground/[0.03] shadow-sm transition-all duration-300 hover:border-primary-300 hover:shadow-xl"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <div className="aspect-[9/16] w-full overflow-clip">
          <video
            ref={videoRef}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            src={getCloudinaryVideoUrl(videoUrl, "card")}
            poster={getCloudinaryPosterUrl(videoUrl, "card")}
            muted
            loop
            playsInline
            preload="metadata"
          />
        </div>

        <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm">
            <svg className="h-5 w-5 ml-0.5 text-primary-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-foreground/60 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
            {category}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-foreground/80 to-transparent p-4 pt-10">
          <div className="flex items-end justify-between">
            <div>
              <p className="font-heading text-sm font-bold text-white leading-tight">
                {title}
              </p>
              {playing && (
                <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] font-bold text-white/70">
                  <span className="h-1.5 w-1.5 rounded-full bg-lime-300 animate-pulse" />
                  Playing
                </span>
              )}
            </div>
            <button
              onClick={handleToggleMute}
              className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-foreground/50 text-white backdrop-blur-sm transition-colors hover:bg-foreground/70"
              aria-label={muted ? "Unmute video" : "Mute video"}
            >
              {muted ? <VolumeOff className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <VideoLightbox
          videoUrl={videoUrl}
          title={title}
          category={category}
          onClose={handleCloseLightbox}
        />
      )}
    </>
  );
}
