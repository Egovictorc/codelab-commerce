import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  title: z.string().trim(),
  price: z.number(),
  category: z.string().trim().optional(),
  description: z.string().trim().optional(),
  image: z.string().trim(),
  rating: z.object({
    rate: z.number(),
    count: z.number(),
  })
});

export type ProductDef = z.output<typeof ProductSchema>;