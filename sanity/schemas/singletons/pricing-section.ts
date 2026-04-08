import { defineType, defineField } from "sanity";
import { CreditCardIcon } from "@sanity/icons";

export const pricingSection = defineType({
  name: "pricingSection",
  title: "Pricing Section",
  type: "document",
  icon: CreditCardIcon,
  fields: [
    defineField({
      name: "header",
      title: "Section Header",
      type: "sectionHeader",
    }),
    defineField({
      name: "displayedPlans",
      title: "Displayed Plans",
      type: "array",
      of: [{ type: "reference", to: [{ type: "pricingPlan" }] }],
      validation: (rule) => rule.min(1).max(5),
      description:
        "Pick and order which pricing plans appear on the landing page. Drag to reorder.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Pricing Section" }),
  },
});
