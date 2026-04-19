import { readFileSync } from "fs";
import { v2 as cloudinary } from "cloudinary";
import axios from "axios";

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

const videos = JSON.parse(readFileSync("public/videos/cloudinary-videos.json", "utf8"));
const heroVideos = videos.filter((v) => v.hero);

const EAGER_TRANSFORMS = [
  { width: 1280, crop: "limit", quality: "auto", fetch_format: "mp4" },
];

console.log(`Pre-warming ${heroVideos.length} hero videos with 720p transform...\n`);

for (const video of heroVideos) {
  const url = video.videoUrl;
  const match = url.match(/\/video\/upload\/(?:v\d+\/)?(.+?)(?:\.\w+)?$/);
  if (!match) {
    console.warn(`Could not parse public_id from: ${url}`);
    continue;
  }

  const fullPath = url.split("/video/upload/")[1];
  // Strip leading version segment (v1234567890/)
  const withoutVersion = fullPath.replace(/^v\d+\//, "");
  const publicId = withoutVersion.replace(/\.\w+$/, "");

  console.log(`Processing: ${video.id}`);
  console.log(`  public_id: ${publicId}`);

  try {
    const result = await cloudinary.uploader.explicit(publicId, {
      resource_type: "video",
      type: "upload",
      eager: EAGER_TRANSFORMS,
      eager_async: true,
    });

    console.log(`  ✓ Queued async transform for: ${result.public_id}`);

    // Also hit the transform URL directly to warm the CDN edge cache
    const transformUrl = `https://res.cloudinary.com/${env["NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"]}/video/upload/c_limit,f_mp4,q_auto,w_1280/${publicId}.mp4`;
    console.log(`  Fetching: ${transformUrl}`);
    try {
      const resp = await axios.get(transformUrl, {
        responseType: "stream",
        timeout: 90000,
        headers: { Range: "bytes=0-65535" },
      });
      resp.data.destroy();
      console.log(`  ✓ CDN edge warmed (status ${resp.status})`);
    } catch (fetchErr) {
      console.log(`  ~ CDN fetch: ${fetchErr.message} (transform still queued)`);
    }
  } catch (err) {
    console.error(`  ✗ Error: ${err.message ?? JSON.stringify(err)}`);
  }
}

console.log("\nDone. Hero video transforms are now cached on Cloudinary's CDN.");
