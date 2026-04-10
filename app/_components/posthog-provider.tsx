"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { posthog } from "@/app/_lib/posthog-client";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!pathname || !posthog.__loaded) return;

    const url = window.origin + pathname;
    const fullUrl = searchParams?.toString()
      ? `${url}?${searchParams.toString()}`
      : url;

    posthog.capture("$pageview", { $current_url: fullUrl });
  }, [pathname, searchParams]);

  return <>{children}</>;
}
