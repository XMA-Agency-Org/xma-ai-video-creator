"use client";

import { useRef, type KeyboardEvent } from "react";
import { cn } from "@/app/_lib/class-merge";

export type RadioOption<T extends string = string> = {
  value: T;
  label: string;
  description?: string;
};

type RadioCardGroupProps<T extends string> = {
  value: T | null;
  onChange: (value: T) => void;
  options: RadioOption<T>[];
  className?: string;
  columns?: 1 | 2;
};

export function RadioCardGroup<T extends string>({
  value,
  onChange,
  options,
  className,
  columns = 2,
}: RadioCardGroupProps<T>) {
  const groupRef = useRef<HTMLDivElement>(null);

  function handleKeyDown(e: KeyboardEvent<HTMLDivElement>, idx: number) {
    const isVertical = columns === 1;
    const prev = isVertical ? "ArrowUp" : "ArrowLeft";
    const next = isVertical ? "ArrowDown" : "ArrowRight";

    if (e.key === prev || e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIdx = (idx - 1 + options.length) % options.length;
      onChange(options[prevIdx].value);
      const cards = groupRef.current?.querySelectorAll<HTMLDivElement>("[role='radio']");
      cards?.[prevIdx]?.focus();
    } else if (e.key === next || e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIdx = (idx + 1) % options.length;
      onChange(options[nextIdx].value);
      const cards = groupRef.current?.querySelectorAll<HTMLDivElement>("[role='radio']");
      cards?.[nextIdx]?.focus();
    }
  }

  return (
    <div
      ref={groupRef}
      role="radiogroup"
      className={cn(
        "grid gap-2",
        columns === 2 ? "grid-cols-2" : "grid-cols-1",
        className
      )}
    >
      {options.map((option, idx) => {
        const selected = value === option.value;
        return (
          <div
            key={option.value}
            role="radio"
            aria-checked={selected}
            tabIndex={selected || (value === null && idx === 0) ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(e) => {
              if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                onChange(option.value);
              }
              handleKeyDown(e, idx);
            }}
            className={cn(
              "cursor-pointer rounded-[var(--radius-lg)] border p-3 transition-all duration-200 focus:outline-2 focus:outline-offset-2 focus:outline-ring select-none",
              selected
                ? "border-primary-500 bg-primary-50 text-foreground"
                : "border-border bg-background text-foreground hover:border-neutral-300 hover:bg-neutral-100"
            )}
          >
            <span className="block text-sm font-semibold leading-snug">{option.label}</span>
            {option.description && (
              <span className="mt-0.5 block text-xs text-muted-foreground leading-snug">
                {option.description}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
