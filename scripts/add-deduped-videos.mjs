import { readFileSync, writeFileSync, existsSync, createWriteStream } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { extname } from "path";
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

async function downloadToTemp(url, id) {
  const tmpPath = join(tmpdir(), `xma-canva-${id}.mp4`);
  if (existsSync(tmpPath)) return tmpPath;
  const response = await axios({ url, method: "GET", responseType: "stream", timeout: 60000 });
  await new Promise((resolve, reject) => {
    const writer = createWriteStream(tmpPath);
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
  return tmpPath;
}

async function getOrUpload(id, canvaUrl) {
  const publicId = `xma-ai-video-creator/landing/${id}`;
  try {
    const info = await cloudinary.api.resource(publicId, { resource_type: "video" });
    return info.secure_url;
  } catch {}
  const tmpPath = await downloadToTemp(canvaUrl, id);
  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(
      tmpPath,
      { public_id: publicId, resource_type: "video", overwrite: false, chunk_size: 20 * 1024 * 1024 },
      (err, res) => { if (err) reject(err); else resolve(res); }
    );
  });
  return result.secure_url;
}

async function main() {
  const deduped = JSON.parse(readFileSync("public/videos/manifest-deduped.json", "utf-8"));
  const finalVideos = JSON.parse(readFileSync("public/videos/manifest-final.json", "utf-8"));
  const current = JSON.parse(readFileSync("public/videos/cloudinary-videos.json", "utf-8"));

  const finalMap = Object.fromEntries(finalVideos.map((e) => [e.id, e]));
  const currentIds = new Set(current.map((e) => e.id));

  const toProcess = deduped.filter((e) => !currentIds.has(e.id));
  console.log(`Processing ${toProcess.length} entries not yet in cloudinary-videos.json\n`);

  const newEntries = [];

  for (const entry of toProcess) {
    const existing = finalMap[entry.id];

    if (existing && !existing.video.includes("canva.site")) {
      newEntries.push({
        id: entry.id,
        title: existing.title ?? "",
        category: existing.category ?? "",
        videoUrl: existing.video,
        featured: false,
        hero: false,
      });
      console.log(`  ✓ CLOUD  ${entry.id}`);
      continue;
    }

    try {
      console.log(`  ↑ UPLOAD ${entry.id}...`);
      const videoUrl = await getOrUpload(entry.id, entry.video);
      newEntries.push({
        id: entry.id,
        title: existing?.title ?? "",
        category: existing?.category ?? "",
        videoUrl,
        featured: false,
        hero: false,
      });
      console.log(`  ✓ DONE   ${entry.id} → ${videoUrl}`);
    } catch (err) {
      console.log(`  ✗ FAIL   ${entry.id}: ${err.message}`);
    }
  }

  const updated = [...current, ...newEntries];
  writeFileSync("public/videos/cloudinary-videos.json", JSON.stringify(updated, null, 2), "utf-8");
  console.log(`\nAdded ${newEntries.length} entries. cloudinary-videos.json now has ${updated.length} total.`);
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
