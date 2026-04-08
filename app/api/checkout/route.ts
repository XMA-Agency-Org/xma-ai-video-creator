import { NextResponse } from "next/server";
import { stripe } from "@/app/_lib/stripe-server";

export async function POST(request: Request) {
  const { priceId } = await request.json();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/#pricing`,
  });

  return NextResponse.json({ url: session.url });
}
