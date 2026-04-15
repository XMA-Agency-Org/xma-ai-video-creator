import { execSync } from "child_process";
import { readFileSync } from "fs";
import { basename } from "path";

const envFile = readFileSync(".env.local", "utf8");
const tokenLine = envFile.split("\n").find((l) => l.startsWith("SANITY_API_WRITE_TOKEN="));
const TOKEN = tokenLine?.split("=").slice(1).join("=").trim();
const PROJECT_ID = "fv5mbe60";
const DATASET = "production";
const API_VERSION = "2026-04-08";

const VIDEO_MAP = [
  { file: "xma ai ad - SaaS.mp4", docId: "48018be8-f1ba-4a73-be6a-58a2ae210f31" },
  { file: "rosso vivo 1.mp4", docId: "d2581d58-ee0d-4d93-8a48-f8a8592572e1" },
  { file: "Mega ai Video 4.mp4", docId: "d1d43b1d-0c36-46f8-b2b5-6ea35cd115ad" },
  { file: "we make ai ads.mp4", docId: "18a2af9b-868b-4a33-9368-3772f92c9028" },
  { file: "VIP Motors Bugatti reveal.mp4", docId: "e8605ad6-1fd1-40f3-bec1-e1213c326080" },
  { file: "leads ai ad.mov", docId: "7c5752a9-3ae0-4cc5-8ec0-cf2630e22cab" },
  { file: "Mega ai Video 3.mp4", docId: "8d932240-97c7-4214-89a5-a8f950a7a2c4" },
  { file: "xma ai ad - big guy Testimonial.mp4", docId: "a25688fe-e575-456b-bf34-99ca842e6829" },
  { file: "baggage man 1.mp4", docId: "e0c47eaf-b21d-4e42-bad6-0f6a0f696f52" },
  { file: "Mega ai Video 5.mp4", docId: "c0718b69-a478-4e54-9089-25ef174536a9" },
  { file: "Mega ai Video 1.mp4", docId: "76afa121-c15c-4037-80b1-6d46e60b0bd2" },
  { file: "Mega ai Video 2.mp4", docId: "dba35a2d-c5fd-491d-8da4-55acadaacea4" },
];

const VIDEO_DIR = "public/videos/xma";

function uploadAsset(filePath, filename) {
  const contentType = filename.endsWith(".mov") ? "video/quicktime" : "video/mp4";
  const safeName = filename.replace(/\s+/g, "-").toLowerCase();
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/assets/files/${DATASET}?filename=${encodeURIComponent(safeName)}`;

  const result = execSync(
    `curl -s -X POST -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: ${contentType}" --data-binary @"${filePath}" "${url}"`,
    { maxBuffer: 10 * 1024 * 1024, env: { ...process.env } }
  ).toString();

  const parsed = JSON.parse(result);
  if (parsed.error) throw new Error(parsed.error.description || parsed.error);
  return parsed.document._id;
}

function patchDocument(docId, assetId) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`;
  const body = JSON.stringify({
    mutations: [{ patch: { id: docId, set: { video: { _type: "file", asset: { _type: "reference", _ref: assetId } } } } }],
  });

  const result = execSync(
    `curl -s -X POST -H "Authorization: Bearer ${TOKEN}" -H "Content-Type: application/json" -d '${body}' "${url}"`
  ).toString();

  const parsed = JSON.parse(result);
  if (parsed.error) throw new Error(parsed.error.description || parsed.error);
}

console.log(`Uploading ${VIDEO_MAP.length} videos to Sanity CDN...\n`);

for (const entry of VIDEO_MAP) {
  const filePath = `${VIDEO_DIR}/${entry.file}`;
  try {
    process.stdout.write(`Uploading: ${entry.file}... `);
    const assetId = uploadAsset(filePath, basename(entry.file));
    console.log(`OK`);
    console.log(`  Asset: ${assetId}`);

    process.stdout.write(`  Patching ${entry.docId}... `);
    patchDocument(entry.docId, assetId);
    console.log(`OK\n`);
  } catch (err) {
    console.log(`FAILED: ${err.message}\n`);
  }
}

console.log("Done!");
