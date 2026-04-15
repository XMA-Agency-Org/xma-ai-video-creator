import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

const ALL_ITEMS_QUERY = `*[_type == "portfolioItem"] | order(orderRank asc){
  _id,
  title,
  "slug": slug.current,
  category,
  "videoUrl": video.asset->url
}`;

export async function GET() {
  if (!client) {
    return NextResponse.json({ error: "Sanity client not configured" }, { status: 500 });
  }

  const items = await client.fetch(ALL_ITEMS_QUERY);

  const entries = items.map((item: { _id: string; title: string; category: string; videoUrl: string }) => ({
    id: item._id,
    title: item.title ?? "",
    category: item.category ?? "Uncategorized",
    videoUrl: item.videoUrl ?? "",
  }));

  return NextResponse.json(entries);
}

export async function PATCH(request: Request) {
  if (!writeClient) {
    return NextResponse.json({ error: "Sanity write client not configured" }, { status: 500 });
  }

  const { id, category, title } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing document id" }, { status: 400 });
  }

  const patch = writeClient.patch(id);

  if (category) patch.set({ category });
  if (title) {
    patch.set({
      title,
      slug: { _type: "slug", current: title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") },
    });
  }

  const updated = await patch.commit();

  return NextResponse.json({ success: true, entry: updated });
}

export async function DELETE(request: Request) {
  if (!writeClient) {
    return NextResponse.json({ error: "Sanity write client not configured" }, { status: 500 });
  }

  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ error: "Missing document id" }, { status: 400 });
  }

  await writeClient.delete(id);

  return NextResponse.json({ success: true });
}
