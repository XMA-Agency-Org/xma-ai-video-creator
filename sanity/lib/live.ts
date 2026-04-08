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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityFetch({
  query,
  params,
}: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<{ data: any }> {
  try {
    const result = await live.sanityFetch({ query, params });
    return result as { data: any };
  } catch {
    return { data: null };
  }
}
