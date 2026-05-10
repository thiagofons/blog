import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const posts = (await getCollection("posts")).filter((post) => !post.data.draft).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const index = posts.map((post) => {
    const yearMonth = post.data.date.toISOString().slice(0, 7);
    return {
      slug: post.id,
      title: post.data.title,
      description: post.data.description,
      date: post.data.date.toISOString(),
      yearMonth,
      body: (post.body ?? "")
        .replace(/^---[\s\S]*?\n---\n?/, "")
        .replace(/[#*`\[\]()>_~|\\]/g, "")
        .replace(/\n+/g, " ")
        .replace(/\s+/g, " ")
        .trim(),
    };
  });

  return new Response(JSON.stringify(index), {
    headers: { "Content-Type": "application/json" },
  });
}
