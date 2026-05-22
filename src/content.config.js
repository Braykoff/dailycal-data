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
      description: z.string().optional(),
      template: z.string().default("default"),

      // Specific to default template
      subhead: z.string().optional(),
      hideHeroImage: z.boolean().default(false),
      imageCaption: z.string().optional(),
      aboutStory: z.string().optional(),
    }),
});

export const collections = { articles };
