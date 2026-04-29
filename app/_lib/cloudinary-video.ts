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

export function getCloudinaryVideoUrl(url: string, _preset: CloudinaryPreset): string {
  if (!isCloudinaryVideoUrl(url)) return url;
  return injectTransforms(url, "q_auto:good,f_auto,vc_auto,w_720,c_scale,br_2000k");
}

// Image-only transforms (no vc_auto/f_auto) so Cloudinary can serve the
// poster thumbnail instantly without video transcoding.
export function getCloudinaryPosterUrl(url: string, preset: CloudinaryPreset): string {
  if (!isCloudinaryVideoUrl(url)) return url;
  const w = POSTER_WIDTHS[preset];
  const transforms = `q_auto,w_${w},c_limit,so_auto`;
  return injectTransforms(url, transforms).replace(/\.[^.]+$/, ".jpg");
}
