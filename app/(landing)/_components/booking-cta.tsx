"use client";

import { MagneticButton } from "@/app/_components/magnetic-button";
import { cn } from "@/app/_lib/class-merge";

type BookingCtaProps = {
  label: string;
  href: string;
  className?: string;
  size?: "sm" | "md";
};

export function BookingCta({ label, href, className, size = "md" }: BookingCtaProps) {
  return (
    <MagneticButton>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center gap-2 rounded-full bg-lime-300 font-black text-foreground transition-all hover:bg-lime-400",
          size === "sm" ? "px-8 py-3 text-sm font-bold" : "px-8 py-4 text-base",
          className
        )}
      >
        {label} &rarr;
      </a>
    </MagneticButton>
  );
}
