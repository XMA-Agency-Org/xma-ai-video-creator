"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/app/_lib/class-merge";
import { EASE_OUT_EXPO } from "@/app/_lib/motion-config";
import { posthog } from "@/app/_lib/posthog-client";
import XmaWordmark from "@/public/XMA.png";
import { Logo } from "./logo";
import { MenuToggle } from "./menu-toggle";
import { MobileMenu } from "./mobile-menu";
import { MagneticButton } from "./magnetic-button";
import { useQualificationPopup } from "@/app/(landing)/_hooks/use-qualification-popup";

const NAV_LINKS = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Why XMA", href: "/#why-xma" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

export function NavigationHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();
  const { open: openQualification } = useQualificationPopup();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navContent = (
    <nav
      className={cn(
        "mx-auto flex max-w-[var(--container-max-width)] items-center justify-between rounded-full px-3 py-2 shadow-lg transition-all duration-500",
        scrolled
          ? "bg-primary-500/90 backdrop-blur-xl"
          : "bg-primary-500"
      )}
    >
      <a
        href="/"
        className="flex items-center gap-2 pl-4 font-heading text-lg font-bold tracking-tight text-white"
      >
        <Logo size={32} />
        <Image
          src={XmaWordmark}
          alt="XMA"
          className="h-5 w-auto"
        />
      </a>

      <ul className="hidden items-center gap-1 md:flex">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className="link-underline rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <MagneticButton className="hidden md:inline-flex">
        <button
          onClick={() => {
            posthog.capture("nav_book_call_clicked", { location: "header" });
            openQualification("nav");
          }}
          className="inline-flex rounded-full bg-white px-6 py-2.5 text-sm font-bold text-primary-600 transition-all duration-200 hover:bg-lime-300 hover:text-primary-800 cursor-pointer"
        >
          BOOK A CALL
        </button>
      </MagneticButton>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            posthog.capture("nav_book_call_clicked", { location: "header_mobile" });
            openQualification("nav");
          }}
          className="inline-flex md:hidden rounded-full bg-white px-4 py-2 text-xs font-bold text-primary-600 cursor-pointer"
        >
          BOOK A CALL
        </button>
        <MenuToggle
          open={mobileMenuOpen}
          onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
        />
      </div>
    </nav>
  );

  return (
    <>
      <header className="sticky top-0 z-50 pt-4 pb-2 px-6">
        {reduced ? (
          navContent
        ) : (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6, ease: EASE_OUT_EXPO }}
          >
            {navContent}
          </motion.div>
        )}
      </header>

      <MobileMenu
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
      />
    </>
  );
}
