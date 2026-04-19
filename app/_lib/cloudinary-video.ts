export type CloudinaryPreset = "hero" | "grid" | "carousel" | "card" | "lightbox";

const POSTER_WIDTHS: Record<CloudinaryPreset, number> = {
  hero: 1080,
  grid: 480,
  carousel: 720,
  card: 640,
  lightbox: 1280,
};

function isCloudinaryVideoUrl(url: string): boolean {
  return url.includes("res.cloudinary.com") && url.includes("/video/upload/");
}

function injectTransforms(url: string, transforms: string): string {
  const marker = "/video/upload/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  const before = url.slice(0, idx + marker.length);
  const after = url.slice(idx + marker.length);
  return `${before}${transforms}/${after}`;
}

// Hero videos get a 720p width cap so mobile can load them quickly.
// Other presets return the original URL — lazy loading handles bandwidth for
// below-the-fold tiles, and on-demand transcoding on first request would
// cause severe latency for videos the user is actively waiting on.
export function getCloudinaryVideoUrl(url: string, preset: CloudinaryPreset): string {
  if (preset !== "hero") return url;
  if (!isCloudinaryVideoUrl(url)) return url;
  return injectTransforms(url, "c_limit,f_mp4,q_auto,w_1280");
}

// Image-only transforms (no vc_auto/f_auto) so Cloudinary can serve the
// poster thumbnail instantly without video transcoding.
export function getCloudinaryPosterUrl(url: string, preset: CloudinaryPreset): string {
  if (!isCloudinaryVideoUrl(url)) return url;
  const w = POSTER_WIDTHS[preset];
  const transforms = `q_auto,w_${w},c_limit,so_auto`;
  return injectTransforms(url, transforms).replace(/\.[^.]+$/, ".jpg");
}
