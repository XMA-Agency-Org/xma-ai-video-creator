import { NextResponse } from "next/server";
import { sendMetaEvent } from "@/app/_lib/meta-capi";

function parseCookie(cookieHeader: string, name: string): string | undefined {
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match?.[1];
}

export async function POST(request: Request) {
  const { eventName, eventId, sourceUrl, customData } = await request.json();

  const cookieHeader = request.headers.get("cookie") ?? "";

  await sendMetaEvent({
    eventName,
    eventId,
    sourceUrl,
    userAgent: request.headers.get("user-agent") ?? undefined,
    clientIpAddress:
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip") ??
      undefined,
    fbp: parseCookie(cookieHeader, "_fbp"),
    fbc: parseCookie(cookieHeader, "_fbc"),
    customData,
  });

  return NextResponse.json({ success: true });
}
