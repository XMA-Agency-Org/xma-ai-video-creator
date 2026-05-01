"use client";

import { useQualificationPopup } from "@/app/(landing)/_hooks/use-qualification-popup";
import { Button } from "@/app/_components/primitives";

export function SidebarCta() {
  const { open } = useQualificationPopup();

  return (
    <aside className="sticky top-28 hidden lg:block">
      <div className="rounded-[var(--radius-xl)] bg-gradient-to-br from-primary-600 to-primary-900 p-6">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-lime-300">
          Free Strategy Call
        </p>
        <h3 className="mb-3 font-heading text-lg font-bold leading-snug text-white">
          Scale your brand with AI video
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-white/70">
          See exactly how we'd build your video engine — done-for-you, in 48 hrs.
        </p>
        <Button
          intent="accent"
          size="md"
          fullWidth
          onClick={() => open("blog_sidebar")}
        >
          Book a Strategy Call
        </Button>
        <p className="mt-3 text-center text-xs text-white/40">
          Free · No commitment
        </p>
      </div>

      <div className="mt-4 rounded-[var(--radius-xl)] border border-border bg-muted/50 p-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          What you get
        </p>
        <ul className="space-y-2 text-sm text-foreground/70">
          {[
            "Custom video strategy for your brand",
            "AI production pipeline walkthrough",
            "Real pricing & timeline estimate",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-0.5 shrink-0 text-primary-500">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
