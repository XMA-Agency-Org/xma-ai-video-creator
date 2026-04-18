import { defineType, defineField } from "sanity";
import { RocketIcon } from "@sanity/icons";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  icon: RocketIcon,
  fields: [
    defineField({
      name: "headline",
      title: "Headline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "subheadline",
      title: "Subheadline",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "cta",
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "cta",
    }),
    defineField({
      name: "heroVideos",
      title: "Hero Videos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({
              name: "video",
              title: "Video",
              type: "cloudinary.asset",
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "video.secure_url" },
          },
        },
      ],
      validation: (rule) => rule.max(3),
      description: "Up to 3 videos for the hero collage",
    }),
    defineField({
      name: "floatingBadges",
      title: "Floating Badges",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "iconName",
              title: "Icon",
              type: "string",
              options: {
                list: ["Zap", "TrendingUp", "Clock", "Play", "Sparkles", "Star"],
              },
            }),
            defineField({ name: "text", title: "Text", type: "string" }),
            defineField({
              name: "style",
              title: "Style",
              type: "string",
              options: {
                list: [
                  { title: "Default (white)", value: "default" },
                  { title: "Accent (lime)", value: "accent" },
                ],
                layout: "radio",
              },
              initialValue: "default",
            }),
          ],
          preview: {
            select: { title: "text" },
          },
        },
      ],
      validation: (rule) => rule.max(3),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Hero Section" }),
  },
});
