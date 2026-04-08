import { defineLive } from "next-sanity/live";
import { client } from "./client";

const live = defineLive({
  client: client.withConfig({
    apiVersion: "2026-04-08",
  }),
  serverToken: process.env.SANITY_API_READ_TOKEN,
  browserToken: process.env.SANITY_API_READ_TOKEN,
});

export const SanityLive = live.SanityLive;

export async function sanityFetch<T = unknown>({
  query,
  params,
}: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<{ data: T | null }> {
  try {
    const result = await live.sanityFetch({ query, params });
    return result as { data: T | null };
  } catch {
    return { data: null };
  }
}
