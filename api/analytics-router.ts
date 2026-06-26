import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { factories, products, users, contactMessages, jobListings } from "@db/schema";
import { count, eq } from "drizzle-orm";

export const analyticsRouter = createRouter({
  overview: publicQuery.query(async () => {
    const totalFactories = await getDb().select({ count: count() }).from(factories).where(eq(factories.isActive, true));
    const totalProducts = await getDb().select({ count: count() }).from(products).where(eq(products.isActive, true));
    const totalUsers = await getDb().select({ count: count() }).from(users);
    const totalMessages = await getDb().select({ count: count() }).from(contactMessages);
    const totalJobs = await getDb().select({ count: count() }).from(jobListings).where(eq(jobListings.isActive, true));

    return {
      totalFactories: totalFactories[0]?.count ?? 0,
      totalProducts: totalProducts[0]?.count ?? 0,
      totalUsers: totalUsers[0]?.count ?? 0,
      totalMessages: totalMessages[0]?.count ?? 0,
      totalJobs: totalJobs[0]?.count ?? 0,
    };
  }),
});
