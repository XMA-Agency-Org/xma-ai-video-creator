import { defineType, defineField } from "sanity";
import { RocketIcon } from "@sanity/icons";

export const blogCtaBlock = defineType({
  name: "blogCtaBlock",
  title: "CTA Block",
  type: "object",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      initialValue: "Ready to scale with AI video?",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      initialValue:
        "Book a free strategy call and see exactly how we'd build your video engine.",
    }),
    defineField({
      name: "buttonLabel",
      title: "Button Label",
      type: "string",
      initialValue: "Book a Strategy Call",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { headline: "headline" },
    prepare({ headline }) {
      return { title: headline || "CTA Block", subtitle: "Inline CTA" };
    },
  },
});
