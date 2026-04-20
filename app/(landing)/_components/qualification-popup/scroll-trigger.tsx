"use client";

import { useEffect } from "react";
import { useQualificationPopupContext } from "./qualification-popup-provider";
import { POPUP_SESSION_KEY } from "@/app/(landing)/_lib/qualification-config";

export function ScrollTrigger() {
  const { open } = useQualificationPopupContext();

  useEffect(() => {
    if (sessionStorage.getItem(POPUP_SESSION_KEY)) return;

    const timer = setTimeout(() => {
      if (sessionStorage.getItem(POPUP_SESSION_KEY)) return;
      sessionStorage.setItem(POPUP_SESSION_KEY, "1");
      open("scroll");
    }, 5000);

    return () => clearTimeout(timer);
  }, [open]);

  return null;
}
