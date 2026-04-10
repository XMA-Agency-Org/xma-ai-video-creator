"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import type { FaqItem } from "@/app/(landing)/_types/landing-types";
import { posthog } from "@/app/_lib/posthog-client";

type FaqAccordionItemProps = {
  item: FaqItem;
};

export function FaqAccordionItem({ item }: FaqAccordionItemProps) {
  const [open, setOpen] = useState(false);

  function handleToggle() {
    const nextOpen = !open;
    setOpen(nextOpen);
    if (nextOpen) {
      posthog.capture("faq_item_expanded", {
        question: item.question,
      });
    }
  }

  return (
    <div className="border-b border-border">
      <button
        className="flex w-full items-center justify-between py-6 text-left cursor-pointer"
        onClick={handleToggle}
        aria-expanded={open}
      >
        <span className="pr-4 font-heading text-base font-bold text-foreground">
          {item.question}
        </span>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary-500 transition-colors">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-200 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="min-h-0 overflow-hidden">
          <p className={`text-sm leading-relaxed text-muted-foreground pr-12 ${open ? "pb-6" : ""}`}>
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
