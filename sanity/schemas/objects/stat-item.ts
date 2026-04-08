import { defineType, defineField } from "sanity";

export const statItem = defineType({
  name: "statItem",
  title: "Stat Item",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      validation: (rule) => rule.required(),
      description: "e.g. '50+', '40%', '$2M+'",
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (rule) => rule.required(),
      description: "e.g. 'Videos Delivered'",
    }),
    defineField({
      name: "accent",
      title: "Accent Style",
      type: "boolean",
      initialValue: false,
      description: "Use purple background instead of dark",
    }),
  ],
  preview: {
    select: { title: "value", subtitle: "label" },
  },
});
