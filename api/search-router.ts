import { z } from "zod";
import { createRouter, publicQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { factories, products } from "@db/schema.js";
import { like, and, eq, or } from "drizzle-orm";

export const searchRouter = createRouter({
  search: publicQuery
    .input(z.object({ query: z.string().min(1) }))
    .query(async ({ input }) => {
      const q = `%${input.query}%`;
      const factoryResults = await getDb().query.factories.findMany({
        where: and(
          or(like(factories.nameAr, q), like(factories.descriptionAr, q)),
          eq(factories.isActive, true)
        ),
        limit: 10,
        with: { category: true },
      });
      const productResults = await getDb().query.products.findMany({
        where: and(
          or(like(products.nameAr, q), like(products.descriptionAr, q)),
          eq(products.isActive, true)
        ),
        limit: 10,
        with: { factory: true },
      });
      return { factories: factoryResults, products: productResults };
    }),

  popular: publicQuery.query(async () => {
    return [];
  }),
});
