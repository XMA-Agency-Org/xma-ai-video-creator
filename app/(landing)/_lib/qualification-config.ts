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
    eyebrow: "Limited spots this month",
    headline: "Get your ad made free — if you qualify.",
    body: "Answer 4 quick questions. If you're a good fit, we'll build your first creative at no cost.",
    cta: "See if I qualify →",
  },
  steps: [
    { label: "Business", question: "What kind of business are you running?" },
    { label: "Ad Spend", question: "What's your current monthly ad spend or revenue?" },
    { label: "Timeline", question: "When do you need new creatives?" },
    { label: "About you", question: "What's your role, and how do we reach you?" },
  ],
  qualified: {
    eyebrow: "You qualify 🎉",
    headline: "Great news — you're a strong fit.",
    body: "Taking you to our booking page now so you can grab a time that works for you.",
  },
  notAFit: {
    eyebrow: "Thanks for sharing",
    headline: "You're not quite the right fit today.",
    body: "That's okay — we'll reach out by email within 48 hours with resources that can help, and we'll revisit when the time is right.",
  },
};
