import { defineType, defineField } from "sanity";
import { CommentIcon } from "@sanity/icons";

export const testimonialsSection = defineType({
  name: "testimonialsSection",
  title: "Testimonials Section",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "header",
      title: "Section Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "displayedItems",
      title: "Displayed Testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      validation: (rule) => rule.min(1).max(6),
      description:
        "Pick and order which testimonials appear on the landing page. Drag to reorder.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Testimonials Section" }),
  },
});
