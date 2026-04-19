import type { QualificationFormState, QualificationResult } from "@/app/(landing)/_types/qualification";

export function scoreQualification(state: QualificationFormState): QualificationResult {
  const reasons: string[] = [];

  if (!state.role || state.role === "employee" || state.role === "agency") {
    reasons.push("role");
  }
  if (!state.timeline || state.timeline === "exploring") {
    reasons.push("timeline");
  }
  if (!state.spend || state.spend === "lt_5k") {
    reasons.push("spend");
  }

  return { qualified: reasons.length === 0, reasons };
}
