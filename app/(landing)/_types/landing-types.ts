import type { LucideIcon } from "lucide-react";

export type ProcessStep = {
  stepNumber: number;
  title: string;
  description: string;
  icon: LucideIcon;
};

export type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  videoSrc: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  clientName: string;
  clientRole: string;
  company: string;
};

export type PricingPlan = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  highlighted: boolean;
  stripePriceId: string;
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};
