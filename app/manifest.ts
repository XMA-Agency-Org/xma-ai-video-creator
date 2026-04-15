import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AI Video Creator | XMA Agency",
    short_name: "XMA Videos",
    description:
      "AI-powered video creation for modern brands. By XMA Agency, Dubai.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f0e8",
    theme_color: "#6b21f8",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
