import { readFileSync, writeFileSync, readdirSync } from "fs";
import { extname, basename, join } from "path";
import { execSync } from "child_process";
import { v2 as cloudinary } from "cloudinary";
import { createClient } from "@sanity/client";

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

const sanityClient = createClient({
  projectId: env["NEXT_PUBLIC_SANITY_PROJECT_ID"] || "fv5mbe60",
  dataset: env["NEXT_PUBLIC_SANITY_DATASET"] || "production",
  apiVersion: "2026-04-08",
  useCdn: false,
  token: env["SANITY_API_WRITE_TOKEN"],
});

const VIDEO_DIR = "public/videos/xma";
const MANIFEST_PATH = "public/videos/cloudinary-videos.json";
const PUBLIC_ID_PREFIX = "xma-ai-video-creator/portfolio";
const VIDEO_EXTS = new Set([".mp4", ".mov"]);

function slugify(filename) {
  return basename(filename, extname(filename))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function prettyTitle(filename) {
  return basename(filename, extname(filename))
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function buildCloudinaryAsset(result) {
  return {
    _type: "cloudinary.asset",
    public_id: result.public_id,
    resource_type: result.resource_type,
    type: result.type,
    format: result.format,
    version: result.version,
    secure_url: result.secure_url,
    url: result.url,
    width: result.width ?? 0,
    height: result.height ?? 0,
    bytes: result.bytes,
    duration: result.duration ?? null,
    created_at: result.created_at,
    tags: result.tags ?? [],
    context: result.context ?? {},
    derived: result.derived ?? [],
  };
}

async function getOrUpload(sourcePath, publicId) {
  try {
    const info = await cloudinary.api.resource(publicId, { resource_type: "video" });
    return { result: info, cached: true };
  } catch {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(
        sourcePath,
        { public_id: publicId, resource_type: "video", overwrite: false, chunk_size: 20 * 1024 * 1024 },
        (err, res) => (err ? reject(err) : resolve(res))
      );
    });
    return { result, cached: false };
  }
}

async function run() {
  const allFiles = readdirSync(VIDEO_DIR)
    .filter((f) => VIDEO_EXTS.has(extname(f).toLowerCase()))
    .sort();

  const manifest = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
  const existingSlugs = new Set(manifest.map((e) => e.id));

  const newFiles = allFiles.filter((f) => !existingSlugs.has(slugify(f)));

  if (newFiles.length === 0) {
    console.log(`Synced 0 new videos (${allFiles.length} already present, skipped)`);
    return;
  }

  console.log(`Found ${newFiles.length} new video(s) to sync:\n`);

  let succeeded = 0;
  let failed = 0;

  for (const filename of newFiles) {
    const localPath = join(VIDEO_DIR, filename);
    const slug = slugify(filename);
    const title = prettyTitle(filename);
    const publicId = `${PUBLIC_ID_PREFIX}/${slug}`;

    process.stdout.write(`  ${filename} … `);

    try {
      const { result, cached } = await getOrUpload(localPath, publicId);
      const asset = buildCloudinaryAsset(result);

      manifest.unshift({
        id: slug,
        title,
        category: "",
        videoUrl: asset.secure_url,
        featured: false,
        hero: false,
      });

      let sanityStatus = "draft created";
      try {
        await sanityClient.createIfNotExists({
          _id: `drafts.portfolioItem-${slug}`,
          _type: "portfolioItem",
          title,
          slug: { _type: "slug", current: slug },
          video: asset,
        });
      } catch (sanityErr) {
        sanityStatus = `SKIPPED (${sanityErr.message})`;
      }

      console.log(`✓ cloudinary: ${cached ? "CACHED" : "UPLOADED"}, manifest: added, sanity: ${sanityStatus}`);
      succeeded++;
    } catch (err) {
      console.log(`✗ FAIL: ${err.message}`);
      failed++;
    }
  }

  if (succeeded > 0) {
    writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), "utf-8");
    try {
      execSync(`git add ${MANIFEST_PATH}`, { stdio: "inherit" });
      execSync(`git commit -m "chore(videos): sync ${succeeded} new video(s) to manifest"`, { stdio: "inherit" });
      execSync("git push", { stdio: "inherit" });
      console.log(`\nManifest committed and pushed.`);
    } catch (gitErr) {
      console.error(`\nGit commit/push failed: ${gitErr.message}`);
    }
  }

  const skipped = allFiles.length - newFiles.length;
  console.log(
    `\nSynced ${succeeded} new video(s)${failed > 0 ? `, ${failed} failed` : ""}${skipped > 0 ? ` (${skipped} already present, skipped)` : ""}`
  );

  if (failed > 0 && succeeded === 0) process.exit(1);
}

run().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
