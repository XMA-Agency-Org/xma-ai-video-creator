"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import type { PortfolioItem } from "@/app/(landing)/_types/landing-types";

type PortfolioGridProps = {
  items: PortfolioItem[];
};

function PortfolioGridCard({
  item,
  index,
}: {
  item: PortfolioItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const isOffset = index % 2 === 1;

  return (
    <div
      ref={cardRef}
      className="group relative cursor-pointer overflow-clip rounded-[var(--radius-2xl)]"
      style={{
        marginTop: isOffset ? "3rem" : 0,
        opacity: isInView ? 1 : 0,
        transform: isInView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s, transform 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
      }}
    >
      <div className="aspect-[9/16]">
        <video
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          src={item.videoSrc}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="absolute bottom-0 left-0 right-0 flex flex-col p-4 lg:p-5 translate-y-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        <span className="inline-flex w-fit rounded-full bg-primary-500/80 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
          {item.category}
        </span>
        <h3 className="mt-2 font-heading text-base font-bold text-white lg:text-lg">
          {item.title}
        </h3>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-[var(--radius-2xl)] border-2 border-white/0 transition-colors duration-300 group-hover:border-white/20" />
    </div>
  );
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
  const gridItems = items.slice(0, 6);

  return (
    <div className="grid grid-cols-3 gap-4 lg:grid-cols-6">
      {gridItems.map((item, i) => (
        <PortfolioGridCard key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}
