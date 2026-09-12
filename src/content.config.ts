import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    banner: z.string(),
    gallery: z.array(z.object({
      src: z.string(),
      alt: z.string(),
    })).default([]),
    company: z.array(z.object({
      label: z.string(),
      value: z.string().optional(),
      items: z.array(z.string()).optional(),
    })).optional(),
    pubDate: z.coerce.date(),
    author: z.string().default('GetUp'),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { portfolio };
