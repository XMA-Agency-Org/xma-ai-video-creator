import type { SchemaTypeDefinition } from "sanity";

import { cta } from "./objects/cta";
import { blogCtaBlock } from "./objects/blog-cta-block";
import { sectionHeader } from "./objects/section-header";
import { statItem } from "./objects/stat-item";
import { processStep } from "./objects/process-step";
import { footerLinkGroup } from "./objects/footer-link-group";
import { seo } from "./objects/seo";

import { portfolioItem } from "./documents/portfolio-item";
import { testimonial } from "./documents/testimonial";
import { faqItem } from "./documents/faq-item";
import { blogPost } from "./documents/blog-post";
import { author } from "./documents/author";
import { category } from "./documents/category";

import { siteSettings } from "./singletons/site-settings";
import { heroSection } from "./singletons/hero-section";
import { statsSection } from "./singletons/stats-section";
import { howItWorksSection } from "./singletons/how-it-works-section";
import { portfolioSection } from "./singletons/portfolio-section";
import { marqueeSection } from "./singletons/marquee-section";
import { testimonialsSection } from "./singletons/testimonials-section";
import { faqSection } from "./singletons/faq-section";
import { ctaBannerSection } from "./singletons/cta-banner-section";
import { footerContent } from "./singletons/footer-content";
import { workPage } from "./singletons/work-page";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    cta,
    blogCtaBlock,
    sectionHeader,
    statItem,
    processStep,
    footerLinkGroup,
    seo,

    portfolioItem,
    testimonial,
    faqItem,
    blogPost,
    author,
    category,

    siteSettings,
    heroSection,
    statsSection,
    howItWorksSection,
    portfolioSection,
    marqueeSection,
    testimonialsSection,
    faqSection,
    ctaBannerSection,
    footerContent,
    workPage,
  ],
};

export const SINGLETON_TYPES = new Set([
  "siteSettings",
  "heroSection",
  "statsSection",
  "howItWorksSection",
  "portfolioSection",
  "marqueeSection",
  "testimonialsSection",
  "faqSection",
  "ctaBannerSection",
  "footerContent",
  "workPage",
]);
