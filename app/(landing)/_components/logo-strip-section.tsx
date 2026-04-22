import Image from "next/image";
import { CLIENT_LOGOS } from "@/app/(landing)/_lib/landing-content";

function LogoRow({ ariaHidden }: { ariaHidden?: boolean }) {
  return (
    <div className="flex shrink-0 items-center gap-14 px-7 pt-6" aria-hidden={ariaHidden}>
      {CLIENT_LOGOS.map((logo) => (
        <div
          key={logo.id}
          className={`shrink-0 h-8${["pixishoot", "orgaplus"].includes(logo.id) ? " invert" : ""}`}
        >
          <Image
            src={logo.src}
            alt={ariaHidden ? "" : logo.name}
            height={32}
            width={120}
            className="h-8 w-auto object-contain opacity-70"
            style={{ width: "auto" }}
          />
        </div>
      ))}
    </div>
  );
}

export function LogoStripSection() {
  return (
    <section className="bg-foreground pb-6">
      <div className="w-full overflow-clip">
        <div className="inline-flex will-change-transform animate-marquee-logos">
          <LogoRow />
          <LogoRow ariaHidden />
        </div>
      </div>
    </section>
  );
}
