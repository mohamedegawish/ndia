import { relations } from "drizzle-orm";
import { users, factories, products, categories, factoryImages, productImages, jobListings, jobApplications } from "./schema";

export const usersRelations = relations(users, ({ many }) => ({
  factories: many(factories),
}));

export const categoriesRelations = relations(categories, ({ many }) => ({
  factories: many(factories),
  products: many(products),
}));

export const factoriesRelations = relations(factories, ({ one, many }) => ({
  user: one(users, { fields: [factories.userId], references: [users.id] }),
  category: one(categories, { fields: [factories.categoryId], references: [categories.id] }),
  products: many(products),
  images: many(factoryImages),
  jobListings: many(jobListings),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  factory: one(factories, { fields: [products.factoryId], references: [factories.id] }),
  category: one(categories, { fields: [products.categoryId], references: [categories.id] }),
  images: many(productImages),
}));

export const factoryImagesRelations = relations(factoryImages, ({ one }) => ({
  factory: one(factories, { fields: [factoryImages.factoryId], references: [factories.id] }),
}));

export const productImagesRelations = relations(productImages, ({ one }) => ({
  product: one(products, { fields: [productImages.productId], references: [products.id] }),
}));

export const jobListingsRelations = relations(jobListings, ({ one, many }) => ({
  factory: one(factories, { fields: [jobListings.factoryId], references: [factories.id] }),
  applications: many(jobApplications),
}));

export const jobApplicationsRelations = relations(jobApplications, ({ one }) => ({
  job: one(jobListings, { fields: [jobApplications.jobId], references: [jobListings.id] }),
}));
