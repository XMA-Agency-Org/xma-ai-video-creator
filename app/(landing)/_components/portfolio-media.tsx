"use client";

import dynamic from "next/dynamic";
import type { PortfolioItem } from "@/app/(landing)/_types/landing-types";

const PortfolioCarousel = dynamic(
  () => import("./portfolio-carousel").then((m) => m.PortfolioCarousel),
  {
    ssr: false,
    loading: () => <div className="aspect-[9/16] max-h-[85vh] rounded-[var(--radius-2xl)] bg-foreground/5" />,
  }
);

const PortfolioGrid = dynamic(
  () => import("./portfolio-grid").then((m) => m.PortfolioGrid),
  {
    ssr: false,
    loading: () => <div className="h-[520px] rounded-[var(--radius-2xl)] bg-foreground/5" />,
  }
);

export function PortfolioMedia({ items }: { items: PortfolioItem[] }) {
  return (
    <>
      <div className="mt-8 hidden px-6 lg:block">
        <PortfolioGrid items={items} />
      </div>
      <div className="mx-auto mt-8 max-w-[var(--container-max-width)] px-6 lg:hidden">
        <PortfolioCarousel items={items} />
      </div>
    </>
  );
}
