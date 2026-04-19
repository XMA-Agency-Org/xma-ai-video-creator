"use client";

import { useEffect } from "react";
import { useQualificationPopupContext } from "./qualification-popup-provider";
import { POPUP_SESSION_KEY } from "@/app/(landing)/_lib/qualification-config";

export function ScrollTrigger() {
  const { open } = useQualificationPopupContext();

  useEffect(() => {
    if (sessionStorage.getItem(POPUP_SESSION_KEY)) return;

    function onScroll() {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrolled < 0.3) return;
      if (sessionStorage.getItem(POPUP_SESSION_KEY)) return;
      sessionStorage.setItem(POPUP_SESSION_KEY, "1");
      window.removeEventListener("scroll", onScroll);
      setTimeout(() => open("scroll"), 600);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  return null;
}
