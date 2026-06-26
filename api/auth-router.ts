import { z } from "zod";
import { createRouter, publicQuery } from "./middleware";
import { getDb } from "./queries/connection";
import { users } from "@db/schema";
import { eq } from "drizzle-orm";
import { hashPassword, comparePassword, createToken } from "./lib/auth";

export const authRouter = createRouter({
  register: publicQuery
    .input(z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(6),
      phone: z.string().optional(),
      role: z.enum(["user", "factory", "supplier", "importer", "authority"]).default("user"),
      companyName: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const existing = await getDb().select().from(users).where(eq(users.email, input.email)).limit(1);
      if (existing.length > 0) throw new Error("EMAIL_EXISTS");
      const hashed = await hashPassword(input.password);
      const user = await getDb().insert(users).values({
        name: input.name, email: input.email, password: hashed,
        phone: input.phone, role: input.role, companyName: input.companyName,
      }).returning();
      const token = await createToken({ id: user[0].id, email: user[0].email, role: user[0].role });
      return { user: { id: user[0].id, name: user[0].name, email: user[0].email, role: user[0].role }, token };
    }),

  login: publicQuery
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async ({ input }) => {
      const user = await getDb().select().from(users).where(eq(users.email, input.email)).limit(1);
      if (user.length === 0) throw new Error("INVALID_CREDENTIALS");
      const valid = await comparePassword(input.password, user[0].password);
      if (!valid) throw new Error("INVALID_CREDENTIALS");
      const token = await createToken({ id: user[0].id, email: user[0].email, role: user[0].role });
      return { user: { id: user[0].id, name: user[0].name, email: user[0].email, role: user[0].role }, token };
    }),

  me: publicQuery.query(async ({ ctx }) => {
    if (!ctx.user) return null;
    const user = await getDb().select().from(users).where(eq(users.id, ctx.user.id)).limit(1);
    if (user.length === 0) return null;
    const { password, ...userWithoutPassword } = user[0];
    return userWithoutPassword;
  }),
});
