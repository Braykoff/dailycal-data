import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/** Articles collection */
const articles = defineCollection({
	loader: glob({ base: './src/content/articles', pattern: '**/*.mdx' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
      date: z.coerce.date(),
			title: z.string(),
      byline: z.array(z.string()),
			featuredImage: image(),
      imageAttribution: z.string(),
      aboutStory: z.string().optional(),
      description: z.string().optional(),
      template: z.string().default("default")
		}),
});

export const collections = { articles };
