"use client";

import { useContext, useState, useCallback, type ReactNode } from "react";
import {
  QualificationPopupContext,
  type QualificationPopupContextValue,
  type PopupTriggerSource,
} from "@/app/_lib/qualification-popup-context";

export function useQualificationPopupContext() {
  const ctx = useContext(QualificationPopupContext);
  if (!ctx) throw new Error("useQualificationPopupContext must be used inside QualificationPopupProvider");
  return ctx;
}

export function QualificationPopupProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState<PopupTriggerSource | null>(null);

  const open = useCallback((src: PopupTriggerSource) => {
    setSource(src);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <QualificationPopupContext.Provider value={{ isOpen, source, open, close }}>
      {children}
    </QualificationPopupContext.Provider>
  );
}
