"use client";

import { motion, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/app/_lib/motion-config";

type TextRevealProps = {
  text: string;
  className?: string;
  wordClassName?: string | ((word: string) => string);
  stagger?: number;
  delay?: number;
  duration?: number;
  mode?: "animate" | "inView";
};

export function TextReveal({
  text,
  className,
  wordClassName,
  stagger = 0.08,
  delay = 0,
  duration = 0.7,
  mode = "inView",
}: TextRevealProps) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  if (reduced) {
    return (
      <span className={className}>
        {words.map((word, i) => {
          const wordClass = typeof wordClassName === "function" ? wordClassName(word) : wordClassName;
          return (
            <span key={i} className={wordClass}>
              {word}{" "}
            </span>
          );
        })}
      </span>
    );
  }

  const containerProps =
    mode === "inView"
      ? {
          initial: "hidden" as const,
          whileInView: "visible" as const,
          viewport: { once: true, amount: 0.5 },
        }
      : {
          initial: "hidden" as const,
          animate: "visible" as const,
        };

  return (
    <motion.span
      className={className}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      {...containerProps}
    >
      {words.map((word, i) => {
        const wordClass = typeof wordClassName === "function" ? wordClassName(word) : wordClassName;
        return (
          <span key={i} className="inline-block overflow-clip">
            <motion.span
              className={`inline-block ${wordClass ?? ""}`}
              variants={{
                hidden: { y: "100%", opacity: 0 },
                visible: {
                  y: "0%",
                  opacity: 1,
                  transition: {
                    duration,
                    ease: EASE_OUT_EXPO,
                  },
                },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        );
      })}
    </motion.span>
  );
}
