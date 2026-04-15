"use client";

import { apiClient } from "./api-client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function trackMetaEvent(
  eventName: string,
  customData?: Record<string, unknown>
) {
  const eventId = crypto.randomUUID();
  const sourceUrl = window.location.href;

  if (window.fbq) {
    window.fbq("track", eventName, customData ?? {}, { eventID: eventId });
  }

  apiClient
    .post("/meta-capi", { eventName, eventId, sourceUrl, customData })
    .catch(() => {});
}

export { trackMetaEvent };
