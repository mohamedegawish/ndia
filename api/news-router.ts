import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { news } from "@db/schema.js";
import { eq, desc } from "drizzle-orm";

export const newsRouter = createRouter({
  // Public: list published news
  list: publicQuery
    .input(z.object({ limit: z.number().default(20) }).optional())
    .query(async ({ input }) => {
      const items = await getDb().query.news.findMany({
        where: eq(news.isPublished, true),
        orderBy: [desc(news.publishedAt)],
        limit: input?.limit ?? 20,
      });
      return { items };
    }),

  // Admin: list all news (including unpublished)
  listAll: adminQuery.query(async () => {
    const items = await getDb().query.news.findMany({
      orderBy: [desc(news.publishedAt)],
    });
    return { items };
  }),

  // Admin: create news item
  create: adminQuery
    .input(z.object({
      titleAr: z.string().min(3),
      contentAr: z.string().min(10),
      image: z.string().optional(),
      category: z.enum(["اتفاقيات", "فعاليات", "قرارات", "اخبار"]).default("اخبار"),
      isPublished: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      const [created] = await getDb().insert(news).values({
        titleAr: input.titleAr,
        contentAr: input.contentAr,
        image: input.image,
        category: input.category,
        isPublished: input.isPublished,
      }).returning();
      return created;
    }),

  // Admin: update news item
  update: adminQuery
    .input(z.object({
      id: z.number(),
      titleAr: z.string().min(3).optional(),
      contentAr: z.string().min(10).optional(),
      image: z.string().optional(),
      category: z.enum(["اتفاقيات", "فعاليات", "قرارات", "اخبار"]).optional(),
      isPublished: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      const [updated] = await getDb().update(news)
        .set({ ...data, updatedAt: new Date() })
        .where(eq(news.id, id))
        .returning();
      return updated;
    }),

  // Admin: delete news item
  delete: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb().delete(news).where(eq(news.id, input.id));
      return { success: true };
    }),
});
