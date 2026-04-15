import type { StructureResolver } from "sanity/structure";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { DocumentTextIcon, UserIcon, TagIcon } from "@sanity/icons";
import { SINGLETON_TYPES } from "./schemas";

export const structure: StructureResolver = (S, context) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.listItem()
        .title("Blog")
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title("Blog")
            .items([
              S.listItem()
                .title("Posts")
                .icon(DocumentTextIcon)
                .child(
                  S.documentTypeList("blogPost").title("Blog Posts")
                ),
              S.listItem()
                .title("Authors")
                .icon(UserIcon)
                .child(
                  S.documentTypeList("author").title("Authors")
                ),
              S.listItem()
                .title("Categories")
                .icon(TagIcon)
                .child(
                  S.documentTypeList("category").title("Categories")
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Hero Section")
        .id("heroSection")
        .child(
          S.document().schemaType("heroSection").documentId("heroSection")
        ),
      S.listItem()
        .title("Stats Section")
        .id("statsSection")
        .child(
          S.document().schemaType("statsSection").documentId("statsSection")
        ),
      S.listItem()
        .title("How It Works")
        .id("howItWorksSection")
        .child(
          S.document()
            .schemaType("howItWorksSection")
            .documentId("howItWorksSection")
        ),
      S.listItem()
        .title("Portfolio Section")
        .id("portfolioSection")
        .child(
          S.document()
            .schemaType("portfolioSection")
            .documentId("portfolioSection")
        ),
      S.listItem()
        .title("Marquee Section")
        .id("marqueeSection")
        .child(
          S.document()
            .schemaType("marqueeSection")
            .documentId("marqueeSection")
        ),
      S.listItem()
        .title("Testimonials Section")
        .id("testimonialsSection")
        .child(
          S.document()
            .schemaType("testimonialsSection")
            .documentId("testimonialsSection")
        ),
      S.listItem()
        .title("FAQ Section")
        .id("faqSection")
        .child(
          S.document().schemaType("faqSection").documentId("faqSection")
        ),
      S.listItem()
        .title("CTA Banner")
        .id("ctaBannerSection")
        .child(
          S.document()
            .schemaType("ctaBannerSection")
            .documentId("ctaBannerSection")
        ),
      S.listItem()
        .title("Footer")
        .id("footerContent")
        .child(
          S.document()
            .schemaType("footerContent")
            .documentId("footerContent")
        ),
      S.listItem()
        .title("Work Page")
        .id("workPage")
        .child(
          S.document().schemaType("workPage").documentId("workPage")
        ),
      S.divider(),
      orderableDocumentListDeskItem({
        type: "portfolioItem",
        title: "Portfolio Items",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "testimonial",
        title: "Testimonials",
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "faqItem",
        title: "FAQ Items",
        S,
        context,
      }),
    ]);
