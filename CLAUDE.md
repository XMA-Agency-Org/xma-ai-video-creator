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
- **Fluid typography tokens**: `--text-display` (hero), `--text-title-lg` (section headings), `--text-title`, `--text-body-lg` — all using `clamp()`
- **Easing tokens**: `--ease-out-expo`, `--ease-out-quart`, `--ease-out-circ`, `--ease-in-out-quint` in globals.css
- **Duration tokens**: `--duration-fast` (200ms), `--duration-normal` (400ms), `--duration-slow` (700ms)
- **Section rhythm**: Varied padding per section (breathing vs. tight), alternating backgrounds (dark stats, purple-tint WhatWeNeed, gradient testimonials)
- **Marquee**: Viewport-filling text with outline/filled alternation on dark bg, scroll-velocity-responsive via ScrollVelocityRow

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
- Fluid `clamp()` hero typography: `8vw` is too aggressive for 2-col layouts. Cap hero at `clamp(2.75rem, 4vw + 1rem, 5.5rem)`. Reserve `12vw` only for full-width marquees
- Don't duplicate CTA moments: if a CTA banner section exists before the footer, don't add another statement headline inside the footer

## Animation System
- **Library**: Motion (Framer Motion) v12 — `motion/react` imports
- **Primitives**: `AnimateIn` (scroll-triggered fade+slide), `StaggerGroup` + `StaggerItem` (staggered group animations), `TextReveal` (word-by-word reveal), `HeroChoreography` (page load orchestration)
- **Location**: `app/(landing)/_components/animate-in.tsx`, `stagger-group.tsx`, `text-reveal.tsx`, `hero-choreography.tsx`
- **Easing**: Centralized in `app/_lib/motion-config.ts` — `EASE_OUT_EXPO`, `EASE_OUT_QUART`, `EASE_IN_OUT_QUINT`
- **Smooth scroll**: Lenis via `app/_components/smooth-scroll-provider.tsx`, respects prefers-reduced-motion
- **Accessibility**: All animation components respect `useReducedMotion()` — render static fallback when reduced motion preferred
- **Pattern**: Server components wrap content in client animation components; never convert server components to client just for animation
- **SectionHeader**: Client component with built-in staggered reveal, fluid `--text-title-lg` sizing
- **Existing**: ScrollVelocityRow (logo strip, marquee, location strip), AnimatedStats (counter), PortfolioGrid (InView), CSS float keyframes in globals.css
- **Micro-interactions**: MagneticButton (`app/_components/magnetic-button.tsx`), `.link-underline` CSS class for hover underlines

## Dependencies & Tooling
- class-variance-authority: Component variant system
- clsx + tailwind-merge: Class merging via cn()
- motion: Animation library (Framer Motion) v12
- lenis: Smooth scroll library
- axios: HTTP client
- lucide-react: Icons
- @operationnation/sanity-plugin-schema-markup: Schema.org JSON-LD structured data for Sanity documents
- schema-dts: TypeScript types for Schema.org structured data
- @portabletext/react: Portable Text renderer for blog post body content

## Component Registry
- **Primitives**: Button, Link, Input, Badge, Card, SectionContainer
- **Layout**: NavigationHeader (pill-shaped purple), SiteFooter (dark)
- **Sections**: HeroSection, LogoStripSection, StatsSection, HowItWorksSection, WhyXmaSection, PortfolioSection, MarqueeSection, LocationStripSection, WhatWeNeedSection, TestimonialsSection, AgencyServicesSection, FaqSection, CtaBannerSection
- **Helpers**: PortfolioItemCard, FaqAccordionItem, FloatingBadges, HeroVideoGrid, ColoredHeadline, SectionHeader, CtaBannerReveal
- **Animation**: AnimateIn, StaggerGroup, StaggerItem, TextReveal, HeroChoreography
- **Interaction**: MagneticButton, SmoothScrollProvider
- **Legal**: LegalPageShell (shared layout for privacy/terms pages)

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

## Legal Pages
- **Route group**: `(legal)` with shared layout (NavigationHeader + SiteFooter)
- **Routes**: `/privacy` (Privacy Policy), `/terms` (Terms of Service)
- **Components**: `app/(legal)/_components/legal-page-shell.tsx` — shared wrapper with TOC + prose sections
- **Content**: `app/(legal)/_lib/legal-content.tsx` — typed React content with inline links
- **Entity**: XLUXIVE DIGITAL MARKETING LLC (trading as XMA Agency)
- **Jurisdiction**: UAE PDPL, Dubai courts
- **Footer**: Privacy Policy and Terms of Service links added to FALLBACK_LINKS

## Current State
- Landing page repositioned from SaaS self-checkout to full-service agency with sales call funnel
- 13 sections: Hero, Logo Strip, Stats, How It Works, Portfolio, Marquee, Location Strip, Why XMA, What We Need (6 cards), Testimonials, Agency Services (BEYOND THE VIDEO), FAQ, CTA Banner
- All CTAs point to booking a consultation call (placeholder #book anchor — needs real booking URL)
- Logo strip uses placeholder text names (needs real logo assets in /public/logos/)
- Pricing removed entirely — revealed during sales call
- Stripe checkout and webhook routes removed
- Video showreel placeholder in hero (needs real video/images)
