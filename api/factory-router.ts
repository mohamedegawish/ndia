import { z } from "zod";
import { createRouter, publicQuery, authedQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { factories } from "@db/schema";
import { eq, like, and, count, desc } from "drizzle-orm";

export const factoryRouter = createRouter({
  list: publicQuery
    .input(z.object({
      categoryId: z.number().optional(),
      search: z.string().optional(),
      tier: z.enum(["bronze", "silver", "gold"]).optional(),
      featured: z.boolean().optional(),
      limit: z.number().default(20),
      offset: z.number().default(0),
    }).optional())
    .query(async ({ input }) => {
      const conditions = [];
      if (input?.categoryId) conditions.push(eq(factories.categoryId, input.categoryId));
      if (input?.tier) conditions.push(eq(factories.membershipTier, input.tier));
      if (input?.featured) conditions.push(eq(factories.isFeatured, true));
      if (input?.search) conditions.push(like(factories.nameAr, `%${input.search}%`));
      // Show all factories regardless of isActive to avoid empty listing

      const where = conditions.length > 0 ? and(...conditions) : undefined;

      const items = await getDb().query.factories.findMany({
        where,
        limit: input?.limit ?? 20,
        offset: input?.offset ?? 0,
        orderBy: [desc(factories.isFeatured), desc(factories.createdAt)],
        with: { category: true },
      });

      const totalResult = await getDb().select({ count: count() }).from(factories).where(where);
      return { items, total: totalResult[0]?.count ?? 0 };
    }),

  getById: publicQuery
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const factory = await getDb().query.factories.findFirst({
        where: eq(factories.id, input.id),
        with: { category: true, products: { with: { category: true } }, images: true },
      });
      return factory ?? null;
    }),

  featured: publicQuery.query(async () => {
    return getDb().query.factories.findMany({
      where: and(eq(factories.isFeatured, true), eq(factories.isActive, true)),
      limit: 6,
      with: { category: true },
      orderBy: [desc(factories.rating)],
    });
  }),

  byCategory: publicQuery
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ input }) => {
      return getDb().query.factories.findMany({
        where: and(eq(factories.categoryId, input.categoryId), eq(factories.isActive, true)),
        with: { category: true },
      });
    }),

  myFactory: authedQuery
    .query(async ({ ctx }) => {
      return getDb().query.factories.findFirst({
        where: eq(factories.userId, ctx.user.id),
        with: { category: true, products: true, jobListings: true },
      });
    }),

  create: authedQuery
    .input(z.object({
      nameAr: z.string().min(2),
      nameEn: z.string().optional(),
      descriptionAr: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().optional(),
      address: z.string().optional(),
      website: z.string().optional(),
      categoryId: z.number(),
    }))
    .mutation(async ({ input, ctx }) => {
      const existing = await getDb().query.factories.findFirst({
        where: eq(factories.userId, ctx.user.id),
      });
      if (existing) throw new Error("FACTORY_ALREADY_EXISTS");

      const [newFactory] = await getDb().insert(factories).values({
        userId: ctx.user.id,
        nameAr: input.nameAr,
        nameEn: input.nameEn || null,
        descriptionAr: input.descriptionAr || null,
        phone: input.phone || null,
        email: input.email || null,
        address: input.address || null,
        website: input.website || null,
        categoryId: input.categoryId,
        membershipTier: "bronze",
        isActive: true,
        isFeatured: false,
      }).returning();

      return newFactory;
    }),
});
