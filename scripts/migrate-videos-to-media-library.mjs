import { createClient } from "@sanity/client";
import { readFileSync, createReadStream, existsSync } from "fs";
import { writeFile, unlink, mkdir } from "fs/promises";
import { join, basename } from "path";

const envFile = readFileSync(".env.local", "utf8");
function getEnv(key) {
  const line = envFile.split("\n").find((l) => l.startsWith(`${key}=`));
  return line?.split("=").slice(1).join("=").trim();
}

const TOKEN = getEnv("SANITY_API_WRITE_TOKEN");
const PROJECT_ID = getEnv("NEXT_PUBLIC_SANITY_PROJECT_ID") || "fv5mbe60";
const DATASET = getEnv("NEXT_PUBLIC_SANITY_DATASET") || "production";

if (!TOKEN) {
  console.error("Missing SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  token: TOKEN,
  apiVersion: "2025-03-25",
  useCdn: false,
});

const TMP_DIR = "/tmp/sanity-video-migration";

async function ensureTmpDir() {
  await mkdir(TMP_DIR, { recursive: true });
}

async function downloadVideo(url, filename) {
  const tmpPath = join(TMP_DIR, filename);
  if (existsSync(tmpPath)) return tmpPath;

  console.log(`    Downloading from ${url.substring(0, 80)}...`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed: ${res.status} ${res.statusText}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  await writeFile(tmpPath, buffer);
  console.log(`    Downloaded ${(buffer.length / 1024 / 1024).toFixed(1)}MB`);
  return tmpPath;
}

async function uploadToSanity(filePath, filename) {
  const ext = filename.split(".").pop();
  const contentType = ext === "mov" ? "video/quicktime" : "video/mp4";

  console.log(`    Uploading to Sanity...`);
  const asset = await client.assets.upload("file", createReadStream(filePath), {
    filename,
    contentType,
  });
  console.log(`    Uploaded as ${asset._id}`);
  return asset._id;
}

async function patchDocument(docId, assetId) {
  await client
    .patch(docId)
    .set({
      video: {
        _type: "sanity.video",
        asset: {
          _type: "reference",
          _ref: assetId,
        },
      },
    })
    .unset(["videoUrl"])
    .commit();
  console.log(`    Patched document ${docId}`);
}

function extractSanityAssetId(url) {
  const match = url.match(
    /cdn\.sanity\.io\/files\/[^/]+\/[^/]+\/([a-f0-9]+)\.(mp4|mov|webm)/
  );
  if (!match) return null;
  return `file-${match[1]}-${match[2]}`;
}

async function main() {
  await ensureTmpDir();

  const items = await client.fetch(
    `*[_type == "portfolioItem" && defined(videoUrl) && !(_id in path("drafts.**"))] | order(orderRank asc){ _id, title, videoUrl }`
  );

  console.log(`Found ${items.length} portfolio items to migrate\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    console.log(`[${i + 1}/${items.length}] ${item.title}`);

    try {
      const url = item.videoUrl;

      if (!url || url.startsWith("/")) {
        console.log(`    SKIP: local path or empty URL\n`);
        continue;
      }

      const existingAssetId = extractSanityAssetId(url);

      if (existingAssetId) {
        console.log(`    Already on Sanity CDN, reusing asset: ${existingAssetId}`);
        await patchDocument(item._id, existingAssetId);
      } else {
        const safeName = basename(url).replace(/[^a-zA-Z0-9._-]/g, "-");
        const tmpPath = await downloadVideo(url, `${item._id}-${safeName}`);
        const assetId = await uploadToSanity(tmpPath, safeName);
        await patchDocument(item._id, assetId);
        await unlink(tmpPath).catch(() => {});
      }

      success++;
      console.log(`    OK\n`);
    } catch (err) {
      failed++;
      console.log(`    FAILED: ${err.message}\n`);
    }
  }

  console.log(`\nMigration complete: ${success} success, ${failed} failed`);

  // Clean up drafts too
  const drafts = await client.fetch(
    `*[_type == "portfolioItem" && defined(videoUrl) && _id in path("drafts.**")]{ _id, title }`
  );
  if (drafts.length > 0) {
    console.log(`\nCleaning up ${drafts.length} draft(s)...`);
    for (const draft of drafts) {
      try {
        await client.patch(draft._id).unset(["videoUrl"]).commit();
        console.log(`  Unset videoUrl on ${draft._id}`);
      } catch (err) {
        console.log(`  Failed on ${draft._id}: ${err.message}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
