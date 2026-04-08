import { defineType, defineField } from "sanity";
import { CircleIcon } from "@sanity/icons";

export const howItWorksSection = defineType({
  name: "howItWorksSection",
  title: "How It Works",
  type: "document",
  icon: CircleIcon,
  fields: [
    defineField({
      name: "header",
      title: "Section Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "steps",
      title: "Process Steps",
      type: "array",
      of: [{ type: "processStep" }],
      validation: (rule) => rule.required().min(1).max(8),
    }),
  ],
  preview: {
    prepare: () => ({ title: "How It Works" }),
  },
});
