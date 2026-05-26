import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Elysium Scale'),
    category: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const products = defineCollection({
  schema: z.object({
    name: z.string(),
    description: z.string(),
    category: z.string(),
    rating: z.number().min(0).max(5),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    affiliateId: z.string(),
    price: z.string().optional(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    featured: z.boolean().default(false),
    publishDate: z.date().optional(),
  }),
});

export const collections = { articles, products };
