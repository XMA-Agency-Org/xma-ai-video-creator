"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { posthog } from "@/app/_lib/posthog-client";

type AbVariant = "control" | "test";

const AbVariantContext = createContext<AbVariant>("control");

export function useAbVariant() {
  return useContext(AbVariantContext);
}

export function AbVariantProvider({ children }: { children: React.ReactNode }) {
  const [variant, setVariant] = useState<AbVariant>("control");

  useEffect(() => {
    if (!posthog.__loaded) return;

    const checkFlag = () => {
      const flag = posthog.getFeatureFlag("show-pricing");
      setVariant(flag === "test" ? "test" : "control");
    };

    if (posthog.getFeatureFlag("show-pricing") !== undefined) {
      checkFlag();
    } else {
      posthog.onFeatureFlags(checkFlag);
    }
  }, []);

  return (
    <AbVariantContext.Provider value={variant}>
      {children}
    </AbVariantContext.Provider>
  );
}

export function AbPricingGate({ children }: { children: React.ReactNode }) {
  const variant = useAbVariant();
  if (variant !== "test") return null;
  return <>{children}</>;
}
