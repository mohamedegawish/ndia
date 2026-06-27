import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { verifyToken } from "./lib/auth.js";

export type TrpcContext = {
  req: Request;
  resHeaders: Headers;
  user?: { id: number; name: string; email: string; role: string };
};

export async function createContext(
  opts: FetchCreateContextFnOptions,
): Promise<TrpcContext> {
  const token = opts.req.headers.get("authorization")?.replace("Bearer ", "");
  const user = token ? await verifyToken(token).catch(() => undefined) : undefined;
  return { req: opts.req, resHeaders: opts.resHeaders, user };
}
