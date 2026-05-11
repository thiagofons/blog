import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(_context: APIContext) {
  const links = (await getCollection("links"))
    .filter((entry) => !entry.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  const index = links.map((entry) => ({
    slug: entry.id,
    title: entry.data.title,
    description: entry.data.description,
    url: entry.data.url,
    date: entry.data.date.toISOString(),
    tags: entry.data.tags ?? [],
    body: (entry.body ?? "")
      .replace(/^---[\s\S]*?\n---\n?/, "")
      .replace(/[#*`\[\]()>_~|\\]/g, "")
      .replace(/\n+/g, " ")
      .replace(/\s+/g, " ")
      .trim(),
  }));

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
}
