import { readFileSync, writeFileSync } from "fs";
import { v2 as cloudinary } from "cloudinary";

const envFile = readFileSync(".env.local", "utf8");
const env = Object.fromEntries(
  envFile.split("\n").filter((l) => l.includes("=")).map((l) => {
    const idx = l.indexOf("=");
    return [l.slice(0, idx).trim(), l.slice(idx + 1).trim()];
  })
);

cloudinary.config({
  cloud_name: env["NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"],
  api_key: env["CLOUDINARY_API_KEY"],
  api_secret: env["CLOUDINARY_API_SECRET"],
});

const LOCAL_PATH = "public/videos/xma/novo baby 1.mp4";
const PUBLIC_ID = "xma-ai-video-creator/portfolio/novo-baby-1";

async function run() {
  let secureUrl;

  try {
    const info = await cloudinary.api.resource(PUBLIC_ID, { resource_type: "video" });
    secureUrl = info.secure_url;
    console.log("Already on Cloudinary:", secureUrl);
  } catch {
    console.log("Uploading...");
    await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(
        LOCAL_PATH,
        { public_id: PUBLIC_ID, resource_type: "video", overwrite: false, chunk_size: 20 * 1024 * 1024 },
        (err, result) => {
          if (err) return reject(err);
          secureUrl = result.secure_url;
          console.log("Uploaded:", secureUrl);
          resolve();
        }
      );
    });
  }

  const jsonPath = "public/videos/cloudinary-videos.json";
  const videos = JSON.parse(readFileSync(jsonPath, "utf8"));

  const firstFeaturedIdx = videos.findIndex((v) => v.featured);
  const removed = videos[firstFeaturedIdx];

  videos[firstFeaturedIdx] = {
    id: "novo-baby-1",
    title: "Novo Baby",
    category: "Product Ads",
    videoUrl: secureUrl,
    featured: true,
    hero: removed.hero,
  };

  writeFileSync(jsonPath, JSON.stringify(videos, null, 2), "utf8");
  console.log(`Replaced "${removed.title}" with "Novo Baby" at index ${firstFeaturedIdx}`);
}

run().catch((err) => { console.error(err.message); process.exit(1); });
