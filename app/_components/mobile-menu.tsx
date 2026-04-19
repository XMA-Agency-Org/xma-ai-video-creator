"use client";

import { useEffect } from "react";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "motion/react";
import { useQualificationPopup } from "@/app/(landing)/_hooks/use-qualification-popup";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
  links: { label: string; href: string }[];
};

const overlayVariants: Variants = {
  closed: { opacity: 0 },
  open: { opacity: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, transition: { duration: 0.4, delay: 0.3, ease: [0.76, 0, 0.24, 1] } },
};

const menuContainerVariants: Variants = {
  closed: {},
  open: {
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const linkVariants: Variants = {
  closed: { y: 80, opacity: 0, rotateX: -15 },
  open: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    y: -40,
    opacity: 0,
    transition: { duration: 0.3, ease: [0.76, 0, 0.24, 1] },
  },
};

const ctaVariants: Variants = {
  closed: { y: 40, opacity: 0, scale: 0.9 },
  open: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, delay: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    y: 20,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const footerVariants: Variants = {
  closed: { opacity: 0, y: 20 },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

export function MobileMenu({ open, onClose, links }: MobileMenuProps) {
  const { open: openQualification } = useQualificationPopup();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.div
          className="fixed inset-0 z-40 flex flex-col bg-primary-600 md:hidden"
          variants={overlayVariants}
          initial="closed"
          animate="open"
          exit="exit"
        >
          <div className="absolute inset-0 overflow-clip">
            <motion.div
              className="absolute -top-[40%] -right-[30%] h-[80vh] w-[80vh] rounded-full bg-primary-400/20"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.div
              className="absolute -bottom-[20%] -left-[20%] h-[50vh] w-[50vh] rounded-full bg-accent-light/10"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>

          <div className="relative flex flex-1 flex-col justify-center px-8">
            <motion.nav
              className="flex flex-col gap-2"
              variants={menuContainerVariants}
              initial="closed"
              animate="open"
              exit="exit"
            >
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  variants={linkVariants}
                  style={{ perspective: 600 }}
                >
                  <motion.a
                    href={link.href}
                    className="group flex items-center gap-4 rounded-2xl px-4 py-4 font-heading text-[clamp(2rem,8vw,3.5rem)] font-black leading-none tracking-tight text-white"
                    onClick={onClose}
                    whileHover={{ x: 16 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <span className="inline-block w-8 text-right font-body text-sm font-normal text-white/30">
                      0{i + 1}
                    </span>
                    <span className="relative">
                      {link.label}
                      <motion.span
                        className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-accent-light"
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </span>
                  </motion.a>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div className="mt-10 px-4" variants={ctaVariants} initial="closed" animate="open" exit="exit">
              <button
                className="flex w-full items-center justify-center rounded-full bg-white px-8 py-5 font-heading text-lg font-bold text-primary-600 transition-colors hover:bg-accent-light hover:text-primary-800 cursor-pointer"
                onClick={() => {
                  onClose();
                  setTimeout(() => openQualification("mobile_menu"), 300);
                }}
              >
                BOOK A CALL
              </button>
            </motion.div>
          </div>

          <motion.div
            className="relative px-12 pb-10 text-sm text-white/40"
            variants={footerVariants}
            initial="closed"
            animate="open"
            exit="exit"
          >
            <div className="flex items-center justify-between border-t border-white/10 pt-6">
              <a href="mailto:admin@xmaagency.com" className="transition-colors hover:text-white/70">admin@xmaagency.com</a>
              <span>Dubai, UAE</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
