import { z } from "zod";
import { createRouter, publicQuery, adminQuery } from "./middleware.js";
import { getDb } from "./queries/connection.js";
import { contactMessages } from "@db/schema.js";
import { desc, count, eq } from "drizzle-orm";

export const contactRouter = createRouter({
  submit: publicQuery
    .input(z.object({
      name: z.string().min(2),
      email: z.string().email(),
      phone: z.string().optional(),
      subject: z.string().optional(),
      message: z.string().min(5),
      role: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      await getDb().insert(contactMessages).values(input);
      return { success: true };
    }),

  list: adminQuery
    .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }).optional())
    .query(async ({ input }) => {
      const items = await getDb().query.contactMessages.findMany({
        limit: input?.limit ?? 20,
        offset: input?.offset ?? 0,
        orderBy: [desc(contactMessages.createdAt)],
      });
      const totalResult = await getDb().select({ count: count() }).from(contactMessages);
      return { items, total: totalResult[0]?.count ?? 0 };
    }),

  markRead: adminQuery
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      await getDb().update(contactMessages).set({ isRead: true }).where(eq(contactMessages.id, input.id));
      return { success: true };
    }),
});
