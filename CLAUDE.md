# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
bun dev          # Start dev server (Next.js 16)
bun run build    # Production build
bun run lint     # ESLint
bun start        # Production server
```

Always use `bun`, never `npm`.

## Overview

Next.js 16 landing page for XMA Agency's AI video creation service. Sales-call funnel — all CTAs point to booking a consultation, no self-checkout. Sanity CMS backs editable sections with hardcoded fallbacks. Light-only theme on warm cream background.

## Architecture

### Route Groups & Locality

```
app/
├── (landing)/         # Main landing page — 13 sections
│   ├── _components/   # Section components (*-section.tsx) + helpers
│   ├── _lib/          # landing-content.ts (all fallback copy), icon-map.ts
│   └── _types/
├── (legal)/           # /privacy, /terms — shared LegalPageShell layout
├── blog/              # /blog (listing), /blog/[slug] (detail)
├── portfolio/         # /portfolio — filterable grid
├── studio/[[...tool]] # Sanity Studio at /studio
├── api/               # meta-capi, categorize (Sanity write)
├── _components/       # Global: primitives/, posthog-provider, smooth-scroll-provider
└── _lib/              # cn(), motion-config, api-client, posthog
```

Feature code is co-located with routes via `_components`, `_lib`, `_types`. Only truly shared code lives in root-level `app/_components/` and `app/_lib/`.

### Primitives & CVA

All base components (`app/_components/primitives/`) use `class-variance-authority` with variants and export both the component and its `*Variants` function. Barrel-exported from `primitives/index.ts`. Use `cn()` from `app/_lib/class-merge.ts` for all className merging.

### Sanity CMS

- **Config**: `sanity.config.ts` — studio at `/studio`, project `fv5mbe60`, dataset `production`
- **Clients**: Read client (`sanity/lib/client.ts`) with CDN + stega, write client (`sanity/lib/write-client.ts`) for mutations
- **Live queries**: `sanityFetch()` from `sanity/lib/live.ts` — used in server components
- **Queries**: All GROQ in `sanity/lib/queries.ts`
- **Schemas**: `sanity/schemas/` — documents, objects, singletons
- **Pattern**: Every landing section fetches from Sanity with `?? fallback` from `landing-content.ts`

### Animation System

- **Library**: Motion (Framer Motion) v12 — import from `motion/react`
- **Primitives**: `AnimateIn` (scroll fade+slide), `StaggerGroup`/`StaggerItem` (staggered reveals), `TextReveal` (word-by-word), `HeroChoreography` (page load)
- **Easing constants**: `app/_lib/motion-config.ts` — `EASE_OUT_EXPO`, `EASE_OUT_QUART`, `EASE_IN_OUT_QUINT`
- **Smooth scroll**: Lenis via `SmoothScrollProvider`
- **Rule**: Server components wrap content in client animation components — never convert a server component to client just for animation. All animation components respect `useReducedMotion()`.

### Meta Conversion API (CAPI)

- **Server utility**: `app/_lib/meta-capi.ts` — `sendMetaEvent()`, `generateEventId()`, `hashUserData()`
- **Client helper**: `app/_lib/meta-pixel-client.ts` — `trackMetaEvent()` fires both pixel + CAPI with shared eventId for deduplication
- **API route**: `app/api/meta-capi/route.ts` — receives client events, extracts IP/user-agent/cookies, forwards to CAPI
- **Events tracked**: PageView (per-navigation via PostHogProvider), Lead (server-side on /thank-you)
- **Deduplication**: Client pixel and server CAPI share the same `eventId` so Meta deduplicates
- **Test mode**: Sends `test_event_code: "TEST_EVENT"` in non-production environments

### PostHog Analytics

- Client: `posthog-js` initialized in `PostHogProvider`, auto-captures pageviews
- Server: `posthog-node` singleton in `app/_lib/posthog-server.ts`
- Proxied through Next.js rewrites (`/ingest/*` → `eu.i.posthog.com`)

### Qualification Popup

Multi-step lead qualification form that intercepts all "Book a Call" CTAs.

**Flow**: intro → business-type → spend → timeline → contact → qualified | not-a-fit

**Trigger points**:
- Scroll past hero (once per session via `sessionStorage` key `qp_shown`) — `ScrollTrigger` component after `<HeroSection />`
- Every "Book a Call" CTA: nav, mobile menu, hero, cta-banner, guarantee section, what-we-need section

**Qualification logic** (`app/(landing)/_lib/qualification-scorer.ts`):
- Disqualify if `role ∈ {employee, agency}` OR `timeline === "exploring"` OR `spend === "lt_5k"`
- Qualified → redirect to booking widget; NOT-a-fit → polite closing screen (stays in popup)

**Key files**:
- `app/(landing)/_lib/qualification-config.ts` — all copy, option labels, `BOOKING_URL`
- `app/(landing)/_lib/qualification-scorer.ts` — scoring logic (edit thresholds here)
- `app/(landing)/_components/qualification-popup/` — all step components + provider
- `app/(landing)/_hooks/use-qualification-popup.ts` — `useQualificationPopup()` hook
- `app/api/ghl-lead/route.ts` — POST handler: score → GHL webhook → Meta CAPI (qualified only)

**Provider location**: `app/layout.tsx` (root) — must be here because NavigationHeader/MobileMenu appear in blog/portfolio layouts too, not just (landing).

**Meta CAPI**: `Lead` event fires server-side only when `qualified === true`. Client pixel dedup via shared `eventId` from `step-qualified.tsx`.

**GHL webhook**: `GHL_WEBHOOK_URL` env var — 4s timeout, failure is logged but doesn't block the user response. Without this var, leads are scored/redirected correctly but NOT stored in GHL CRM.

## Preferences & Rules

- **Colors**: oklch only — no hex, no rgb, ever
- **Tailwind v4**: `@theme` design system in `globals.css` with semantic tokens (primary, neutral, success, warning, error) across 50-950 scale
- **Typography**: Manrope headings (`--font-heading`), DM Sans body (`--font-body`). Fluid sizes via `clamp()` tokens (`--text-display`, `--text-title-lg`, `--text-title`, `--text-body-lg`)
- **Cards on cream bg**: Use `bg-foreground` (dark) or `bg-primary-500` — never `bg-white` on the cream background
- **No dark mode**, no ambient glow decorations
- **No overflow-hidden with sticky positioning**
- **HTTP**: axios, not fetch
- **Images**: Always `<Image />` from `next/image`, never `<img>`
- **Imports**: `@/*` path alias maps to repo root

## Learnings & Corrections

- `h-full` on `<html>` breaks page scrolling — body overflow clips to viewport
- `bg-white` cards on warm cream bg are invisible — need dark/purple backgrounds or strong borders with shadow
- `scroll-behavior: smooth` on html interferes with programmatic scroll
- Fluid hero `clamp()`: `8vw` too aggressive for 2-col layouts — cap at `clamp(2.75rem, 4vw + 1rem, 5.5rem)`, reserve `12vw` for full-width marquees only
- Don't duplicate CTA moments — if CtaBannerSection exists before footer, don't add another in the footer

## Environment Variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
SANITY_API_READ_TOKEN, SANITY_API_WRITE_TOKEN
NEXT_PUBLIC_POSTHOG_KEY, NEXT_PUBLIC_POSTHOG_HOST
NEXT_PUBLIC_BASE_URL
META_PIXEL_ID, META_CAPI_ACCESS_TOKEN, NEXT_PUBLIC_META_PIXEL_ID
GHL_WEBHOOK_URL          # GoHighLevel Workflow Inbound Webhook URL — required for CRM lead storage
```
