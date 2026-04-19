"use client";

import { RadioCardGroup } from "@/app/_components/primitives";
import { Input } from "@/app/_components/primitives";
import { Button } from "@/app/_components/primitives";
import { ROLE_OPTIONS, POPUP_COPY } from "@/app/(landing)/_lib/qualification-config";
import type { Role, QualificationFormState } from "@/app/(landing)/_types/qualification";
import { StepProgress } from "./step-progress";

type TextContactKey = "firstName" | "lastName" | "email" | "phone" | "website";

type ContactSnapshot = Pick<QualificationFormState, "role" | TextContactKey>;

type ContactErrors = Partial<Record<"role" | TextContactKey, string>>;

type StepContactProps = {
  value: ContactSnapshot;
  onRoleChange: (value: Role) => void;
  onFieldChange: (key: TextContactKey, value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  isSubmitting: boolean;
  errors: ContactErrors;
};

export function StepContact({
  value,
  onRoleChange,
  onFieldChange,
  onSubmit,
  onBack,
  isSubmitting,
  errors,
}: StepContactProps) {
  const step = POPUP_COPY.steps[3];

  return (
    <div className="flex flex-col gap-5 p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <StepProgress current={3} total={4} />
        <button
          onClick={onBack}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          ← Back
        </button>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold uppercase tracking-widest text-primary-400">
          {step.label}
        </span>
        <h3 className="font-heading text-lg font-bold text-foreground">{step.question}</h3>
      </div>

      <RadioCardGroup
        value={value.role}
        onChange={onRoleChange}
        options={ROLE_OPTIONS}
        columns={2}
      />
      {errors.role && <p className="text-xs text-error-500">{errors.role}</p>}

      <div className="flex flex-col gap-3 border-t border-border pt-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1">
            <Input
              placeholder="First name"
              value={value.firstName}
              onChange={(e) => onFieldChange("firstName", e.target.value)}
              aria-label="First name"
            />
            {errors.firstName && <p className="text-xs text-error-500">{errors.firstName}</p>}
          </div>
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Last name"
              value={value.lastName}
              onChange={(e) => onFieldChange("lastName", e.target.value)}
              aria-label="Last name"
            />
            {errors.lastName && <p className="text-xs text-error-500">{errors.lastName}</p>}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="email"
            placeholder="Work email"
            value={value.email}
            onChange={(e) => onFieldChange("email", e.target.value)}
            aria-label="Email"
          />
          {errors.email && <p className="text-xs text-error-500">{errors.email}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="tel"
            placeholder="Phone (required)"
            value={value.phone}
            onChange={(e) => onFieldChange("phone", e.target.value)}
            aria-label="Phone"
          />
          {errors.phone && <p className="text-xs text-error-500">{errors.phone}</p>}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="url"
            placeholder="Website"
            value={value.website}
            onChange={(e) => onFieldChange("website", e.target.value)}
            aria-label="Website"
          />
          {errors.website && <p className="text-xs text-error-500">{errors.website}</p>}
        </div>
      </div>

      <Button intent="primary" size="md" fullWidth onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? "Checking…" : "Submit →"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        No spam. Your info is only used to qualify and contact you.
      </p>
    </div>
  );
}
