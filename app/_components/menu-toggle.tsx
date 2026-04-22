"use client";

type MenuToggleProps = {
  open: boolean;
  onToggle: () => void;
};

export function MenuToggle({ open, onToggle }: MenuToggleProps) {
  return (
    <button
      className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full md:hidden"
      onClick={onToggle}
      aria-label={open ? "Close menu" : "Open menu"}
    >
      <span
        className="block h-[2px] w-5 rounded-full bg-white transition-transform duration-200 origin-center"
        style={{ transform: open ? "rotate(45deg) translateY(7px)" : "none" }}
      />
      <span
        className="block h-[2px] w-5 rounded-full bg-white transition-opacity duration-150"
        style={{ opacity: open ? 0 : 1 }}
      />
      <span
        className="block h-[2px] w-5 rounded-full bg-white transition-transform duration-200 origin-center"
        style={{ transform: open ? "rotate(-45deg) translateY(-7px)" : "none" }}
      />
    </button>
  );
}
