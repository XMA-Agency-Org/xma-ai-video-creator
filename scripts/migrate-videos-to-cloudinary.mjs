import { readFileSync, writeFileSync, existsSync, createWriteStream } from "fs";
import { extname, join } from "path";
import { tmpdir } from "os";
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

const PROJECT_ID = env["NEXT_PUBLIC_SANITY_PROJECT_ID"] || "fv5mbe60";
const DATASET = env["NEXT_PUBLIC_SANITY_DATASET"] || "production";
const API_VERSION = "2026-04-08";
const WRITE_TOKEN = env["SANITY_API_WRITE_TOKEN"];

const VIDEO_MAP = [
  { file: "xma ai ad - SaaS.mp4", docId: "48018be8-f1ba-4a73-be6a-58a2ae210f31", slug: "xma-ai-ad-saas" },
  { file: "rosso vivo 1.mp4", docId: "d2581d58-ee0d-4d93-8a48-f8a8592572e1", slug: "rosso-vivo-1" },
  { file: "Mega ai Video 4.mp4", docId: "d1d43b1d-0c36-46f8-b2b5-6ea35cd115ad", slug: "mega-ai-video-4" },
  { file: "we make ai ads.mp4", docId: "18a2af9b-868b-4a33-9368-3772f92c9028", slug: "we-make-ai-ads" },
  { file: "VIP Motors Bugatti reveal.mp4", docId: "e8605ad6-1fd1-40f3-bec1-e1213c326080", slug: "vip-motors-bugatti-reveal" },
  { file: "leads ai ad.mov", docId: "7c5752a9-3ae0-4cc5-8ec0-cf2630e22cab", slug: "leads-ai-ad" },
  { file: "Mega ai Video 3.mp4", docId: "8d932240-97c7-4214-89a5-a8f950a7a2c4", slug: "mega-ai-video-3" },
  { file: "xma ai ad - big guy Testimonial.mp4", docId: "a25688fe-e575-456b-bf34-99ca842e6829", slug: "xma-ai-ad-big-guy-testimonial" },
  { file: "baggage man 1.mp4", docId: "e0c47eaf-b21d-4e42-bad6-0f6a0f696f52", slug: "baggage-man-1" },
  { file: "Mega ai Video 5.mp4", docId: "c0718b69-a478-4e54-9089-25ef174536a9", slug: "mega-ai-video-5" },
  { file: "Mega ai Video 1.mp4", docId: "76afa121-c15c-4037-80b1-6d46e60b0bd2", slug: "mega-ai-video-1" },
  { file: "Mega ai Video 2.mp4", docId: "dba35a2d-c5fd-491d-8da4-55acadaacea4", slug: "mega-ai-video-2" },
];

const HERO_FALLBACK_VIDEOS = [
  { url: "https://cdn.sanity.io/files/fv5mbe60/production/fd3a8a746d9891d2fa6eca06d1f62afdc0ccc7a5.mp4", slug: "hero-1" },
  { url: "https://cdn.sanity.io/files/fv5mbe60/production/bbad6063cf367be155fb3f673d9cad57c14b98fd.mp4", slug: "hero-2" },
  { url: "https://cdn.sanity.io/files/fv5mbe60/production/3decfa63194f6c56a860a892fad355fcd7ea97c6.mp4", slug: "hero-3" },
];

