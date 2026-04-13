import {
  Phone,
  Search,
  Sparkles,
  Send,
  Palette,
  Camera,
  SlidersHorizontal,
  BookOpen,
  Users,
  Target,
  PenLine,
  Clapperboard,
  Video,
  CheckCircle,
  Rocket,
} from "lucide-react";
import type {
  ProcessStep,
  PortfolioItem,
  Testimonial,
  FaqItem,
  ComparisonFeature,
  ChecklistItem,
  ClientLogo,
  PricingPlan,
  AgencyService,
} from "@/app/(landing)/_types/landing-types";

export const HERO_CONTENT = {
  headline: "A Full Creative Team Powered by AI",
  subheadline:
    "Great video ads shouldn't require a three-week timeline and a five-figure production budget. We combine a dedicated creative team with AI to give your brand the same quality but faster, leaner, and built around your actual goals.",
  primaryCta: "Book a Free Consultation",
  primaryCtaHref: "#book",
  secondaryCta: "See Our Work",
  secondaryCtaHref: "#portfolio",
};

export const STATS = [
  { value: "10x", label: "Faster Than DIY", accent: false },
  { value: "9+", label: "Creative Experts on Your Team", accent: true },
  { value: "30%", label: "Lower Cost Than Agencies", accent: false },
  { value: "500+", label: "Videos Delivered", accent: true },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Strategy Call",
    description:
      "We learn about your brand, goals, target audience, and creative direction on a dedicated call.",
    icon: Phone,
  },
  {
    stepNumber: 2,
    title: "Brand Research",
    description:
      "Our team researches your market, studies competitors, and maps out what makes your brand stand out.",
    icon: Search,
  },
  {
    stepNumber: 3,
    title: "Scriptwriting",
    description:
      "Our copywriters craft scripts tailored to your audience, message, and platform.",
    icon: PenLine,
  },
  {
    stepNumber: 4,
    title: "AI Production",
    description:
      "Our AI engine generates high-quality video content matched to your brand style and direction.",
    icon: Clapperboard,
  },
  {
    stepNumber: 5,
    title: "Editing and Polish",
    description:
      "Our editors refine every frame with professional sound design, effects, and color grading.",
    icon: Video,
  },
  {
    stepNumber: 6,
    title: "Review and Refine",
    description:
      "You review the videos, request any refinements, and we polish until it's perfect.",
    icon: CheckCircle,
  },
  {
    stepNumber: 7,
    title: "Campaign Launch",
    description:
      "Receive final files optimized for every platform, ready to launch and drive results.",
    icon: Rocket,
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
      "What impressed us most was the team behind the AI. They took the time to understand our brand voice and delivered videos that felt completely on-brand from the very first draft.",
    clientName: "Sarah Chen",
    clientRole: "Marketing Director",
    company: "Lumiere Beauty",
  },
  {
    id: "testimonial-2",
    quote:
      "We went from concept to finished video in 3 days. The strategy call and scripting process made all the difference — it felt like working with a full agency, not a software tool.",
    clientName: "Omar Al-Rashid",
    clientRole: "Founder & CEO",
    company: "Oud & Essence",
  },
  {
    id: "testimonial-3",
    quote:
      "Having a dedicated team handle everything from research to final edits saved us countless hours. The quality of the scripts and sound design blew us away.",
    clientName: "Priya Mehta",
    clientRole: "Head of Growth",
    company: "Drift Commerce",
  },
];

export const COMPARISON_FEATURES: ComparisonFeature[] = [
  { feature: "Dedicated Strategy Call", xma: true, diy: false },
  { feature: "Market & Competitor Research", xma: true, diy: false },
  { feature: "Professional Scriptwriting", xma: true, diy: false },
  { feature: "AI Video Generation", xma: true, diy: true },
  { feature: "Professional Editing & Sound Design", xma: true, diy: false },
  { feature: "Paid Media Strategy", xma: true, diy: false },
  { feature: "Multi-format Delivery", xma: true, diy: "Limited" },
  { feature: "Dedicated Account Manager", xma: true, diy: false },
  { feature: "Revision Rounds Included", xma: true, diy: false },
];

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  {
    id: "brand-assets",
    title: "Brand Assets",
    description: "Your logo, brand colors, and any existing visual identity files.",
    iconName: "Palette",
  },
  {
    id: "product-photos",
    title: "Product Photos",
    description: "High-quality images of your products from multiple angles. No photos yet? We can shoot them for you.",
    iconName: "Camera",
  },
  {
    id: "style-preferences",
    title: "Style Preferences",
    description: "Reference videos, mood boards, or examples of styles you love.",
    iconName: "SlidersHorizontal",
  },
  {
    id: "brand-guidelines",
    title: "Brand Guidelines",
    description: "Tone of voice, messaging do's and don'ts, fonts, and any brand book you have.",
    iconName: "BookOpen",
  },
  {
    id: "target-audience",
    title: "Target Audience",
    description: "Who are your customers? Their age, interests, platforms, and what makes them buy.",
    iconName: "Users",
  },
  {
    id: "campaign-goals",
    title: "Campaign Goals",
    description: "What does success look like for you? Whether it's driving sales, generating leads, or building brand awareness. Your goal shapes every creative decision we make.",
    iconName: "Target",
  },
];

export const CHECKLIST_ICON_MAP: Record<string, typeof Palette> = {
  Palette,
  Camera,
  SlidersHorizontal,
  BookOpen,
  Users,
  Target,
};

