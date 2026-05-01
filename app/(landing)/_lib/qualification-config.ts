import type { BusinessType, SpendBracket, Timeline, Role } from "@/app/(landing)/_types/qualification";

export const BOOKING_URL = "https://link.xmaboost.com/widget/booking/xbKo8dQfKzvGRRu4Gy0B";
export const POPUP_SESSION_KEY = "qp_shown";

export type OptionItem<T extends string> = {
  value: T;
  label: string;
  description?: string;
};

export const BUSINESS_TYPE_OPTIONS: OptionItem<BusinessType>[] = [
  { value: "ecommerce", label: "E-commerce", description: "Physical or digital products" },
  { value: "local_service", label: "Local Service", description: "Brick & mortar or service area" },
  { value: "saas", label: "SaaS / App", description: "Software or subscription product" },
  { value: "coach_creator", label: "Coach / Creator", description: "Info products, courses, personal brand" },
  { value: "other", label: "Other", description: "Something else entirely" },
];

export const SPEND_OPTIONS: OptionItem<SpendBracket>[] = [
  { value: "lt_5k", label: "Under $5k / mo", description: "Just getting started with ads" },
  { value: "5k_25k", label: "$5k – $25k / mo", description: "Established spend with room to scale" },
  { value: "25k_100k", label: "$25k – $100k / mo", description: "Serious scaling in progress" },
  { value: "gt_100k", label: "$100k+ / mo", description: "High-volume, performance-driven" },
];

export const TIMELINE_OPTIONS: OptionItem<Timeline>[] = [
  { value: "this_week", label: "This week", description: "Urgent — need creatives ASAP" },
  { value: "this_month", label: "This month", description: "Planning ahead for next campaign" },
  { value: "1_3_months", label: "1 – 3 months", description: "Building out the pipeline" },
  { value: "exploring", label: "Just exploring", description: "Not quite ready yet" },
];

export const ROLE_OPTIONS: OptionItem<Role>[] = [
  { value: "owner", label: "Founder / Owner", description: "I run the business" },
  { value: "marketing_lead", label: "Marketing Lead", description: "I own the ad strategy" },
  { value: "agency", label: "Agency", description: "Managing client accounts" },
  { value: "employee", label: "Employee", description: "Working within a team" },
];

export const POPUP_COPY = {
  intro: {
    eyebrow: "Free 30-min Strategy Call",
    headline: "See exactly how we'd scale your brand with AI video.",
    body: "Answer 4 quick questions so we can prepare a specific plan before we talk.",
    cta: "Book My Strategy Call →",
  },
  steps: [
    { label: "Business", question: "What kind of business are you running?" },
    { label: "Ad Spend", question: "What's your current monthly ad spend?" },
    { label: "Timeline", question: "When are you looking to get started?" },
    { label: "About you", question: "Last step — how do we reach you?" },
  ],
  qualified: {
    eyebrow: "You're all set",
    headline: "Pick a time that works for you.",
    body: "We'll review your answers before the call so we come prepared with a plan specific to your brand.",
  },
  notAFit: {
    eyebrow: "Thanks for sharing",
    headline: "We want to make sure we can actually help you.",
    body: "Based on your answers, we don't think we're the best fit right now — but we'll follow up by email with resources that might be useful.",
  },
};
