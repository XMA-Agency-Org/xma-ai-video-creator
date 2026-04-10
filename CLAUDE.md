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

## Component Registry
- **Primitives**: Button, Link, Input, Badge, Card, SectionContainer
- **Layout**: NavigationHeader (pill-shaped purple), SiteFooter (dark)
- **Sections**: HeroSection, LogoStripSection, StatsSection, HowItWorksSection, WhyXmaSection, PortfolioSection, MarqueeSection, WhatWeNeedSection, TestimonialsSection, FaqSection, CtaBannerSection
- **Helpers**: StepCard, PortfolioItemCard, TestimonialCard, FaqAccordionItem, FloatingBadges, HeroVideoGrid, ColoredHeadline, SectionHeader

## API & Data Layer
- `GET/PATCH /api/categorize` — Video manifest management
- Env vars: `NEXT_PUBLIC_BASE_URL`

## Current State
- Landing page repositioned from SaaS self-checkout to full-service agency with sales call funnel
- 11 sections: Hero, Logo Strip, Stats, How It Works, Why XMA, Portfolio, Marquee, What We Need, Testimonials, FAQ, CTA Banner
- All CTAs point to booking a consultation call (placeholder #book anchor — needs real booking URL)
- Logo strip uses placeholder text names (needs real logo assets in /public/logos/)
- Pricing removed entirely — revealed during sales call
- Stripe checkout and webhook routes removed
- Video showreel placeholder in hero (needs real video/images)
