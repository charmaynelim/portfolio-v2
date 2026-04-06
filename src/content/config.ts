import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    metadata: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
    order: z.number().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

const caseStudies = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    urlSlug: z.string(),
    subtitle: z.string().optional(),
    order: z.number(),
    description: z.string().optional(),
    coverImage: z.string().optional(),
    meta1Label: z.string().optional(),
    meta1Value: z.string().optional(),
    meta2Label: z.string().optional(),
    meta2Value: z.string().optional(),
    meta3Label: z.string().optional(),
    meta3Value: z.string().optional(),
    meta4Label: z.string().optional(),
    meta4Value: z.string().optional(),
    links: z.array(z.object({
      label: z.string(),
      href: z.string(),
    })).optional(),
  }),
});

export const collections = {
  blog,
  projects,
  'case-studies': caseStudies,
};
