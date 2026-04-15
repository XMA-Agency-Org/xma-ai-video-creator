"use client";

import { TextReveal } from "./text-reveal";

const HIGHLIGHTED_WORDS = ["AI-Powered", "Modern"];

type ColoredHeadlineProps = {
  text: string;
  highlightedWords?: string[];
  animate?: boolean;
};

export function ColoredHeadline({
  text,
  highlightedWords = HIGHLIGHTED_WORDS,
  animate = true,
}: ColoredHeadlineProps) {
  if (!animate) {
    return (
      <h1 className="font-heading text-[length:var(--text-display)] leading-[0.95] font-black tracking-[-0.04em] text-foreground uppercase">
        {text.split(" ").map((word: string, i: number) => (
          <span
            key={i}
            className={highlightedWords.includes(word) ? "text-primary-500" : ""}
          >
            {word}{" "}
          </span>
        ))}
      </h1>
    );
  }

  return (
    <h1 className="font-heading text-[length:var(--text-display)] leading-[0.95] font-black tracking-[-0.04em] text-foreground uppercase">
      <TextReveal
        text={text}
        mode="animate"
        delay={0.3}
        stagger={0.08}
        duration={0.8}
        wordClassName={(word) =>
          highlightedWords.includes(word) ? "text-primary-500" : ""
        }
      />
    </h1>
  );
}
