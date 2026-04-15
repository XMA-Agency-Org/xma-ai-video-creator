"use client";

import { ScrollVelocityRow } from "@/app/_components/marquee-row";

export function LocationStripSection() {
  const items = Array.from({ length: 12 }, (_, i) => i);

  return (
    <section className="overflow-clip bg-background py-4">
      <ScrollVelocityRow baseVelocity={2} direction={1}>
        <div className="flex items-center">
          {items.map((i) => (
            <span
              key={i}
              className="mx-6 text-sm font-bold uppercase tracking-[0.25em] text-muted-foreground"
            >
              <span className="text-primary-500">&bull;</span>
              <span className="mx-3">BASED IN DUBAI. GLOBALLY TRUSTED</span>
              <span className="text-primary-500">&bull;</span>
            </span>
          ))}
        </div>
      </ScrollVelocityRow>
    </section>
  );
}
