import { sanityFetch } from "@/sanity/lib/live";
import { FOOTER_QUERY } from "@/sanity/lib/queries";
import { Logo } from "./logo";

const FALLBACK_LINKS = [
{
    groupTitle: "Company",
    links: [
      { label: "About XMA", href: "https://xma.ae" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "Pricing", href: "#pricing" },
      { label: "Contact", href: "mailto:admin@xmaagency.com" },
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
    <footer className="border-t border-border bg-foreground text-neutral-300">
      <div className="mx-auto max-w-[var(--container-max-width)] px-6 py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-1">
            <span className="flex items-center gap-2 font-heading text-xl font-bold text-white">
              <Logo size={32} />
              {brandName}
            </span>
            <p className="mt-4 text-sm leading-relaxed text-neutral-400">
              {tagline}
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.groupTitle}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-400">
                {group.groupTitle}
              </h3>
              <ul className="space-y-3">
                {group.links?.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href ?? "#"}
                      className="text-sm text-neutral-400 transition-colors hover:text-white"
                      {...(link.href?.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-neutral-400">
              Contact
            </h3>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a href={`mailto:${email}`} className="transition-colors hover:text-white">
                  {email}
                </a>
              </li>
              <li>
                <a href={`tel:${phone?.replace(/\s/g, "")}`} className="transition-colors hover:text-white">
                  {phone}
                </a>
              </li>
              {address?.split("\n").map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-neutral-500">
          {copyrightText}
        </div>
      </div>
    </footer>
  );
}
