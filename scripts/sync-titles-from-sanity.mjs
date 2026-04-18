import { readFileSync, writeFileSync } from "fs";
import axios from "axios";

const envFile = readFileSync(".env.local", "utf8");
const env = Object.fromEntries(
  envFile.split("\n").filter((l) => l.includes("=")).map((l) => {
    const idx = l.indexOf("=");
    return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
  })
);

const PROJECT_ID = env["NEXT_PUBLIC_SANITY_PROJECT_ID"] || "fv5mbe60";
const DATASET = env["NEXT_PUBLIC_SANITY_DATASET"] || "production";
const API_VERSION = "2026-04-08";
const READ_TOKEN = env["SANITY_API_READ_TOKEN"];

const VIDEO_MAP = [
  { slug: "xma-ai-ad-saas",               docId: "48018be8-f1ba-4a73-be6a-58a2ae210f31" },
  { slug: "rosso-vivo-1",                  docId: "d2581d58-ee0d-4d93-8a48-f8a8592572e1" },
  { slug: "mega-ai-video-4",               docId: "d1d43b1d-0c36-46f8-b2b5-6ea35cd115ad" },
  { slug: "we-make-ai-ads",                docId: "18a2af9b-868b-4a33-9368-3772f92c9028" },
  { slug: "vip-motors-bugatti-reveal",     docId: "e8605ad6-1fd1-40f3-bec1-e1213c326080" },
  { slug: "leads-ai-ad",                   docId: "7c5752a9-3ae0-4cc5-8ec0-cf2630e22cab" },
  { slug: "mega-ai-video-3",               docId: "8d932240-97c7-4214-89a5-a8f950a7a2c4" },
  { slug: "xma-ai-ad-big-guy-testimonial", docId: "a25688fe-e575-456b-bf34-99ca842e6829" },
  { slug: "baggage-man-1",                 docId: "e0c47eaf-b21d-4e42-bad6-0f6a0f696f52" },
  { slug: "mega-ai-video-5",               docId: "c0718b69-a478-4e54-9089-25ef174536a9" },
  { slug: "mega-ai-video-1",               docId: "76afa121-c15c-4037-80b1-6d46e60b0bd2" },
  { slug: "mega-ai-video-2",               docId: "dba35a2d-c5fd-491d-8da4-55acadaacea4" },
];

async function main() {
  const groq = `*[_type == "portfolioItem"]{_id, title, category}`;
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(groq)}`;

  let sanityItems;
  try {
    const res = await axios.get(url, { headers: { Authorization: `Bearer ${READ_TOKEN}` } });
    sanityItems = res.data.result;
  } catch (err) {
    const status = err.response?.status;
    if (status === 402) {
      console.error("Sanity bandwidth quota still exhausted (402). Try again after quota resets at sanity.io/manage.");
    } else {
      console.error("Sanity query failed:", err.message);
    }
    process.exit(1);
  }

  const sanityMap = Object.fromEntries(sanityItems.map((d) => [d._id, d]));
  const docIdToSlug = Object.fromEntries(VIDEO_MAP.map((e) => [e.docId, e.slug]));

  const videos = JSON.parse(readFileSync("public/videos/cloudinary-videos.json", "utf-8"));
  let updated = 0;

  for (const video of videos) {
    const docId = VIDEO_MAP.find((e) => e.slug === video.id)?.docId;
    if (!docId) continue;

    const sanity = sanityMap[docId];
    if (!sanity) continue;

    const newTitle = sanity.title ?? video.title;
    const newCategory = sanity.category ?? video.category;

    if (newTitle !== video.title || newCategory !== video.category) {
      console.log(`  ✓ ${video.id}: "${video.title}" → "${newTitle}" | "${video.category}" → "${newCategory}"`);
      video.title = newTitle;
      video.category = newCategory;
      updated++;
    }
  }

  if (updated === 0) {
    console.log("No changes — titles already match Sanity.");
    return;
  }

  writeFileSync("public/videos/cloudinary-videos.json", JSON.stringify(videos, null, 2), "utf-8");
  console.log(`\nUpdated ${updated} entries in cloudinary-videos.json.`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
