import { defineType, defineField } from "sanity";

export const processStep = defineType({
  name: "processStep",
  title: "Process Step",
  type: "object",
  fields: [
    defineField({
      name: "stepNumber",
      title: "Step Number",
      type: "number",
      validation: (rule) => rule.required().min(1).max(10),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "iconName",
      title: "Icon",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: [
          { title: "File Text", value: "FileText" },
          { title: "Sparkles", value: "Sparkles" },
          { title: "Eye", value: "Eye" },
          { title: "Send", value: "Send" },
          { title: "Zap", value: "Zap" },
          { title: "Trending Up", value: "TrendingUp" },
          { title: "Clock", value: "Clock" },
          { title: "Play", value: "Play" },
          { title: "Video", value: "Video" },
          { title: "Palette", value: "Palette" },
        ],
      },
    }),
    defineField({
      name: "highlighted",
      title: "Highlighted",
      type: "boolean",
      initialValue: false,
      description: "Use purple background for this step",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "stepNumber" },
    prepare: ({ title, subtitle }) => ({
      title,
      subtitle: `Step ${subtitle}`,
    }),
  },
});
