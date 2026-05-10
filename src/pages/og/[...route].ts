import { OGImageRoute } from "astro-og-canvas";
import { getCollection } from "astro:content";

const posts = (await getCollection("posts")).filter((post) => !post.data.draft);

const postPages = Object.fromEntries(
  posts.map((post) => [
    `artigos/${post.id}`,
    {
      title: post.data.title,
      description: post.data.description,
    },
  ])
);

const pages = {
  default: {
    title: "Thiago Fonseca",
    description: "Textos sobre sistemas, escrita e construção de produtos digitais.",
  },
  ...postPages,
};

export const { getStaticPaths, GET } = await OGImageRoute({
  param: "route",
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    bgGradient: [[248, 247, 243], [225, 218, 198]],
    border: { color: [186, 176, 154], width: 2, side: "block-end" },
    padding: 72,
    font: {
      title: {
        color: [31, 31, 26],
        size: 70,
        lineHeight: 1.2,
        families: ["Lexend"],
      },
      description: {
        color: [86, 86, 79],
        size: 34,
        lineHeight: 1.45,
        families: ["Source Serif 4"],
      },
    },
    fonts: [
      "./node_modules/@fontsource/lexend/files/lexend-latin-500-normal.woff",
      "./node_modules/@fontsource/source-serif-4/files/source-serif-4-latin-500-normal.woff",
    ],
  }),
});
