"use client";

import { StaggerGroup, StaggerItem } from "@/app/(landing)/_components/stagger-group";

const steps = [
  {
    number: "01",
    title: "Check Your Email",
    description:
      "You'll receive a calendar invite with the call details and a link to join. Add it to your calendar so you don't miss it.",
  },
  {
    number: "02",
    title: "Think About Your Goals",
    description:
      "What does your dream content pipeline look like? Jot down your biggest content challenges so we can hit the ground running.",
  },
  {
    number: "03",
    title: "Gather Examples",
    description:
      "Have any videos you admire or brand assets ready to share? The more context we have, the better our recommendations will be.",
  },
];

export function NextSteps() {
  return (
    <div className="flex flex-col gap-8">
      <h2 className="font-heading text-[var(--text-title)] font-bold uppercase tracking-tight text-center">
        What Happens Next
      </h2>

      <StaggerGroup className="grid gap-6 md:grid-cols-3" stagger={0.12}>
        {steps.map((step) => (
          <StaggerItem key={step.number}>
            <div className="flex flex-col gap-3 rounded-[var(--radius-xl)] bg-foreground p-6 md:p-8 h-full">
              <span className="font-heading text-sm font-bold text-primary-400">
                {step.number}
              </span>
              <h3 className="font-heading text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-neutral-400">
                {step.description}
              </p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}
