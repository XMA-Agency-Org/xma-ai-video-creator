type CategoryPillsMarqueeProps = {
  categories: string[];
};

export function CategoryPillsMarquee({ categories }: CategoryPillsMarqueeProps) {
  const repeated = [...categories, ...categories, ...categories, ...categories];

  return (
    <div className="overflow-clip">
      <div className="flex gap-3 animate-marquee whitespace-nowrap py-2">
        {repeated.map((cat, i) => (
          <span
            key={i}
            className="inline-flex items-center rounded-full border-2 border-primary-200 bg-white px-5 py-2 text-sm font-bold text-primary-600 whitespace-nowrap"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
}
