"use client";

import { useEffect } from "react";
import { POPUP_COPY } from "@/app/(landing)/_lib/qualification-config";

type StepQualifiedProps = {
  redirectUrl: string;
  eventId?: string;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function StepQualified({ redirectUrl, eventId }: StepQualifiedProps) {
  const { qualified } = POPUP_COPY;

  useEffect(() => {
    if (eventId && window.fbq) {
      window.fbq("track", "Lead", {}, { eventID: eventId });
    }

    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 1500);

    return () => clearTimeout(timer);
  }, [redirectUrl, eventId]);

  return (
    <div className="flex flex-col items-center gap-6 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-lime-100">
        <span className="text-3xl">✅</span>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-lime-600">{qualified.eyebrow}</span>
        <h3 className="font-heading text-xl font-bold text-foreground">{qualified.headline}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{qualified.body}</p>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="animate-spin inline-block h-3 w-3 rounded-full border-2 border-primary-300 border-t-primary-600" />
        Redirecting…
      </div>
    </div>
  );
}
