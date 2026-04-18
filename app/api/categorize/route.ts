import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const JSON_PATH = join(process.cwd(), "public/videos/cloudinary-videos.json");

type CloudinaryVideoEntry = {
  id: string;
  title: string;
  category: string;
  videoUrl: string;
  featured: boolean;
};

function readVideos(): CloudinaryVideoEntry[] {
  return JSON.parse(readFileSync(JSON_PATH, "utf-8"));
}

function writeVideos(videos: CloudinaryVideoEntry[]) {
  writeFileSync(JSON_PATH, JSON.stringify(videos, null, 2), "utf-8");
}

export async function GET() {
  const videos = readVideos();
  return NextResponse.json(
    videos.map((v) => ({ id: v.id, title: v.title, category: v.category, videoUrl: v.videoUrl }))
  );
}

export async function PATCH(request: Request) {
  const { id, category, title } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const videos = readVideos();
  const idx = videos.findIndex((v) => v.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  if (category) videos[idx].category = category;
  if (title) videos[idx].title = title;

  writeVideos(videos);
  return NextResponse.json({ success: true, entry: videos[idx] });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const videos = readVideos();
  const filtered = videos.filter((v) => v.id !== id);

  if (filtered.length === videos.length) {
    return NextResponse.json({ error: "Entry not found" }, { status: 404 });
  }

  writeVideos(filtered);
  return NextResponse.json({ success: true });
}
