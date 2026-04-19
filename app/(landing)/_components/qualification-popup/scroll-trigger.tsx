"use client";

import { useEffect, useRef } from "react";
import { useQualificationPopupContext } from "./qualification-popup-provider";
import { POPUP_SESSION_KEY } from "@/app/(landing)/_lib/qualification-config";

export function ScrollTrigger() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const { open } = useQualificationPopupContext();

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (sessionStorage.getItem(POPUP_SESSION_KEY)) return;
        sessionStorage.setItem(POPUP_SESSION_KEY, "1");
        setTimeout(() => open("scroll"), 600);
        observer.disconnect();
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [open]);

  return <div ref={sentinelRef} aria-hidden="true" className="h-px w-full" />;
}
