import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Lab news. One short markdown file per announcement, named by date
 * (`src/data/news/2026-06-17.md`). Inline links are rendered as markdown.
 */
const newsCollection = defineCollection({
  loader: glob({ pattern: ['*.md'], base: 'src/data/news' }),
  schema: z.object({
    date: z.date(),
    draft: z.boolean().optional(),
  }),
});

export const collections = {
  news: newsCollection,
};
