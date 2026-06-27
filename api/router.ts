import { createRouter, publicQuery } from "./middleware.js";
import { authRouter } from "./auth-router.js";
import { factoryRouter } from "./factory-router.js";
import { productRouter } from "./product-router.js";
import { categoryRouter } from "./category-router.js";
import { searchRouter } from "./search-router.js";
import { contactRouter } from "./contact-router.js";
import { jobsRouter } from "./jobs-router.js";
import { analyticsRouter } from "./analytics-router.js";
import { newsRouter } from "./news-router.js";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  factory: factoryRouter,
  product: productRouter,
  category: categoryRouter,
  search: searchRouter,
  contact: contactRouter,
  jobs: jobsRouter,
  analytics: analyticsRouter,
  news: newsRouter,
});

export type AppRouter = typeof appRouter;

