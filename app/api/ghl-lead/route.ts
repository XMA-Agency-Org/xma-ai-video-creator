import { NextResponse } from "next/server";
import { headers } from "next/headers";
import axios from "axios";
import { scoreQualification } from "@/app/(landing)/_lib/qualification-scorer";
import { sendMetaEvent, generateEventId } from "@/app/_lib/meta-capi";
import { BOOKING_URL } from "@/app/(landing)/_lib/qualification-config";
import type { GhlLeadRequest, GhlLeadResponse } from "@/app/(landing)/_types/qualification";

const GHL_WEBHOOK_URL = process.env.GHL_WEBHOOK_URL;

function parseFbCookies(cookieHeader: string): { fbp?: string; fbc?: string } {
  const fbp = cookieHeader.match(/_fbp=([^;]+)/)?.[1];
  const fbc = cookieHeader.match(/_fbc=([^;]+)/)?.[1];
  return { fbp, fbc };
}

export async function POST(request: Request): Promise<NextResponse<GhlLeadResponse>> {
  let body: GhlLeadRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, qualified: false, redirectUrl: null },
      { status: 400 }
    );
  }

  const { businessType, spend, timeline, role, firstName, lastName, email, phone, website, sourceUrl, utm } = body;

  if (!firstName || !lastName || !email || !phone) {
    return NextResponse.json(
      { ok: false, qualified: false, redirectUrl: null },
      { status: 400 }
    );
  }

  const { qualified } = scoreQualification({ businessType, spend, timeline, role, firstName, lastName, email, phone, website });

  const requestHeaders = await headers();
  const userAgent = requestHeaders.get("user-agent") ?? undefined;
  const clientIpAddress =
    requestHeaders.get("x-forwarded-for")?.split(",")[0].trim() ??
    requestHeaders.get("x-real-ip") ??
    undefined;
  const cookieHeader = requestHeaders.get("cookie") ?? "";
  const { fbp, fbc } = parseFbCookies(cookieHeader);

  let eventId: string | undefined;

  if (qualified) {
    eventId = generateEventId();
    sendMetaEvent({
      eventName: "Lead",
      eventId,
      sourceUrl: sourceUrl ?? "",
      userAgent,
      clientIpAddress,
      fbp,
      fbc,
      email,
    }).catch(() => {});
  }

  if (GHL_WEBHOOK_URL) {
    const ghlPayload = {
      firstName,
      lastName,
      email,
      phone,
      source: "landing-qualification-popup",
      tags: [qualified ? "qualified" : "disqualified"],
      customField: {
        business_type: businessType,
        monthly_spend: spend,
        timeline,
        role,
        website,
        qualified,
        source_url: sourceUrl,
        utm_source: utm?.source,
        utm_medium: utm?.medium,
        utm_campaign: utm?.campaign,
      },
    };

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    try {
      await axios.post(GHL_WEBHOOK_URL, ghlPayload, { signal: controller.signal });
    } catch (err) {
      console.error("[GHL Webhook] Failed to deliver lead:", err);
    } finally {
      clearTimeout(timeout);
    }
  }

  return NextResponse.json({
    ok: true,
    qualified,
    redirectUrl: qualified ? BOOKING_URL : null,
    eventId,
  });
}
