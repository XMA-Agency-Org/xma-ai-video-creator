import { defineType, defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export const faqSection = defineType({
  name: "faqSection",
  title: "FAQ Section",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "header",
      title: "Section Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "contactCtaText",
      title: "Contact CTA Text",
      type: "string",
      initialValue: "Still have questions? Contact us",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "displayedItems",
      title: "Displayed FAQ Items",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faqItem" }] }],
      validation: (rule) => rule.min(1),
      description:
        "Pick and order which FAQ items appear. Drag to reorder.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "FAQ Section" }),
  },
});
