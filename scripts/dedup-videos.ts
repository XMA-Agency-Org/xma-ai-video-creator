import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { execSync } from "child_process";
import { join } from "path";
import { createHash } from "crypto";

const MANIFEST_PATH = "./public/videos/manifest.json";
const THUMBS_DIR = "./public/videos/thumbs";

type ManifestEntry = {
  id: string;
  video: string;
  thumbnail: string | null;
  localVideo: string;
  localThumbnail: string | null;
};

function extractFrame(videoUrl: string, outputPath: string): boolean {
  try {
    execSync(
      `ffmpeg -y -ss 1 -i "${videoUrl}" -frames:v 1 -vf "scale=160:90:force_original_aspect_ratio=decrease,pad=160:90:(ow-iw)/2:(oh-ih)/2" "${outputPath}" 2>/dev/null`,
      { timeout: 30000 }
    );
    return true;
  } catch {
    return false;
  }
}

function imageHash(imagePath: string): string {
  const data = readFileSync(imagePath);
  return createHash("md5").update(data).digest("hex");
}

async function main() {
  const manifest: ManifestEntry[] = JSON.parse(readFileSync(MANIFEST_PATH, "utf-8"));
  console.log(`Processing ${manifest.length} videos...`);

  if (!existsSync(THUMBS_DIR)) mkdirSync(THUMBS_DIR, { recursive: true });

  const hashMap = new Map<string, ManifestEntry[]>();
  let processed = 0;
  let failed = 0;

  for (const entry of manifest) {
    processed++;
    const thumbPath = join(THUMBS_DIR, `${entry.id}.jpg`);

    if (processed % 10 === 0) {
      console.log(`  [${processed}/${manifest.length}] extracting frames...`);
    }

    const ok = extractFrame(entry.video, thumbPath);
    if (!ok) {
      failed++;
      continue;
    }

    const hash = imageHash(thumbPath);
    const existing = hashMap.get(hash) || [];
    existing.push(entry);
    hashMap.set(hash, existing);
  }

  console.log(`\nExtracted ${processed - failed} frames, ${failed} failed`);
  console.log(`Found ${hashMap.size} unique thumbnails from ${manifest.length} videos\n`);

  // For each group, keep the entry with the longest video URL hash (heuristic: highest quality tends to be different)
  // Actually, we want to pick the best from each group. Let's check file sizes via HEAD request.
  const uniqueVideos: ManifestEntry[] = [];
  const duplicateGroups: { hash: string; count: number; kept: string; dropped: string[] }[] = [];

  for (const [hash, entries] of hashMap) {
    // Simple heuristic: keep first entry (they're all same content, different resolution)
    // But let's try to pick the one that's likely highest quality by checking which URL appears last (usually highest res)
    const best = entries[entries.length - 1];
    uniqueVideos.push(best);

    if (entries.length > 1) {
      duplicateGroups.push({
        hash,
        count: entries.length,
        kept: best.id,
        dropped: entries.slice(0, -1).map((e) => e.id),
      });
    }
  }

  console.log(`Deduplication results:`);
  console.log(`  Total videos: ${manifest.length}`);
  console.log(`  Unique videos: ${uniqueVideos.length}`);
  console.log(`  Duplicates removed: ${manifest.length - uniqueVideos.length}`);
  console.log(`  Groups with duplicates: ${duplicateGroups.length}`);

  if (duplicateGroups.length > 0) {
    console.log(`\nDuplicate groups (top 10):`);
    duplicateGroups
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
      .forEach((g) => {
        console.log(`  ${g.count} copies -> kept ${g.kept}, dropped ${g.dropped.length}`);
      });
  }

  // Write deduped manifest
  const dedupedManifest = uniqueVideos.map((entry) => ({
    id: entry.id,
    video: entry.video,
  }));

  writeFileSync(
    "./public/videos/manifest-deduped.json",
    JSON.stringify(dedupedManifest, null, 2)
  );
  console.log(`\nSaved deduped manifest: ${dedupedManifest.length} unique videos`);
}

main();
