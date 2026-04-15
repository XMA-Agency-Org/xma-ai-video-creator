import { createClient } from "@sanity/client";
import { readFileSync } from "fs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-04-08",
  useCdn: false,
});

type ManifestEntry = {
  id: string;
  video: string;
  category: string;
  title: string;
};

async function seedPortfolioItems() {
  const manifest: ManifestEntry[] = JSON.parse(
    readFileSync("./public/videos/manifest-final.json", "utf-8")
  );

  console.log(`Seeding ${manifest.length} portfolio items...`);

  const transaction = client.transaction();

  for (let i = 0; i < manifest.length; i++) {
    const entry = manifest[i];
    const docId = `portfolioItem-${entry.id.substring(0, 12)}`;

    transaction.createOrReplace({
      _id: docId,
      _type: "portfolioItem",
      title: entry.title,
      slug: { _type: "slug", current: entry.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "") },
      category: entry.category,
      orderRank: String(i).padStart(6, "0"),
    });

    console.log(`  [${i + 1}/${manifest.length}] ${entry.title} (${entry.category})`);
  }

  await transaction.commit();
  console.log("\nPortfolio items seeded.");
}

async function seedTestimonials() {
  const testimonials = [
    {
      _id: "testimonial-sarah",
      clientName: "Sarah Chen",
      clientRole: "Marketing Director",
      company: "Lumière Beauty",
      quote: "The AI videos XMA created for our skincare launch outperformed all our previous content. The quality is indistinguishable from traditional production.",
      orderRank: "000001",
    },
    {
      _id: "testimonial-omar",
      clientName: "Omar Al-Rashid",
      clientRole: "Founder & CEO",
      company: "Oud & Essence",
      quote: "We went from concept to finished video in 3 days. What used to take us weeks and cost five times more. Absolutely game-changing for our brand.",
      orderRank: "000002",
    },
    {
      _id: "testimonial-priya",
      clientName: "Priya Mehta",
      clientRole: "Head of Growth",
      company: "Drift Commerce",
      quote: "The ROI speaks for itself — our conversion rate on social ads jumped 40% after switching to XMA's AI-generated video content.",
      orderRank: "000003",
    },
  ];

  console.log("Seeding testimonials...");
  const transaction = client.transaction();
  for (const t of testimonials) {
    transaction.createOrReplace({ ...t, _type: "testimonial" });
  }
  await transaction.commit();
  console.log("Testimonials seeded.");
}

async function seedFaqItems() {
  const faqs = [
    { question: "What kind of videos can you create with AI?", answer: "We create product showcases, brand stories, social media ads, promotional reels, explainer videos, and lifestyle content. Our AI can adapt to virtually any style — from cinematic to minimalist, editorial to UGC-style." },
    { question: "How does the AI video creation process work?", answer: "You start by sharing a brief about your brand, goals, and style preferences. Our AI engine then generates video content based on your requirements. You review the output, request refinements if needed, and receive the final polished video ready for deployment." },
    { question: "How long does it take to get my video?", answer: "Turnaround depends on your package: Starter videos are delivered in 5 business days, Pro in 7 business days, and Enterprise projects in 14 business days. Rush delivery is available upon request." },
    { question: "Can I request revisions?", answer: "Absolutely. Starter includes 1 revision round, Pro includes 2 rounds, and Enterprise comes with unlimited revisions. We work with you until the video perfectly matches your vision." },
    { question: "What formats do I receive?", answer: "All videos are delivered in high-quality MP4 format. Pro and Enterprise packages include multi-platform formatting — optimized for Instagram Reels, TikTok, YouTube Shorts, Facebook Ads, and standard 16:9 landscape." },
    { question: "Do you need product photos or footage from me?", answer: "Not necessarily. Our AI can generate visuals from scratch. However, sharing product photos, brand assets, or existing footage helps us create more accurate and on-brand content." },
    { question: "Is the content unique to my brand?", answer: "Yes, 100%. Every video is created exclusively for your brand and will not be reused or resold. You receive full commercial usage rights for all delivered content." },
  ];

  console.log("Seeding FAQ items...");
  const transaction = client.transaction();
  faqs.forEach((faq, i) => {
    transaction.createOrReplace({
      _id: `faq-${i + 1}`,
      _type: "faqItem",
      question: faq.question,
      answer: faq.answer,
      orderRank: String(i + 1).padStart(6, "0"),
    });
  });
  await transaction.commit();
  console.log("FAQ items seeded.");
}

async function main() {
  console.log(`Seeding Sanity dataset: ${projectId}/${dataset}\n`);
  await seedPortfolioItems();
  await seedTestimonials();
  await seedFaqItems();
  console.log("\nAll content seeded!");
}

main().catch(console.error);