export const CLIENT_LOGOS: ClientLogo[] = [
  { id: "baggagetaxi", name: "BaggageTaxi", src: "/logos/baggagetaxi.webp" },
  { id: "packman", name: "Packman", src: "/logos/packman_Logo.png" },
  { id: "nbf", name: "NBF", src: "/logos/nbf-logo.png" },
  { id: "dxtreme", name: "DXtreme", src: "/logos/DXtreme.png" },
  { id: "dreamdrives", name: "Dream Drives", src: "/logos/dreamdrives-logo.svg" },
  { id: "rossovivo", name: "Rosso Vivo", src: "/logos/rossovivo.png" },
  { id: "pixishoot", name: "Pixishoot", src: "/logos/pixishoot.avif" },
  { id: "tick", name: "Tick", src: "/logos/Tick.webp" },
  { id: "4matic", name: "4MAtic", src: "/logos/4MAticlogo.png" },
  { id: "asus", name: "ASUS", src: "/logos/ASUS-logo.png" },
];

export const CTA_BANNER_CONTENT = {
  headline: "Ready to Scale Your Video Content?",
  description: "Book a free strategy call and see how our team can transform your content pipeline.",
  ctaLabel: "Book Your Free Strategy Call",
  ctaHref: "#book",
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What kind of videos can you create with AI?",
    answer:
      "We create product showcases, brand stories, social media content, promotional reels, explainer videos, and lifestyle content. Our AI can adapt to virtually any style — from cinematic to minimalist, editorial to UGC-style.",
  },
  {
    id: "faq-2",
    question: "How does the AI video creation process work?",
    answer:
      "It starts with a strategy call where we learn about your brand, goals, and audience. Our copywriting team then researches your market and writes scripts. From there, our AI engine generates video content while our editors polish every frame with professional sound design and effects. You review, we refine, and deliver.",
  },
  {
    id: "faq-3",
    question: "How long does it take to get my videos?",
    answer:
      "Most projects are delivered within 5 to 10 business days, depending on scope and complexity. We'll give you a clear timeline during your strategy call. Rush delivery is available upon request.",
  },
  {
    id: "faq-4",
    question: "Can I request revisions?",
    answer:
      "Absolutely. Every project includes revision rounds. We work with you until the videos perfectly match your vision — no extra charges for reasonable refinements.",
  },
  {
    id: "faq-5",
    question: "What formats do I receive?",
    answer:
      "All videos are delivered in high-quality MP4 format with multi-platform formatting — optimized for Instagram Reels, TikTok, YouTube Shorts, Facebook Ads, and standard 16:9 landscape.",
  },
  {
    id: "faq-6",
    question: "What do I need to provide to get started?",
    answer:
      "We'll need your brand assets (logo, colors), product photos, style preferences or references, brand guidelines, and some details about your target audience. Don't have product photos? Our content team can shoot them for you at an additional charge.",
  },
  {
    id: "faq-7",
    question: "Is the content unique to my brand?",
    answer:
      "Yes, 100%. Every video is created exclusively for your brand and will not be reused or resold. You receive full commercial usage rights for all delivered content.",
  },
  {
    id: "faq-8",
    question: "How do I get started?",
    answer:
      "Book a free strategy call with our team. We'll discuss your goals, walk you through our process, and put together a plan tailored to your brand. No commitment required.",
  },
];

export const AGENCY_SERVICES_CONTENT = {
  subtitle: "SERVICES",
  headline: "The Ad Is Just the Beginning.",
  subheadline:
    "A great video in front of the wrong audience, on a weak landing page, with no follow-up system won't convert. Before we brief a single frame, we look at your whole picture.",
  body: "XMA is a full-service digital agency. We built this AI video service because our clients needed faster, smarter creatives. But we've always done more and if your brand needs it, we're here to help.",
  closingLine:
    "Most clients come to us for video. They stay because we can handle everything the video depends on.",
  ctaLabel: "Explore Full Agency Services",
  ctaHref: "https://xma.ae",
};

export const AGENCY_SERVICES: AgencyService[] = [
  {
    id: "paid-advertising",
    title: "Paid Advertising",
    description:
      "Meta, TikTok, Google — we build and manage campaigns that put your videos in front of the right people and turn views into revenue.",
    iconName: "Megaphone",
  },
  {
    id: "social-media-management",
    title: "Social Media Management",
    description:
      "Strategy, content, and scheduling. Your brand stays active and consistent without you lifting a finger.",
    iconName: "Smartphone",
  },
  {
    id: "branding-identity",
    title: "Branding & Identity",
    description:
      "Logo, visual identity, tone of voice, and brand guidelines for the foundation that makes every ad land harder.",
    iconName: "Paintbrush",
  },
  {
    id: "web-development",
    title: "Web Development",
    description:
      "High-converting landing pages and full websites. Because traffic without a destination is wasted budget.",
    iconName: "Monitor",
  },
  {
    id: "crm-lead-generation",
    title: "CRM & Lead Generation",
    description:
      "Pipelines, automations, and workflows that turn your ad clicks into customers, and your customers into repeat buyers.",
    iconName: "Settings",
  },
  {
    id: "brand-funnel-audit",
    title: "Brand & Funnel Audit",
    description:
      "We review your current brand, audience targeting, presence and conversion funnel before anything goes live. No guesswork, just a clear and honest solution.",
    iconName: "SearchCheck",
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
