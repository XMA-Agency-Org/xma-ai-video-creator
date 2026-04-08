import { NextResponse } from "next/server";
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";

const MANIFEST_PATH = join(process.cwd(), "public/videos/manifest-final.json");

type Entry = {
  id: string;
  video: string;
  category: string;
  title: string;
};

export async function GET() {
  const raw = readFileSync(MANIFEST_PATH, "utf-8");
  const entries: Entry[] = JSON.parse(raw);
  return NextResponse.json(entries);
}

export async function PATCH(request: Request) {
  const { id, category, title } = await request.json();

  const raw = readFileSync(MANIFEST_PATH, "utf-8");
  const entries: Entry[] = JSON.parse(raw);

  const entry = entries.find((e) => e.id === id);
  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  if (category) entry.category = category;
  if (title) entry.title = title;

  writeFileSync(MANIFEST_PATH, JSON.stringify(entries, null, 2));

  return NextResponse.json({ success: true, entry });
}
