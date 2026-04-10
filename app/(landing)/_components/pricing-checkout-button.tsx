"use client";

import { useState } from "react";
import { apiClient } from "@/app/_lib/api-client";
import { posthog } from "@/app/_lib/posthog-client";

type PricingCheckoutButtonProps = {
  stripePriceId: string;
  highlighted: boolean;
};

export function PricingCheckoutButton({
  stripePriceId,
  highlighted,
}: PricingCheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleCheckout() {
    setLoading(true);
    posthog.capture("checkout_initiated", {
      price_id: stripePriceId,
      highlighted,
    });
    try {
      const { data } = await apiClient.post<{ url: string }>("/checkout", {
        priceId: stripePriceId,
        posthogDistinctId: posthog.get_distinct_id(),
      });
      window.location.href = data.url;
    } catch (err) {
      posthog.captureException(err);
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={`w-full cursor-pointer rounded-full px-8 py-4 text-sm font-bold transition-all duration-200 disabled:opacity-50 ${
        highlighted
          ? "bg-lime-300 text-foreground hover:bg-lime-400"
          : "bg-primary-500 text-white hover:bg-primary-600"
      }`}
    >
      {loading ? "Redirecting..." : "Get Started →"}
    </button>
  );
}
