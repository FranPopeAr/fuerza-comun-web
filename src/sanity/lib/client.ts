type QueryParams = Record<string, string>;

export async function sanityFetch<T>(query: string, params: QueryParams = {}): Promise<T | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
  if (!projectId) return null;

  const url = new URL(`https://${projectId}.api.sanity.io/v2026-09-01/data/query/${dataset}`);
  url.searchParams.set("query", query);
  for (const [key, value] of Object.entries(params)) url.searchParams.set(`$${key}`, JSON.stringify(value));

  const response = await fetch(url, { next: { revalidate: 60 } });
  if (!response.ok) throw new Error(`Sanity query failed: ${response.status}`);
  const json = await response.json();
  return (json.result ?? null) as T | null;
}
