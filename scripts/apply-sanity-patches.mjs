import { readFileSync, unlinkSync } from "fs";
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
const WRITE_TOKEN = env["SANITY_API_WRITE_TOKEN"];

const PATCHES_FILE = "scripts/pending-sanity-patches.json";

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

async function main() {
  let patches;
  try {
    patches = JSON.parse(readFileSync(PATCHES_FILE, "utf8"));
  } catch {
    console.log("No pending patches file found. Nothing to apply.");
    return;
  }

  console.log(`Applying ${patches.length} pending Sanity patches...\n`);

  const failed = [];
  for (const patch of patches) {
    const label = patch.note || `${patch.docId} / ${patch.fieldPath}`;
    try {
      await patchSanityDoc(patch.docId, patch.fieldPath, patch.value);
      console.log(`  ✓ ${label}`);
    } catch (err) {
      console.log(`  ✗ ${label}: ${err.message}`);
      failed.push(patch);
    }
  }

  if (failed.length === 0) {
    unlinkSync(PATCHES_FILE);
    console.log("\nAll patches applied. Removed pending-sanity-patches.json.");
  } else {
    const { writeFileSync } = await import("fs");
    writeFileSync(PATCHES_FILE, JSON.stringify(failed, null, 2), "utf8");
    console.log(`\n${failed.length} patches still failed. Re-run when Sanity quota resets.`);
  }
}

main().catch((err) => {
  console.error("Fatal:", err.message);
  process.exit(1);
});
