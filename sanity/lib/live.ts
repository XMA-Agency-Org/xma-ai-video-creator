import { client } from "./client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityFetch({
  query,
  params,
}: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<{ data: any }> {
  if (!client) return { data: null };

  try {
    const { defineLive } = await import("next-sanity/live");

    const live = defineLive({
      client: client.withConfig({ apiVersion: "2026-04-08" }),
      serverToken: process.env.SANITY_API_READ_TOKEN,
      browserToken: process.env.SANITY_API_READ_TOKEN,
    });

    const result = await live.sanityFetch({ query, params });
    return result as { data: any };
  } catch {
    return { data: null };
  }
}

export function SanityLive() {
  return null;
}
