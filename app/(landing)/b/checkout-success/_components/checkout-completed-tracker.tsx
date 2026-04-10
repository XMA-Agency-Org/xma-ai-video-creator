"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { posthog } from "@/app/_lib/posthog-client";

export function CheckoutCompletedTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    posthog.capture("checkout_completed", {
      stripe_session_id: searchParams.get("session_id"),
    });
  }, []);

  return null;
}
