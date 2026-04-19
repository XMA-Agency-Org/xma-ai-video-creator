"use client";

import { MagneticButton } from "@/app/_components/magnetic-button";
import { useQualificationPopup } from "@/app/(landing)/_hooks/use-qualification-popup";
import type { PopupTriggerSource } from "@/app/(landing)/_types/qualification";
import { cn } from "@/app/_lib/class-merge";

type BookingCtaProps = {
  label: string;
  href: string;
  source: PopupTriggerSource;
  className?: string;
  size?: "sm" | "md";
};

export function BookingCta({ label, href, source, className, size = "md" }: BookingCtaProps) {
  const { open } = useQualificationPopup();

  function handleClick(e: React.MouseEvent) {
    e.preventDefault();
    open(source);
  }

  return (
    <MagneticButton>
      <a
        href={href}
        onClick={handleClick}
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
