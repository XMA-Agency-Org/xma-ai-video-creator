import { defineType, defineField } from "sanity";
import { TextIcon } from "@sanity/icons";

export const marqueeSection = defineType({
  name: "marqueeSection",
  title: "Marquee Section",
  type: "document",
  icon: TextIcon,
  fields: [
    defineField({
      name: "text",
      title: "Marquee Text",
      type: "string",
      validation: (rule) => rule.required(),
      initialValue: "YOUR AI VIDEO PARTNER",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Marquee Section" }),
  },
});
