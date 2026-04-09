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
    <h1 className="font-heading text-5xl font-black leading-[1.05] tracking-tight text-foreground uppercase sm:text-6xl lg:text-7xl">
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
