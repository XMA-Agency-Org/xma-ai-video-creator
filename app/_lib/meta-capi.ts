import { createHash, randomUUID } from "crypto";
import axios from "axios";

const PIXEL_ID = process.env.META_PIXEL_ID;
const ACCESS_TOKEN = process.env.META_CAPI_ACCESS_TOKEN;
const API_VERSION = "v22.0";

interface MetaEventParams {
  eventName: string;
  eventId: string;
  sourceUrl: string;
  userAgent?: string;
  clientIpAddress?: string;
  fbp?: string;
  fbc?: string;
  email?: string;
  customData?: Record<string, unknown>;
}

function hashUserData(value: string): string {
  return createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
}

function generateEventId(): string {
  return randomUUID();
}

async function sendMetaEvent(params: MetaEventParams): Promise<void> {
  if (!PIXEL_ID || !ACCESS_TOKEN) return;

  const userData: Record<string, unknown> = {};

  if (params.clientIpAddress) userData.client_ip_address = params.clientIpAddress;
  if (params.userAgent) userData.client_user_agent = params.userAgent;
  if (params.fbp) userData.fbp = params.fbp;
  if (params.fbc) userData.fbc = params.fbc;
  if (params.email) userData.em = [hashUserData(params.email)];

  const payload: Record<string, unknown> = {
    data: [
      {
        event_name: params.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: params.eventId,
        event_source_url: params.sourceUrl,
        action_source: "website",
        user_data: userData,
        ...(params.customData && { custom_data: params.customData }),
      },
    ],
    access_token: ACCESS_TOKEN,
  };

  if (process.env.NODE_ENV !== "production") {
    payload.test_event_code = "TEST_EVENT";
  }

  try {
    await axios.post(
      `https://graph.facebook.com/${API_VERSION}/${PIXEL_ID}/events`,
      payload
    );
  } catch (error) {
    console.error("[Meta CAPI] Failed to send event:", error);
  }
}

export { sendMetaEvent, generateEventId, hashUserData };
export type { MetaEventParams };
