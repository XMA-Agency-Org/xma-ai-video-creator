import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export const portfolioSection = defineType({
  name: "portfolioSection",
  title: "Portfolio Section",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "header",
      title: "Section Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "viewAllLinkText",
      title: "View All Link Text",
      type: "string",
      initialValue: "View All Work",
    }),
    defineField({
      name: "categoryPills",
      title: "Category Pills",
      type: "array",
      of: [{ type: "string" }],
      description: "Categories shown as scrolling marquee pills",
    }),
    defineField({
      name: "featuredItems",
      title: "Featured Portfolio Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "portfolioItem" }] }],
      validation: (rule) => rule.max(9),
      description:
        "Pick and order which portfolio items appear on the landing page. Drag to reorder.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Portfolio Section" }),
  },
});
