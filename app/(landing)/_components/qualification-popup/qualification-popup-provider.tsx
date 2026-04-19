"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { PopupTriggerSource } from "@/app/(landing)/_types/qualification";

type QualificationPopupContextValue = {
  isOpen: boolean;
  source: PopupTriggerSource | null;
  open: (source: PopupTriggerSource) => void;
  close: () => void;
};

const QualificationPopupContext = createContext<QualificationPopupContextValue | null>(null);

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
