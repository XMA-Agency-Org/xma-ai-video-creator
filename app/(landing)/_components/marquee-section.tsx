"use client";

import { ScrollVelocityRow } from "@/app/_components/marquee-row";

export function MarqueeSection() {
  const text = "YOUR AI VIDEO PARTNER";
  const items = Array.from({ length: 8 }, (_, i) => i);

  return (
    <section className="overflow-clip bg-foreground pb-6">
      <ScrollVelocityRow baseVelocity={2} direction={-1}>
        <div className="flex items-center">
          {items.map((i) => (
            <span key={i} className="flex items-center">
              <span
                className={`mx-4 font-heading text-[clamp(4rem,12vw,4rem)] font-black uppercase leading-none tracking-[-0.04em] md:mx-8 ${
                  i % 2 === 0
                    ? "text-white"
                    : "text-transparent [-webkit-text-stroke:2px_white]"
                }`}
              >
                {text}
              </span>
              <span className="mx-4 text-lime-300 text-[clamp(2rem,6vw,5rem)] md:mx-8">&bull;</span>
            </span>
          ))}
        </div>
      </ScrollVelocityRow>
    </section>
  );
}
