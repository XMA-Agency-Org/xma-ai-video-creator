"use client";

import { useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";

type VideoLightboxProps = {
  videoUrl: string;
  title: string;
  category: string;
  onClose: () => void;
};

export function VideoLightbox({
  videoUrl,
  title,
  category,
  onClose,
}: VideoLightboxProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  useEffect(() => {
    videoRef.current?.play();
  }, []);

  function handleBackdropClick(e: React.MouseEvent) {
    if (e.target === backdropRef.current) onClose();
  }

  return createPortal(
    <div
      ref={backdropRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-foreground/80 backdrop-blur-md animate-[fadeIn_200ms_ease-out]"
      onClick={handleBackdropClick}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-label="Close video"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center">
        <div className="relative overflow-clip rounded-2xl shadow-2xl">
          <video
            ref={videoRef}
            className="max-h-[85vh] w-auto rounded-2xl"
            src={videoUrl}
            controls
            autoPlay
            playsInline
            loop
          />
        </div>

        <div className="mt-3 flex items-center gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold text-white/80 backdrop-blur-sm">
            {category}
          </span>
          <p className="font-heading text-sm font-bold text-white">{title}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}
