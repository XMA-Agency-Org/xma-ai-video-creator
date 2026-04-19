"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeOff } from "lucide-react";
import { getCloudinaryVideoUrl, getCloudinaryPosterUrl } from "@/app/_lib/cloudinary-video";

type HeroVideoCellProps = {
  src: string;
};

export function HeroVideoCell({ src }: HeroVideoCellProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.getAttribute("src")) {
      video.src = getCloudinaryVideoUrl(src, "hero");
      video.load();
    }
    video.play().catch(() => {});
  }, [src]);

  function toggleMute() {
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  }

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        poster={getCloudinaryPosterUrl(src, "hero")}
      />
      <button
        onClick={toggleMute}
        className="absolute bottom-3 right-3 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-foreground/50 text-white backdrop-blur-sm transition-colors hover:bg-foreground/70"
        aria-label={muted ? "Unmute video" : "Mute video"}
      >
        {muted ? <VolumeOff className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}
