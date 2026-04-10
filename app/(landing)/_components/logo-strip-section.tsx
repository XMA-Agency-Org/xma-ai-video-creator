"use client";

import Image from "next/image";
import { CLIENT_LOGOS } from "@/app/(landing)/_lib/landing-content";
import { ScrollVelocityRow } from "@/app/_components/marquee-row";

export function LogoStripSection() {
  const logos = CLIENT_LOGOS;

  return (
    <section className="bg-foreground py-10">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-widest text-neutral-400">
          Trusted by brands across the region
        </p>
      </div>
      <ScrollVelocityRow baseVelocity={3} direction={-1}>
        <div className="flex items-center gap-14 px-7">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className={`shrink-0 h-8${
                logo.id === "pixishoot" ? " invert" : ""
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                height={32}
                width={120}
                className="h-8 w-auto object-contain opacity-70"
              />
            </div>
          ))}
        </div>
      </ScrollVelocityRow>
    </section>
  );
}
