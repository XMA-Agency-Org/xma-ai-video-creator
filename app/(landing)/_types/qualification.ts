export type BusinessType = "ecommerce" | "local_service" | "saas" | "coach_creator" | "other";
export type SpendBracket = "lt_5k" | "5k_25k" | "25k_100k" | "gt_100k";
export type Timeline = "this_week" | "this_month" | "1_3_months" | "exploring";
export type Role = "owner" | "marketing_lead" | "agency" | "employee";

export interface QualificationFormState {
  businessType: BusinessType | null;
  spend: SpendBracket | null;
  timeline: Timeline | null;
  role: Role | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  website: string;
}

export interface QualificationResult {
  qualified: boolean;
  reasons: string[];
}

export interface GhlLeadRequest extends QualificationFormState {
  sourceUrl: string;
  utm: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
}

export interface GhlLeadResponse {
  ok: boolean;
  qualified: boolean;
  redirectUrl: string | null;
  eventId?: string;
}

export type PopupStep =
  | "intro"
  | "business-type"
  | "spend"
  | "timeline"
  | "contact"
  | "qualified"
  | "not-a-fit";

export type { PopupTriggerSource } from "@/app/_lib/qualification-popup-context";
