import { defineType, defineField } from "sanity";
import { DocumentsIcon } from "@sanity/icons";

export const workPage = defineType({
  name: "workPage",
  title: "Work Page",
  type: "document",
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: "header",
      title: "Section Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "backLinkText",
      title: "Back Link Text",
      type: "string",
      initialValue: "Back to Home",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Work Page" }),
  },
});
