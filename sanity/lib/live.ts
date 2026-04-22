import { client } from "./client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function sanityFetch({
  query,
  params,
}: {
  query: string;
  params?: Record<string, unknown>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}): Promise<{ data: any }> {
  if (!client) return { data: null };
  try {
    const data = await client.fetch(query, params ?? {}, {
      cache: "force-cache",
    });
    return { data };
  } catch {
    return { data: null };
  }
}

export function SanityLive() {
  return null;
}
