import { file, glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
  loader: glob({
    pattern: "**/*.{md,mdx}",
    base: "./src/content/blog",
    generateId: ({ entry }) => {
      return entry.replace(/\.(md|mdx)$/, "");
    },
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      author: reference("authors"),
      pubDate: z.date(),
      isDraft: z.boolean(),
      linkedContent: z.string().optional(),
      image: image(),
      imageAlt: z.string().optional(),
    }),
});

const authors = defineCollection({
  loader: file("src/content/authors/authors.json"),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      image: image(),
      position: z.object({
        en: z.string(),
        pt: z.string(),
      }),
    }),
});

export const collections = {
  blog: blogCollection,
  authors: authors,
};
