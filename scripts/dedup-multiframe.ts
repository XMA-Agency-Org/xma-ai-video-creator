import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";

const MANIFEST_PATH = "./public/videos/manifest.json";
const FRAMES_DIR = "./public/videos/frames";

type ManifestEntry = {
  id: string;
  video: string;
};

function extractMultipleFrames(videoUrl: string, id: string): boolean {
  const outDir = join(FRAMES_DIR, id);
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });

  try {
    // Extract 3 frames: at 0.5s, 2s, 4s — scaled to 16x16 grayscale
    for (const [i, ts] of ["0.5", "2", "4"].entries()) {
      execSync(
        `ffmpeg -y -ss ${ts} -i "${videoUrl}" -frames:v 1 -vf "scale=16:16,format=gray" -f rawvideo -pix_fmt gray "${join(outDir, `f${i}.raw`)}" 2>/dev/null`,
        { timeout: 20000 }
      );
    }
    return true;
  } catch {
    // Fallback: try just one frame at 0.5s
    try {
      execSync(
        `ffmpeg -y -ss 0.5 -i "${videoUrl}" -frames:v 1 -vf "scale=16:16,format=gray" -f rawvideo -pix_fmt gray "${join(outDir, "f0.raw")}" 2>/dev/null`,
        { timeout: 20000 }
      );
      return true;
    } catch {
      return false;
    }
  }
}

function computeHash(rawPath: string): bigint {
  if (!existsSync(rawPath)) return 0n;
  const pixels = readFileSync(rawPath);
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

function getCompositeHash(id: string): bigint[] {
  const dir = join(FRAMES_DIR, id);
  const hashes: bigint[] = [];
  for (let i = 0; i < 3; i++) {
    hashes.push(computeHash(join(dir, `f${i}.raw`)));
  }
  return hashes;
}

function multiFrameDistance(hashesA: bigint[], hashesB: bigint[]): number {
  // Average hamming distance across available frames
  let totalDist = 0;
  let comparisons = 0;
  for (let i = 0; i < 3; i++) {
    if (hashesA[i] === 0n || hashesB[i] === 0n) continue;
    totalDist += hammingDistance(hashesA[i], hashesB[i]);
    comparisons++;
  }
  return comparisons > 0 ? totalDist / comparisons : 999;
}

function main() {
  const manifest: ManifestEntry[] = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
  if (!existsSync(FRAMES_DIR)) mkdirSync(FRAMES_DIR, { recursive: true });

  console.log(`Extracting 3 frames per video (16x16 grayscale) from ${manifest.length} videos...`);

  const validEntries: { id: string; video: string; hashes: bigint[] }[] = [];

  for (let i = 0; i < manifest.length; i++) {
    const entry = manifest[i];
    if ((i + 1) % 10 === 0) console.log(`  [${i + 1}/${manifest.length}]`);

    const framesExist = existsSync(join(FRAMES_DIR, entry.id, "f0.raw"));
    if (!framesExist) {
      const ok = extractMultipleFrames(entry.video, entry.id);
      if (!ok) continue;
    }

    const hashes = getCompositeHash(entry.id);
    if (hashes[0] === 0n) continue;
    validEntries.push({ id: entry.id, video: entry.video, hashes });
  }

  console.log(`\nComputed hashes for ${validEntries.length} videos`);

  // With 16x16 = 256 bits, threshold of 20 means ~92% similar
  const THRESHOLD = 20;
  const used = new Set<string>();
  const groups: typeof validEntries[] = [];

  for (let i = 0; i < validEntries.length; i++) {
    if (used.has(validEntries[i].id)) continue;

    const group = [validEntries[i]];
    used.add(validEntries[i].id);

    for (let j = i + 1; j < validEntries.length; j++) {
      if (used.has(validEntries[j].id)) continue;

      const dist = multiFrameDistance(validEntries[i].hashes, validEntries[j].hashes);
      if (dist <= THRESHOLD) {
        group.push(validEntries[j]);
        used.add(validEntries[j].id);
      }
    }

    groups.push(group);
  }

  const duplicateGroups = groups.filter((g) => g.length > 1);
  const uniqueVideos = groups.map((g) => g[g.length - 1]);

  console.log(`\nMulti-frame perceptual dedup (threshold=${THRESHOLD}):`);
  console.log(`  Total: ${validEntries.length}`);
  console.log(`  Unique: ${uniqueVideos.length}`);
  console.log(`  Removed: ${validEntries.length - uniqueVideos.length}`);
  console.log(`  Duplicate groups: ${duplicateGroups.length}\n`);

  duplicateGroups
    .sort((a, b) => b.length - a.length)
    .forEach((g, i) => {
      console.log(`  Group ${i + 1} (${g.length}x): ${g.map((e) => e.id.substring(0, 8)).join(", ")}`);
    });

  const finalManifest = uniqueVideos.map((v) => ({
    id: v.id,
    video: v.video,
  }));

  writeFileSync("./public/videos/manifest-final.json", JSON.stringify(finalManifest, null, 2));
  console.log(`\nSaved: ${finalManifest.length} unique videos -> manifest-final.json`);
}

main();
