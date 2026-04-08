import { readFileSync, writeFileSync, readdirSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

const THUMBS_DIR = "./public/videos/thumbs";
const MANIFEST_PATH = "./public/videos/manifest.json";

type ManifestEntry = {
  id: string;
  video: string;
};

function getPixelData(imagePath: string): Buffer {
  // Convert to tiny 8x8 grayscale raw pixels for perceptual comparison
  try {
    return execSync(
      `ffmpeg -y -i "${imagePath}" -vf "scale=8:8,format=gray" -f rawvideo -pix_fmt gray - 2>/dev/null`,
      { maxBuffer: 1024 }
    );
  } catch {
    return Buffer.alloc(64);
  }
}

function perceptualHash(pixels: Buffer): bigint {
  // Average hash: compare each pixel to the mean
  const avg = pixels.reduce((sum, p) => sum + p, 0) / pixels.length;
  let hash = 0n;
  for (let i = 0; i < pixels.length; i++) {
    if (pixels[i] >= avg) hash |= 1n << BigInt(i);
  }
  return hash;
}

function hammingDistance(a: bigint, b: bigint): number {
  let xor = a ^ b;
  let dist = 0;
  while (xor > 0n) {
    dist += Number(xor & 1n);
    xor >>= 1n;
  }
  return dist;
}

function main() {
  const manifest: ManifestEntry[] = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
  const thumbFiles = readdirSync(THUMBS_DIR).filter((f) => f.endsWith(".jpg"));

  console.log(`Computing perceptual hashes for ${thumbFiles.length} thumbnails...`);

  const entries: { id: string; hash: bigint; video: string }[] = [];

  for (const file of thumbFiles) {
    const id = file.replace(".jpg", "");
    const manifestEntry = manifest.find((m) => m.id === id);
    if (!manifestEntry) continue;

    const pixels = getPixelData(join(THUMBS_DIR, file));
    const hash = perceptualHash(pixels);
    entries.push({ id, hash, video: manifestEntry.video });
  }

  console.log(`Computed ${entries.length} hashes, finding duplicates (threshold: 5 bits)...\n`);

  // Group by perceptual similarity (hamming distance <= 5 means visually similar)
  const THRESHOLD = 5;
  const used = new Set<string>();
  const groups: { id: string; video: string }[][] = [];

  for (let i = 0; i < entries.length; i++) {
    if (used.has(entries[i].id)) continue;

    const group = [{ id: entries[i].id, video: entries[i].video }];
    used.add(entries[i].id);

    for (let j = i + 1; j < entries.length; j++) {
      if (used.has(entries[j].id)) continue;

      const dist = hammingDistance(entries[i].hash, entries[j].hash);
      if (dist <= THRESHOLD) {
        group.push({ id: entries[j].id, video: entries[j].video });
        used.add(entries[j].id);
      }
    }

    groups.push(group);
  }

  const duplicateGroups = groups.filter((g) => g.length > 1);
  const uniqueVideos = groups.map((g) => g[g.length - 1]); // Keep last (usually highest quality)

  console.log(`Perceptual deduplication results:`);
  console.log(`  Total videos: ${entries.length}`);
  console.log(`  Unique groups: ${groups.length}`);
  console.log(`  Unique videos kept: ${uniqueVideos.length}`);
  console.log(`  Duplicates removed: ${entries.length - uniqueVideos.length}`);
  console.log(`  Groups with duplicates: ${duplicateGroups.length}\n`);

  console.log(`Duplicate groups:`);
  duplicateGroups
    .sort((a, b) => b.length - a.length)
    .forEach((g, i) => {
      console.log(`  Group ${i + 1} (${g.length} copies): ${g.map((e) => e.id.substring(0, 8)).join(", ")}`);
    });

  // Write final manifest
  const finalManifest = uniqueVideos.map((v) => ({
    id: v.id,
    video: v.video,
  }));

  writeFileSync(
    "./public/videos/manifest-final.json",
    JSON.stringify(finalManifest, null, 2)
  );
  console.log(`\nSaved final manifest: ${finalManifest.length} unique videos to manifest-final.json`);
}

main();
