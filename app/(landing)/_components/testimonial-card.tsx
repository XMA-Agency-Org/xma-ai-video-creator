import type { Testimonial } from "@/app/(landing)/_types/landing-types";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <div className="flex flex-col rounded-[var(--radius-2xl)] bg-white p-7">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 font-heading text-sm font-black text-primary-700">
          {testimonial.clientName.charAt(0)}
        </div>
        <div>
          <p className="font-heading text-sm font-bold text-foreground">
            {testimonial.clientName}
          </p>
          <p className="text-xs font-medium text-primary-500">
            @{testimonial.company.toLowerCase().replace(/\s+/g, "")}
          </p>
        </div>
      </div>

      <blockquote className="flex-1 text-sm leading-relaxed text-neutral-600">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <p className="mt-4 text-xs font-medium text-muted-foreground">
        {testimonial.clientRole}, {testimonial.company}
      </p>
    </div>
  );
}
