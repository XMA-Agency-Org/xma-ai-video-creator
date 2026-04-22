const HIGHLIGHTED_WORDS = ["AI-Powered", "Modern"];

type ColoredHeadlineProps = {
  text: string;
  highlightedWords?: string[];
};

export function ColoredHeadline({
  text,
  highlightedWords = HIGHLIGHTED_WORDS,
}: ColoredHeadlineProps) {
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
