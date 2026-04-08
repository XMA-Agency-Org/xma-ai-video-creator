import { defineType, defineField } from "sanity";

export const footerLinkGroup = defineType({
  name: "footerLinkGroup",
  title: "Footer Link Group",
  type: "object",
  fields: [
    defineField({
      name: "groupTitle",
      title: "Group Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "links",
      title: "Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "href",
              title: "URL",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { title: "groupTitle" },
  },
});
