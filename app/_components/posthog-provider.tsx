"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { posthog } from "@/app/_lib/posthog-client";
import { trackMetaEvent } from "@/app/_lib/meta-pixel-client";

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

    const t = setTimeout(() => trackMetaEvent("PageView"), 100);
    return () => clearTimeout(t);
  }, [pathname, searchParams]);

  return <>{children}</>;
}