async function downloadToTemp(url, slug) {
  const ext = extname(url.split("?")[0]) || ".mp4";
  const tmpPath = join(tmpdir(), `xma-cloudinary-${slug}${ext}`);
  if (existsSync(tmpPath)) return tmpPath;
  const response = await axios({ url, method: "GET", responseType: "stream", timeout: 120000 });
  await new Promise((resolve, reject) => {
    const writer = createWriteStream(tmpPath);
    response.data.pipe(writer);
    writer.on("finish", resolve);
    writer.on("error", reject);
  });
  return tmpPath;
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

async function uploadToCloudinary(sourcePath, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(
      sourcePath,
      { public_id: publicId, resource_type: "video", overwrite: false, chunk_size: 20 * 1024 * 1024 },
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
}

async function getOrUpload(sourcePath, publicId) {
  try {
    const info = await cloudinary.api.resource(publicId, { resource_type: "video" });
    return { result: info, cached: true };
  } catch {
    const result = await uploadToCloudinary(sourcePath, publicId);
    return { result, cached: false };
  }
}

async function patchSanityDoc(docId, fieldPath, value) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;
  const body = JSON.stringify({
    mutations: [{ patch: { id: docId, set: { [fieldPath]: value } } }],
  });
  const res = await axios.post(url, body, {
    headers: { Authorization: `Bearer ${WRITE_TOKEN}`, "Content-Type": "application/json" },
  });
  if (res.data.error) throw new Error(res.data.error.description || res.data.error);
  return res.data;
}

async function tryPatchSanityDoc(docId, fieldPath, value, pendingPatches) {
  try {
    await patchSanityDoc(docId, fieldPath, value);
    return true;
  } catch (err) {
    if (err.response?.status === 402 || err.message?.includes("402")) {
      pendingPatches.push({ docId, fieldPath, value });
      return false;
    }
    throw err;
  }
}

async function migratePortfolioItems(pendingPatches) {
  console.log("\n── Portfolio Items ─────────────────────────────────────────");
  const results = {};

  for (const entry of VIDEO_MAP) {
    const localPath = `public/videos/xma/${entry.file}`;
    const publicId = `xma-ai-video-creator/portfolio/${entry.slug}`;

    if (!existsSync(localPath)) {
      console.log(`  ✗ MISS  ${entry.file} (local file not found — skipping)`);
      continue;
    }

    try {
      const { result, cached } = await getOrUpload(localPath, publicId);
      const asset = buildCloudinaryAsset(result);
      const tag = cached ? "CACHED" : "DONE ";
      const patched = await tryPatchSanityDoc(entry.docId, "video", asset, pendingPatches);
      const patchTag = patched ? "" : " [Sanity patch queued]";
      console.log(`  ✓ ${tag}  ${entry.file} → ${asset.secure_url}${patchTag}`);
      results[entry.docId] = asset.secure_url;
    } catch (err) {
      console.log(`  ✗ FAIL  ${entry.file}: ${err.message}`);
    }
  }

  return results;
}

async function migrateHeroFallbacks(pendingPatches) {
  console.log("\n── Hero Fallback Videos ─────────────────────────────────────");
  const fallbackCloudUrls = [];

  for (const item of HERO_FALLBACK_VIDEOS) {
    const publicId = `xma-ai-video-creator/hero/${item.slug}`;
    try {
      let sourcePath;
      let cached = false;

      try {
        const info = await cloudinary.api.resource(publicId, { resource_type: "video" });
        fallbackCloudUrls.push(info.secure_url);
        console.log(`  ✓ EXIST ${item.slug} → ${info.secure_url}`);
        continue;
      } catch {
        console.log(`  ↓ FETCH ${item.slug} from Sanity CDN...`);
        sourcePath = await downloadToTemp(item.url, item.slug);
      }

      const result = await uploadToCloudinary(sourcePath, publicId);
      const asset = buildCloudinaryAsset(result);
      fallbackCloudUrls.push(asset.secure_url);

      pendingPatches.push({
        docId: "heroSection",
        fieldPath: `heroVideos[_key=="${item.slug}"].video`,
        value: asset,
        note: `hero fallback ${item.slug} — heroVideos may need manual key lookup`,
      });

      console.log(`  ✓ DONE  ${item.slug} → ${asset.secure_url}`);
    } catch (err) {
      fallbackCloudUrls.push(item.url);
      console.log(`  ✗ FAIL  ${item.slug}: ${err.message} (keeping original)`);
    }
  }

  return fallbackCloudUrls;
}

async function migrateManifestVideos() {
  console.log("\n── Manifest Fallback Videos (Canva → Cloudinary) ────────────");
  const manifest = JSON.parse(readFileSync("public/videos/manifest-final.json", "utf8"));
  const updated = [];

  for (const item of manifest) {
    const publicId = `xma-ai-video-creator/landing/${item.id}`;

    try {
      try {
        const info = await cloudinary.api.resource(publicId, { resource_type: "video" });
        updated.push({ ...item, video: info.secure_url });
        console.log(`  ✓ EXIST ${item.title}`);
        continue;
      } catch {}

      console.log(`  ↓ FETCH ${item.title}...`);
      const tmpPath = await downloadToTemp(item.video, item.id);
      const result = await uploadToCloudinary(tmpPath, publicId);
      updated.push({ ...item, video: result.secure_url });
      console.log(`  ✓ DONE  ${item.title} → ${result.secure_url}`);
    } catch (err) {
      updated.push(item);
      console.log(`  ✗ FAIL  ${item.title}: ${err.message} (keeping original)`);
    }
  }

  return updated;
}

function updateHeroFallbacksInCode(fallbackCloudUrls) {
  const filePath = "app/(landing)/_components/hero-section.tsx";
  const content = readFileSync(filePath, "utf8");
  const three = fallbackCloudUrls.slice(0, 3);
  if (three.length < 3) {
    console.log(`  ! Only ${three.length} hero URLs available — skipping hero-section.tsx update`);
    return;
  }
  const fallbackBlock = `const FALLBACK_VIDEOS = [\n  "${three[0]}",\n  "${three[1]}",\n  "${three[2]}",\n];`;
  const updated = content.replace(/const FALLBACK_VIDEOS = \[[\s\S]*?\];/, fallbackBlock);
  if (updated !== content) {
    writeFileSync(filePath, updated, "utf8");
    console.log(`  ✓ Updated FALLBACK_VIDEOS in ${filePath}`);
  } else {
    console.log(`  ! Regex match failed — update hero-section.tsx manually:\n  ${three.join("\n  ")}`);
  }
}

function updateLandingContent(updatedManifest) {
  const LANDING_ID_MAP = {
    "15d0747cd01e85bf11581cb7ba703714": "pink-drinkware",
    "932e344e91a9ecf30d7d8bfcb3d35a1f": "store-product-showcase",
    "db1a94876e5ed903b58d5848c774d72f": "kayali-perfume",
    "fa8e67902c10c3a2caf799515bb777fd": "vantori-vitamin-c",
    "66cb8849cb34a43c0fda09c9db05565f": "shampoo-brand",
    "c575974a8de5ce1f51ca43223b89f1f4": "clothing-brand",
  };

  const filePath = "app/(landing)/_lib/landing-content.ts";
  let content = readFileSync(filePath, "utf8");
  let changed = 0;

  for (const [id] of Object.entries(LANDING_ID_MAP)) {
    const newEntry = updatedManifest.find((e) => e.id === id);
    if (!newEntry || newEntry.video.includes("canva.site")) continue;
    const oldUrl = `https://ruyastudio.my.canva.site/_assets/video/${id}.mp4`;
    if (content.includes(oldUrl)) {
      content = content.replace(oldUrl, newEntry.video);
      changed++;
    }
  }

  if (changed > 0) {
    writeFileSync(filePath, content, "utf8");
    console.log(`  ✓ Updated ${changed} Canva URLs in ${filePath}`);
  } else {
    console.log(`  ! No matching Canva URLs found in landing-content.ts (may already be updated)`);
  }
}

async function main() {
  console.log("=== XMA AI Video Creator — Migrate to Cloudinary ===\n");
  console.log(`Cloud: ${env["NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME"]}`);

  const pendingPatches = [];

  const _portfolioResults = await migratePortfolioItems(pendingPatches);
  const fallbackCloudUrls = await migrateHeroFallbacks(pendingPatches);
  const updatedManifest = await migrateManifestVideos();

  console.log("\n── Updating source files ────────────────────────────────────");
  updateHeroFallbacksInCode(fallbackCloudUrls);
  updateLandingContent(updatedManifest);
  writeFileSync("public/videos/manifest-final.json", JSON.stringify(updatedManifest, null, 2), "utf8");
  console.log("  ✓ Updated public/videos/manifest-final.json");

  if (pendingPatches.length > 0) {
    const patchFile = "scripts/pending-sanity-patches.json";
    writeFileSync(patchFile, JSON.stringify(pendingPatches, null, 2), "utf8");
    console.log(`\n  ⚠ Sanity bandwidth quota exhausted — ${pendingPatches.length} patches saved to ${patchFile}`);
    console.log(`  Run 'bun scripts/apply-sanity-patches.mjs' once your quota resets to link videos in CMS.`);
  }

  console.log("\n=== Migration complete ===\n");
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
