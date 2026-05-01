"use client";

import { createContext } from "react";

export type PopupTriggerSource =
  | "scroll"
  | "hero_cta"
  | "cta_banner"
  | "nav"
  | "mobile_menu"
  | "blog_sidebar"
  | "blog_inline"
  | "blog_end";

export type QualificationPopupContextValue = {
  isOpen: boolean;
  source: PopupTriggerSource | null;
  open: (source: PopupTriggerSource) => void;
  close: () => void;
};

export const QualificationPopupContext =
  createContext<QualificationPopupContextValue | null>(null);
