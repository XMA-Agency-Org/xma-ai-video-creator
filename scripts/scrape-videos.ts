import { writeFileSync, mkdirSync, existsSync } from "fs";

const SITE_URL = "https://ruyastudio.my.canva.site/";
const OUTPUT_DIR = "./public/videos";

async function scrapeVideos() {
  console.log("Fetching Canva site HTML...");
  const response = await fetch(SITE_URL);
  const html = await response.text();

  const mp4Matches = html.match(/_assets\/video\/[a-f0-9]+\.mp4/g) || [];
  const jpgMatches = html.match(/_assets\/video\/[a-f0-9]+\.jpg/g) || [];

  const uniqueMp4 = [...new Set(mp4Matches)];
  const uniqueJpg = [...new Set(jpgMatches)];

  console.log(`Found ${uniqueMp4.length} unique videos, ${uniqueJpg.length} unique thumbnails`);

  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const manifest: {
    id: string;
    video: string;
    thumbnail: string | null;
    localVideo: string;
    localThumbnail: string | null;
  }[] = [];

  for (let i = 0; i < uniqueMp4.length; i++) {
    const mp4Path = uniqueMp4[i];
    const id = mp4Path.match(/([a-f0-9]+)\.mp4/)?.[1] || `video-${i}`;
    const videoUrl = `${SITE_URL}${mp4Path}`;
    const thumbPath = uniqueJpg.find((j) => j.includes(id));
    const thumbUrl = thumbPath ? `${SITE_URL}${thumbPath}` : null;

    console.log(`[${i + 1}/${uniqueMp4.length}] Downloading ${id}...`);

    try {
      const videoRes = await fetch(videoUrl);
      if (!videoRes.ok) {
        console.log(`  SKIP (${videoRes.status}): ${videoUrl}`);
        continue;
      }

      const videoBuffer = Buffer.from(await videoRes.arrayBuffer());
      const videoFilename = `${id}.mp4`;
      writeFileSync(`${OUTPUT_DIR}/${videoFilename}`, videoBuffer);
      console.log(`  Saved video: ${videoFilename} (${(videoBuffer.length / 1024 / 1024).toFixed(1)}MB)`);

      let thumbFilename: string | null = null;
      if (thumbUrl) {
        const thumbRes = await fetch(thumbUrl);
        if (thumbRes.ok) {
          const thumbBuffer = Buffer.from(await thumbRes.arrayBuffer());
          thumbFilename = `${id}-thumb.jpg`;
          writeFileSync(`${OUTPUT_DIR}/${thumbFilename}`, thumbBuffer);
          console.log(`  Saved thumbnail: ${thumbFilename}`);
        }
      }

      manifest.push({
        id,
        video: videoUrl,
        thumbnail: thumbUrl,
        localVideo: `/videos/${videoFilename}`,
        localThumbnail: thumbFilename ? `/videos/${thumbFilename}` : null,
      });
    } catch (err) {
      console.log(`  ERROR: ${err}`);
    }
  }

  writeFileSync(
    `${OUTPUT_DIR}/manifest.json`,
    JSON.stringify(manifest, null, 2)
  );
  console.log(`\nDone! ${manifest.length} videos saved to ${OUTPUT_DIR}/manifest.json`);
}

scrapeVideos();
