import { defineType, defineField } from "sanity";
import { BulbOutlineIcon } from "@sanity/icons";

export const ctaBannerSection = defineType({
  name: "ctaBannerSection",
  title: "CTA Banner",
  type: "document",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "cta",
      title: "CTA Button",
      type: "cta",
    }),
  ],
  preview: {
    prepare: () => ({ title: "CTA Banner" }),
  },
});
