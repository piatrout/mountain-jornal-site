import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { GRADE_SYSTEMS, UIAA_GRADE_PATTERN } from './lib/grades';

const routes = defineCollection({
  loader: glob({ pattern: '*/index.md', base: './src/content/routes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      peak: z.string(),
      region: z.string(),
      country: z.string(),
      date: z.coerce.date(),
      gradeSystem: z.enum(GRADE_SYSTEMS).default('UIAA'),
      grade: z.string().regex(UIAA_GRADE_PATTERN, 'Expected a UIAA grade like "IV+" or "VI-"'),
      /** Metres above sea level */
      summitElevation: z.number().int().positive(),
      /** Metres of ascent */
      elevationGain: z.number().int().positive(),
      durationHours: z.number().positive(),
      summary: z.string().max(220),
      cover: image(),
      coverAlt: z.string(),
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string(),
            caption: z.string().optional(),
          }),
        )
        .default([]),
      draft: z.boolean().default(false),
    }),
});

export const collections = { routes };
