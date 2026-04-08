import { defineType, defineField } from "sanity";
import { ComponentIcon } from "@sanity/icons";

export const footerContent = defineType({
  name: "footerContent",
  title: "Footer",
  type: "document",
  icon: ComponentIcon,
  fields: [
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
      initialValue: "XMA",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "linkGroups",
      title: "Link Groups",
      type: "array",
      of: [{ type: "footerLinkGroup" }],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      initialValue: "XMA Agency · © All Rights Reserved",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Footer" }),
  },
});
