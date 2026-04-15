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

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
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

export type ComparisonFeature = {
  feature: string;
  xma: string | boolean;
  diy: string | boolean;
};

export type ChecklistItem = {
  id: string;
  title: string;
  description: string;
  iconName: string;
};

export type ClientLogo = {
  id: string;
  name: string;
  src: string;
};

export type AgencyService = {
  id: string;
  title: string;
  description: string;
  iconName: string;
};

export type GuaranteePillar = {
  iconName: string;
  title: string;
  description: string;
};
