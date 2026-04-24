"use client";

import { apiClient } from "./api-client";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function readCookie(name: string): string | undefined {
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${name}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

function resolveFbc(): string | undefined {
  const cookie = readCookie("_fbc");
  if (cookie) return cookie;

  const fbclid = new URLSearchParams(window.location.search).get("fbclid");
  if (fbclid) {
    const constructed = `fb.1.${Date.now()}.${fbclid}`;
    try {
      sessionStorage.setItem("_fbc_session", constructed);
    } catch {}
    return constructed;
  }

  try {
    return sessionStorage.getItem("_fbc_session") ?? undefined;
  } catch {
    return undefined;
  }
}

function trackMetaEvent(
  eventName: string,
  customData?: Record<string, unknown>
) {
  const eventId = crypto.randomUUID();
  const sourceUrl = window.location.href;
  const fbp = readCookie("_fbp");
  const fbc = resolveFbc();

  if (window.fbq) {
    window.fbq("track", eventName, customData ?? {}, { eventID: eventId });
  }

  apiClient
    .post("/meta-capi", { eventName, eventId, sourceUrl, customData, fbp, fbc })
    .catch(() => {});
}

export { trackMetaEvent };
