import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { jobListings, jobApplications } from "@db/schema";
import { eq, and, desc } from "drizzle-orm";

export const jobsRouter = createRouter({
  list: publicQuery
    .input(z.object({
      factoryId: z.number().optional(),
      type: z.enum(["full_time", "part_time", "contract", "internship"]).optional(),
      limit: z.number().default(20),
      offset: z.number().default(0),
    }).optional())
    .query(async ({ input }) => {
      const conditions = [eq(jobListings.isActive, true)];
      if (input?.factoryId) conditions.push(eq(jobListings.factoryId, input.factoryId));
      if (input?.type) conditions.push(eq(jobListings.type, input.type));

      const items = await getDb().query.jobListings.findMany({
        where: conditions.length > 0 ? and(...conditions) : undefined,
        limit: input?.limit ?? 20,
        offset: input?.offset ?? 0,
        orderBy: [desc(jobListings.createdAt)],
        with: { factory: true },
      });
      return { items, total: items.length };
    }),

  applyJob: publicQuery
    .input(z.object({
      jobId: z.number(),
      applicantName: z.string().min(2),
      applicantEmail: z.string().email().optional(),
      applicantPhone: z.string().optional(),
      cvUrl: z.string().optional(),
      message: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      await getDb().insert(jobApplications).values(input);
      return { success: true };
    }),
});
