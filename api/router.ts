import { createRouter, publicQuery } from "./middleware";
import { authRouter } from "./auth-router";
import { factoryRouter } from "./factory-router";
import { productRouter } from "./product-router";
import { categoryRouter } from "./category-router";
import { searchRouter } from "./search-router";
import { contactRouter } from "./contact-router";
import { jobsRouter } from "./jobs-router";
import { analyticsRouter } from "./analytics-router";
import { newsRouter } from "./news-router";

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

