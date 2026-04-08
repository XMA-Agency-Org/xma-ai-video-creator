import { defineType, defineField } from "sanity";

export const sectionHeader = defineType({
  name: "sectionHeader",
  title: "Section Header",
  type: "object",
  fields: [
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "Small uppercase text above the heading (e.g. 'OUR WORK')",
    }),
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
  ],
});
