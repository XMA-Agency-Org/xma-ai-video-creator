"use client";

import { useState } from "react";
import { cn } from "@/app/_lib/class-merge";
import { posthog } from "@/app/_lib/posthog-client";
import { Logo } from "./logo";
import { MenuToggle } from "./menu-toggle";
import { MobileMenu } from "./mobile-menu";

const NAV_LINKS = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why XMA", href: "#why-xma" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "FAQ", href: "#faq" },
];

export function NavigationHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 pt-4 pb-2 px-6">
        <nav className="mx-auto flex max-w-[var(--container-max-width)] items-center justify-between rounded-full bg-primary-500 px-3 py-2 shadow-lg">
          <a
            href="/"
            className="flex items-center gap-2 pl-4 font-heading text-lg font-bold tracking-tight text-white"
          >
            <Logo size={32} />
            XMA
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors duration-200 hover:bg-white/15 hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#book"
            onClick={() => posthog.capture("nav_book_call_clicked", { location: "header" })}
            className="hidden rounded-full bg-white px-6 py-2.5 text-sm font-bold text-primary-600 transition-all duration-200 hover:bg-lime-300 hover:text-primary-800 md:inline-flex"
          >
            BOOK A CALL
          </a>

          <MenuToggle
            open={mobileMenuOpen}
            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </nav>
      </header>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
