import { NextResponse } from "next/server";
import { stripe } from "@/app/_lib/stripe-server";
import { getPostHogClient } from "@/app/_lib/posthog-server";

export async function POST(request: Request) {
  const { priceId, posthogDistinctId } = await request.json();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/b/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/b#pricing`,
  });

  const distinctId = posthogDistinctId ?? "anonymous";
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId,
    event: "checkout_session_created",
    properties: {
      price_id: priceId,
      stripe_session_id: session.id,
    },
  });

  return NextResponse.json({ url: session.url });
}
