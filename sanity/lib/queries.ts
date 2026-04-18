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
    heroVideos[]{ _key, label, "videoUrl": video.secure_url },
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
    featuredItems[]->{ _id, title, category, "slug": slug.current, "videoUrl": video.secure_url }
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
    "videoUrl": video.secure_url
  }
`);

export const WORK_PAGE_QUERY = defineQuery(`
  *[_id == "workPage"][0]{
    header { subtitle, heading, description },
    backLinkText
  }
`);

export const BLOG_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost"] | order(publishedAt desc){
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage{ asset, alt },
    publishedAt,
    featured,
    author->{ name, "slug": slug.current, avatar },
    categories[]->{ title, "slug": slug.current },
    tags
  }
`);

export const FEATURED_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && featured == true] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage{ asset, alt },
    publishedAt,
    author->{ name, avatar },
    categories[]->{ title, "slug": slug.current }
  }
`);

export const BLOG_POST_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage{ asset, alt },
    body,
    publishedAt,
    _updatedAt,
    featured,
    author->{ name, "slug": slug.current, avatar, role, bio, socialLinks },
    categories[]->{ title, "slug": slug.current },
    tags,
    seo {
      title,
      description,
      image{ asset },
      noIndex
    },
    schemaMarkup
  }
`);

export const BLOG_CATEGORIES_QUERY = defineQuery(`
  *[_type == "category"] | order(title asc){
    _id,
    title,
    "slug": slug.current,
    "postCount": count(*[_type == "blogPost" && references(^._id)])
  }
`);

export const RELATED_POSTS_QUERY = defineQuery(`
  *[_type == "blogPost" && slug.current != $currentSlug && count(categories[]->slug.current[@ in $categorySlugs]) > 0] | order(publishedAt desc)[0...3]{
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage{ asset, alt },
    publishedAt,
    author->{ name, avatar },
    categories[]->{ title, "slug": slug.current }
  }
`);
