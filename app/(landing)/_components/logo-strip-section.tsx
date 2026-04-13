"use client";

import Image from "next/image";
import { CLIENT_LOGOS } from "@/app/(landing)/_lib/landing-content";
import { ScrollVelocityRow } from "@/app/_components/marquee-row";

export function LogoStripSection() {
  const logos = CLIENT_LOGOS;

  return (
    <section className="bg-foreground pb-6">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6">
      </div>
      <ScrollVelocityRow baseVelocity={3} direction={-1}>
        <div className="flex items-center gap-14 px-7">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className={`shrink-0${
                logo.id === "novo-skin" ? " h-14" : " h-8"
              }${
                ["pixishoot", "orgaplus"].includes(logo.id) ? " invert" : ""
              }`}
            >
              <Image
                src={logo.src}
                alt={logo.name}
                height={logo.id === "novo-skin" ? 56 : 32}
                width={120}
                className={`${logo.id === "novo-skin" ? "h-14" : "h-8"} w-auto object-contain opacity-70`}
              />
            </div>
          ))}
        </div>
      </ScrollVelocityRow>
    </section>
  );
}
