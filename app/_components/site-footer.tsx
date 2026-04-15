import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { FOOTER_QUERY } from "@/sanity/lib/queries";
import { Logo } from "./logo";
import XmaWordmark from "@/public/XMA.png";
import { StaggerGroup, StaggerItem } from "@/app/(landing)/_components/stagger-group";

const FALLBACK_LINKS = [
  {
    groupTitle: "Company",
    links: [
      { label: "About XMA", href: "https://xma.ae" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Book a Call", href: "#book" },
      { label: "Contact", href: "mailto:admin@xmaagency.com" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export async function SiteFooter() {
  const { data } = await sanityFetch({ query: FOOTER_QUERY });

  const brandName = data?.brandName ?? "XMA";
  const tagline = data?.tagline ?? "AI-powered video creation for modern brands. Based in Dubai, serving brands worldwide.";
  const linkGroups = data?.linkGroups ?? FALLBACK_LINKS;
  const email = data?.email ?? "admin@xmaagency.com";
  const phone = data?.phone ?? "+971 50 363 6856";
  const address = data?.address ?? "M44, The Curve Building\nAl Qouz 3, Dubai, UAE";
  const copyrightText = data?.copyrightText ?? "XMA Agency · © All Rights Reserved";

  return (
    <footer className="bg-foreground text-white">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6 py-16 md:py-20">
        <StaggerGroup stagger={0.1}>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr]">
            <StaggerItem y={20}>
              <div>
                <span className="flex items-center gap-2">
                  <Logo size={32} />
                  <Image
                    src={XmaWordmark}
                    alt={brandName}
                    className="h-5 w-auto"
                  />
                </span>
                <p className="mt-6 max-w-sm text-sm leading-relaxed text-white/50">
                  {tagline}
                </p>
                <div className="mt-8 space-y-3 text-sm text-white/50">
                  <a href={`mailto:${email}`} className="link-underline block transition-colors hover:text-white">
                    {email}
                  </a>
                  <a href={`tel:${phone?.replace(/\s/g, "")}`} className="link-underline block transition-colors hover:text-white">
                    {phone}
                  </a>
                </div>
              </div>
            </StaggerItem>

            {linkGroups.map((group: { groupTitle: string; links?: { label: string; href?: string }[] }) => (
              <StaggerItem key={group.groupTitle} y={20}>
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">
                    {group.groupTitle}
                  </h3>
                  <ul className="mt-6 space-y-4">
                    {group.links?.map((link: { label: string; href?: string }) => (
                      <li key={link.label}>
                        <a
                          href={link.href ?? "#"}
                          className="link-underline text-sm text-white/50 transition-colors hover:text-white"
                          {...(link.href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}

            <StaggerItem y={20}>
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">
                  Studio
                </h3>
                <div className="mt-6 space-y-3 text-sm text-white/50">
                  {address?.split("\n").map((line: string, i: number) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </div>
        </StaggerGroup>

        <div className="mt-16 border-t border-white/10 pt-8 text-xs text-white/30">
          {copyrightText}
        </div>
      </div>
    </footer>
  );
}
