"use client";

import { useEffect } from "react";

export function MetaLeadTracker({ eventId }: { eventId: string }) {
  useEffect(() => {
    if (window.fbq) {
      window.fbq("track", "Lead", {}, { eventID: eventId });
    }
  }, [eventId]);

  return null;
}
