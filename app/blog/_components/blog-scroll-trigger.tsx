"use client";

import { useEffect, useRef } from "react";
import { useQualificationPopup } from "@/app/(landing)/_hooks/use-qualification-popup";
import { POPUP_SESSION_KEY } from "@/app/(landing)/_lib/qualification-config";

export function BlogScrollTrigger() {
  const { open } = useQualificationPopup();
  const fired = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(POPUP_SESSION_KEY)) return;

    const handleScroll = () => {
      if (fired.current) return;
      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;
      if (scrolled / total >= 0.6) {
        fired.current = true;
        sessionStorage.setItem(POPUP_SESSION_KEY, "1");
        open("scroll");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [open]);

  return null;
}
