import {
  FileText,
  Sparkles,
  Eye,
  Send,
} from "lucide-react";
import type {
  ProcessStep,
  PortfolioItem,
  Testimonial,
  PricingPlan,
  FaqItem,
} from "@/app/(landing)/_types/landing-types";

export const HERO_CONTENT = {
  headline: "AI-Powered Video Creation for Modern Brands",
  subheadline:
    "Get stunning, conversion-ready videos crafted with cutting-edge AI technology. From concept to final cut — delivered in days, not weeks.",
  primaryCta: "View Pricing",
  primaryCtaHref: "#pricing",
  secondaryCta: "Watch Showreel",
  secondaryCtaHref: "#portfolio",
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Share Your Brief",
    description:
      "Tell us about your brand, target audience, and vision. We handle the rest.",
    icon: FileText,
  },
  {
    stepNumber: 2,
    title: "AI Creates Your Video",
    description:
      "Our AI engine generates high-quality video content tailored to your brand identity.",
    icon: Sparkles,
  },
  {
    stepNumber: 3,
    title: "Review & Refine",
    description:
      "Preview your video and request any adjustments until it matches your vision perfectly.",
    icon: Eye,
  },
  {
    stepNumber: 4,
    title: "Receive & Deploy",
    description:
      "Get your polished final video ready for social media, ads, or any platform.",
    icon: Send,
  },
];

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: "pink-drinkware",
    title: "Pink Drinkware",
    category: "Product Ads",
    videoSrc: "https://ruyastudio.my.canva.site/_assets/video/15d0747cd01e85bf11581cb7ba703714.mp4",
  },
  {
    id: "store-product-showcase",
    title: "Store Product Showcase",
    category: "UGC",
    videoSrc: "https://ruyastudio.my.canva.site/_assets/video/932e344e91a9ecf30d7d8bfcb3d35a1f.mp4",
  },
  {
    id: "kayali-perfume",
    title: "Kayali Perfume",
    category: "Fragrance",
    videoSrc: "https://ruyastudio.my.canva.site/_assets/video/db1a94876e5ed903b58d5848c774d72f.mp4",
  },
  {
    id: "vantori-vitamin-c",
    title: "Vantori Vitamin C",
    category: "Food & Beverage",
    videoSrc: "https://ruyastudio.my.canva.site/_assets/video/fa8e67902c10c3a2caf799515bb777fd.mp4",
  },
  {
    id: "shampoo-brand",
    title: "Shampoo Brand",
    category: "Haircare",
    videoSrc: "https://ruyastudio.my.canva.site/_assets/video/66cb8849cb34a43c0fda09c9db05565f.mp4",
  },
  {
    id: "clothing-brand",
    title: "Clothing Brand",
    category: "Fashion & Lifestyle",
    videoSrc: "https://ruyastudio.my.canva.site/_assets/video/c575974a8de5ce1f51ca43223b89f1f4.mp4",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "testimonial-1",
    quote:
      "The AI videos XMA created for our skincare launch outperformed all our previous content. The quality is indistinguishable from traditional production.",
    clientName: "Sarah Chen",
    clientRole: "Marketing Director",
    company: "Lumière Beauty",
  },
  {
    id: "testimonial-2",
    quote:
      "We went from concept to finished video in 3 days. What used to take us weeks and cost five times more. Absolutely game-changing for our brand.",
    clientName: "Omar Al-Rashid",
    clientRole: "Founder & CEO",
    company: "Oud & Essence",
  },
  {
    id: "testimonial-3",
    quote:
      "The ROI speaks for itself — our conversion rate on social ads jumped 40% after switching to XMA's AI-generated video content.",
    clientName: "Priya Mehta",
    clientRole: "Head of Growth",
    company: "Drift Commerce",
  },
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 499,
    description: "Perfect for testing AI video for your brand",
    features: [
      "1 AI-generated video",
      "Up to 30 seconds",
      "1 revision round",
      "HD quality (1080p)",
      "Delivered in 5 business days",
      "Social media optimized",
    ],
    highlighted: false,
    stripePriceId: "price_starter_placeholder",
  },
  {
    id: "pro",
    name: "Pro",
    price: 999,
    description: "Best value for growing brands",
    features: [
      "3 AI-generated videos",
      "Up to 60 seconds each",
      "2 revision rounds",
      "4K quality",
      "Delivered in 7 business days",
      "Multi-platform formats",
      "Brand kit integration",
      "Priority support",
    ],
    highlighted: true,
    stripePriceId: "price_pro_placeholder",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 2499,
    description: "Full-scale content production",
    features: [
      "10 AI-generated videos",
      "Up to 90 seconds each",
      "Unlimited revisions",
      "4K quality",
      "Delivered in 14 business days",
      "All platform formats",
      "Custom brand kit",
      "Dedicated account manager",
      "Usage analytics dashboard",
    ],
    highlighted: false,
    stripePriceId: "price_enterprise_placeholder",
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What kind of videos can you create with AI?",
    answer:
      "We create product showcases, brand stories, social media ads, promotional reels, explainer videos, and lifestyle content. Our AI can adapt to virtually any style — from cinematic to minimalist, editorial to UGC-style.",
  },
  {
    id: "faq-2",
    question: "How does the AI video creation process work?",
    answer:
      "You start by sharing a brief about your brand, goals, and style preferences. Our AI engine then generates video content based on your requirements. You review the output, request refinements if needed, and receive the final polished video ready for deployment.",
  },
  {
    id: "faq-3",
    question: "How long does it take to get my video?",
    answer:
      "Turnaround depends on your package: Starter videos are delivered in 5 business days, Pro in 7 business days, and Enterprise projects in 14 business days. Rush delivery is available upon request.",
  },
  {
    id: "faq-4",
    question: "Can I request revisions?",
    answer:
      "Absolutely. Starter includes 1 revision round, Pro includes 2 rounds, and Enterprise comes with unlimited revisions. We work with you until the video perfectly matches your vision.",
  },
  {
    id: "faq-5",
    question: "What formats do I receive?",
    answer:
      "All videos are delivered in high-quality MP4 format. Pro and Enterprise packages include multi-platform formatting — optimized for Instagram Reels, TikTok, YouTube Shorts, Facebook Ads, and standard 16:9 landscape.",
  },
  {
    id: "faq-6",
    question: "Do you need product photos or footage from me?",
    answer:
      "Not necessarily. Our AI can generate visuals from scratch. However, sharing product photos, brand assets, or existing footage helps us create more accurate and on-brand content.",
  },
  {
    id: "faq-7",
    question: "Is the content unique to my brand?",
    answer:
      "Yes, 100%. Every video is created exclusively for your brand and will not be reused or resold. You receive full commercial usage rights for all delivered content.",
  },
];
