import { defineType, defineField } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      title: "SEO Title",
      type: "string",
      description: "Overrides the page title for search engines (50-60 chars ideal)",
      validation: (rule) =>
        rule.max(70).warning("Keep under 70 characters for best SEO"),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Brief summary for search results (150-160 chars ideal)",
      validation: (rule) =>
        rule.max(160).warning("Keep under 160 characters for best SEO"),
    }),
    defineField({
      name: "image",
      title: "Social Share Image",
      type: "image",
      description: "Image for social sharing (1200x630 recommended)",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "Hide from Search Engines",
      type: "boolean",
      description: "Prevent this page from appearing in search results",
      initialValue: false,
    }),
  ],
});
