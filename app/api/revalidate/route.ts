import { createHmac, timingSafeEqual } from "crypto";
import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

function verifySignature(secret: string, body: string, signatureHeader: string): boolean {
  const parts = Object.fromEntries(
    signatureHeader.split(",").map((part) => part.split("=") as [string, string])
  );
  const timestamp = parts["t"];
  const signature = parts["v1"];
  if (!timestamp || !signature) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${body}`)
    .digest();

  try {
    return timingSafeEqual(Buffer.from(signature, "base64"), expected);
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
  }

  const body = await req.text();
  const signatureHeader = req.headers.get("sanity-webhook-signature") ?? "";

  if (!verifySignature(secret, body, signatureHeader)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
  }

  let payload: { _type?: string; slug?: { current?: string } };
  try {
    payload = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { _type, slug } = payload;

  if (_type === "blogPost") {
    revalidateTag("blog-posts");
    if (slug?.current) {
      revalidateTag(`blog-post-${slug.current}`);
    }
  } else if (_type === "category") {
    revalidateTag("blog-categories");
    revalidateTag("blog-posts");
  } else {
    revalidateTag("sanity");
  }

  return NextResponse.json({ revalidated: true, type: _type });
}
