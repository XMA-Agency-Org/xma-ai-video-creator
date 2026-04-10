# Project: XMA AI Video Creator

## Overview
- **Type**: Next.js landing page with sales call funnel
- **Stack**: Next.js 16.2.2, React 19, Tailwind CSS v4, TypeScript
- **Package Manager**: bun
- **Started**: 2026-04-08

## Architecture Decisions
- **Route groups**: `(landing)` route group for the main landing page with co-located components, types, and content
- **Locality of behavior**: Feature-specific code lives in `_components`, `_lib`, `_types` within each route
- **Content separation**: All placeholder text in `(landing)/_lib/landing-content.ts` for easy replacement or CMS migration
- **Sales call funnel**: No self-checkout. All CTAs point to booking a consultation call. Pricing revealed on call.
- **No dark mode**: Light-only warm cream background

## Preferences & Rules
- oklch colors only (no hex, no rgb)
- Tailwind v4 @theme design system with semantic tokens
- CVA (class-variance-authority) for all primitive component variants
- Manrope for headings, DM Sans for body text
- No ambient glow decorations
- No overflow-hidden with sticky positioning (mobile menu uses fixed overlay)
- axios for HTTP requests (no fetch)
- No `h-full` on `<html>` element — breaks page scrolling

## Design Direction
- **Inspired by**: creativemilkshake.com
- **Background**: Warm cream/beige (`oklch(0.96 0.02 80)`)
- **Primary**: Vibrant purple (`oklch(0.49 0.27 290)`) across 50-950 scale
- **Accent**: Lime/yellow-green (`oklch(0.85 0.18 120)`) for highlights and badges
- **Style**: Bold uppercase headings, pill-shaped nav, floating stat badges, bento-grid cards, marquee text ribbons, asymmetric hero layout
- **Cards on cream bg**: Use `bg-foreground` (dark) or `bg-primary-500` for high contrast — never `bg-white` on cream

## Patterns & Conventions
- Primitive components: `app/_components/primitives/` with barrel export
- Section components: `app/(landing)/_components/` named as `*-section.tsx`
- Helper sub-components: co-located with their parent section (e.g. `pricing-card.tsx`)
- Client components marked with `"use client"` only where needed (checkout button, FAQ accordion, nav)
- `cn()` utility from `app/_lib/class-merge.ts` for all className merging

## Learnings & Corrections
- `h-full` on `<html>` element prevents page scrolling — body overflow is clipped to viewport height
- `bg-white` cards on warm cream background are invisible — use dark/purple backgrounds or strong borders with shadow
- `scroll-behavior: smooth` on html can interfere with programmatic scroll and anchor navigation

## Dependencies & Tooling
- class-variance-authority: Component variant system
- clsx + tailwind-merge: Class merging via cn()
- axios: HTTP client
- lucide-react: Icons
- @operationnation/sanity-plugin-schema-markup: Schema.org JSON-LD structured data for Sanity documents
- schema-dts: TypeScript types for Schema.org structured data
- @portabletext/react: Portable Text renderer for blog post body content

## Component Registry
- **Primitives**: Button, Link, Input, Badge, Card, SectionContainer
- **Layout**: NavigationHeader (pill-shaped purple), SiteFooter (dark)
- **Sections**: HeroSection, LogoStripSection, StatsSection, HowItWorksSection, WhyXmaSection, PortfolioSection, MarqueeSection, LocationStripSection, WhatWeNeedSection, TestimonialsSection, AgencyServicesSection, FaqSection, CtaBannerSection
- **Helpers**: PortfolioItemCard, FaqAccordionItem, FloatingBadges, HeroVideoGrid, ColoredHeadline, SectionHeader

## API & Data Layer
- `GET/PATCH /api/categorize` — Video manifest management
- Env vars: `NEXT_PUBLIC_BASE_URL`

## Sanity Schema Registry
- **Objects**: cta, sectionHeader, statItem, processStep, footerLinkGroup, seo
- **Documents**: portfolioItem, testimonial, pricingPlan, faqItem, blogPost, author, category
- **Singletons**: siteSettings, heroSection, statsSection, howItWorksSection, portfolioSection, marqueeSection, testimonialsSection, pricingSection, faqSection, ctaBannerSection, footerContent, workPage
- **Blog post** has SEO object fields + schemaMarkup (from plugin) in "SEO & Schema Markup" tab group
- **Studio structure**: Blog nested under its own group (Posts, Authors, Categories)

## Blog Architecture
- **Route**: `/blog` (listing) and `/blog/[slug]` (post detail)
- **Layout**: `app/blog/layout.tsx` — NavigationHeader + SiteFooter
- **Components**: `app/blog/_components/` — BlogCard, PostHeader, PostBody, BlogSchemaScript, CategoryFilter
- **Queries**: BLOG_POSTS_QUERY, FEATURED_POSTS_QUERY, BLOG_POST_QUERY, BLOG_CATEGORIES_QUERY, RELATED_POSTS_QUERY
- **SEO**: generateMetadata with coalesce fallbacks from seo object, Open Graph images, noIndex support
- **Schema Markup**: NextSchemaScript from plugin renders JSON-LD on post pages
- **Features**: Category filtering via URL params, featured post hero card, related posts section, author bio card, tag display
- **Navigation**: "Blog" link added to NAV_LINKS in navigation-header.tsx

## Current State
- Landing page repositioned from SaaS self-checkout to full-service agency with sales call funnel
- 13 sections: Hero, Logo Strip, Stats, How It Works, Portfolio, Marquee, Location Strip, Why XMA, What We Need (6 cards), Testimonials, Agency Services (BEYOND THE VIDEO), FAQ, CTA Banner
- All CTAs point to booking a consultation call (placeholder #book anchor — needs real booking URL)
- Logo strip uses placeholder text names (needs real logo assets in /public/logos/)
- Pricing removed entirely — revealed during sales call
- Stripe checkout and webhook routes removed
- Video showreel placeholder in hero (needs real video/images)
