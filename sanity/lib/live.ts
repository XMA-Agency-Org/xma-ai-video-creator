import { client } from "./client";
import { defineLive } from "next-sanity/live";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FetchFn = (args: { query: string; params?: Record<string, unknown> }) => Promise<{ data: any }>;

let fetchFn: FetchFn | null = null;

try {
  if (client) {
    const live = defineLive({
      client: client.withConfig({ apiVersion: "2026-04-08" }),
      serverToken: process.env.SANITY_API_READ_TOKEN,
      browserToken: process.env.SANITY_API_READ_TOKEN,
    });
    fetchFn = live.sanityFetch as FetchFn;
  }
} catch {
  fetchFn = null;
}

export async function sanityFetch({
  query,
  params,
}: {
  query: string;
  params?: Record<string, unknown>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<{ data: any }> {
  if (!fetchFn) return { data: null };
  try {
    return await fetchFn({ query, params });
  } catch {
    return { data: null };
  }
}

export function SanityLive() {
  return null;
}
