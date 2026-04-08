import { defineQuery } from "next-sanity";

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_id == "siteSettings"][0]{
    siteName,
    siteDescription,
    ogTitle,
    ogDescription
  }
`);

export const HERO_QUERY = defineQuery(`
  *[_id == "heroSection"][0]{
    headline,
    subheadline,
    primaryCta { label, href, style },
    secondaryCta { label, href, style },
    heroVideos[]{ _key, label, videoUrl },
    floatingBadges[]{ _key, iconName, text, style }
  }
`);

export const STATS_QUERY = defineQuery(`
  *[_id == "statsSection"][0]{
    stats[]{ _key, value, label, accent }
  }
`);

export const HOW_IT_WORKS_QUERY = defineQuery(`
  *[_id == "howItWorksSection"][0]{
    header { subtitle, heading, description },
    steps[]{ _key, stepNumber, title, description, iconName, highlighted }
  }
`);

export const PORTFOLIO_SECTION_QUERY = defineQuery(`
  *[_id == "portfolioSection"][0]{
    header { subtitle, heading, description },
    viewAllLinkText,
    categoryPills,
    featuredItems[]->{ _id, title, category, videoUrl, "slug": slug.current }
  }
`);

export const MARQUEE_QUERY = defineQuery(`
  *[_id == "marqueeSection"][0]{
    text
  }
`);

export const TESTIMONIALS_SECTION_QUERY = defineQuery(`
  *[_id == "testimonialsSection"][0]{
    header { subtitle, heading, description },
    displayedItems[]->{ _id, quote, clientName, clientRole, company }
  }
`);

export const PRICING_SECTION_QUERY = defineQuery(`
  *[_id == "pricingSection"][0]{
    header { subtitle, heading, description },
    displayedPlans[]->{
      _id,
      name,
      "slug": slug.current,
      price,
      description,
      features,
      highlighted,
      stripePriceId
    }
  }
`);

export const FAQ_SECTION_QUERY = defineQuery(`
  *[_id == "faqSection"][0]{
    header { subtitle, heading, description },
    contactCtaText,
    contactEmail,
    displayedItems[]->{ _id, question, answer }
  }
`);

export const CTA_BANNER_QUERY = defineQuery(`
  *[_id == "ctaBannerSection"][0]{
    headline,
    description,
    cta { label, href, style }
  }
`);

export const FOOTER_QUERY = defineQuery(`
  *[_id == "footerContent"][0]{
    brandName,
    tagline,
    linkGroups[]{ _key, groupTitle, links[]{ _key, label, href } },
    email,
    phone,
    address,
    copyrightText
  }
`);

export const ALL_PORTFOLIO_ITEMS_QUERY = defineQuery(`
  *[_type == "portfolioItem"] | order(orderRank asc){
    _id,
    title,
    "slug": slug.current,
    category,
    videoUrl
  }
`);

export const WORK_PAGE_QUERY = defineQuery(`
  *[_id == "workPage"][0]{
    header { subtitle, heading, description },
    backLinkText
  }
`);
