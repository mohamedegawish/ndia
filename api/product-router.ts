import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { products } from "@db/schema";
import { eq, and, like, desc, count } from "drizzle-orm";

export const productRouter = createRouter({
  list: publicQuery
    .input(z.object({
      categoryId: z.number().optional(),
      factoryId: z.number().optional(),
      search: z.string().optional(),
      availability: z.enum(["available", "limited", "out_of_stock"]).optional(),
      featured: z.boolean().optional(),
      limit: z.number().default(20),
      offset: z.number().default(0),
    }).optional())
    .query(async ({ input }) => {
      const conditions = [];
      if (input?.categoryId) conditions.push(eq(products.categoryId, input.categoryId));
      if (input?.factoryId) conditions.push(eq(products.factoryId, input.factoryId));
      if (input?.availability) conditions.push(eq(products.availability, input.availability));
      if (input?.featured) conditions.push(eq(products.isFeatured, true));
      if (input?.search) conditions.push(like(products.nameAr, `%${input.search}%`));
      conditions.push(eq(products.isActive, true));

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const items = await getDb().query.products.findMany({
        where,
        limit: input?.limit ?? 20,
        offset: input?.offset ?? 0,
        orderBy: [desc(products.isFeatured), desc(products.createdAt)],
        with: { factory: true, category: true },
      });

      const totalResult = await getDb().select({ count: count() }).from(products).where(where);
      return { items, total: totalResult[0]?.count ?? 0 };
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const product = await getDb().query.products.findFirst({
        where: eq(products.id, input.id),
        with: { factory: true, category: true },
      });
      return product ?? null;
    }),

  featured: publicQuery.query(async () => {
    return getDb().query.products.findMany({
      where: and(eq(products.isFeatured, true), eq(products.isActive, true)),
      limit: 8,
      with: { factory: true },
      orderBy: [desc(products.createdAt)],
    });
  }),
});
