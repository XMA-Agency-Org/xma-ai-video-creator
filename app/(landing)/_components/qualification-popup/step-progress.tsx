"use client";

import { cn } from "@/app/_lib/class-merge";

type StepProgressProps = {
  current: number;
  total: number;
};

export function StepProgress({ current, total }: StepProgressProps) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            i < current
              ? "bg-primary-500 w-6"
              : i === current
              ? "bg-primary-300 w-4"
              : "bg-neutral-200 w-4"
          )}
        />
      ))}
    </div>
  );
}
