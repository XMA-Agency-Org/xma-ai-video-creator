export type CloudinaryPreset = "hero" | "grid" | "carousel" | "card" | "lightbox";

const PRESET_WIDTHS: Record<CloudinaryPreset, number> = {
  hero: 1080,
  grid: 480,
  carousel: 720,
  card: 640,
  lightbox: 1280,
};

function isCloudinaryVideoUrl(url: string): boolean {
  return url.includes("res.cloudinary.com") && url.includes("/video/upload/");
}

function buildTransforms(preset: CloudinaryPreset): string {
  return `f_auto,q_auto,vc_auto,w_${PRESET_WIDTHS[preset]},c_limit`;
}

function injectTransforms(url: string, transforms: string): string {
  const marker = "/video/upload/";
  const idx = url.indexOf(marker);
  if (idx === -1) return url;
  const before = url.slice(0, idx + marker.length);
  const after = url.slice(idx + marker.length);
  return `${before}${transforms}/${after}`;
}

export function getCloudinaryVideoUrl(url: string, preset: CloudinaryPreset): string {
  if (!isCloudinaryVideoUrl(url)) return url;
  return injectTransforms(url, buildTransforms(preset));
}

export function getCloudinaryPosterUrl(url: string, preset: CloudinaryPreset): string {
  if (!isCloudinaryVideoUrl(url)) return url;
  const transformed = injectTransforms(url, buildTransforms(preset));
  return transformed.replace(/\.[^.]+$/, ".jpg");
}
