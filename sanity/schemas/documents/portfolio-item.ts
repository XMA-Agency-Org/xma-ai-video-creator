import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Item",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      validation: (rule) => rule.required(),
      options: {
        list: [
          "Beauty",
          "Fragrance",
          "Fashion & Lifestyle",
          "Food & Beverage",
          "Real Estate",
          "E-Commerce",
          "CGI & 3D",
          "UGC",
          "Product Ads",
          "Service Business",
        ],
      },
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL",
      type: "string",
      validation: (rule) => rule.required(),
      description: "Direct URL or relative path to video file (.mp4)",
    }),
    defineField({
      name: "orderRank",
      title: "Order Rank",
      type: "string",
      hidden: true,
    }),
  ],
  orderings: [
    {
      title: "Manual Order",
      name: "orderRankAsc",
      by: [{ field: "orderRank", direction: "asc" }],
    },
    {
      title: "Title A-Z",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
    {
      title: "Category",
      name: "categoryAsc",
      by: [{ field: "category", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "category" },
  },
});
