import { createRouter, publicQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { categories, factories, products } from "@db/schema.js";
import { eq, count, and } from "drizzle-orm";

export const categoryRouter = createRouter({
  list: publicQuery.query(async () => {
    const allCategories = await getDb().query.categories.findMany({
      where: eq(categories.isActive, true),
      orderBy: [categories.sortOrder],
    });

    // Get factory counts for each category
    const result = await Promise.all(
      allCategories.map(async (cat) => {
        const factoryCount = await getDb().select({ count: count() })
          .from(factories)
          .where(and(eq(factories.categoryId, cat.id), eq(factories.isActive, true)));
        const productCount = await getDb().select({ count: count() })
          .from(products)
          .where(and(eq(products.categoryId, cat.id), eq(products.isActive, true)));
        return { ...cat, factoryCount: factoryCount[0]?.count ?? 0, productCount: productCount[0]?.count ?? 0 };
      })
    );

    return result;
  }),

  getById: publicQuery
    .input((val: unknown) => {
      if (typeof val !== "object" || val === null) throw new Error("Invalid input");
      const { id } = val as { id: number };
      return { id };
    })
    .query(async ({ input }) => {
      return getDb().query.categories.findFirst({
        where: eq(categories.id, input.id),
      }) ?? null;
    }),
});
