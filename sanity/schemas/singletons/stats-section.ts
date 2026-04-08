import { defineType, defineField } from "sanity";
import { BarChartIcon } from "@sanity/icons";

export const statsSection = defineType({
  name: "statsSection",
  title: "Stats Section",
  type: "document",
  icon: BarChartIcon,
  fields: [
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [{ type: "statItem" }],
      validation: (rule) => rule.required().max(6),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Stats Section" }),
  },
});
